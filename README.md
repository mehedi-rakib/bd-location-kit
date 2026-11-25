# BD Location Kit

Complete Bangladesh location data for npm - Divisions, Districts, and Areas with bilingual support

[![npm version](https://img.shields.io/npm/v/bd-location-kit.svg)](https://www.npmjs.com/package/bd-location-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D12.0.0-brightgreen)](https://nodejs.org/)

---

## Features

- **Complete Bangladesh Geographic Data** - 8 divisions, 64+ districts, 4,100+ areas
- **Bilingual Support** - English and Bengali names for all locations
- **Zero Dependencies** - Lightweight package with no external dependencies
- **Easy Integration** - Simple getter functions for quick access
- **Flexible Filtering** - Filter by division, district, status, and more
- **Multiple Formats** - JSON, SQL, CSV support
- **Perfect for Forms** - Ready for address selectors and location dropdowns
- **Database Ready** - SQL format for direct database imports
- **Fast** - Zero-latency data access (no API calls needed)

---

## Installation

```bash
npm install bd-location-kit
```

Or with yarn:

```bash
yarn add bd-location-kit
```

---

## Quick Start

### Get All Divisions

```javascript
const { getDivisions } = require('bd-location-kit');

const divisions = getDivisions();
console.log(divisions);
/* Output:
[
  { id: 1, name: 'Barishal', bn_name: 'বরিশাল', status: 1 },
  { id: 2, name: 'Chattogram', bn_name: 'চট্টগ্রাম', status: 1 },
  ...
]
*/
```

### Get All Districts

```javascript
const { getDistricts } = require('bd-location-kit');

const districts = getDistricts();
console.log(districts);
/* Output:
[
  { id: 1, name: 'Comilla', bn_name: 'কুমিল্লা', division_id: 1, status: 1 },
  { id: 2, name: 'Feni', bn_name: 'ফেনী', division_id: 1, status: 1 },
  ...
]
*/
```

### Get All Areas

```javascript
const { getAreas } = require('bd-location-kit');

const areas = getAreas();
console.log(areas);
/* Output:
[
  { id: 1, name: 'Debidwar', bn_name: 'দেবিদ্বার', district_id: 1 },
  { id: 2, name: 'Barura', bn_name: 'বরুড়া', district_id: 1 },
  ...
]
*/
```

---

## API Documentation

### Functions

#### `getDivisions(options)`

Get all divisions or filtered divisions.

**Parameters:**
- `options` (Object) - Optional
  - `status` (Number) - Filter by status (1 = active, 0 = inactive)
  - `search` (String) - Search by name (case-insensitive)

**Returns:** Array of division objects

```javascript
// Get all active divisions
const activeDivisions = getDivisions({ status: 1 });

// Search divisions
const searchResult = getDivisions({ search: 'dhaka' });
```

---

#### `getDistricts(options)`

Get all districts or filtered districts.

**Parameters:**
- `options` (Object) - Optional
  - `divisionId` (Number) - Filter by division ID
  - `status` (Number) - Filter by status
  - `search` (String) - Search by name

**Returns:** Array of district objects

```javascript
// Get districts in Dhaka division
const dhakaDistricts = getDistricts({ divisionId: 1 });

// Search districts
const searchResult = getDistricts({ search: 'comilla' });
```

---

#### `getAreas(options)`

Get all areas or filtered areas.

**Parameters:**
- `options` (Object) - Optional
  - `districtId` (Number) - Filter by district ID
  - `status` (Number) - Filter by status
  - `search` (String) - Search by name
  - `zone_id` (Number) - Filter by zone ID

**Returns:** Array of area objects

```javascript
// Get areas in Comilla district
const comillaAreas = getAreas({ districtId: 1 });

// Get active areas only
const activeAreas = getAreas({ status: 1 });

// Search areas
const searchResult = getAreas({ search: 'debidwar' });
```

---

#### `getDistrictsByDivision(divisionId)`

Get all districts in a specific division.

**Parameters:**
- `divisionId` (Number) - Division ID

**Returns:** Array of district objects

```javascript
const dhakaDistricts = getDistrictsByDivision(1);
```

---

#### `getAreasByDistrict(districtId)`

Get all areas in a specific district.

**Parameters:**
- `districtId` (Number) - District ID

**Returns:** Array of area objects

```javascript
const comillaAreas = getAreasByDistrict(1);
```

---

### Advanced Usage

#### LocationKit Class

```javascript
const { LocationKit } = require('bd-location-kit');

const kit = new LocationKit();

// Get division by ID
const division = kit.getDivisionById(1);

// Get district by ID
const district = kit.getDistrictById(1);

// Get area by ID
const area = kit.getAreaById(1);

// Get complete hierarchy
const hierarchy = kit.getHierarchy();

// Export as JSON
const jsonData = kit.exportAsJSON('divisions');

// Export as CSV
const csvData = kit.exportAsCSV('areas');
```

---

## Real-World Examples

### 1. Address Form with Express.js

```javascript
const express = require('express');
const { getDistricts, getAreasByDistrict } = require('bd-location-kit');

const app = express();

// Get all districts
app.get('/api/districts', (req, res) => {
  res.json({ success: true, data: getDistricts() });
});

// Get areas for a district
app.get('/api/areas/:districtId', (req, res) => {
  const { districtId } = req.params;
  const areas = getAreasByDistrict(parseInt(districtId));
  res.json({ success: true, data: areas });
});

app.listen(3000);
```

### 2. React Address Selector Component

```jsx
import React, { useState } from 'react';
import { getDivisions, getDistrictsByDivision, getAreasByDistrict } from 'bd-location-kit';

export function AddressSelector() {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const divisions = getDivisions();
  const districts = selectedDivision ? getDistrictsByDivision(selectedDivision) : [];
  const areas = selectedDistrict ? getAreasByDistrict(selectedDistrict) : [];

  return (
    <form>
      <select onChange={(e) => setSelectedDivision(e.target.value)}>
        <option value="">Select Division</option>
        {divisions.map((div) => (
          <option key={div.id} value={div.id}>
            {div.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSelectedDistrict(e.target.value)}>
        <option value="">Select District</option>
        {districts.map((dist) => (
          <option key={dist.id} value={dist.id}>
            {dist.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSelectedArea(e.target.value)}>
        <option value="">Select Area</option>
        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>
    </form>
  );
}
```

### 3. Data Validation

```javascript
const { LocationKit } = require('bd-location-kit');

const kit = new LocationKit();

function validateAddress(divisionId, districtId, areaId) {
  const division = kit.getDivisionById(divisionId);
  const district = kit.getDistrictById(districtId);
  const area = kit.getAreaById(areaId);

  if (!division) {
    return { valid: false, error: 'Invalid division' };
  }

  if (!district || district.division_id !== divisionId) {
    return { valid: false, error: 'Invalid district' };
  }

  if (!area || area.district_id !== districtId) {
    return { valid: false, error: 'Invalid area' };
  }

  return { valid: true, data: { division, district, area } };
}

// Usage
const result = validateAddress(1, 1, 1);
console.log(result);
```

### 4. Database Seeding

```javascript
const { getDistricts, getAreas } = require('bd-location-kit');
const db = require('./database');

async function seedLocationData() {
  try {
    const districts = getDistricts();
    const areas = getAreas();

    // Insert districts
    for (const district of districts) {
      await db.query(
        'INSERT INTO districts (id, name, bn_name, division_id) VALUES (?, ?, ?, ?)',
        [district.id, district.name, district.bn_name, district.division_id]
      );
    }

    // Insert areas
    for (const area of areas) {
      await db.query(
        'INSERT INTO areas (id, name, bn_name, district_id) VALUES (?, ?, ?, ?)',
        [area.id, area.name, area.bn_name, area.district_id]
      );
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

seedLocationData();
```

---

## Data Structure

### Division Object
```javascript
{
  id: 1,
  name: "Barishal",
  bn_name: "বরিশাল",
  status: 1
}
```

### District Object
```javascript
{
  id: 1,
  name: "Comilla",
  bn_name: "কুমিল্লা",
  division_id: 1,
  status: 1,
  url: "sadar.comilla.gov.bd"
}
```

### Area Object
```javascript
{
  id: 1,
  name: "Debidwar",
  bn_name: "দেবিদ্বার",
  district_id: 1,
  zone_id: null,
  status: 1,
  url: "debidwar.comilla.gov.bd",
  old_area_status: 1
}
```

---

## Project Structure

```
bd-location-kit/
├── docs/
│   └── plan.md              # Project plan and roadmap
├── resources/
│   └── address.sql          # Raw SQL data with all locations
├── src/
│   ├── index.js             # Main entry point
│   ├── data.js              # Data loader and processors
│   ├── utils.js             # Utility functions
│   └── types.d.ts           # TypeScript definitions
├── data/
│   ├── divisions.json       # Divisions data
│   ├── districts.json       # Districts data
│   └── areas.json           # Areas data
├── tests/
│   └── index.test.js        # Unit tests
├── package.json
├── README.md
└── LICENSE
```

---

## Search Functionality

The package supports case-insensitive search for all data types:

```javascript
// Search divisions
const results = getDivisions({ search: 'dhaka' });

// Search districts
const results = getDistricts({ search: 'comilla' });

// Search areas
const results = getAreas({ search: 'debid' });
```

---

## Browser Usage

You can also use this package in browsers via bundlers like Webpack or Parcel:

```javascript
import { getDivisions, getDistricts } from 'bd-location-kit';

const divisions = getDivisions();
```

---

## Statistics

- **Divisions**: 8
- **Districts**: 64+
- **Areas/Upazillas/Thanas**: 4,100+
- **Bundle Size**: ~50-100 KB (uncompressed)
- **Dependencies**: 0 (zero dependencies)

---

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/bd-location-kit.git

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build
```

### Scripts

```bash
npm test          # Run unit tests
npm run build     # Build the package
npm run format    # Format code with Prettier
npm run lint      # Lint code with ESLint
```

---

## Contributing

We welcome contributions! Here's how you can help:

1. **Report Issues** - Found a bug? [Open an issue](https://github.com/mehedi-rakib/bd-location-kit/issues)
2. **Submit PRs** - Have improvements? Fork and submit a pull request
3. **Improve Docs** - Help us improve documentation
4. **Add Features** - Suggest new features via issues

### Guidelines

- Write clear commit messages
- Add tests for new features
- Follow existing code style
- Update documentation

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit to whom the Software is furnished to
do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## Support

- **Email**: mehedirakib.dev@gmail.com
- **Issues**: [GitHub Issues](https://github.com/mehedi-rakib/bd-location-kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mehedi-rakib/bd-location-kit/discussions)
- **Security**: [Report Security Issues](./SECURITY.md)

---

## Acknowledgments

- Data sourced from official Bangladesh government sources
- Inspired by similar location packages in other countries
- Thanks to all contributors and users

---

## Roadmap

- [ ] v1.0.0 - Initial release with core functionality
- [ ] v1.1.0 - Add advanced filtering and search
- [ ] v1.2.0 - GraphQL support
- [ ] v1.3.0 - Database seeding utilities
- [ ] v2.0.0 - API generation helpers

---

## Use Cases

- E-commerce platforms (delivery address forms)
- Logistics and shipping applications
- Government and administrative systems
- Real estate and property platforms
- Healthcare and clinic locators
- Educational institution finders
- Banking and financial services
- Tourism and travel applications
- Data analysis and business intelligence
- Any application requiring Bangladesh location data

---

## Quick Links

- [Documentation](./docs/plan.md)
- [Changelog](./CHANGELOG.md)
- [Contributing](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [GitHub Repository](https://github.com/mehedi-rakib/bd-location-kit)
- [npm Package](https://www.npmjs.com/package/bd-location-kit)
- [Issues](https://github.com/mehedi-rakib/bd-location-kit/issues)
- [Discussions](https://github.com/mehedi-rakib/bd-location-kit/discussions)

---

**Last Updated**: November 25, 2026  
**Version**: 1.0.0 (Coming Soon)
