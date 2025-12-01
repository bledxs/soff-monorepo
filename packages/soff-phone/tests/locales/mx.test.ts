import { describe, it, expect } from 'vitest';
import { validate } from '../../src/locales/mx';

describe('Mexico Phone Validation', () => {
  it('should validate a valid number', () => {
    const result = validate('5512345678');
    expect(result.isValid).toBe(true);
    expect(result.formatted).toBe('5512345678');
  });

  it('should validate a number with country code', () => {
    const result = validate('525512345678');
    expect(result.isValid).toBe(true);
    expect(result.formatted).toBe('5512345678');
  });

  it('should format to E.164', () => {
    const result = validate('5512345678', { format: 'e164' });
    expect(result.formatted).toBe('+525512345678');
  });

  it('should fail for invalid length', () => {
    const result = validate('55123456');
    expect(result.isValid).toBe(false);
  });
});
