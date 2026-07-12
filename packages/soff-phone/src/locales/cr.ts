import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '506',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('506') && cleaned.length > 8 ? cleaned.slice(3) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 8) {
      return { isValid: false, error: 'Phone number must be 8 digits' };
    }
    if (/^[5678]/.test(national)) {
      return { isValid: true, type: 'mobile' };
    }
    if (national.startsWith('2')) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: true, type: 'unknown' };
  },
});
