import {
  searchByNameOrCode,
  findDepartmentByCode,
  findMunicipalityByCode,
  getMunicipalitiesByDepartment,
} from '../core/utils.js';
import type { SearchOptions, SearchResult } from '../core/types.js';
import { DEPARTMENTS, type ArgentineProvince } from './ar/departments.js';
import { MUNICIPALITIES, type ArgentineMunicipality } from './ar/municipalities.js';

export type { ArgentineProvince, ArgentineMunicipality };

export function getProvinces(): readonly ArgentineProvince[] {
  return DEPARTMENTS;
}

export function getMunicipalities(): readonly ArgentineMunicipality[] {
  return MUNICIPALITIES;
}

export function getProvince(code: string): ArgentineProvince | undefined {
  return findDepartmentByCode(DEPARTMENTS, code);
}

export function getMunicipality(code: string): ArgentineMunicipality | undefined {
  return findMunicipalityByCode(MUNICIPALITIES, code);
}

export function getProvinceMunicipalities(provinceCode: string): ArgentineMunicipality[] {
  return getMunicipalitiesByDepartment(MUNICIPALITIES, provinceCode);
}

export function searchProvinces(
  query: string,
  options?: SearchOptions
): SearchResult<ArgentineProvince>[] {
  return searchByNameOrCode(DEPARTMENTS, query, options);
}

export function searchMunicipalities(
  query: string,
  options?: SearchOptions
): SearchResult<ArgentineMunicipality>[] {
  return searchByNameOrCode(MUNICIPALITIES, query, options);
}

// Argentina doesn't have a strict numbered code system for validation like DANE (Colombia),
// but we can validate against our known codes.
export function validateProvinceCode(code: string): boolean {
  return DEPARTMENTS.some((d) => d.code === code);
}
