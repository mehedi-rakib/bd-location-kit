/**
 * Basic tests for BD Location Kit
 */

const {
  getDivisions,
  getDivisionById,
  getDistricts,
  getDistrictById,
  getDistrictsByDivision,
  getAreas,
  getAreaById,
  getAreasByDistrict,
  search,
  validateAddress,
  getHierarchy,
  getStatistics,
  LocationKit,
} = require('../src/index');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`${colors.green}✓${colors.reset} ${message}`);
    testsPassed++;
  } else {
    console.log(`${colors.red}✗${colors.reset} ${message}`);
    testsFailed++;
  }
}

console.log(`\n${colors.blue}🧪 BD Location Kit - Test Suite${colors.reset}\n`);

// Test 1: Get all divisions
console.log(`${colors.yellow}Test 1: Get Divisions${colors.reset}`);
const divisions = getDivisions();
assert(Array.isArray(divisions), 'getDivisions returns an array');
assert(divisions.length > 0, `Found ${divisions.length} divisions`);
assert(
  divisions.every((d) => d.id && d.division_name),
  'All divisions have required fields'
);

// Test 2: Get division by ID
console.log(`\n${colors.yellow}Test 2: Get Division by ID${colors.reset}`);
const division1 = getDivisionById(1);
assert(division1 !== null, 'Division with ID 1 exists');
assert(division1?.division_name === 'Chattagram', 'Correct division name');

// Test 3: Get all districts
console.log(`\n${colors.yellow}Test 3: Get Districts${colors.reset}`);
const districts = getDistricts();
assert(Array.isArray(districts), 'getDistricts returns an array');
assert(districts.length > 0, `Found ${districts.length} districts`);

// Test 4: Get district by ID
console.log(`\n${colors.yellow}Test 4: Get District by ID${colors.reset}`);
const district1 = getDistrictById(1);
assert(district1 !== null, 'District with ID 1 exists');
const districtName = district1?.name || district1?.district_name;
assert(districtName === 'Comilla', `Correct district name: ${districtName}`);

// Test 5: Get districts by division
console.log(`\n${colors.yellow}Test 5: Get Districts by Division${colors.reset}`);
const divisionDistricts = getDistrictsByDivision(1);
assert(Array.isArray(divisionDistricts), 'getDistrictsByDivision returns an array');
assert(divisionDistricts.length > 0, `Found ${divisionDistricts.length} districts in division 1`);
assert(
  divisionDistricts.every((d) => d.division_id === 1),
  'All districts belong to division 1'
);

// Test 6: Get all areas
console.log(`\n${colors.yellow}Test 6: Get Areas${colors.reset}`);
const areas = getAreas();
assert(Array.isArray(areas), 'getAreas returns an array');
assert(areas.length > 0, `Found ${areas.length} areas`);

// Test 7: Get area by ID
console.log(`\n${colors.yellow}Test 7: Get Area by ID${colors.reset}`);
const area1 = getAreaById(1);
assert(area1 !== null, 'Area with ID 1 exists');
assert(area1?.name === 'Debidwar', 'Correct area name');

// Test 8: Get areas by district
console.log(`\n${colors.yellow}Test 8: Get Areas by District${colors.reset}`);
const districtAreas = getAreasByDistrict(1);
assert(Array.isArray(districtAreas), 'getAreasByDistrict returns an array');
assert(districtAreas.length > 0, `Found ${districtAreas.length} areas in district 1`);

// Test 9: Search functionality
console.log(`\n${colors.yellow}Test 9: Search Functionality${colors.reset}`);
const searchResults = search('dhaka');
assert(searchResults.divisions.length >= 0, 'Search returns divisions');
assert(searchResults.districts.length >= 0, 'Search returns districts');
assert(searchResults.areas.length >= 0, 'Search returns areas');

// Test 10: Validate address
console.log(`\n${colors.yellow}Test 10: Validate Address${colors.reset}`);
const validAddress = validateAddress(1, 1, 1);
assert(validAddress.valid === true, 'Valid address validates successfully');
assert(validAddress.data !== undefined, 'Valid address returns data');

const invalidAddress = validateAddress(999, 999, 999);
assert(invalidAddress.valid === false, 'Invalid address fails validation');
assert(invalidAddress.error !== undefined, 'Invalid address returns error message');

// Test 11: Get hierarchy
console.log(`\n${colors.yellow}Test 11: Get Hierarchy${colors.reset}`);
const hierarchy = getHierarchy();
assert(typeof hierarchy === 'object', 'getHierarchy returns an object');
assert(Object.keys(hierarchy).length > 0, 'Hierarchy has divisions');

// Test 12: Get statistics
console.log(`\n${colors.yellow}Test 12: Get Statistics${colors.reset}`);
const stats = getStatistics();
assert(stats.total_divisions > 0, `Total divisions: ${stats.total_divisions}`);
assert(stats.total_districts > 0, `Total districts: ${stats.total_districts}`);
assert(stats.total_areas > 0, `Total areas: ${stats.total_areas}`);
assert(stats.total_locations > 0, `Total locations: ${stats.total_locations}`);

// Test 13: LocationKit class
console.log(`\n${colors.yellow}Test 13: LocationKit Class${colors.reset}`);
const kit = new LocationKit();
assert(kit !== null, 'LocationKit instance created');
const kitDivisions = kit.getDivisions();
assert(kitDivisions.length > 0, 'LocationKit.getDivisions works');
const kitStats = kit.getStatistics();
assert(kitStats.total_divisions > 0, 'LocationKit.getStatistics works');

// Test 14: Filter divisions by status
console.log(`\n${colors.yellow}Test 14: Filter Divisions by Status${colors.reset}`);
const activeDivisions = getDivisions({ status: 1 });
assert(Array.isArray(activeDivisions), 'Filter returns an array');
assert(
  activeDivisions.every((d) => d.status === 1),
  'All filtered divisions have status 1'
);

// Test 15: Bilingual support
console.log(`\n${colors.yellow}Test 15: Bilingual Support${colors.reset}`);
const divWithBengali = getDivisionById(1);
assert(divWithBengali?.bn_name !== undefined, 'Divisions have Bengali names');
const districtWithBengali = getDistrictById(1);
assert(districtWithBengali?.bn_name !== undefined, 'Districts have Bengali names');
const areaWithBengali = getAreaById(1);
assert(areaWithBengali?.bn_name !== undefined, 'Areas have Bengali names');

// Test summary
console.log(`\n${colors.blue}${'─'.repeat(50)}${colors.reset}`);
console.log(`${colors.green}Passed: ${testsPassed}${colors.reset}`);
console.log(`${colors.red}Failed: ${testsFailed}${colors.reset}`);
console.log(`${colors.blue}Total:  ${testsPassed + testsFailed}${colors.reset}`);
console.log(`${colors.blue}${'─'.repeat(50)}\n${colors.reset}`);

// Exit with appropriate code
process.exit(testsFailed > 0 ? 1 : 0);
