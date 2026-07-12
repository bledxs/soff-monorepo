import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '52',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('52') && cleaned.length > 10 ? cleaned.slice(2) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 10) {
      return { isValid: false, error: 'Phone number must be 10 digits' };
    }
    return { isValid: true, type: 'unknown' };
  },
});
