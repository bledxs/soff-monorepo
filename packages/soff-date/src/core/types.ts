export type HolidayRule =
  | { type: 'fixed'; month: number; day: number }
  | { type: 'nthWeekday'; month: number; weekday: number; n: number }
  | { type: 'easterRelative'; offset: number }
  | { type: 'custom'; calc: (year: number) => Date | null };

export type ShiftRule = 'none' | 'emiliani' | 'observedUS' | 'nextMonday' | 'nearestMonday';

export interface HolidayDefinition {
  key: string;
  rule: HolidayRule;
  shift?: ShiftRule;
}

export interface Holiday {
  date: string;
  key: string;
  name: string;
  isShifted?: boolean;
}

export type HolidayNames = Record<string, string>;
export type LocaleTranslations = Record<string, HolidayNames>;

export interface BusinessHours {
  /**
   * Start time in HH:mm format (24h)
   * Example: "08:00"
   */
  start: string;
  /**
   * End time in HH:mm format (24h)
   * Example: "17:00"
   */
  end: string;
}
