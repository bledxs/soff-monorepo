import { describe, it, expect } from 'vitest';
import { checkIsHoliday, resolveHolidays, findNextHoliday } from '../../src/core/engine';
import type { HolidayDefinition } from '../../src/core/types';

describe('Robustness', () => {
  const definitions: HolidayDefinition[] = []; // Empty definitions for basic checks

  it('checkIsHoliday should return null for Invalid Date', () => {
    const invalidDate = new Date('invalid');
    expect(checkIsHoliday(definitions, invalidDate)).toBeNull();
  });

  it('findNextHoliday should return null for Invalid Date', () => {
    const invalidDate = new Date('invalid');
    expect(findNextHoliday(definitions, invalidDate)).toBeNull();
  });

  it('resolveHolidays should handle invalid year gracefully', () => {
    // If year is NaN, it should probably return empty array or not crash
    expect(resolveHolidays(definitions, Number.NaN)).toEqual([]);
  });
});
