import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '33',
  getNationalNumber: (cleaned) => {
    let national = cleaned.startsWith('33') && cleaned.length > 9 ? cleaned.slice(2) : cleaned;
    if (national.startsWith('0')) {
      national = national.slice(1);
    }
    return national;
  },
  evaluateNationalNumber: (national) => {
    if (national.length !== 9) {
      return { isValid: false, error: 'Phone number must be 9 digits' };
    }
    if (/^[67]/.test(national)) {
      return { isValid: true, type: 'mobile' };
    }
    if (/^[1-5,9]/.test(national)) {
      return { isValid: true, type: 'landline' };
    }
    return { isValid: true, type: 'unknown' };
  },
});
