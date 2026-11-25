/**
 * Data loader for BD Location Kit
 * Loads and manages divisions, districts, and areas data
 */

const divisionsData = require('../data/divisions.json');
const districtsData = require('../data/districts.json');
const areasData = require('../data/areas.json');

class DataManager {
  constructor() {
    this.divisions = divisionsData.divisions;
    this.districts = districtsData.districts;
    this.areas = areasData.areas;

    // Build lookup maps for faster access
    this.divisionMap = new Map(this.divisions.map((d) => [d.id, d]));
    this.districtMap = new Map(this.districts.map((d) => [d.id, d]));
    this.areaMap = new Map(this.areas.map((a) => [a.id, a]));
  }

  /**
   * Get all divisions
   * @param {Object} options - Filter options
   * @returns {Array} Array of divisions
   */
  getDivisions(options = {}) {
    let result = [...this.divisions];

    if (options.status !== undefined) {
      result = result.filter((d) => d.status === options.status);
    }

    if (options.search) {
      const search = options.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.division_name.toLowerCase().includes(search) ||
          d.bn_name.includes(options.search)
      );
    }

    return result;
  }

  /**
   * Get division by ID
   * @param {Number} id - Division ID
   * @returns {Object|null} Division object or null
   */
  getDivisionById(id) {
    return this.divisionMap.get(id) || null;
  }

  /**
   * Get all districts
   * @param {Object} options - Filter options
   * @returns {Array} Array of districts
   */
  getDistricts(options = {}) {
    let result = [...this.districts];

    if (options.division_id !== undefined) {
      result = result.filter((d) => d.division_id === options.division_id);
    }

    if (options.status !== undefined) {
      result = result.filter((d) => d.status === options.status);
    }

    if (options.search) {
      const search = options.search.toLowerCase();
      result = result.filter(
        (d) => {
          const name = d.name || d.district_name || '';
          return (
            name.toLowerCase().includes(search) ||
            d.bn_name.includes(options.search)
          );
        }
      );
    }

    return result;
  }

  /**
   * Get district by ID
   * @param {Number} id - District ID
   * @returns {Object|null} District object or null
   */
  getDistrictById(id) {
    return this.districtMap.get(id) || null;
  }

  /**
   * Get districts in a division
   * @param {Number} divisionId - Division ID
   * @returns {Array} Array of districts
   */
  getDistrictsByDivision(divisionId) {
    return this.districts.filter((d) => d.division_id === divisionId);
  }

  /**
   * Get all areas
   * @param {Object} options - Filter options
   * @returns {Array} Array of areas
   */
  getAreas(options = {}) {
    let result = [...this.areas];

    if (options.district_id !== undefined) {
      result = result.filter((a) => a.district_id === options.district_id);
    }

    if (options.zone_id !== undefined) {
      result = result.filter((a) => a.zone_id === options.zone_id);
    }

    if (options.status !== undefined) {
      result = result.filter((a) => a.status === options.status);
    }

    if (options.search) {
      const search = options.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(search) ||
          a.bn_name.includes(options.search)
      );
    }

    return result;
  }

  /**
   * Get area by ID
   * @param {Number} id - Area ID
   * @returns {Object|null} Area object or null
   */
  getAreaById(id) {
    return this.areaMap.get(id) || null;
  }

  /**
   * Get areas in a district
   * @param {Number} districtId - District ID
   * @returns {Array} Array of areas
   */
  getAreasByDistrict(districtId) {
    return this.areas.filter((a) => a.district_id === districtId);
  }

  /**
   * Get complete hierarchy: divisions with their districts and areas
   * @returns {Object} Hierarchical structure
   */
  getHierarchy() {
    const hierarchy = {};

    this.divisions.forEach((division) => {
      hierarchy[division.id] = {
        ...division,
        districts: this.getDistrictsByDivision(division.id).map((district) => ({
          ...district,
          areas: this.getAreasByDistrict(district.id),
        })),
      };
    });

    return hierarchy;
  }

  /**
   * Validate a complete address
   * @param {Number} divisionId - Division ID
   * @param {Number} districtId - District ID
   * @param {Number} areaId - Area ID
   * @returns {Object} Validation result
   */
  validateAddress(divisionId, districtId, areaId) {
    const division = this.getDivisionById(divisionId);
    if (!division) {
      return { valid: false, error: 'Invalid division' };
    }

    const district = this.getDistrictById(districtId);
    if (!district || district.division_id !== divisionId) {
      return { valid: false, error: 'Invalid district for this division' };
    }

    const area = this.getAreaById(areaId);
    if (!area || area.district_id !== districtId) {
      return { valid: false, error: 'Invalid area for this district' };
    }

    return { valid: true, data: { division, district, area } };
  }

  /**
   * Search across all locations
   * @param {String} query - Search query
   * @param {Object} options - Search options
   * @returns {Object} Search results
   */
  search(query, options = {}) {
    const q = query.toLowerCase();
    return {
      divisions: this.getDivisions({ search: query }),
      districts: this.getDistricts({ search: query }),
      areas: this.getAreas({ search: query }),
    };
  }

  /**
   * Export data as array
   * @param {String} type - 'divisions', 'districts', or 'areas'
   * @returns {Array} Data array
   */
  export(type = 'all') {
    switch (type) {
      case 'divisions':
        return this.divisions;
      case 'districts':
        return this.districts;
      case 'areas':
        return this.areas;
      case 'all':
      default:
        return {
          divisions: this.divisions,
          districts: this.districts,
          areas: this.areas,
        };
    }
  }

  /**
   * Get statistics
   * @returns {Object} Statistics
   */
  getStatistics() {
    return {
      total_divisions: this.divisions.length,
      total_districts: this.districts.length,
      total_areas: this.areas.length,
      total_locations: this.divisions.length + this.districts.length + this.areas.length,
    };
  }
}

// Create singleton instance
const dataManager = new DataManager();

module.exports = dataManager;
