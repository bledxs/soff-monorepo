import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '49',
  getNationalNumber: (cleaned) => {
    let national = cleaned.startsWith('49') ? cleaned.slice(2) : cleaned;
    if (national.startsWith('0')) {
      national = national.slice(1);
    }
    return national;
  },
  evaluateNationalNumber: (national) => {
    if (national.length < 9 || national.length > 11) {
      return { isValid: false, error: 'Phone number must be 9-11 digits' };
    }
    if (/^1[567]/.test(national)) {
      return { isValid: true, type: 'mobile' };
    }
    return { isValid: true, type: 'landline' };
  },
});
