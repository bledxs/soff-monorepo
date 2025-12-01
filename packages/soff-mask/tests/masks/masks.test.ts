import { describe, it, expect } from 'vitest';
import { mask, getPatternLength } from '../../src/core/engine.js';
import {
  phoneCO,
  phoneUS,
  phoneBR,
  phoneAR,
  phoneMX,
  phoneIntl,
  creditCard,
  creditCardAmex,
  cardExpiry,
  cvv,
  cvvAmex,
  cpf,
  cnpj,
  rut,
  cuit,
  nit,
  dateDMY,
  dateMDY,
  dateISO,
  time24,
  time24Seconds,
  time12,
  zipUS,
  zipUS4,
  zipBR,
  ipAddress,
  percentage,
} from '../../src/masks/index.js';

describe('Pre-built Masks', () => {
  describe('Phone Masks', () => {
    it('should mask Colombian phone', () => {
      expect(mask('3001234567', phoneCO)).toBe('(300) 123 4567');
    });

    it('should mask US phone', () => {
      expect(mask('5551234567', phoneUS)).toBe('(555) 123-4567');
    });

    it('should mask Brazilian phone', () => {
      expect(mask('11912345678', phoneBR)).toBe('(11) 91234-5678');
    });

    it('should mask Argentine phone', () => {
      expect(mask('1112345678', phoneAR)).toBe('(11) 1234-5678');
    });

    it('should mask Mexican phone', () => {
      expect(mask('5512345678', phoneMX)).toBe('(55) 1234 5678');
    });

    it('should mask international phone', () => {
      expect(mask('15551234567', phoneIntl)).toBe('+1 (555) 123-4567');
    });
  });

  describe('Credit Card Masks', () => {
    it('should mask standard credit card', () => {
      expect(mask('4111111111111111', creditCard)).toBe('4111 1111 1111 1111');
    });

    it('should mask American Express', () => {
      expect(mask('378282246310005', creditCardAmex)).toBe('3782 822463 10005');
    });

    it('should mask card expiry', () => {
      expect(mask('1224', cardExpiry)).toBe('12/24');
    });

    it('should mask CVV', () => {
      expect(mask('123', cvv)).toBe('123');
    });

    it('should mask Amex CVV', () => {
      expect(mask('1234', cvvAmex)).toBe('1234');
    });
  });

  describe('Document Masks', () => {
    it('should mask Brazilian CPF', () => {
      expect(mask('12345678909', cpf)).toBe('123.456.789-09');
    });

    it('should mask Brazilian CNPJ', () => {
      expect(mask('12345678000190', cnpj)).toBe('12.345.678/0001-90');
    });

    it('should mask Chilean RUT', () => {
      expect(mask('123456789', rut)).toBe('12.345.678-9');
    });

    it('should mask Argentine CUIT', () => {
      expect(mask('20123456789', cuit)).toBe('20-12345678-9');
    });

    it('should mask Colombian NIT', () => {
      expect(mask('9001234567', nit)).toBe('900.123.456-7');
    });
  });

  describe('Date/Time Masks', () => {
    it('should mask date DMY', () => {
      expect(mask('25122024', dateDMY)).toBe('25/12/2024');
    });

    it('should mask date MDY', () => {
      expect(mask('12252024', dateMDY)).toBe('12/25/2024');
    });

    it('should mask date ISO', () => {
      expect(mask('20241225', dateISO)).toBe('2024-12-25');
    });

    it('should mask 24h time', () => {
      expect(mask('1430', time24)).toBe('14:30');
    });

    it('should mask 24h time with seconds', () => {
      expect(mask('143025', time24Seconds)).toBe('14:30:25');
    });

    it('should mask 12h time', () => {
      expect(mask('0230PM', time12)).toBe('02:30 PM');
    });
  });

  describe('Other Masks', () => {
    it('should mask US ZIP code', () => {
      expect(mask('12345', zipUS)).toBe('12345');
    });

    it('should mask US ZIP+4', () => {
      expect(mask('123456789', zipUS4)).toBe('12345-6789');
    });

    it('should mask Brazilian ZIP', () => {
      expect(mask('12345678', zipBR)).toBe('12345-678');
    });

    it('should mask IP address', () => {
      expect(mask('192168001001', ipAddress)).toBe('192.168.001.001');
    });

    it('should mask percentage', () => {
      // El % es literal al final, se agrega automáticamente
      expect(mask('9999%', percentage)).toBe('99.99%');
    });
  });

  describe('Pattern Length', () => {
    it('should have correct length for phone patterns', () => {
      expect(getPatternLength(phoneCO)).toBe(10);
      expect(getPatternLength(phoneUS)).toBe(10);
      expect(getPatternLength(phoneBR)).toBe(11);
    });

    it('should have correct length for document patterns', () => {
      expect(getPatternLength(cpf)).toBe(11);
      expect(getPatternLength(cnpj)).toBe(14);
      expect(getPatternLength(nit)).toBe(10);
    });

    it('should have correct length for card patterns', () => {
      expect(getPatternLength(creditCard)).toBe(16);
      expect(getPatternLength(creditCardAmex)).toBe(15);
    });
  });
});
