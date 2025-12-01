import { describe, it, expect } from 'vitest';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from '../../src/core/engine';
import type { HolidayDefinition } from '../../src/core/types';

const testDefinitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'epiphany', rule: { type: 'fixed', month: 1, day: 6 }, shift: 'emiliani' },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'mlkDay', rule: { type: 'nthWeekday', month: 1, weekday: 1, n: 3 } },
];

const testNames = {
  newYear: 'Año Nuevo',
  epiphany: 'Reyes Magos',
  goodFriday: 'Viernes Santo',
  mlkDay: 'MLK Day',
};

describe('resolveHolidays', () => {
  it('resuelve fechas fijas', () => {
    const holidays = resolveHolidays(testDefinitions, 2025, testNames);
    const newYear = holidays.find((h) => h.key === 'newYear');

    expect(newYear).toMatchObject({
      date: '2025-01-01',
      key: 'newYear',
      name: 'Año Nuevo',
    });
  });

  it('aplica traslado Emiliani', () => {
    // 6 enero 2025 = lunes, no se traslada
    const holidays2025 = resolveHolidays(testDefinitions, 2025, testNames);
    const epiphany2025 = holidays2025.find((h) => h.key === 'epiphany');
    expect(epiphany2025?.date).toBe('2025-01-06');
    expect(epiphany2025?.isShifted).toBeUndefined();

    // 6 enero 2024 = sábado, se traslada al lunes 8
    const holidays2024 = resolveHolidays(testDefinitions, 2024, testNames);
    const epiphany2024 = holidays2024.find((h) => h.key === 'epiphany');
    expect(epiphany2024?.date).toBe('2024-01-08');
    expect(epiphany2024?.isShifted).toBe(true);
  });

  it('calcula fechas relativas a Pascua', () => {
    const holidays = resolveHolidays(testDefinitions, 2025, testNames);
    const goodFriday = holidays.find((h) => h.key === 'goodFriday');

    // Pascua 2025 = 20 abril, Viernes Santo = 18 abril
    expect(goodFriday?.date).toBe('2025-04-18');
  });

  it('calcula N-ésimo día de la semana', () => {
    const holidays = resolveHolidays(testDefinitions, 2025, testNames);
    const mlkDay = holidays.find((h) => h.key === 'mlkDay');

    // 3er lunes de enero 2025 = 20 enero
    expect(mlkDay?.date).toBe('2025-01-20');
  });

  it('ordena por fecha', () => {
    const holidays = resolveHolidays(testDefinitions, 2025, testNames);
    const dates = holidays.map((h) => h.date);

    expect(dates).toEqual([...dates].sort());
  });
});

describe('checkIsHoliday', () => {
  it('retorna holiday si coincide', () => {
    const result = checkIsHoliday(testDefinitions, new Date('2025-01-01'), testNames);
    expect(result?.key).toBe('newYear');
  });

  it('retorna null si no es festivo', () => {
    const result = checkIsHoliday(testDefinitions, new Date('2025-01-02'), testNames);
    expect(result).toBeNull();
  });
});

describe('findNextHoliday', () => {
  it('encuentra próximo festivo en año actual', () => {
    const result = findNextHoliday(testDefinitions, new Date('2025-01-02'), testNames);
    expect(result?.key).toBe('epiphany');
  });

  it('salta al siguiente año si no hay más festivos', () => {
    const result = findNextHoliday(testDefinitions, new Date('2025-12-31'), testNames);
    expect(result?.key).toBe('newYear');
    expect(result?.date).toBe('2026-01-01');
  });
});
