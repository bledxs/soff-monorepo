import { describe, it, expect } from 'vitest';
import { cleanPhone, formatE164 } from '../../src/core/utils';

describe('Phone Utils', () => {
  it('should clean phone number', () => {
    expect(cleanPhone('+57 (300) 123-4567')).toBe('573001234567');
  });

  it('should format E.164', () => {
    expect(formatE164('57', '3001234567')).toBe('+573001234567');
  });
});
