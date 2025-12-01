import { describe, it, expect } from 'vitest';
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from '../../src/locales/mx';

describe('Mexico locale', () => {
  it('returns holidays for 2025', () => {
    const holidays = getHolidays(2025);
    // 1 Jan, 3 Feb, 17 Mar, 1 May, 16 Sep, 17 Nov, 25 Dec = 7 holidays
    expect(holidays).toHaveLength(7);
  });

  it('Constitution Day is first Monday of Feb', () => {
    const holidays = getHolidays(2025);
    const constitution = holidays.find((h) => h.key === 'constitutionDay');
    expect(constitution?.date).toBe('2025-02-03');
  });

  it('Benito Juarez is third Monday of Mar', () => {
    const holidays = getHolidays(2025);
    const benito = holidays.find((h) => h.key === 'benitoJuarez');
    expect(benito?.date).toBe('2025-03-17');
  });

  it('Revolution Day is third Monday of Nov', () => {
    const holidays = getHolidays(2025);
    const revolution = holidays.find((h) => h.key === 'revolutionDay');
    expect(revolution?.date).toBe('2025-11-17');
  });

  it('Transmission of Executive Power in 2024 (Oct 1)', () => {
    const holidays = getHolidays(2024);
    const transmission = holidays.find((h) => h.key === 'transmissionExecutive');
    expect(transmission?.date).toBe('2024-10-01');
  });

  it('Transmission of Executive Power in 2018 (Dec 1)', () => {
    const holidays = getHolidays(2018);
    const transmission = holidays.find((h) => h.key === 'transmissionExecutive');
    expect(transmission?.date).toBe('2018-12-01');
  });

  it('No Transmission of Executive Power in 2025', () => {
    const holidays = getHolidays(2025);
    const transmission = holidays.find((h) => h.key === 'transmissionExecutive');
    expect(transmission).toBeUndefined();
  });

  it('isHoliday detects holidays', () => {
    const result = isHoliday(new Date('2025-09-16')); // Independence Day
    expect(result?.key).toBe('independenceDay');
  });

  it('isHoliday returns null for non-holidays', () => {
    const result = isHoliday(new Date('2025-09-17'));
    expect(result).toBeNull();
  });

  it('getNextHoliday finds next holiday', () => {
    const result = getNextHoliday(new Date('2025-01-02'));
    expect(result?.key).toBe('constitutionDay');
  });

  describe('businessDays', () => {
    it('isBusinessDay returns false for holidays', () => {
      expect(isBusinessDay(new Date('2025-09-16'))).toBe(false);
    });

    it('isBusinessDay returns false for weekends', () => {
      expect(isBusinessDay(new Date('2025-01-04'))).toBe(false);
    });

    it('isBusinessDay returns true for business days', () => {
      expect(isBusinessDay(new Date('2025-09-17'))).toBe(true);
    });

    it('businessDays skips holidays', () => {
      // May 1 (Thu) Labor Day
      // April 30 (Wed) + 1 business day -> May 2 (Fri)
      const result = businessDays(new Date('2025-04-30'), 1);
      expect(result.toISOString().split('T')[0]).toBe('2025-05-02');
    });
  });
});
