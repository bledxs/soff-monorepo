import type { HolidayDefinition, Holiday, HolidayNames } from './types.js';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from './engine.js';
import {
  checkIsBusinessDay,
  addBusinessDays,
  getBusinessDaysBetween,
  addBusinessHours,
  getBusinessHoursBetween,
} from './business.js';

export interface GetHolidaysOptions {
  lang?: HolidayNames;
}

export function createHolidayManager(definitions: HolidayDefinition[], defaultLang: HolidayNames) {
  return {
    getHolidays: (year: number, options?: GetHolidaysOptions): Holiday[] => {
      const names = options?.lang ?? defaultLang;
      return resolveHolidays(definitions, year, names);
    },
    isHoliday: (date: Date, options?: GetHolidaysOptions): Holiday | null => {
      const names = options?.lang ?? defaultLang;
      return checkIsHoliday(definitions, date, names);
    },
    getNextHoliday: (from: Date = new Date(), options?: GetHolidaysOptions): Holiday | null => {
      const names = options?.lang ?? defaultLang;
      return findNextHoliday(definitions, from, names);
    },
    isBusinessDay: (date: Date): boolean => {
      return checkIsBusinessDay(definitions, date);
    },
    businessDays: (date: Date, amount: number): Date => {
      return addBusinessDays(definitions, date, amount);
    },
    diffBusinessDays: (startDate: Date, endDate: Date): number => {
      return getBusinessDaysBetween(definitions, startDate, endDate);
    },
    businessHours: (
      date: Date,
      amount: number,
      businessHours?: { start: string; end: string },
    ): Date => {
      return addBusinessHours(definitions, date, amount, businessHours);
    },
    diffBusinessHours: (
      startDate: Date,
      endDate: Date,
      businessHours?: { start: string; end: string },
    ): number => {
      return getBusinessHoursBetween(definitions, startDate, endDate, businessHours);
    },
  };
}
