import type { HolidayDefinition } from './types';
import { checkIsHoliday } from './engine';

/**
 * Checks if a date is a weekend (Saturday or Sunday)
 * Uses UTC date to avoid timezone issues
 */
export function isWeekend(date: Date): boolean {
  const day = date.getUTCDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}

/**
 * Checks if a date is a business day (not weekend AND not holiday)
 */
export function checkIsBusinessDay(definitions: HolidayDefinition[], date: Date): boolean {
  if (isWeekend(date)) return false;
  return checkIsHoliday(definitions, date) === null;
}

/**
 * Adds (or subtracts) business days to a date
 */
export function addBusinessDays(
  definitions: HolidayDefinition[],
  startDate: Date,
  amount: number,
): Date {
  const result = new Date(startDate);
  let remaining = Math.abs(amount);
  const direction = amount >= 0 ? 1 : -1;

  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() + direction);
    if (checkIsBusinessDay(definitions, result)) {
      remaining--;
    }
  }

  return result;
}
