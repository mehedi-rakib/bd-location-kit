/**
 * TypeScript Type Definitions for BD Location Kit
 */

/**
 * Division object structure
 */
export interface Division {
  id: number;
  country_id: number | null;
  division_name: string;
  bn_name: string;
  url: string;
  status: number;
  updated_by: number | null;
  created_by: number | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

/**
 * District object structure
 */
export interface District {
  id: number;
  division_id: number;
  name: string;
  bn_name: string;
  url?: string;
  status: number;
  updated_by: number | null;
  created_by: number | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

/**
 * Area object structure
 */
export interface Area {
  id: number;
  district_id: number;
  name: string;
  bn_name: string;
  url?: string;
  status: number;
  updated_by: number | null;
  created_by: number | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  zone_id: number | null;
  old_area_status: number;
}

/**
 * Filter options for divisions
 */
export interface DivisionFilterOptions {
  status?: number;
  search?: string;
}

/**
 * Filter options for districts
 */
export interface DistrictFilterOptions {
  division_id?: number;
  status?: number;
  search?: string;
}

/**
 * Filter options for areas
 */
export interface AreaFilterOptions {
  district_id?: number;
  zone_id?: number;
  status?: number;
  search?: string;
}

/**
 * Address validation result
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  data?: {
    division: Division;
    district: District;
    area: Area;
  };
}

/**
 * Search results
 */
export interface SearchResults {
  divisions: Division[];
  districts: District[];
  areas: Area[];
}

/**
 * Statistics object
 */
export interface Statistics {
  total_divisions: number;
  total_districts: number;
  total_areas: number;
  total_locations: number;
}

/**
 * Hierarchical structure
 */
export interface HierarchyNode {
  [key: number]: Division & {
    districts: (District & {
      areas: Area[];
    })[];
  };
}

/**
 * Export data result
 */
export type ExportData = Division[] | District[] | Area[] | {
  divisions: Division[];
  districts: District[];
  areas: Area[];
};

// Function declarations

/**
 * Get all divisions
 */
export function getDivisions(options?: DivisionFilterOptions): Division[];

/**
 * Get division by ID
 */
export function getDivisionById(id: number): Division | null;

/**
 * Get all districts
 */
export function getDistricts(options?: DistrictFilterOptions): District[];

/**
 * Get district by ID
 */
export function getDistrictById(id: number): District | null;

/**
 * Get districts in a division
 */
export function getDistrictsByDivision(divisionId: number): District[];

/**
 * Get all areas
 */
export function getAreas(options?: AreaFilterOptions): Area[];

/**
 * Get area by ID
 */
export function getAreaById(id: number): Area | null;

/**
 * Get areas in a district
 */
export function getAreasByDistrict(districtId: number): Area[];

/**
 * Search locations
 */
export function search(query: string, options?: object): SearchResults;

/**
 * Validate an address
 */
export function validateAddress(
  divisionId: number,
  districtId: number,
  areaId: number
): ValidationResult;

/**
 * Get hierarchical structure
 */
export function getHierarchy(): HierarchyNode;

/**
 * Export data
 */
export function exportData(type?: 'divisions' | 'districts' | 'areas' | 'all'): ExportData;

/**
 * Get statistics
 */
export function getStatistics(): Statistics;

/**
 * LocationKit class
 */
export class LocationKit {
  constructor();

  getDivisions(options?: DivisionFilterOptions): Division[];
  getDivisionById(id: number): Division | null;
  getDistricts(options?: DistrictFilterOptions): District[];
  getDistrictById(id: number): District | null;
  getDistrictsByDivision(divisionId: number): District[];
  getAreas(options?: AreaFilterOptions): Area[];
  getAreaById(id: number): Area | null;
  getAreasByDistrict(districtId: number): Area[];
  search(query: string, options?: object): SearchResults;
  validateAddress(divisionId: number, districtId: number, areaId: number): ValidationResult;
  getHierarchy(): HierarchyNode;
  export(type?: 'divisions' | 'districts' | 'areas' | 'all'): ExportData;
  getStatistics(): Statistics;
}
