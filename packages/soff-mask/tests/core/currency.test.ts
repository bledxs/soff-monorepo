import { describe, it, expect } from 'vitest';
import { maskCurrency, unmaskCurrency } from '../../src/core/currency';

describe('Currency Mask', () => {
  describe('maskCurrency', () => {
    it('formats with default options (2 decimals, comma for thousands)', () => {
      expect(maskCurrency('1')).toBe('0.01');
      expect(maskCurrency('12')).toBe('0.12');
      expect(maskCurrency('123')).toBe('1.23');
      expect(maskCurrency('1234')).toBe('12.34');
      expect(maskCurrency('12345')).toBe('123.45');
      expect(maskCurrency('123456')).toBe('1,234.56');
      expect(maskCurrency('1234567')).toBe('12,345.67');
      expect(maskCurrency('1234567890')).toBe('12,345,678.90');
    });

    it('strips non-digits from input', () => {
      expect(maskCurrency('abc12d3')).toBe('1.23');
      expect(maskCurrency('$ 1,234.56')).toBe('1,234.56');
    });

    it('handles precision 0', () => {
      const opts = { precision: 0 };
      expect(maskCurrency('1', opts)).toBe('1');
      expect(maskCurrency('123', opts)).toBe('123');
      expect(maskCurrency('1234', opts)).toBe('1,234');
      expect(maskCurrency('1234567', opts)).toBe('1,234,567');
    });

    it('handles custom separators', () => {
      const opts = { thousands: '.', decimal: ',' };
      expect(maskCurrency('123456', opts)).toBe('1.234,56');
    });

    it('handles prefix and suffix', () => {
      const opts = { prefix: '$ ', suffix: ' USD' };
      expect(maskCurrency('123456', opts)).toBe('$ 1,234.56 USD');
    });

    it('handles negative values if allowed', () => {
      const opts = { allowNegative: true };
      expect(maskCurrency('-123456', opts)).toBe('-1,234.56');
    });

    it('ignores negative sign if not allowed', () => {
      const opts = { allowNegative: false };
      expect(maskCurrency('-123456', opts)).toBe('1,234.56');
    });
  });

  describe('unmaskCurrency', () => {
    it('returns raw numeric string', () => {
      expect(unmaskCurrency('1,234.56')).toBe('1234.56');
      expect(unmaskCurrency('$ 1,234.56 USD')).toBe('1234.56');
    });

    it('handles negative values', () => {
      const opts = { allowNegative: true };
      expect(unmaskCurrency('-1,234.56', opts)).toBe('-1234.56');
    });

    it('handles precision 0', () => {
      const opts = { precision: 0 };
      expect(unmaskCurrency('1,234', opts)).toBe('1234');
    });
  });
});
