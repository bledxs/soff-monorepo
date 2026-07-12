import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '44',
  getNationalNumber: (cleaned) => {
    let national = cleaned.startsWith('44') && cleaned.length > 10 ? cleaned.slice(2) : cleaned;
    if (national.startsWith('0')) {
      national = national.slice(1);
    }
    return national;
  },
  evaluateNationalNumber: (national) => {
    if (national.length !== 10) {
      return { isValid: false, error: 'Phone number must be 10 digits' };
    }
    if (national.startsWith('7')) {
      return { isValid: true, type: 'mobile' };
    }
    if (/^[123]/.test(national)) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: true, type: 'unknown' };
  },
});
