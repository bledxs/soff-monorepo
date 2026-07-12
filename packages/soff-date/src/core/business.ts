import type { HolidayDefinition } from './types';
import { checkIsHoliday } from './engine';

function isValidDate(date: Date): boolean {
  return date instanceof Date && Number.isFinite(date.getTime());
}

function createInvalidDate(): Date {
  return new Date(Number.NaN);
}

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
  if (!isValidDate(date)) return false;
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
  if (!isValidDate(startDate) || !Number.isFinite(amount)) {
    return createInvalidDate();
  }

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
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return Number.NaN;
  }

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

function parseTime(timeStr: string): { h: number; m: number } {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { h: hours || 0, m: minutes || 0 };
}

function getTimeInMinutes(date: Date): number {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

/**
 * Calculates the number of business hours between two dates
 */
export function getBusinessHoursBetween(
  definitions: HolidayDefinition[],
  startDate: Date,
  endDate: Date,
  businessHours: { start: string; end: string } = { start: '08:00', end: '17:00' },
): number {
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return Number.NaN;
  }

  const { h: startH, m: startM } = parseTime(businessHours.start);
  const { h: endH, m: endM } = parseTime(businessHours.end);
  const startDayMin = startH * 60 + startM;
  const endDayMin = endH * 60 + endM;

  if (startDayMin >= endDayMin) return 0; // Invalid business hours

  const t1 = startDate.getTime();
  const t2 = endDate.getTime();
  if (t1 === t2) return 0;

  const start = new Date(Math.min(t1, t2));
  const end = new Date(Math.max(t1, t2));
  const isNegative = t1 > t2;

  let totalMinutes = 0;
  const current = new Date(start);

  while (current.getTime() < end.getTime()) {
    if (checkIsBusinessDay(definitions, current)) {
      const currentMin = getTimeInMinutes(current);

      // If current date is the same day as end date
      const isEndDay =
        current.getUTCFullYear() === end.getUTCFullYear() &&
        current.getUTCMonth() === end.getUTCMonth() &&
        current.getUTCDate() === end.getUTCDate();

      const periodEndMin = isEndDay ? Math.min(getTimeInMinutes(end), endDayMin) : endDayMin;
      const periodStartMin = Math.max(currentMin, startDayMin);

      if (periodEndMin > periodStartMin) {
        totalMinutes += periodEndMin - periodStartMin;
      }
    }

    // Move to next day at 00:00
    current.setUTCDate(current.getUTCDate() + 1);
    current.setUTCHours(0, 0, 0, 0);
  }

  return isNegative ? -(totalMinutes / 60) : totalMinutes / 60;
}

/**
 * Adds business hours to a date
 */
export function addBusinessHours(
  definitions: HolidayDefinition[],
  startDate: Date,
  amountInHours: number,
  businessHours: { start: string; end: string } = { start: '08:00', end: '17:00' },
): Date {
  if (!isValidDate(startDate) || !Number.isFinite(amountInHours)) {
    return createInvalidDate();
  }

  if (amountInHours === 0) return new Date(startDate);

  const { h: startH, m: startM } = parseTime(businessHours.start);
  const { h: endH, m: endM } = parseTime(businessHours.end);
  const startDayMin = startH * 60 + startM;
  const endDayMin = endH * 60 + endM;
  const minutesPerDay = endDayMin - startDayMin;

  if (minutesPerDay <= 0) return createInvalidDate();

  const isNegative = amountInHours < 0;
  let remainingMinutes = Math.abs(amountInHours) * 60;

  const current = new Date(startDate);

  // Snap to start or end of business hours if outside
  if (!checkIsBusinessDay(definitions, current)) {
    if (isNegative) {
      current.setUTCHours(endH, endM, 0, 0);
    } else {
      current.setUTCHours(startH, startM, 0, 0);
    }
  } else {
    const min = getTimeInMinutes(current);
    if (min < startDayMin) {
      if (isNegative) {
        // move to previous day end
        current.setUTCDate(current.getUTCDate() - 1);
        current.setUTCHours(endH, endM, 0, 0);
      } else {
        current.setUTCHours(startH, startM, 0, 0);
      }
    } else if (min > endDayMin) {
      if (isNegative) {
        current.setUTCHours(endH, endM, 0, 0);
      } else {
        // move to next day start
        current.setUTCDate(current.getUTCDate() + 1);
        current.setUTCHours(startH, startM, 0, 0);
      }
    }
  }

  while (remainingMinutes > 0) {
    if (!checkIsBusinessDay(definitions, current)) {
      current.setUTCDate(current.getUTCDate() + (isNegative ? -1 : 1));
      current.setUTCHours(isNegative ? endH : startH, isNegative ? endM : startM, 0, 0);
      continue;
    }

    const min = getTimeInMinutes(current);
    let availableMinutes = isNegative ? min - startDayMin : endDayMin - min;

    if (availableMinutes < 0) availableMinutes = 0;

    if (remainingMinutes <= availableMinutes) {
      if (isNegative) {
        current.setUTCMinutes(current.getUTCMinutes() - remainingMinutes);
      } else {
        current.setUTCMinutes(current.getUTCMinutes() + remainingMinutes);
      }
      remainingMinutes = 0;
    } else {
      remainingMinutes -= availableMinutes;
      current.setUTCDate(current.getUTCDate() + (isNegative ? -1 : 1));
      current.setUTCHours(isNegative ? endH : startH, isNegative ? endM : startM, 0, 0);
    }
  }

  return current;
}
