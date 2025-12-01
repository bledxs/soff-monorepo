import { describe, it, expect } from 'vitest';
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from '../../src/locales/us';
import { es } from '../../src/i18n/es';

describe('US locale', () => {
  describe('getHolidays', () => {
    it('retorna 10 festivos federales', () => {
      const holidays = getHolidays(2025);
      expect(holidays).toHaveLength(10);
    });

    it('nombres en inglés por defecto', () => {
      const holidays = getHolidays(2025);
      const mlk = holidays.find((h) => h.key === 'mlkDay');
      expect(mlk?.name).toBe('Martin Luther King Jr. Day');
    });

    it('soporta español', () => {
      const holidays = getHolidays(2025, { lang: es });
      const mlk = holidays.find((h) => h.key === 'mlkDay');
      expect(mlk?.name).toBe('Día de Martin Luther King Jr.');
    });
  });

  describe('nthWeekday rules', () => {
    it('MLK Day 2025 = 3er lunes enero = 20 enero', () => {
      const holidays = getHolidays(2025);
      const mlk = holidays.find((h) => h.key === 'mlkDay');
      expect(mlk?.date).toBe('2025-01-20');
    });

    it('Presidents Day 2025 = 3er lunes febrero = 17 febrero', () => {
      const holidays = getHolidays(2025);
      const presidents = holidays.find((h) => h.key === 'presidentsDay');
      expect(presidents?.date).toBe('2025-02-17');
    });

    it('Memorial Day 2025 = último lunes mayo = 26 mayo', () => {
      const holidays = getHolidays(2025);
      const memorial = holidays.find((h) => h.key === 'memorialDay');
      expect(memorial?.date).toBe('2025-05-26');
    });

    it('Labor Day 2025 = 1er lunes septiembre = 1 septiembre', () => {
      const holidays = getHolidays(2025);
      const labor = holidays.find((h) => h.key === 'laborDay');
      expect(labor?.date).toBe('2025-09-01');
    });

    it('Columbus Day 2025 = 2do lunes octubre = 13 octubre', () => {
      const holidays = getHolidays(2025);
      const columbus = holidays.find((h) => h.key === 'columbusDay');
      expect(columbus?.date).toBe('2025-10-13');
    });

    it('Thanksgiving 2025 = 4to jueves noviembre = 27 noviembre', () => {
      const holidays = getHolidays(2025);
      const thanksgiving = holidays.find((h) => h.key === 'thanksgivingDay');
      expect(thanksgiving?.date).toBe('2025-11-27');
    });
  });

  describe('observedUS shifts', () => {
    // 4 julio 2026 = sábado → observed viernes 3
    it('Independence Day 2026 (sábado) → viernes 3', () => {
      const holidays = getHolidays(2026);
      const july4 = holidays.find((h) => h.key === 'independenceDayUS');
      expect(july4?.date).toBe('2026-07-03');
      expect(july4?.isShifted).toBe(true);
    });

    // 4 julio 2027 = domingo → observed lunes 5
    it('Independence Day 2027 (domingo) → lunes 5', () => {
      const holidays = getHolidays(2027);
      const july4 = holidays.find((h) => h.key === 'independenceDayUS');
      expect(july4?.date).toBe('2027-07-05');
      expect(july4?.isShifted).toBe(true);
    });

    // 4 julio 2025 = viernes → sin cambio
    it('Independence Day 2025 (viernes) → sin cambio', () => {
      const holidays = getHolidays(2025);
      const july4 = holidays.find((h) => h.key === 'independenceDayUS');
      expect(july4?.date).toBe('2025-07-04');
      expect(july4?.isShifted).toBeUndefined();
    });

    // Christmas 2027 = sábado → viernes 24
    it('Christmas 2027 (sábado) → viernes 24', () => {
      const holidays = getHolidays(2027);
      const christmas = holidays.find((h) => h.key === 'christmas');
      expect(christmas?.date).toBe('2027-12-24');
      expect(christmas?.isShifted).toBe(true);
    });

    // New Year 2028 = sábado → viernes 31 dic 2027
    it('New Year 2028 (sábado) → viernes 31 dic', () => {
      const holidays = getHolidays(2028);
      const newYear = holidays.find((h) => h.key === 'newYear');
      expect(newYear?.date).toBe('2027-12-31');
      expect(newYear?.isShifted).toBe(true);
    });
  });

  describe('isHoliday', () => {
    it('detecta Thanksgiving 2025', () => {
      const result = isHoliday(new Date('2025-11-27'));
      expect(result?.key).toBe('thanksgivingDay');
    });

    it('detecta observed shift', () => {
      // 4 julio 2026 cae sábado, observed = viernes 3
      const result = isHoliday(new Date('2026-07-03'));
      expect(result?.key).toBe('independenceDayUS');
      expect(result?.isShifted).toBe(true);
    });
  });

  describe('getNextHoliday', () => {
    it('encuentra el siguiente festivo', () => {
      const result = getNextHoliday(new Date('2025-01-02'));
      expect(result?.key).toBe('mlkDay');
    });
  });

  describe('businessDays', () => {
    it('isBusinessDay returns false for holidays', () => {
      expect(isBusinessDay(new Date('2025-07-04'))).toBe(false);
    });

    it('isBusinessDay returns false for weekends', () => {
      expect(isBusinessDay(new Date('2025-01-04'))).toBe(false);
    });

    it('isBusinessDay returns true for business days', () => {
      expect(isBusinessDay(new Date('2025-07-03'))).toBe(true);
    });

    it('businessDays skips holidays', () => {
      // July 3 (Thu) + 1 business day -> July 7 (Mon)
      // July 4 (Fri) Holiday
      // July 5 (Sat), 6 (Sun)
      const result = businessDays(new Date('2025-07-03'), 1);
      expect(result.toISOString().split('T')[0]).toBe('2025-07-07');
    });
  });
});
