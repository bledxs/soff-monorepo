import type { PhoneValidationResult, PhoneOptions } from './types.js';
import { cleanPhone, formatE164 } from './utils.js';

export interface PhoneValidatorConfig {
  countryCode: string;
  getNationalNumber: (cleaned: string) => string;
  evaluateNationalNumber: (
    national: string
  ) =>
    | { isValid: true; type: 'mobile' | 'landline' | 'unknown' }
    | { isValid: false; error: string };
}

export function createValidator(config: PhoneValidatorConfig) {
  return function validate(phone: string, options?: PhoneOptions): PhoneValidationResult {
    const cleaned = cleanPhone(phone);
    const national = config.getNationalNumber(cleaned);

    const evaluation = config.evaluateNationalNumber(national);
    if (!evaluation.isValid) {
      return evaluation;
    }

    let formatted = national;
    if (options?.format === 'e164') {
      formatted = formatE164(config.countryCode, national);
    } else if (options?.format === 'international') {
      formatted = `+${config.countryCode} ${national}`;
    }

    return { isValid: true, type: evaluation.type, formatted };
  };
}
