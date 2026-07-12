import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '39',
  getNationalNumber: (cleaned) => {
    let national = cleaned.startsWith('39') && cleaned.length > 9 ? cleaned.slice(2) : cleaned;
    if (national.startsWith('0')) {
      national = national.slice(1);
    }
    return national;
  },
  evaluateNationalNumber: (national) => {
    if (national.length < 9 || national.length > 10) {
      return { isValid: false, error: 'Phone number must be 9-10 digits' };
    }
    if (national.startsWith('3')) {
      return { isValid: true, type: 'mobile' };
    }
    return { isValid: true, type: 'landline' };
  },
});
