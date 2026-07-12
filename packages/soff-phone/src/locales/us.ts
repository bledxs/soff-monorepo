import { createValidator } from '../core/validator.js';

export const validate = createValidator({
  countryCode: '1',
  getNationalNumber: (cleaned) =>
    cleaned.startsWith('1') && cleaned.length === 11 ? cleaned.slice(1) : cleaned,
  evaluateNationalNumber: (national) => {
    if (national.length !== 10) {
      return { isValid: false, error: 'Phone number must be 10 digits' };
    }
    const areaCode = national.substring(0, 3);
    if (!/^[2-9][0-8][0-9]$/.test(areaCode)) {
      return { isValid: false, error: 'Invalid area code' };
    }
    const exchangeCode = national.substring(3, 6);
    if (!/^[2-9]\d{2}$/.test(exchangeCode)) {
      return { isValid: false, error: 'Invalid exchange code' };
    }
    return { isValid: true, type: 'unknown' };
  },
});
