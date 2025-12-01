import { describe, it, expect } from 'vitest';
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from '../../src/locales/ar';

describe('Argentina locale', () => {
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

  it('Guemes Day 2025 (Jun 17 Tue -> Mon 16)', () => {
    const holidays = getHolidays(2025);
    const guemes = holidays.find((h) => h.key === 'guemesDay');
    expect(guemes?.date).toBe('2025-06-16');
    expect(guemes?.isShifted).toBe(true);
  });

  it('San Martin 2025 (Aug 17 Sun -> Sun 17)', () => {
    const holidays = getHolidays(2025);
    const sanMartin = holidays.find((h) => h.key === 'sanMartinDay');
    expect(sanMartin?.date).toBe('2025-08-17');
    expect(sanMartin?.isShifted).toBeUndefined();
  });

  it('Sovereignty Day 2025 (Nov 20 Thu -> Mon 24)', () => {
    const holidays = getHolidays(2025);
    const sovereignty = holidays.find((h) => h.key === 'sovereigntyDay');
    expect(sovereignty?.date).toBe('2025-11-24');
    expect(sovereignty?.isShifted).toBe(true);
  });

  it('isHoliday detects holidays', () => {
    const result = isHoliday(new Date('2025-03-24')); // Memory Day
    expect(result?.key).toBe('memoryDay');
  });

  it('isHoliday returns null for non-holidays', () => {
    const result = isHoliday(new Date('2025-03-25'));
    expect(result).toBeNull();
  });

  it('getNextHoliday finds next holiday', () => {
    const result = getNextHoliday(new Date('2025-01-02'));
    expect(result?.key).toBe('carnivalMonday');
  });

  describe('businessDays', () => {
    it('isBusinessDay returns false for holidays', () => {
      expect(isBusinessDay(new Date('2025-03-24'))).toBe(false);
    });

    it('isBusinessDay returns false for weekends', () => {
      expect(isBusinessDay(new Date('2025-01-04'))).toBe(false);
    });

    it('isBusinessDay returns true for business days', () => {
      expect(isBusinessDay(new Date('2025-03-25'))).toBe(true);
    });

    it('businessDays skips holidays', () => {
      // March 21 (Fri) + 1 business day -> March 25 (Tue)
      // March 22 (Sat), 23 (Sun), 24 (Memory Day)
      const result = businessDays(new Date('2025-03-21'), 1);
      expect(result.toISOString().split('T')[0]).toBe('2025-03-25');
    });
  });
});
