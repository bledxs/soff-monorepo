import { cleanDigits } from '../core/utils.js';

/**
 * RUC verification weights (Peru tax ID)
 */
const RUC_WEIGHTS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

/**
 * Calculate the RUC check digit
 * @param ruc - The RUC without check digit (10 digits)
 * @returns The check digit (0-9)
 */
export function calculateRUCCheckDigit(ruc: string): string {
  const cleaned = cleanDigits(ruc);

  if (cleaned.length < 10) {
    throw new Error('RUC base must be at least 10 digits');
  }

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i], 10) * RUC_WEIGHTS[i];
  }

  const remainder = 11 - (sum % 11);
  if (remainder === 10) return '0';
  if (remainder === 11) return '1';
  return String(remainder);
}

/**
 * Validate a Peruvian RUC (Registro Único de Contribuyentes)
 * @param ruc - The RUC to validate
 * @returns true if valid
 */
export function validateRUC(ruc: string): boolean {
  const cleaned = cleanDigits(ruc);

  if (cleaned.length !== 11) {
    return false;
  }

  const prefix = cleaned.slice(0, 2);
  if (!['10', '15', '17', '20'].includes(prefix)) {
    return false;
  }

  const body = cleaned.slice(0, 10);
  const checkDigit = cleaned.slice(10);

  try {
    return calculateRUCCheckDigit(body) === checkDigit;
  } catch {
    return false;
  }
}

/**
 * Format a RUC for display
 */
export function formatRUC(ruc: string): string {
  // RUC typically does not use separators, just 11 digits
  return cleanDigits(ruc);
}

/**
 * Clean a RUC (remove all formatting)
 */
export function cleanRUC(ruc: string): string {
  return cleanDigits(ruc);
}

/**
 * Validate a Peruvian DNI (Documento Nacional de Identidad)
 * @param dni - The DNI number (8 digits)
 * @returns true if valid format
 */
export function validateDNIPE(dni: string): boolean {
  const cleaned = cleanDigits(dni);
  return cleaned.length === 8;
}

/**
 * Format a DNI for display
 */
export function formatDNIPE(dni: string): string {
  return cleanDigits(dni);
}

/**
 * Clean a DNI
 */
export function cleanDNIPE(dni: string): string {
  return cleanDigits(dni);
}

/**
 * Validate a Carné de Extranjería (CE) in Peru
 * @param ce - The CE number (typically 9 or 12 digits/alphanumeric)
 */
export function validateCEPE(ce: string): boolean {
  const cleaned = ce.replace(/[^a-zA-Z0-9]/g, '');
  return cleaned.length === 9 || cleaned.length === 12;
}

/**
 * Format a Carné de Extranjería for display
 */
export function formatCEPE(ce: string): string {
  const cleaned = ce.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return cleaned;
}

/**
 * Clean a Carné de Extranjería
 */
export function cleanCEPE(ce: string): string {
  return ce.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}
