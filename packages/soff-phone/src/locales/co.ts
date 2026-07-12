import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '57',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('57') && cleaned.length > 10 ? cleaned.slice(2) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 10) {
      return { isValid: false, error: 'Phone number must be 10 digits' };
    }
    if (national.startsWith('3')) {
      return { isValid: true, type: 'mobile' };
    }
    if (national.startsWith('60')) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: false, error: 'Invalid prefix for Colombia' };
  },
});
