// Pre-built phone masks

/** Colombian phone: (300) 123 4567 */
export const phoneCO = '(###) ### ####';

/** Mexican phone: (55) 1234 5678 */
export const phoneMX = '(##) #### ####';

/** US phone: (555) 123-4567 */
export const phoneUS = '(###) ###-####';

/** Brazilian phone: (11) 91234-5678 */
export const phoneBR = '(##) #####-####';

/** Argentine phone: (11) 1234-5678 */
export const phoneAR = '(##) ####-####';

/** International phone: +1 (555) 123-4567 */
export const phoneIntl = '+# (###) ###-####';

// Credit card masks

/** Standard credit card: 4111 1111 1111 1111 */
export const creditCard = '#### #### #### ####';

/** American Express: 3782 822463 10005 */
export const creditCardAmex = '#### ###### #####';

/** Credit card expiry: 12/24 */
export const cardExpiry = '##/##';

/** CVV: 123 */
export const cvv = '###';

/** CVV (Amex): 1234 */
export const cvvAmex = '####';

// Document masks

/** Brazilian CPF: 123.456.789-09 */
export const cpf = '###.###.###-##';

/** Brazilian CNPJ: 12.345.678/0001-90 */
export const cnpj = '##.###.###/####-##';

/** Chilean RUT: 12.345.678-9 */
export const rut = '##.###.###-S';

/** Argentine CUIT: 20-12345678-9 */
export const cuit = '##-########-#';

/** Colombian NIT: 900.123.456-7 */
export const nit = '###.###.###-#';

// Date/Time masks

/** Date: 25/12/2024 */
export const dateDMY = '##/##/####';

/** Date: 12/25/2024 */
export const dateMDY = '##/##/####';

/** Date: 2024-12-25 */
export const dateISO = '####-##-##';

/** Alias for dateDMY - Date: 25/12/2024 */
export const date = dateDMY;

/** Time: 14:30 */
export const time24 = '##:##';

/** Time with seconds: 14:30:00 */
export const time24Seconds = '##:##:##';

/** Time 12h: 02:30 PM */
export const time12 = '##:## AA';

// Other common masks

/** ZIP code (US): 12345 */
export const zipUS = '#####';

/** ZIP+4 (US): 12345-6789 */
export const zipUS4 = '#####-####';

/** ZIP code (BR): 12345-678 */
export const zipBR = '#####-###';

/** IP Address: 192.168.1.1 */
export const ipAddress = '###.###.###.###';

/** Percentage: 99.99% */
export const percentage = '##.##%';
