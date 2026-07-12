import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '54',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('54') && cleaned.length > 10 ? cleaned.slice(2) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 10) {
      return { isValid: false, error: 'Phone number must be 10 digits' };
    }
    if (national.startsWith('9')) {
      return { isValid: true, type: 'mobile' };
    }
    if (/^(11|2|3|4)/.test(national)) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: true, type: 'unknown' };
  },
});
