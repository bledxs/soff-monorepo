import type { SearchOptions, SearchResult, Department, Municipality } from './types.js';

/**
 * Normalize a string for search (lowercase, remove diacritics)
 */
export function normalizeString(str: string, options: SearchOptions = {}): string {
  const { ignoreCase = true, ignoreDiacritics = true } = options;

  let result = str;

  if (ignoreCase) {
    result = result.toLowerCase();
  }

  if (ignoreDiacritics) {
    result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  return result;
}

/**
 * Calculate match score between query and target string
 * Returns a score between 0 and 1
 */
export function calculateMatchScore(
  query: string,
  target: string,
  options: SearchOptions = {}
): number {
  const { partial = true } = options;

  const normalizedQuery = normalizeString(query, options);
  const normalizedTarget = normalizeString(target, options);

  // Exact match
  if (normalizedQuery === normalizedTarget) {
    return 1;
  }

  // Starts with query (high score)
  if (normalizedTarget.startsWith(normalizedQuery)) {
    return 0.9;
  }

  // Contains query (if partial matching enabled)
  if (partial && normalizedTarget.includes(normalizedQuery)) {
    // Score based on position and length ratio
    const position = normalizedTarget.indexOf(normalizedQuery);
    const lengthRatio = normalizedQuery.length / normalizedTarget.length;
    return 0.5 + lengthRatio * 0.3 - position * 0.01;
  }

  return 0;
}

/**
 * Search through a list of items by name or code
 */
export function searchByNameOrCode<T extends { code: string; name: string }>(
  items: readonly T[],
  query: string,
  options: SearchOptions = {}
): SearchResult<T>[] {
  const { limit } = options;

  const results: SearchResult<T>[] = [];

  for (const item of items) {
    // Check code match (exact or starts with)
    const codeScore = item.code.startsWith(query) ? (item.code === query ? 1 : 0.95) : 0;

    // Check name match
    const nameScore = calculateMatchScore(query, item.name, options);

    const score = Math.max(codeScore, nameScore);

    if (score > 0) {
      results.push({ item, score });
    }
  }

  // Sort by score (descending)
  results.sort((a, b) => b.score - a.score);

  // Apply limit if specified
  if (limit && limit > 0) {
    return results.slice(0, limit);
  }

  return results;
}

/**
 * Find a department by exact code
 */
export function findDepartmentByCode<T extends Department>(
  departments: readonly T[],
  code: string
): T | undefined {
  return departments.find((d) => d.code === code);
}

/**
 * Find a municipality by exact code
 */
export function findMunicipalityByCode<T extends Municipality>(
  municipalities: readonly T[],
  code: string
): T | undefined {
  return municipalities.find((m) => m.code === code);
}

/**
 * Get all municipalities for a given department code
 */
export function getMunicipalitiesByDepartment<T extends Municipality>(
  municipalities: readonly T[],
  departmentCode: string
): T[] {
  return municipalities.filter((m) => m.departmentCode === departmentCode);
}

/**
 * Validate a department code format (basic validation)
 */
export function isValidDepartmentCode(code: string, expectedLength: number): boolean {
  return typeof code === 'string' && code.length === expectedLength && /^\d+$/.test(code);
}

/**
 * Validate a municipality code format (basic validation)
 */
export function isValidMunicipalityCode(code: string, expectedLength: number): boolean {
  return typeof code === 'string' && code.length === expectedLength && /^\d+$/.test(code);
}

/**
 * Parse a municipality code to extract department code
 */
export function extractDepartmentCode(
  municipalityCode: string,
  departmentCodeLength: number
): string {
  return municipalityCode.slice(0, departmentCodeLength);
}

/**
 * Unpack compressed municipality data into an array of municipality objects
 */
export function unpackMunicipalities<
  T extends Municipality & { code: string; departmentCode: string },
>(packedData: Record<string, string>): T[] {
  const result: T[] = [];
  for (const deptCode in packedData) {
    const packed = packedData[deptCode];
    const items = packed.split('|');
    for (const item of items) {
      const separatorIndex = item.indexOf(':');
      const suffix = item.substring(0, separatorIndex);
      const name = item.substring(separatorIndex + 1);

      result.push({
        code: deptCode + suffix,
        departmentCode: deptCode,
        name,
      } as unknown as T);
    }
  }
  return result;
}
