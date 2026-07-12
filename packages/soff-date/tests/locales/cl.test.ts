import { describe, it, expect } from 'vitest';
import { getHolidays, isHoliday, isBusinessDay } from '../../src/locales/cl';

describe('Chile Holidays (cl)', () => {
  it('returns fixed holidays', () => {
    const holidays = getHolidays(2025);
    expect(holidays.some((h) => h.key === 'independenceDay' && h.date === '2025-09-18')).toBe(true);
    expect(holidays.some((h) => h.key === 'armyDay' && h.date === '2025-09-19')).toBe(true);
  });

  it('detects business days correctly', () => {
    // 2025-09-18 is a holiday
    expect(isBusinessDay(new Date('2025-09-18'))).toBe(false);
    // 2025-09-20 is Saturday
    expect(isBusinessDay(new Date('2025-09-20'))).toBe(false);
    // 2025-09-22 is Monday, regular day
    expect(isBusinessDay(new Date('2025-09-22'))).toBe(true);
  });

  it('translates to spanish by default', () => {
    const holiday = isHoliday(new Date('2025-09-18'));
    expect(holiday?.name).toBe('Día de la Independencia');
  });
});
