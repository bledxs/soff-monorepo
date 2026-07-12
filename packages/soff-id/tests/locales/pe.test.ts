import { describe, it, expect } from 'vitest';
import {
  validateRUC,
  calculateRUCCheckDigit,
  validateDNIPE,
  validateCEPE,
} from '../../src/locales/pe.js';

describe('Peru Locale (PE)', () => {
  describe('validateRUC', () => {
    it('should validate a correct RUC', () => {
      // 20100070970 is SUNAT RUC
      expect(validateRUC('20100070970')).toBe(true);
      // Example of individual: 10456789012 (made up valid RUC starting with 10 for 45678901)
      // Actually let's use check digit function to generate a valid one for 1045678901:
      const base = '1045678901';
      const check = calculateRUCCheckDigit(base);
      expect(validateRUC(base + check)).toBe(true);
    });

    it('should reject RUC with invalid length', () => {
      expect(validateRUC('2010007097')).toBe(false);
      expect(validateRUC('201000709701')).toBe(false);
    });

    it('should reject RUC with invalid prefix', () => {
      const base = '3010007097';
      const check = calculateRUCCheckDigit(base);
      expect(validateRUC(base + check)).toBe(false);
    });

    it('should reject RUC with invalid check digit', () => {
      expect(validateRUC('20100070971')).toBe(false);
    });
  });

  describe('validateDNIPE', () => {
    it('should validate an 8-digit DNI', () => {
      expect(validateDNIPE('12345678')).toBe(true);
      expect(validateDNIPE('00000000')).toBe(true);
    });

    it('should reject DNI with invalid length', () => {
      expect(validateDNIPE('1234567')).toBe(false);
      expect(validateDNIPE('123456789')).toBe(false);
    });

    it('should reject DNI with letters', () => {
      expect(validateDNIPE('1234567a')).toBe(false);
    });
  });

  describe('validateCEPE', () => {
    it('should validate a 9-digit CE', () => {
      expect(validateCEPE('123456789')).toBe(true);
    });

    it('should validate a 12-digit CE', () => {
      expect(validateCEPE('123456789012')).toBe(true);
    });

    it('should reject CE with invalid length', () => {
      expect(validateCEPE('12345678')).toBe(false);
      expect(validateCEPE('1234567890')).toBe(false);
    });
  });
});
