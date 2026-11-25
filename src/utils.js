/**
 * Utility functions for BD Location Kit
 */

/**
 * Format a location object for display
 * @param {Object} location - Division, district, or area object
 * @param {String} lang - Language: 'en' or 'bn'
 * @returns {String} Formatted name
 */
function formatLocationName(location, lang = 'en') {
  if (!location) return '';

  if (lang === 'bn') {
    return location.bn_name || location.division_name || location.district_name || location.name || '';
  }

  return location.division_name || location.name || location.district_name || '';
}

/**
 * Build a complete address string
 * @param {Object} division - Division object
 * @param {Object} district - District object
 * @param {Object} area - Area object
 * @param {String} lang - Language: 'en' or 'bn'
 * @returns {String} Complete address
 */
function buildAddressString(division, district, area, lang = 'en') {
  if (!division || !district || !area) return '';

  const sep = lang === 'bn' ? '، ' : ', ';
  const divName = formatLocationName(division, lang);
  const distName = formatLocationName(district, lang);
  const areaName = formatLocationName(area, lang);

  return `${areaName}${sep}${distName}${sep}${divName}`;
}

/**
 * Check if a location is active
 * @param {Object} location - Location object
 * @returns {Boolean} True if location is active
 */
function isActive(location) {
  return location && location.status === 1;
}

/**
 * Get readable status
 * @param {Number} status - Status code
 * @param {String} lang - Language: 'en' or 'bn'
 * @returns {String} Readable status
 */
function getStatusText(status, lang = 'en') {
  if (lang === 'bn') {
    return status === 1 ? 'সক্রিয়' : 'নিষ্ক্রিয়';
  }
  return status === 1 ? 'Active' : 'Inactive';
}

/**
 * Normalize search query
 * @param {String} query - Search query
 * @returns {String} Normalized query
 */
function normalizeSearchQuery(query) {
  return query ? query.toLowerCase().trim() : '';
}

/**
 * Map Bengali numbers to English
 * @param {String} str - String with Bengali numbers
 * @returns {String} String with English numbers
 */
function bengaliToEnglishNumbers(str) {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(bengaliDigits[i], 'g'), englishDigits[i]);
  }
  return result;
}

/**
 * Map English numbers to Bengali
 * @param {String} str - String with English numbers
 * @returns {String} String with Bengali numbers
 */
function englishTobengaliNumbers(str) {
  const bengaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(englishDigits[i], 'g'), bengaliDigits[i]);
  }
  return result;
}

/**
 * Calculate edit distance for fuzzy search
 * @param {String} s1 - First string
 * @param {String} s2 - Second string
 * @returns {Number} Edit distance
 */
function levenshteinDistance(s1, s2) {
  const a = s1.toLowerCase();
  const b = s2.toLowerCase();

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Fuzzy search with similarity score
 * @param {String} query - Search query
 * @param {String} target - Target string
 * @param {Number} threshold - Similarity threshold (0-1)
 * @returns {Boolean} True if match found
 */
function fuzzyMatch(query, target, threshold = 0.7) {
  if (!query || !target) return false;

  const distance = levenshteinDistance(query, target);
  const maxLength = Math.max(query.length, target.length);
  const similarity = 1 - distance / maxLength;

  return similarity >= threshold;
}

/**
 * Sort locations by name
 * @param {Array} locations - Array of locations
 * @param {String} lang - Language: 'en' or 'bn'
 * @returns {Array} Sorted array
 */
function sortLocationsByName(locations, lang = 'en') {
  return [...locations].sort((a, b) => {
    const nameA = formatLocationName(a, lang).toLowerCase();
    const nameB = formatLocationName(b, lang).toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

/**
 * Group locations by property
 * @param {Array} locations - Array of locations
 * @param {String} property - Property to group by
 * @returns {Object} Grouped locations
 */
function groupLocationsByProperty(locations, property) {
  return locations.reduce((acc, location) => {
    const key = location[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(location);
    return acc;
  }, {});
}

module.exports = {
  formatLocationName,
  buildAddressString,
  isActive,
  getStatusText,
  normalizeSearchQuery,
  bengaliToEnglishNumbers,
  englishTobengaliNumbers,
  levenshteinDistance,
  fuzzyMatch,
  sortLocationsByName,
  groupLocationsByProperty,
};
