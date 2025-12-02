import { describe, it, expect } from 'vitest';
import {
  checkIsBusinessDay,
  addBusinessDays,
  isWeekend,
  getBusinessDaysBetween,
} from '../../src/core/business';
import type { HolidayDefinition } from '../../src/core/types';

// Mock definitions: Only Jan 1st is a holiday
const mockDefinitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
];

describe('Business Days Logic', () => {
  describe('isWeekend', () => {
    it('detects Saturday', () => {
      // 2025-01-04 is Saturday
      expect(isWeekend(new Date('2025-01-04'))).toBe(true);
    });

    it('detects Sunday', () => {
      // 2025-01-05 is Sunday
      expect(isWeekend(new Date('2025-01-05'))).toBe(true);
    });

    it('detects Monday', () => {
      // 2025-01-06 is Monday
      expect(isWeekend(new Date('2025-01-06'))).toBe(false);
    });
  });

  describe('checkIsBusinessDay', () => {
    it('returns false for weekends', () => {
      // Saturday
      expect(checkIsBusinessDay(mockDefinitions, new Date('2025-01-04'))).toBe(false);
    });

    it('returns false for holidays', () => {
      // Jan 1st 2025 is Wednesday (Weekday but Holiday)
      expect(checkIsBusinessDay(mockDefinitions, new Date('2025-01-01'))).toBe(false);
    });

    it('returns true for regular weekday', () => {
      // Jan 2nd 2025 is Thursday
      expect(checkIsBusinessDay(mockDefinitions, new Date('2025-01-02'))).toBe(true);
    });
  });

  describe('addBusinessDays', () => {
    it('adds days skipping weekends', () => {
      // Friday Jan 3rd + 1 business day -> Monday Jan 6th
      const start = new Date('2025-01-03');
      const result = addBusinessDays(mockDefinitions, start, 1);
      expect(result.toISOString().split('T')[0]).toBe('2025-01-06');
    });

    it('adds days skipping holidays', () => {
      // Tuesday Dec 31st 2024 + 1 business day -> Thursday Jan 2nd 2025 (Jan 1 is holiday)
      const start = new Date('2024-12-31');
      const result = addBusinessDays(mockDefinitions, start, 1);
      expect(result.toISOString().split('T')[0]).toBe('2025-01-02');
    });

    it('adds days skipping both weekends and holidays', () => {
      // Friday Dec 27th + 3 business days
      // +1 -> Mon Dec 30
      // +2 -> Tue Dec 31
      // (Wed Jan 1 is Holiday)
      // +3 -> Thu Jan 2
      const start = new Date('2024-12-27');
      const result = addBusinessDays(mockDefinitions, start, 3);
      expect(result.toISOString().split('T')[0]).toBe('2025-01-02');
    });

    it('subtracts days', () => {
      // Monday Jan 6th - 1 business day -> Friday Jan 3rd
      const start = new Date('2025-01-06');
      const result = addBusinessDays(mockDefinitions, start, -1);
      expect(result.toISOString().split('T')[0]).toBe('2025-01-03');
    });
  });

  describe('getBusinessDaysBetween', () => {
    it('calculates diff within same week', () => {
      // Mon Jan 6 to Fri Jan 10 -> 4 days (Tue, Wed, Thu, Fri)
      const start = new Date('2025-01-06');
      const end = new Date('2025-01-10');
      expect(getBusinessDaysBetween(mockDefinitions, start, end)).toBe(4);
    });

    it('calculates diff across weekend', () => {
      // Fri Jan 3 to Mon Jan 6 -> 1 day
      const start = new Date('2025-01-03');
      const end = new Date('2025-01-06');
      expect(getBusinessDaysBetween(mockDefinitions, start, end)).toBe(1);
    });

    it('calculates diff across holiday', () => {
      // Tue Dec 31 to Thu Jan 2 -> 1 day (Jan 1 is holiday)
      const start = new Date('2024-12-31');
      const end = new Date('2025-01-02');
      expect(getBusinessDaysBetween(mockDefinitions, start, end)).toBe(1);
    });

    it('returns negative if end is before start', () => {
      // Mon Jan 6 to Fri Jan 3 -> -1 day
      const start = new Date('2025-01-06');
      const end = new Date('2025-01-03');
      expect(getBusinessDaysBetween(mockDefinitions, start, end)).toBe(-1);
    });

    it('returns 0 for same day', () => {
      const start = new Date('2025-01-06');
      expect(getBusinessDaysBetween(mockDefinitions, start, start)).toBe(0);
    });
  });
});
