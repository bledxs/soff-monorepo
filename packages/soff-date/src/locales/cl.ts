import type { HolidayDefinition, Holiday, HolidayNames } from '../core/types';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from '../core/engine';
import {
  checkIsBusinessDay,
  addBusinessDays,
  getBusinessDaysBetween,
  addBusinessHours,
  getBusinessHoursBetween,
} from '../core/business';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'holySaturday', rule: { type: 'easterRelative', offset: -1 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'navyDay', rule: { type: 'fixed', month: 5, day: 21 } },
  { key: 'indigenousPeoplesDay', rule: { type: 'fixed', month: 6, day: 21 } },
  { key: 'saintPeterPaul', rule: { type: 'fixed', month: 6, day: 29 }, shift: 'nearestMonday' },
  { key: 'ourLadyOfMountCarmel', rule: { type: 'fixed', month: 7, day: 16 } },
  { key: 'assumptionMary', rule: { type: 'fixed', month: 8, day: 15 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 9, day: 18 } },
  { key: 'armyDay', rule: { type: 'fixed', month: 9, day: 19 } },
  { key: 'columbusDay', rule: { type: 'fixed', month: 10, day: 12 }, shift: 'nearestMonday' },
  { key: 'reformationDay', rule: { type: 'fixed', month: 10, day: 31 }, shift: 'nearestMonday' },
  { key: 'allSaints', rule: { type: 'fixed', month: 11, day: 1 } },
  { key: 'immaculateConception', rule: { type: 'fixed', month: 12, day: 8 } },
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 } },
];

export interface GetHolidaysOptions {
  lang?: HolidayNames;
}

export function getHolidays(year: number, options?: GetHolidaysOptions): Holiday[] {
  const names = options?.lang ?? es;
  return resolveHolidays(definitions, year, names);
}

export function isHoliday(date: Date, options?: GetHolidaysOptions): Holiday | null {
  const names = options?.lang ?? es;
  return checkIsHoliday(definitions, date, names);
}

export function getNextHoliday(
  from: Date = new Date(),
  options?: GetHolidaysOptions,
): Holiday | null {
  const names = options?.lang ?? es;
  return findNextHoliday(definitions, from, names);
}

export function isBusinessDay(date: Date): boolean {
  return checkIsBusinessDay(definitions, date);
}

export function businessDays(date: Date, amount: number): Date {
  return addBusinessDays(definitions, date, amount);
}

export function diffBusinessDays(startDate: Date, endDate: Date): number {
  return getBusinessDaysBetween(definitions, startDate, endDate);
}

export function businessHours(
  date: Date,
  amount: number,
  businessHours?: { start: string; end: string },
): Date {
  return addBusinessHours(definitions, date, amount, businessHours);
}

export function diffBusinessHours(
  startDate: Date,
  endDate: Date,
  businessHours?: { start: string; end: string },
): number {
  return getBusinessHoursBetween(definitions, startDate, endDate, businessHours);
}
