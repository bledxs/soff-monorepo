import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '593',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('593') && cleaned.length > 9 ? cleaned.slice(3) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 9) {
      return { isValid: false, error: 'Phone number must be 9 digits' };
    }
    if (national.startsWith('9')) {
      return { isValid: true, type: 'mobile' };
    }
    if (/^[2-7]/.test(national)) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: false, error: 'Invalid prefix for Ecuador' };
  },
});
