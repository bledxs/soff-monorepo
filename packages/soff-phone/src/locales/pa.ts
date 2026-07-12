import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '507',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('507') && cleaned.length > 8 ? cleaned.slice(3) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 8) {
      return { isValid: false, error: 'Phone number must be 8 digits' };
    }
    if (national.startsWith('6')) {
      return { isValid: true, type: 'mobile' };
    }
    if (/^[2-57-9]/.test(national)) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: true, type: 'unknown' };
  },
});
