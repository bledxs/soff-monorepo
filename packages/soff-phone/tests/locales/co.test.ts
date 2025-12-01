import { describe, it, expect } from 'vitest';
import { validate } from '../../src/locales/co';

describe('Colombia Phone Validation', () => {
  it('should validate a valid mobile number', () => {
    const result = validate('3001234567');
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('mobile');
    expect(result.formatted).toBe('3001234567');
  });

  it('should validate a valid landline number', () => {
    const result = validate('6011234567');
    expect(result.isValid).toBe(true);
    expect(result.type).toBe('landline');
  });

  it('should validate a number with country code', () => {
    const result = validate('573001234567');
    expect(result.isValid).toBe(true);
    expect(result.formatted).toBe('3001234567');
  });

  it('should format to E.164', () => {
    const result = validate('3001234567', { format: 'e164' });
    expect(result.formatted).toBe('+573001234567');
  });

  it('should fail for invalid length', () => {
    const result = validate('300123');
    expect(result.isValid).toBe(false);
  });

  it('should fail for invalid prefix', () => {
    const result = validate('1001234567');
    expect(result.isValid).toBe(false);
  });
});
