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
  { key: 'carnivalMonday', rule: { type: 'easterRelative', offset: -48 } },
  { key: 'carnivalTuesday', rule: { type: 'easterRelative', offset: -47 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 }, shift: 'nearestMonday' },
  { key: 'battleOfPichincha', rule: { type: 'fixed', month: 5, day: 24 }, shift: 'nearestMonday' },
  {
    key: 'firstCryOfIndependence',
    rule: { type: 'fixed', month: 8, day: 10 },
    shift: 'nearestMonday',
  },
  {
    key: 'independenceOfGuayaquil',
    rule: { type: 'fixed', month: 10, day: 9 },
    shift: 'nearestMonday',
  },
  { key: 'allSoulsDay', rule: { type: 'fixed', month: 11, day: 2 } },
  { key: 'independenceOfCuenca', rule: { type: 'fixed', month: 11, day: 3 } },
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
