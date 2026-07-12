import type { HolidayDefinition } from '../core/types';
import { createHolidayManager } from '../core/manager';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  // First Monday of Feb (Constitution)
  { key: 'constitutionDay', rule: { type: 'nthWeekday', month: 2, weekday: 1, n: 1 } },
  // Third Monday of Mar (Benito Juarez)
  { key: 'benitoJuarez', rule: { type: 'nthWeekday', month: 3, weekday: 1, n: 3 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 9, day: 16 } },
  // Third Monday of Nov (Revolution)
  { key: 'revolutionDay', rule: { type: 'nthWeekday', month: 11, weekday: 1, n: 3 } },
  // Transmission of Executive Power
  {
    key: 'transmissionExecutive',
    rule: {
      type: 'custom',
      calc: (year) => {
        if (year >= 2024) {
          if ((year - 2024) % 6 === 0) return new Date(Date.UTC(year, 9, 1)); // Oct 1
        } else if ((year - 2018) % 6 === 0) {
          // 2018, 2012, etc.
          return new Date(Date.UTC(year, 11, 1)); // Dec 1
        }
        return null;
      },
    },
  },
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 } },
];

export const {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
  diffBusinessDays,
  businessHours,
  diffBusinessHours,
} = createHolidayManager(definitions, es);
