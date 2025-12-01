import type { PhoneValidationResult, PhoneOptions } from '../core/types.js';
import { cleanPhone, formatE164 } from '../core/utils.js';

const COUNTRY_CODE = '52';

export function validate(phone: string, options?: PhoneOptions): PhoneValidationResult {
  const cleaned = cleanPhone(phone);

  // Check if it includes country code
  let national = cleaned;
  if (cleaned.startsWith(COUNTRY_CODE) && cleaned.length > 10) {
    national = cleaned.slice(COUNTRY_CODE.length);
  }

  if (national.length !== 10) {
    return { isValid: false, error: 'Phone number must be 10 digits' };
  }

  // Mexico doesn't strictly separate mobile/landline ranges as clearly in the first digit anymore for all cases,
  // but generally we can just validate length.
  // Distinction is harder without a massive database of area codes.
  // We will mark as 'unknown' type unless we want to implement complex area code logic.
  // For now, let's assume valid if 10 digits.

  let formatted = national;
  if (options?.format === 'e164') {
    formatted = formatE164(COUNTRY_CODE, national);
  } else if (options?.format === 'international') {
    formatted = `+${COUNTRY_CODE} ${national}`;
  }

  return { isValid: true, type: 'unknown', formatted };
}
