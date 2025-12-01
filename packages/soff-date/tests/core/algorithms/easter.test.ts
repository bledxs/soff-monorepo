import { describe, it, expect } from 'vitest';
import { getEasterSunday } from '../../../src/core/algorithms/easter';

describe('getEasterSunday', () => {
  const knownDates: [number, string][] = [
    [2020, '2020-04-12'],
    [2021, '2021-04-04'],
    [2022, '2022-04-17'],
    [2023, '2023-04-09'],
    [2024, '2024-03-31'],
    [2025, '2025-04-20'],
    [2026, '2026-04-05'],
    [2030, '2030-04-21'],
  ];

  it.each(knownDates)('año %i → %s', (year, expected) => {
    const result = getEasterSunday(year);
    const iso = result.toISOString().split('T')[0];
    expect(iso).toBe(expected);
  });

  it('maneja años lejanos', () => {
    expect(() => getEasterSunday(2100)).not.toThrow();
    expect(() => getEasterSunday(1900)).not.toThrow();
  });
});
