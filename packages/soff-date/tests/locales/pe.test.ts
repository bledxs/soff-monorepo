import { describe, it, expect } from 'vitest';
import { getHolidays, isHoliday, isBusinessDay } from '../../src/locales/pe';

describe('Peru Holidays (pe)', () => {
  it('returns fixed holidays', () => {
    const holidays = getHolidays(2025);
    expect(holidays.some((h) => h.key === 'independenceDay1' && h.date === '2025-07-28')).toBe(
      true,
    );
    expect(holidays.some((h) => h.key === 'santaRosaDeLima' && h.date === '2025-08-30')).toBe(true);
    expect(holidays.some((h) => h.key === 'battleOfAngamos' && h.date === '2025-10-08')).toBe(true);
  });

  it('detects business days correctly', () => {
    // 2025-07-28 is a holiday
    expect(isBusinessDay(new Date('2025-07-28'))).toBe(false);
    // 2025-07-27 is Sunday
    expect(isBusinessDay(new Date('2025-07-27'))).toBe(false);
    // 2025-07-25 is Friday, regular day
    expect(isBusinessDay(new Date('2025-07-25'))).toBe(true);
  });

  it('translates to spanish by default', () => {
    const holiday = isHoliday(new Date('2025-07-28'));
    expect(holiday?.name).toBe('Día de la Independencia');
  });
});
