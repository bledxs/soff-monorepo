import type { HolidayDefinition } from '../core/types';
import { createHolidayManager } from '../core/manager';
import { en } from '../i18n/en';

const definitions: HolidayDefinition[] = [
  // Fijos con observed
  {
    key: 'newYear',
    rule: { type: 'fixed', month: 1, day: 1 },
    shift: 'observedUS',
  },
  {
    key: 'independenceDayUS',
    rule: { type: 'fixed', month: 7, day: 4 },
    shift: 'observedUS',
  },
  {
    key: 'veteransDay',
    rule: { type: 'fixed', month: 11, day: 11 },
    shift: 'observedUS',
  },
  {
    key: 'christmas',
    rule: { type: 'fixed', month: 12, day: 25 },
    shift: 'observedUS',
  },

  // Nth weekday
  {
    key: 'mlkDay',
    rule: { type: 'nthWeekday', month: 1, weekday: 1, n: 3 },
  },
  {
    key: 'presidentsDay',
    rule: { type: 'nthWeekday', month: 2, weekday: 1, n: 3 },
  },
  {
    key: 'memorialDay',
    rule: { type: 'nthWeekday', month: 5, weekday: 1, n: -1 },
  },
  {
    key: 'laborDay',
    rule: { type: 'nthWeekday', month: 9, weekday: 1, n: 1 },
  },
  {
    key: 'columbusDay',
    rule: { type: 'nthWeekday', month: 10, weekday: 1, n: 2 },
  },
  {
    key: 'thanksgivingDay',
    rule: { type: 'nthWeekday', month: 11, weekday: 4, n: 4 },
  },
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
} = createHolidayManager(definitions, en);
