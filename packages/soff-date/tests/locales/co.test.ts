import { describe, it, expect } from 'vitest';
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from '../../src/locales/co';
import { en } from '../../src/i18n/en';

describe('Colombia locale', () => {
  describe('getHolidays', () => {
    it('retorna 18 festivos para 2025', () => {
      const holidays = getHolidays(2025);
      expect(holidays).toHaveLength(18);
    });

    it('primer festivo es Año Nuevo', () => {
      const [first] = getHolidays(2025);
      expect(first).toMatchObject({
        date: '2025-01-01',
        key: 'newYear',
        name: 'Año Nuevo',
      });
    });

    it('último festivo es Navidad', () => {
      const holidays = getHolidays(2025);
      const last = holidays[holidays.length - 1];
      expect(last).toMatchObject({
        date: '2025-12-25',
        key: 'christmas',
      });
    });

    it('soporta idioma inglés', () => {
      const holidays = getHolidays(2025, { lang: en });
      const newYear = holidays.find((h) => h.key === 'newYear');
      expect(newYear?.name).toBe("New Year's Day");
    });
  });

  describe('Ley Emiliani', () => {
    it('Reyes Magos 2025 no se traslada (cae lunes)', () => {
      const holidays = getHolidays(2025);
      const epiphany = holidays.find((h) => h.key === 'epiphany');
      expect(epiphany?.date).toBe('2025-01-06');
      expect(epiphany?.isShifted).toBeUndefined();
    });

    it('San José 2025 se traslada (cae miércoles → lunes 24)', () => {
      const holidays = getHolidays(2025);
      const saintJoseph = holidays.find((h) => h.key === 'saintJoseph');
      // 19 marzo 2025 = miércoles, se traslada al lunes 24
      expect(saintJoseph?.date).toBe('2025-03-24');
      expect(saintJoseph?.isShifted).toBe(true);
    });

    it('Ascensión 2025 se traslada (cae jueves → lunes)', () => {
      const holidays = getHolidays(2025);
      const ascension = holidays.find((h) => h.key === 'ascension');
      // Pascua 2025 = 20 abril
      // Ascensión real = Jueves 29 mayo
      // Traslado = Lunes 2 junio
      expect(ascension?.date).toBe('2025-06-02');
      expect(ascension?.isShifted).toBe(true);
    });
  });

  describe('Semana Santa 2025', () => {
    it('Jueves Santo = 17 abril', () => {
      const holidays = getHolidays(2025);
      const holyThursday = holidays.find((h) => h.key === 'holyThursday');
      expect(holyThursday?.date).toBe('2025-04-17');
    });

    it('Viernes Santo = 18 abril', () => {
      const holidays = getHolidays(2025);
      const goodFriday = holidays.find((h) => h.key === 'goodFriday');
      expect(goodFriday?.date).toBe('2025-04-18');
    });
  });

  describe('isHoliday', () => {
    it('detecta festivo', () => {
      const result = isHoliday(new Date('2025-01-01'));
      expect(result?.key).toBe('newYear');
    });

    it('retorna null para día laboral', () => {
      const result = isHoliday(new Date('2025-01-02'));
      expect(result).toBeNull();
    });
  });

  describe('getNextHoliday', () => {
    it('encuentra próximo festivo', () => {
      const result = getNextHoliday(new Date('2025-01-02'));
      expect(result?.key).toBe('epiphany');
    });
  });

  describe('businessDays', () => {
    it('isBusinessDay retorna false para festivos', () => {
      // 1 de enero es festivo
      expect(isBusinessDay(new Date('2025-01-01'))).toBe(false);
    });

    it('isBusinessDay retorna false para fines de semana', () => {
      // 4 de enero 2025 es sábado
      expect(isBusinessDay(new Date('2025-01-04'))).toBe(false);
    });

    it('isBusinessDay retorna true para días hábiles', () => {
      // 2 de enero 2025 es jueves
      expect(isBusinessDay(new Date('2025-01-02'))).toBe(true);
    });

    it('businessDays suma días hábiles saltando festivos', () => {
      // 31 dic 2024 (martes) + 1 día hábil = 2 enero 2025 (jueves)
      // (1 enero es festivo)
      const result = businessDays(new Date('2024-12-31'), 1);
      expect(result.toISOString().split('T')[0]).toBe('2025-01-02');
    });
  });
});
