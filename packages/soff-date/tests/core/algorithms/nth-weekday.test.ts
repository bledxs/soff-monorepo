import { describe, it, expect } from 'vitest';
import { getNthWeekday } from '../../../src/core/algorithms/nth-weekday';

describe('getNthWeekday', () => {
  describe('n positivo (desde inicio)', () => {
    it('1er lunes de enero 2025', () => {
      const result = getNthWeekday(2025, 1, 1, 1);
      expect(result.toISOString().split('T')[0]).toBe('2025-01-06');
    });

    it('3er lunes de enero 2025 (MLK Day)', () => {
      const result = getNthWeekday(2025, 1, 1, 3);
      expect(result.toISOString().split('T')[0]).toBe('2025-01-20');
    });

    it('2do domingo de mayo 2025 (Día de las Madres)', () => {
      const result = getNthWeekday(2025, 5, 0, 2);
      expect(result.toISOString().split('T')[0]).toBe('2025-05-11');
    });

    it('4to jueves de noviembre 2025 (Thanksgiving)', () => {
      const result = getNthWeekday(2025, 11, 4, 4);
      expect(result.toISOString().split('T')[0]).toBe('2025-11-27');
    });
  });

  describe('n negativo (desde final)', () => {
    it('último lunes de mayo 2025 (Memorial Day)', () => {
      const result = getNthWeekday(2025, 5, 1, -1);
      expect(result.toISOString().split('T')[0]).toBe('2025-05-26');
    });

    it('último viernes de marzo 2025', () => {
      const result = getNthWeekday(2025, 3, 5, -1);
      expect(result.toISOString().split('T')[0]).toBe('2025-03-28');
    });
  });
});
