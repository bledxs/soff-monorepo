import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '58',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('58') && cleaned.length > 10 ? cleaned.slice(2) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 10) {
      return { isValid: false, error: 'Phone number must be 10 digits' };
    }
    if (national.startsWith('4')) {
      return { isValid: true, type: 'mobile' };
    }
    if (/^[2]/.test(national)) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: true, type: 'unknown' };
  },
});
