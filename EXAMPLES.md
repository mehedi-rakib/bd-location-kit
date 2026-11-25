# BD Location Kit - Usage Examples

## Basic Usage

### Get All Divisions

```javascript
const { getDivisions } = require('bd-location-kit');

const divisions = getDivisions();
console.log(divisions);

// Output:
// [
//   {
//     id: 1,
//     country_id: null,
//     division_name: 'Chattagram',
//     bn_name: 'চট্টগ্রাম',
//     url: 'www.chittagongdiv.gov.bd',
//     status: 1,
//     ...
//   },
//   ...
// ]
```

### Get Districts in a Division

```javascript
const { getDistrictsByDivision } = require('bd-location-kit');

const dhakaDistricts = getDistrictsByDivision(1);
console.log(`Found ${dhakaDistricts.length} districts in division 1`);
```

### Get Areas in a District

```javascript
const { getAreasByDistrict } = require('bd-location-kit');

const comillaAreas = getAreasByDistrict(1);
console.log(comillaAreas);
// Output: Array of 51+ areas in Comilla district
```

## Filtering

### Filter by Status

```javascript
const { getDivisions } = require('bd-location-kit');

const activeDivisions = getDivisions({ status: 1 });
```

### Search Locations

```javascript
const { search } = require('bd-location-kit');

const results = search('dhaka');
console.log(results);
// Output:
// {
//   divisions: [...],
//   districts: [...],
//   areas: [...]
// }
```

## Validation

```javascript
const { validateAddress } = require('bd-location-kit');

const result = validateAddress(1, 1, 1);
if (result.valid) {
  console.log('Valid address:', result.data);
} else {
  console.log('Invalid:', result.error);
}
```

## Advanced Usage with LocationKit Class

```javascript
const { LocationKit } = require('bd-location-kit');

const kit = new LocationKit();

// Get statistics
const stats = kit.getStatistics();
console.log(stats);
// Output:
// {
//   total_divisions: 8,
//   total_districts: 65,
//   total_areas: 1621,
//   total_locations: 1694
// }

// Get complete hierarchy
const hierarchy = kit.getHierarchy();
console.log(hierarchy);

// Get by ID
const division = kit.getDivisionById(1);
const district = kit.getDistrictById(1);
const area = kit.getAreaById(1);
```

## Using Utility Functions

```javascript
const { formatLocationName, buildAddressString, isActive } = require('bd-location-kit');

const division = { division_name: 'Dhaka', bn_name: 'ঢাকা' };
const district = { district_name: 'Dhaka', bn_name: 'ঢাকা' };
const area = { name: 'Motijheel', bn_name: 'মতিঝিল' };

// Format names
console.log(formatLocationName(division, 'en')); // 'Dhaka'
console.log(formatLocationName(division, 'bn')); // 'ঢাকা'

// Build complete address
const address = buildAddressString(division, district, area, 'en');
console.log(address); // 'Motijheel, Dhaka, Dhaka'

// Check if active
console.log(isActive(division)); // true if status === 1
```

## Real-World Example: Express.js API

```javascript
const express = require('express');
const { getDistricts, getAreasByDistrict, getStatistics } = require('bd-location-kit');

const app = express();

// Get all districts
app.get('/api/districts', (req, res) => {
  res.json({ success: true, data: getDistricts() });
});

// Get areas for a district
app.get('/api/areas/:districtId', (req, res) => {
  const areas = getAreasByDistrict(parseInt(req.params.districtId));
  if (areas.length === 0) {
    return res.status(404).json({ success: false, error: 'District not found' });
  }
  res.json({ success: true, data: areas });
});

// Get statistics
app.get('/api/stats', (req, res) => {
  res.json({ success: true, data: getStatistics() });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## React Example: Address Selector

```jsx
import React, { useState } from 'react';
import { getDivisions, getDistrictsByDivision, getAreasByDistrict } = require('bd-location-kit');

export default function AddressForm() {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');

  const divisions = getDivisions();
  const districts = division ? getDistrictsByDivision(division) : [];
  const areas = district ? getAreasByDistrict(district) : [];

  return (
    <form>
      <div>
        <label>Division</label>
        <select value={division} onChange={(e) => setDivision(parseInt(e.target.value))}>
          <option value="">Select Division</option>
          {divisions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.division_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>District</label>
        <select value={district} onChange={(e) => setDistrict(parseInt(e.target.value))}>
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.district_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Area</label>
        <select value={area} onChange={(e) => setArea(parseInt(e.target.value))}>
          <option value="">Select Area</option>
          {areas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Database Seeding Example

```javascript
const { getDistricts, getAreas } = require('bd-location-kit');
const db = require('./database');

async function seedDatabase() {
  try {
    // Seed districts
    const districts = getDistricts();
    for (const district of districts) {
      await db.query(
        'INSERT INTO districts (id, name, bn_name, division_id) VALUES (?, ?, ?, ?)',
        [district.id, district.district_name, district.bn_name, district.division_id]
      );
    }

    // Seed areas
    const areas = getAreas();
    for (const area of areas) {
      await db.query(
        'INSERT INTO areas (id, name, bn_name, district_id) VALUES (?, ?, ?, ?)',
        [area.id, area.name, area.bn_name, area.district_id]
      );
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
```

## Bilingual Support Example

```javascript
const { getDistricts } = require('bd-location-kit');
const { formatLocationName } = require('bd-location-kit').utils;

const districts = getDistricts();

districts.forEach((district) => {
  console.log(`English: ${formatLocationName(district, 'en')}`);
  console.log(`Bengali: ${formatLocationName(district, 'bn')}`);
  console.log('---');
});
```

---

For more information, see the [README.md](README.md) and [plan.md](docs/plan.md).
