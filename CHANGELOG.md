# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-25

### Added
- Initial release of BD Location Kit
- Complete Bangladesh geographic data (8 divisions, 65 districts, 1,621 areas)
- Bilingual support (English and Bengali names)
- Core API functions:
  - `getDivisions()` - Get all divisions with filtering
  - `getDistricts()` - Get all districts with filtering
  - `getAreas()` - Get all areas with filtering
  - `getDivisionById()` - Get specific division
  - `getDistrictById()` - Get specific district
  - `getAreaById()` - Get specific area
  - `getDistrictsByDivision()` - Get districts in a division
  - `getAreasByDistrict()` - Get areas in a district
  - `search()` - Search across all locations
  - `validateAddress()` - Validate address hierarchy
  - `getHierarchy()` - Get complete data structure
  - `getStatistics()` - Get data statistics
- LocationKit class for OOP interface
- Full TypeScript support with type definitions
- Comprehensive documentation and examples
- Express.js and React integration examples
- Database seeding examples
- 39 unit tests (100% passing)
- Zero external dependencies
- MIT License

### Features
- Complete Bangladesh geographic data
- Bilingual support (English + Bengali)
- Zero dependencies
- Easy integration with simple getter functions
- Flexible filtering and search
- Multiple export formats
- Perfect for forms and dropdowns
- Database ready
- Fast zero-latency data access
- Full test coverage

[1.0.0]: https://github.com/mehedi-rakib/bd-location-kit/releases/tag/v1.0.0
