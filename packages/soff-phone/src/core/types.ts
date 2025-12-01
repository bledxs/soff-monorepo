export interface PhoneValidationResult {
  isValid: boolean;
  formatted?: string;
  type?: 'mobile' | 'landline' | 'unknown';
  error?: string;
}

export interface PhoneOptions {
  format?: 'national' | 'international' | 'e164';
}
