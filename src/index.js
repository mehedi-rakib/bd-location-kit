/**
 * BD Location Kit
 * Complete Bangladesh location data (divisions, districts, areas) for npm
 * Version: 1.0.0
 */

const dataManager = require('./data');

/**
 * Get all divisions
 * @param {Object} options - Filter options (status, search)
 * @returns {Array} Array of division objects
 */
function getDivisions(options) {
  return dataManager.getDivisions(options);
}

/**
 * Get division by ID
 * @param {Number} id - Division ID
 * @returns {Object|null} Division object or null if not found
 */
function getDivisionById(id) {
  return dataManager.getDivisionById(id);
}

/**
 * Get all districts
 * @param {Object} options - Filter options (division_id, status, search)
 * @returns {Array} Array of district objects
 */
function getDistricts(options) {
  return dataManager.getDistricts(options);
}

/**
 * Get district by ID
 * @param {Number} id - District ID
 * @returns {Object|null} District object or null if not found
 */
function getDistrictById(id) {
  return dataManager.getDistrictById(id);
}

/**
 * Get districts in a specific division
 * @param {Number} divisionId - Division ID
 * @returns {Array} Array of district objects
 */
function getDistrictsByDivision(divisionId) {
  return dataManager.getDistrictsByDivision(divisionId);
}

/**
 * Get all areas
 * @param {Object} options - Filter options (district_id, zone_id, status, search)
 * @returns {Array} Array of area objects
 */
function getAreas(options) {
  return dataManager.getAreas(options);
}

/**
 * Get area by ID
 * @param {Number} id - Area ID
 * @returns {Object|null} Area object or null if not found
 */
function getAreaById(id) {
  return dataManager.getAreaById(id);
}

/**
 * Get areas in a specific district
 * @param {Number} districtId - District ID
 * @returns {Array} Array of area objects
 */
function getAreasByDistrict(districtId) {
  return dataManager.getAreasByDistrict(districtId);
}

/**
 * Search across all locations
 * @param {String} query - Search query
 * @param {Object} options - Search options
 * @returns {Object} Search results with divisions, districts, and areas
 */
function search(query, options) {
  return dataManager.search(query, options);
}

/**
 * Validate a complete address
 * @param {Number} divisionId - Division ID
 * @param {Number} districtId - District ID
 * @param {Number} areaId - Area ID
 * @returns {Object} Validation result with valid flag and data or error
 */
function validateAddress(divisionId, districtId, areaId) {
  return dataManager.validateAddress(divisionId, districtId, areaId);
}

/**
 * Get complete hierarchical structure
 * @returns {Object} Hierarchical structure of divisions, districts, and areas
 */
function getHierarchy() {
  return dataManager.getHierarchy();
}

/**
 * Export all data
 * @param {String} type - Type to export ('divisions', 'districts', 'areas', 'all')
 * @returns {Array|Object} Exported data
 */
function exportData(type = 'all') {
  return dataManager.export(type);
}

/**
 * Get statistics about the data
 * @returns {Object} Statistics object
 */
function getStatistics() {
  return dataManager.getStatistics();
}

/**
 * LocationKit class for advanced usage
 */
class LocationKit {
  constructor() {
    this.dataManager = dataManager;
  }

  getDivisions(options) {
    return this.dataManager.getDivisions(options);
  }

  getDivisionById(id) {
    return this.dataManager.getDivisionById(id);
  }

  getDistricts(options) {
    return this.dataManager.getDistricts(options);
  }

  getDistrictById(id) {
    return this.dataManager.getDistrictById(id);
  }

  getDistrictsByDivision(divisionId) {
    return this.dataManager.getDistrictsByDivision(divisionId);
  }

  getAreas(options) {
    return this.dataManager.getAreas(options);
  }

  getAreaById(id) {
    return this.dataManager.getAreaById(id);
  }

  getAreasByDistrict(districtId) {
    return this.dataManager.getAreasByDistrict(districtId);
  }

  search(query, options) {
    return this.dataManager.search(query, options);
  }

  validateAddress(divisionId, districtId, areaId) {
    return this.dataManager.validateAddress(divisionId, districtId, areaId);
  }

  getHierarchy() {
    return this.dataManager.getHierarchy();
  }

  export(type = 'all') {
    return this.dataManager.export(type);
  }

  getStatistics() {
    return this.dataManager.getStatistics();
  }
}

// Export functions and class
module.exports = {
  // Functions
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
  exportData,
  getStatistics,

  // Class
  LocationKit,

  // Data manager (for advanced usage)
  dataManager,
};
