import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '55',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('55') && cleaned.length > 10 ? cleaned.slice(2) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 10 && national.length !== 11) {
      return { isValid: false, error: 'Phone number must be 10 or 11 digits' };
    }
    if (national.length === 11 && national[2] === '9') {
      return { isValid: true, type: 'mobile' };
    }
    if (national.length === 10) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: false, error: 'Invalid phone format for Brazil' };
  },
});
