#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Build script to parse address.sql and generate JSON data files
 */

const sqlFile = path.join(__dirname, '../resources/address.sql');
const dataDir = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Read SQL file
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Parse SQL values - handles quoted strings with escapes
function parseValueTuple(tupleStr) {
  const values = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let escaped = false;

  for (let i = 0; i < tupleStr.length; i++) {
    const char = tupleStr[i];
    const prevChar = i > 0 ? tupleStr[i - 1] : '';

    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      current += char;
      continue;
    }

    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
      current += char;
    } else if (inString && char === stringChar) {
      inString = false;
      current += char;
    } else if (!inString && char === ',') {
      values.push(normalizeValue(current.trim()));
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    values.push(normalizeValue(current.trim()));
  }

  return values;
}

function normalizeValue(val) {
  if (val === 'NULL') return null;
  if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
    return val.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"');
  }
  if (!isNaN(val) && val !== '') {
    return parseInt(val, 10);
  }
  return val;
}

// Extract INSERT statements
function extractInsertData(sql, tableName) {
  // Find the INSERT INTO ... VALUES section
  const insertPattern = new RegExp(
    `INSERT INTO \\\`${tableName}\\\`\\s*\\(([^)]+)\\)\\s*VALUES\\s*\\n([^;]+);`,
    'i'
  );

  const match = sql.match(insertPattern);
  if (!match) return [];

  const columns = match[1]
    .split(',')
    .map((col) => col.trim().replace(/`/g, ''));
  const valuesText = match[2];

  // Find all tuples (content within parentheses at the start of lines)
  const tuplePattern = /\t*\(([^)]+)\)(?:,|$)/g;
  const data = [];
  let tupleMatch;

  while ((tupleMatch = tuplePattern.exec(valuesText)) !== null) {
    const values = parseValueTuple(tupleMatch[1]);
    const row = {};
    columns.forEach((col, idx) => {
      row[col] = values[idx];
    });
    data.push(row);
  }

  return data;
}

console.log('🔨 Building bd-location-kit...\n');

try {
  // Extract divisions
  console.log('📍 Extracting divisions...');
  const divisions = extractInsertData(sqlContent, 'divisions');
  const divisionsJson = {
    total: divisions.length,
    divisions: divisions.sort((a, b) => a.id - b.id),
  };
  fs.writeFileSync(
    path.join(dataDir, 'divisions.json'),
    JSON.stringify(divisionsJson, null, 2)
  );
  console.log(`   ✅ Found ${divisions.length} divisions`);

  // Extract districts
  console.log('📍 Extracting districts...');
  const districts = extractInsertData(sqlContent, 'districts');
  const districtsJson = {
    total: districts.length,
    districts: districts.sort((a, b) => a.id - b.id),
  };
  fs.writeFileSync(
    path.join(dataDir, 'districts.json'),
    JSON.stringify(districtsJson, null, 2)
  );
  console.log(`   ✅ Found ${districts.length} districts`);

  // Extract areas
  console.log('📍 Extracting areas...');
  const areas = extractInsertData(sqlContent, 'areas');
  const areasJson = {
    total: areas.length,
    areas: areas.sort((a, b) => a.id - b.id),
  };
  fs.writeFileSync(
    path.join(dataDir, 'areas.json'),
    JSON.stringify(areasJson, null, 2)
  );
  console.log(`   ✅ Found ${areas.length} areas`);

  // Create combined file
  console.log('📍 Creating combined data file...');
  const combined = {
    metadata: {
      buildDate: new Date().toISOString(),
      version: '1.0.0',
      description: 'Complete Bangladesh location data',
    },
    statistics: {
      total_divisions: divisions.length,
      total_districts: districts.length,
      total_areas: areas.length,
    },
    divisions,
    districts,
    areas,
  };
  fs.writeFileSync(
    path.join(dataDir, 'all.json'),
    JSON.stringify(combined, null, 2)
  );

  console.log('\n✨ Build completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   • Divisions: ${divisions.length}`);
  console.log(`   • Districts: ${districts.length}`);
  console.log(`   • Areas: ${areas.length}`);
  console.log(`   • Total locations: ${divisions.length + districts.length + areas.length}\n`);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
