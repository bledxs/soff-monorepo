import type { PhoneValidationResult, PhoneOptions } from '../core/types.js';
import { cleanPhone, formatE164 } from '../core/utils.js';

const COUNTRY_CODE = '49';

export function validate(phone: string, options?: PhoneOptions): PhoneValidationResult {
  const cleaned = cleanPhone(phone);

  // Check if it includes country code
  let national = cleaned;
  if (cleaned.startsWith(COUNTRY_CODE)) {
    national = cleaned.slice(COUNTRY_CODE.length);
  }

  // German numbers: variable length (10-11 digits including area code)
  // Often start with 0 for domestic dialing
  if (national.startsWith('0')) {
    national = national.slice(1);
  }

  if (national.length < 9 || national.length > 11) {
    return { isValid: false, error: 'Phone number must be 9-11 digits' };
  }

  const type = /^1[567]/.test(national) ? 'mobile' : 'landline';

  let formatted = national;
  if (options?.format === 'e164') {
    formatted = formatE164(COUNTRY_CODE, national);
  } else if (options?.format === 'international') {
    formatted = `+${COUNTRY_CODE} ${national}`;
  }

  return { isValid: true, type, formatted };
}
