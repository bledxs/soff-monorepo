import { describe, it, expect } from 'vitest';
import { applyShift } from '../../../src/core/algorithms/shifts';

describe('applyShift', () => {
  describe('rule: none', () => {
    it('no modifica ningún día', () => {
      const saturday = new Date('2025-01-04'); // Sábado
      const { date, shifted } = applyShift(saturday, 'none');
      expect(date).toEqual(saturday);
      expect(shifted).toBe(false);
    });
  });

  describe('rule: emiliani', () => {
    it('sábado → lunes siguiente', () => {
      const saturday = new Date('2025-01-04');
      const { date, shifted } = applyShift(saturday, 'emiliani');
      expect(date.toISOString().split('T')[0]).toBe('2025-01-06');
      expect(shifted).toBe(true);
    });

    it('domingo → lunes siguiente', () => {
      const sunday = new Date('2025-01-05');
      const { date, shifted } = applyShift(sunday, 'emiliani');
      expect(date.toISOString().split('T')[0]).toBe('2025-01-06');
      expect(shifted).toBe(true);
    });

    it('lunes → sin cambio', () => {
      const monday = new Date('2025-01-06');
      const { date, shifted } = applyShift(monday, 'emiliani');
      expect(date).toEqual(monday);
      expect(shifted).toBe(false);
    });
  });

  describe('rule: observedUS', () => {
    it('sábado → viernes anterior', () => {
      const saturday = new Date('2025-01-04');
      const { date, shifted } = applyShift(saturday, 'observedUS');
      expect(date.toISOString().split('T')[0]).toBe('2025-01-03');
      expect(shifted).toBe(true);
    });

    it('domingo → lunes siguiente', () => {
      const sunday = new Date('2025-01-05');
      const { date, shifted } = applyShift(sunday, 'observedUS');
      expect(date.toISOString().split('T')[0]).toBe('2025-01-06');
      expect(shifted).toBe(true);
    });
  });

  describe('rule: nearestMonday', () => {
    it('martes → lunes anterior', () => {
      const tuesday = new Date('2025-01-07');
      const { date, shifted } = applyShift(tuesday, 'nearestMonday');
      expect(date.toISOString().split('T')[0]).toBe('2025-01-06');
      expect(shifted).toBe(true);
    });

    it('miércoles → lunes anterior', () => {
      const wednesday = new Date('2025-01-08');
      const { date, shifted } = applyShift(wednesday, 'nearestMonday');
      expect(date.toISOString().split('T')[0]).toBe('2025-01-06');
      expect(shifted).toBe(true);
    });

    it('jueves → lunes siguiente', () => {
      const thursday = new Date('2025-01-09');
      const { date, shifted } = applyShift(thursday, 'nearestMonday');
      expect(date.toISOString().split('T')[0]).toBe('2025-01-13');
      expect(shifted).toBe(true);
    });

    it('viernes → lunes siguiente', () => {
      const friday = new Date('2025-01-10');
      const { date, shifted } = applyShift(friday, 'nearestMonday');
      expect(date.toISOString().split('T')[0]).toBe('2025-01-13');
      expect(shifted).toBe(true);
    });

    it('fin de semana → sin cambio', () => {
      const saturday = new Date('2025-01-11');
      const { date, shifted } = applyShift(saturday, 'nearestMonday');
      expect(date).toEqual(saturday);
      expect(shifted).toBe(false);
    });
  });
});
