# BD Location Kit - Project Plan

## 📋 Project Overview

**BD Location Kit** is an npm package that provides comprehensive Bangladesh location data (divisions, districts, and areas) for global use. The package allows developers to easily integrate Bangladesh geographic location data into their applications without requiring database setup or external API calls.

**Key Goal**: Make Bangladesh location data accessible, reusable, and easy to integrate across projects.

---

## 🎯 Objectives

1. **Package Distribution**: Publish as an npm package for easy installation globally (`npm install bd-location-kit`)
2. **Multiple Data Formats**: Support JSON, SQL, and CSV formats for flexibility
3. **Easy Integration**: Zero-dependency package for quick setup
4. **Customization**: Allow developers to filter, extend, and customize data
5. **Multi-language Support**: Include both English and Bengali names for all locations

---

## 📦 Data Structure

### Available Data Tables

The package contains **3 main tables** from `resources/address.sql`:

#### 1. **Divisions** (8 divisions)
- Barishal
- Chattogram
- Dhaka
- Khulna
- Mymensingh
- Rajshahi
- Rangpur
- Sylhet

**Fields**: `id`, `name`, `bn_name`, `status`

#### 2. **Districts** (~64 districts)
- Each district belongs to a division
- Includes district names in English and Bengali

**Fields**: `id`, `name`, `bn_name`, `division_id`, `status`, `url`

#### 3. **Areas** (~4,102 areas)
- Each area belongs to a district (upazilla/thana level)
- Bilingual names and optional URL reference
- Zone information and legacy area status tracking

**Fields**: `id`, `name`, `bn_name`, `district_id`, `zone_id`, `status`, `url`, `old_area_status`, `timestamps`

---

## 🏗️ Package Architecture

```
bd-location-kit/
├── docs/
│   └── plan.md (this file)
├── resources/
│   ├── address.sql (source data)
│   ├── address.json (processed format)
│   └── address.csv (export format)
├── src/
│   ├── index.js (main entry)
│   ├── data.js (data loader)
│   ├── utils.js (helper functions)
│   └── types.d.ts (TypeScript definitions)
├── tests/
│   └── index.test.js
├── package.json
├── README.md
└── LICENSE
```

---

## 🚀 Package Features

### Phase 1: Core Functionality (MVP)
- ✅ Parse SQL data into JSON
- ✅ Export data in multiple formats (JSON, CSV)
- Load divisions, districts, and areas
- Simple getter functions
- TypeScript type definitions

### Phase 2: Advanced Features
- Filtering methods (by division, by district, by status)
- Search functionality (by name, Bengali name)
- Relationship mapping (get areas for a district)
- Caching for performance

### Phase 3: Extended Features
- API generation helper (for Express/Fastify)
- GraphQL type definitions
- Database seeding utility
- Reverse geocoding helper (coordinates to location)

---

## 📋 Installation & Usage

### Installation

```bash
npm install bd-location-kit
```

### Basic Usage

```javascript
const { getDivisions, getDistricts, getAreas } = require('bd-location-kit');

// Get all divisions
const divisions = getDivisions();

// Get all districts
const districts = getDistricts();

// Get areas for a district
const areasInDhaka = getAreas({ districtId: 1 });

// Search by name
const searchResult = getDivisions({ search: 'dhaka' });
```

### Advanced Usage

```javascript
const { LocationKit } = require('bd-location-kit');

const kit = new LocationKit();

// Get district by name
const dhaka = kit.getDistrictByName('Dhaka');

// Get all areas with bilingual names
const bilingual = kit.getAreas({ includeAllFields: true });

// Export to format
const csvData = kit.exportAsCSV('areas');
const jsonData = kit.exportAsJSON('divisions');

// Get hierarchy
const hierarchy = kit.getHierarchy(); // {division -> district -> area}
```

---

## 🔧 Development Roadmap

### Week 1-2: Foundation
- [ ] Create `package.json` with proper metadata
- [ ] Set up project structure
- [ ] Convert SQL to JSON format
- [ ] Write basic data loader utility

### Week 3-4: Core Package
- [ ] Implement getter functions (getDivisions, getDistricts, getAreas)
- [ ] Add filtering capabilities
- [ ] Add search functionality
- [ ] Write unit tests

### Week 5-6: Polish & Distribution
- [ ] Add TypeScript definitions
- [ ] Create comprehensive README
- [ ] Add examples and use cases
- [ ] Publish to npm registry
- [ ] Set up CI/CD pipeline

### Week 7+: Enhancements
- [ ] Add advanced features (Phase 2)
- [ ] Community feedback integration
- [ ] Performance optimization
- [ ] Extended features (Phase 3)

---

## 🛠️ Customization Options

### Data Customization

**Use Case 1: Only active locations**
```javascript
const activeOnly = getAreas({ status: 1 });
```

**Use Case 2: Get specific fields**
```javascript
const minimal = getAreas({ 
  fields: ['id', 'name', 'district_id'] 
});
```

**Use Case 3: Include relationships**
```javascript
const withDistrict = getAreas({ 
  includeDistrict: true 
});
```

### Direct Data Access

Developers can:
1. **Direct JSON Import**: Use processed JSON files directly
2. **SQL Query**: Import SQL file into their own database
3. **CSV Export**: Use CSV for spreadsheet or data analysis
4. **Filter & Extend**: Extend with custom fields

---

## 📚 Data Files to Generate

### 1. `data/divisions.json`
```json
{
  "divisions": [
    {
      "id": 1,
      "name": "Barishal",
      "bn_name": "বরিশাল"
    },
    ...
  ]
}
```

### 2. `data/districts.json`
```json
{
  "districts": [
    {
      "id": 1,
      "name": "Comilla",
      "bn_name": "কুমিল্লা",
      "division_id": 1,
      "status": 1
    },
    ...
  ]
}
```

### 3. `data/areas.json`
```json
{
  "areas": [
    {
      "id": 1,
      "name": "Debidwar",
      "bn_name": "দেবিদ্বার",
      "district_id": 1
    },
    ...
  ]
}
```

---

## 📄 Package.json Template

```json
{
  "name": "bd-location-kit",
  "version": "1.0.0",
  "description": "Complete Bangladesh location data (divisions, districts, areas) for npm",
  "main": "src/index.js",
  "types": "src/types.d.ts",
  "scripts": {
    "test": "jest",
    "build": "node scripts/build.js",
    "prepare": "npm run build"
  },
  "keywords": [
    "bangladesh",
    "location",
    "divisions",
    "districts",
    "areas",
    "geo-data",
    "bd"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/bd-location-kit"
  },
  "engines": {
    "node": ">=12.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

---

## 🔄 Usage Scenarios

### 1. E-commerce Platform
```javascript
const { getDistricts } = require('bd-location-kit');
app.get('/api/districts', (req, res) => {
  res.json(getDistricts());
});
```

### 2. Address Form Component
```javascript
const locations = require('bd-location-kit');
// Populate dropdown with divisions, districts, areas
const divisions = locations.getDivisions();
```

### 3. Location Validation
```javascript
const kit = new LocationKit();
const isValidArea = kit.isValidArea('Debidwar', 1);
```

### 4. Database Seeding
```javascript
const { seedDatabase } = require('bd-location-kit');
seedDatabase(connection); // Seeds divisions, districts, areas
```

---

## 📊 Expected Package Stats

- **Bundle Size**: ~50-100 KB (uncompressed JSON)
- **Build Time**: <5 seconds
- **Zero Dependencies**: No external packages required
- **TypeScript Support**: Full type definitions
- **Performance**: Instant data access (no DB queries needed)

---

## 🎯 Quality Checklist

Before Publishing:
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] README with examples
- [ ] Proper error handling
- [ ] Input validation
- [ ] Performance benchmarks
- [ ] Documentation complete
- [ ] License file included
- [ ] npm registry account ready
- [ ] Git repository configured

---

## 📞 Maintenance Plan

- **Version Updates**: Quarterly updates for new locations
- **Bug Fixes**: Priority response within 48 hours
- **Community Support**: Issues and PRs reviewed weekly
- **Data Accuracy**: Verify against official sources annually

---

## 🤝 Customization & Extension

Developers can:

1. **Add Custom Fields**: Extend data structure
   ```javascript
   const custom = getAreas({ 
     customFields: { coordinates: true } 
   });
   ```

2. **Filter by Criteria**: Build custom queries
   ```javascript
   const coastal = getDistricts({ 
     filterFn: (d) => coastalDistricts.includes(d.id) 
   });
   ```

3. **Merge with Other Data**: Combine with external APIs
   ```javascript
   const enriched = kit.enrich(getAreas(), externalData);
   ```

---

## 📝 Notes

- Data sourced from official Bangladesh government sources
- Both English and Bengali names included for accessibility
- SQL format allows easy database integration
- Zero-dependency design ensures lightweight package
- MIT License allows commercial and personal use

---

**Last Updated**: 2026-11-25  
**Status**: Planning Phase ✅  
**Next Step**: Create package.json and project structure
