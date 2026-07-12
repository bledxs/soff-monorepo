export interface CurrencyMaskOptions {
  /** Prefix to add before the number (e.g., "$ ") */
  prefix?: string;
  /** Suffix to add after the number (e.g., " USD") */
  suffix?: string;
  /** Character for thousands separator (default: ",") */
  thousands?: string;
  /** Character for decimal separator (default: ".") */
  decimal?: string;
  /** Number of decimal places (default: 2) */
  precision?: number;
  /** Whether to allow negative values (default: false) */
  allowNegative?: boolean;
}

const DEFAULT_OPTIONS: Required<CurrencyMaskOptions> = {
  prefix: '',
  suffix: '',
  thousands: ',',
  decimal: '.',
  precision: 2,
  allowNegative: false,
};

/**
 * Applies a currency format to a numeric string input.
 * As the user types digits, it dynamically builds the currency format from right to left.
 *
 * @param value - The raw input string (can contain non-digits, they will be stripped)
 * @param options - Currency formatting options
 * @returns The formatted currency string
 */
export function maskCurrency(value: string, options?: CurrencyMaskOptions): string {
  if (!value) return '';

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const isNegative = opts.allowNegative && value.includes('-');

  // Strip all non-digit characters
  let digits = value.replace(/\D/g, '') || '0';

  let integerPart = digits;
  let decimalPart = '';

  // Handle precision (decimals)
  if (opts.precision > 0) {
    digits = digits.padStart(opts.precision + 1, '0');
    integerPart = digits.slice(0, -opts.precision);
    decimalPart = opts.decimal + digits.slice(-opts.precision);
  }

  // Remove leading zeros from integer part
  const cleanInteger = integerPart.replace(/^0+/, '') || '0';

  // Add thousands separators
  let formattedInteger = '';
  const remainder = cleanInteger.length % 3;
  if (remainder > 0) {
    formattedInteger += cleanInteger.substring(0, remainder);
  }
  for (let i = remainder; i < cleanInteger.length; i += 3) {
    if (i > 0) {
      formattedInteger += opts.thousands;
    }
    formattedInteger += cleanInteger.substring(i, i + 3);
  }

  return `${isNegative ? '-' : ''}${opts.prefix}${formattedInteger}${decimalPart}${opts.suffix}`;
}

/**
 * Removes the currency formatting, returning the raw numeric string (e.g., suitable for parseFloat).
 *
 * @param value - The formatted currency string
 * @param options - Same formatting options used for masking
 * @returns The unmasked numeric string (e.g., "-1234.56")
 */
export function unmaskCurrency(value: string, options?: CurrencyMaskOptions): string {
  if (!value) return '';
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const isNegative = opts.allowNegative && value.includes('-');
  let digits = value.replace(/\D/g, '');
  if (!digits) return '';

  let integerPart = digits;
  let decimalPart = '';

  if (opts.precision > 0) {
    digits = digits.padStart(opts.precision + 1, '0');
    integerPart = digits.slice(0, -opts.precision);
    decimalPart = '.' + digits.slice(-opts.precision);
  }

  const cleanInteger = integerPart.replace(/^0+/, '') || '0';
  return `${isNegative ? '-' : ''}${cleanInteger}${decimalPart}`;
}
