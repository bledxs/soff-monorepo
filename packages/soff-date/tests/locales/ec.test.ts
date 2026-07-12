import { describe, it, expect } from 'vitest';
import { getHolidays, isHoliday } from '../../src/locales/ec';

describe('Ecuador Holidays (ec)', () => {
  it('returns fixed holidays', () => {
    const holidays = getHolidays(2025);
    expect(holidays.some((h) => h.key === 'firstCryOfIndependence')).toBe(true);
    expect(holidays.some((h) => h.key === 'independenceOfGuayaquil')).toBe(true);
    expect(holidays.some((h) => h.key === 'independenceOfCuenca')).toBe(true);
  });

  it('calculates carnival correctly', () => {
    const holidays = getHolidays(2025);
    // Easter 2025 is April 20. Carnival is Mon/Tue before Ash Wednesday.
    // Easter - 48 and -47 days.
    // 48 days before April 20 is March 3.
    expect(holidays.some((h) => h.key === 'carnivalMonday' && h.date === '2025-03-03')).toBe(true);
    expect(holidays.some((h) => h.key === 'carnivalTuesday' && h.date === '2025-03-04')).toBe(true);
  });

  it('translates to spanish by default', () => {
    const holiday = isHoliday(new Date('2025-11-03'));
    expect(holiday?.name).toBe('Independencia de Cuenca');
  });
});
