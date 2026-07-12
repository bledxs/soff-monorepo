import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '34',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('34') && cleaned.length > 9 ? cleaned.slice(2) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 9) {
      return { isValid: false, error: 'Phone number must be 9 digits' };
    }
    if (/^[67]/.test(national)) {
      return { isValid: true, type: 'mobile' };
    }
    if (/^[89]/.test(national)) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: false, error: 'Invalid prefix for Spain' };
  },
});
