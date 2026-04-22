import type { PhoneValidationResult, PhoneOptions } from '../core/types.js';
import { cleanPhone, formatE164 } from '../core/utils.js';

const COUNTRY_CODE = '55';

export function validate(phone: string, options?: PhoneOptions): PhoneValidationResult {
  const cleaned = cleanPhone(phone);

  // Check if it includes country code
  let national = cleaned;
  if (cleaned.startsWith(COUNTRY_CODE) && cleaned.length > 10) {
    national = cleaned.slice(COUNTRY_CODE.length);
  }

  // Brazilian numbers: 10 digits (landline) or 11 digits (mobile with 9 prefix)
  if (national.length !== 10 && national.length !== 11) {
    return { isValid: false, error: 'Phone number must be 10 or 11 digits' };
  }

  const type =
    national.length === 11 && national[2] === '9'
      ? 'mobile'
      : national.length === 10
        ? 'landline'
        : undefined;

  if (!type) {
    return { isValid: false, error: 'Invalid phone format for Brazil' };
  }

  let formatted = national;
  if (options?.format === 'e164') {
    formatted = formatE164(COUNTRY_CODE, national);
  } else if (options?.format === 'international') {
    formatted = `+${COUNTRY_CODE} ${national}`;
  }

  return { isValid: true, type, formatted };
}
