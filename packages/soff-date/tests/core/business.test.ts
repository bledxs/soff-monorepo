import { describe, it, expect } from 'vitest';
import {
  checkIsBusinessDay,
  addBusinessDays,
  isWeekend,
  getBusinessDaysBetween,
  addBusinessHours,
  getBusinessHoursBetween,
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

    it('returns false for invalid dates', () => {
      expect(checkIsBusinessDay(mockDefinitions, new Date('invalid'))).toBe(false);
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

    it('returns an invalid date for invalid start dates', () => {
      const result = addBusinessDays(mockDefinitions, new Date('invalid'), 1);
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it('returns an invalid date for non-finite amounts', () => {
      const result = addBusinessDays(
        mockDefinitions,
        new Date('2025-01-06'),
        Number.POSITIVE_INFINITY,
      );
      expect(Number.isNaN(result.getTime())).toBe(true);
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

    it('returns NaN for invalid start dates', () => {
      const result = getBusinessDaysBetween(
        mockDefinitions,
        new Date('invalid'),
        new Date('2025-01-06'),
      );
      expect(Number.isNaN(result)).toBe(true);
    });

    it('returns NaN for invalid end dates', () => {
      const result = getBusinessDaysBetween(
        mockDefinitions,
        new Date('2025-01-06'),
        new Date('invalid'),
      );
      expect(Number.isNaN(result)).toBe(true);
    });
  });

  describe('Business Hours (SLA)', () => {
    describe('getBusinessHoursBetween', () => {
      it('calculates hours on the same business day', () => {
        // Thursday 2025-01-02, 10:00 to 14:00 -> 4 hours
        const start = new Date('2025-01-02T10:00:00Z');
        const end = new Date('2025-01-02T14:00:00Z');
        expect(getBusinessHoursBetween(mockDefinitions, start, end)).toBe(4);
      });

      it('caps hours to business hour boundaries', () => {
        // Thursday 2025-01-02, 06:00 to 19:00 -> 9 hours (08:00 to 17:00)
        const start = new Date('2025-01-02T06:00:00Z');
        const end = new Date('2025-01-02T19:00:00Z');
        expect(getBusinessHoursBetween(mockDefinitions, start, end)).toBe(9);
      });

      it('calculates hours across multiple days', () => {
        // Thu Jan 2 at 15:00 to Fri Jan 3 at 10:00
        // Thu: 15:00 to 17:00 = 2 hours
        // Fri: 08:00 to 10:00 = 2 hours
        // Total = 4 hours
        const start = new Date('2025-01-02T15:00:00Z');
        const end = new Date('2025-01-03T10:00:00Z');
        expect(getBusinessHoursBetween(mockDefinitions, start, end)).toBe(4);
      });

      it('skips weekends', () => {
        // Fri Jan 3 at 15:00 to Mon Jan 6 at 10:00
        // Fri: 15:00 to 17:00 = 2 hours
        // Sat/Sun = skipped
        // Mon: 08:00 to 10:00 = 2 hours
        // Total = 4 hours
        const start = new Date('2025-01-03T15:00:00Z');
        const end = new Date('2025-01-06T10:00:00Z');
        expect(getBusinessHoursBetween(mockDefinitions, start, end)).toBe(4);
      });

      it('skips holidays', () => {
        // Tue Dec 31 at 16:00 to Thu Jan 2 at 10:00 (Jan 1 is holiday)
        // Tue: 16:00 to 17:00 = 1 hour
        // Wed: skipped (holiday)
        // Thu: 08:00 to 10:00 = 2 hours
        // Total = 3 hours
        const start = new Date('2024-12-31T16:00:00Z');
        const end = new Date('2025-01-02T10:00:00Z');
        expect(getBusinessHoursBetween(mockDefinitions, start, end)).toBe(3);
      });

      it('returns negative if start > end', () => {
        const start = new Date('2025-01-03T10:00:00Z');
        const end = new Date('2025-01-02T15:00:00Z');
        expect(getBusinessHoursBetween(mockDefinitions, start, end)).toBe(-4);
      });
    });

    describe('addBusinessHours', () => {
      it('adds hours within the same day', () => {
        const start = new Date('2025-01-02T10:00:00Z');
        const result = addBusinessHours(mockDefinitions, start, 4);
        expect(result.toISOString()).toBe('2025-01-02T14:00:00.000Z');
      });

      it('rolls over to next day when hours exceed business day', () => {
        // Thu Jan 2 at 15:00 + 4 hours
        // 2 hours today (until 17:00) + 2 hours tomorrow (from 08:00)
        // -> Fri Jan 3 at 10:00
        const start = new Date('2025-01-02T15:00:00Z');
        const result = addBusinessHours(mockDefinitions, start, 4);
        expect(result.toISOString()).toBe('2025-01-03T10:00:00.000Z');
      });

      it('skips weekends when adding hours', () => {
        // Fri Jan 3 at 15:00 + 4 hours
        // 2 hours today (until 17:00) + 2 hours Mon (from 08:00)
        // -> Mon Jan 6 at 10:00
        const start = new Date('2025-01-03T15:00:00Z');
        const result = addBusinessHours(mockDefinitions, start, 4);
        expect(result.toISOString()).toBe('2025-01-06T10:00:00.000Z');
      });

      it('skips holidays when adding hours', () => {
        // Tue Dec 31 at 16:00 + 3 hours
        // 1 hour today (until 17:00) + Wed (skipped) + 2 hours Thu (from 08:00)
        // -> Thu Jan 2 at 10:00
        const start = new Date('2024-12-31T16:00:00Z');
        const result = addBusinessHours(mockDefinitions, start, 3);
        expect(result.toISOString()).toBe('2025-01-02T10:00:00.000Z');
      });

      it('subtracts hours correctly', () => {
        // Fri Jan 3 at 10:00 - 4 hours
        // 2 hours today (back to 08:00) + 2 hours Thu (back from 17:00)
        // -> Thu Jan 2 at 15:00
        const start = new Date('2025-01-03T10:00:00Z');
        const result = addBusinessHours(mockDefinitions, start, -4);
        expect(result.toISOString()).toBe('2025-01-02T15:00:00.000Z');
      });

      it('snaps a date outside business hours into business hours (adding)', () => {
        // Sun Jan 5 at 12:00 + 1 hour -> Mon Jan 6 at 09:00
        const start = new Date('2025-01-05T12:00:00Z');
        const result = addBusinessHours(mockDefinitions, start, 1);
        expect(result.toISOString()).toBe('2025-01-06T09:00:00.000Z');
      });
    });
  });
});
