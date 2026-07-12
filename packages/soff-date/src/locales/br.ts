import type { HolidayDefinition } from '../core/types';
import { createHolidayManager } from '../core/manager';
import { pt } from '../i18n/pt';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'carnivalMonday', rule: { type: 'easterRelative', offset: -48 } },
  { key: 'carnivalTuesday', rule: { type: 'easterRelative', offset: -47 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'tiradentesDay', rule: { type: 'fixed', month: 4, day: 21 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'corpusChristi', rule: { type: 'easterRelative', offset: 60 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 9, day: 7 } },
  { key: 'ladyAparecida', rule: { type: 'fixed', month: 10, day: 12 } },
  { key: 'allSouls', rule: { type: 'fixed', month: 11, day: 2 } },
  { key: 'republicProclamation', rule: { type: 'fixed', month: 11, day: 15 } },
  { key: 'blackConsciousness', rule: { type: 'fixed', month: 11, day: 20 } },
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
} = createHolidayManager(definitions, pt);
