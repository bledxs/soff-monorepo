export function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function formatE164(countryCode: string, phone: string): string {
  return `+${countryCode}${phone}`;
}
