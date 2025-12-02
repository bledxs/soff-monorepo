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

/**
 * Calculates the number of business days between two dates
 * Returns the number of days to add to startDate to get endDate (can be negative)
 * If startDate and endDate are the same, returns 0
 */
export function getBusinessDaysBetween(
  definitions: HolidayDefinition[],
  startDate: Date,
  endDate: Date,
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Reset hours to avoid issues with daylight saving time or partial days
  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(0, 0, 0, 0);

  if (start.getTime() === end.getTime()) return 0;

  const direction = start < end ? 1 : -1;
  let count = 0;
  const current = new Date(start);

  // If direction is positive, we count days starting from start+1 until end
  // If direction is negative, we count days starting from start-1 until end

  while (current.getTime() !== end.getTime()) {
    current.setUTCDate(current.getUTCDate() + direction);
    if (checkIsBusinessDay(definitions, current)) {
      count += direction;
    }
  }

  return count;
}
