import { describe, it, expect } from 'vitest';
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from '../../src/locales/br';

describe('Brazil locale', () => {
  it('returns holidays for 2025', () => {
    const holidays = getHolidays(2025);
    expect(holidays.length).toBeGreaterThan(10);
  });

  it('Carnival 2025', () => {
    const holidays = getHolidays(2025);
    const mon = holidays.find((h) => h.key === 'carnivalMonday');
    const tue = holidays.find((h) => h.key === 'carnivalTuesday');
    expect(mon?.date).toBe('2025-03-03');
    expect(tue?.date).toBe('2025-03-04');
  });

  it('Corpus Christi 2025', () => {
    const holidays = getHolidays(2025);
    const corpus = holidays.find((h) => h.key === 'corpusChristi');
    expect(corpus?.date).toBe('2025-06-19');
  });

  it('Black Consciousness Day 2025', () => {
    const holidays = getHolidays(2025);
    const black = holidays.find((h) => h.key === 'blackConsciousness');
    expect(black?.date).toBe('2025-11-20');
  });

  it('isHoliday detects holidays', () => {
    const result = isHoliday(new Date('2025-09-07')); // Independence Day
    expect(result?.key).toBe('independenceDay');
  });

  it('isHoliday returns null for non-holidays', () => {
    const result = isHoliday(new Date('2025-09-08'));
    expect(result).toBeNull();
  });

  it('getNextHoliday finds next holiday', () => {
    const result = getNextHoliday(new Date('2025-01-02'));
    expect(result?.key).toBe('carnivalMonday');
  });

  describe('businessDays', () => {
    it('isBusinessDay returns false for holidays', () => {
      expect(isBusinessDay(new Date('2025-09-07'))).toBe(false);
    });

    it('isBusinessDay returns false for weekends', () => {
      expect(isBusinessDay(new Date('2025-01-04'))).toBe(false);
    });

    it('isBusinessDay returns true for business days', () => {
      expect(isBusinessDay(new Date('2025-09-08'))).toBe(true);
    });

    it('businessDays skips holidays', () => {
      // April 18 (Fri) Good Friday
      // April 21 (Mon) Tiradentes
      // April 17 (Thu) + 2 business days -> April 23 (Wed)
      const result = businessDays(new Date('2025-04-17'), 2);
      expect(result.toISOString().split('T')[0]).toBe('2025-04-23');
    });
  });
});
