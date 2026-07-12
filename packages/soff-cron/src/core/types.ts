/**
 * Represents a parsed cron expression field with its values
 */
export interface CronField {
  /**
   * Raw value from the cron expression (e.g., "*", "0-5", step values)
   */
  raw: string;

  /**
   * Parsed values as an array of numbers
   * For "*", this will be all valid values for the field
   * For ranges like "0-5", this will be [0, 1, 2, 3, 4, 5]
   * For steps, this will be [0, 15, 30, 45] (example)
   */
  values: number[];

  /**
   * Whether this field uses the wildcard "*"
   */
  isWildcard: boolean;

  /**
   * Whether this field uses a range (e.g., "0-5")
   */
  isRange: boolean;

  /**
   * Whether this field uses a step value
   */
  isStep: boolean;

  /**
   * Whether this field is a list of values (e.g., "1,3,5")
   */
  isList: boolean;
}

/**
 * Represents a fully parsed cron expression
 */
export interface ParsedCron {
  /**
   * The original cron expression string
   */
  expression: string;

  /**
   * Minute field (0-59)
   */
  minute: CronField;

  /**
   * Hour field (0-23)
   */
  hour: CronField;

  /**
   * Day of month field (1-31)
   */
  dayOfMonth: CronField;

  /**
   * Month field (1-12)
   */
  month: CronField;

  /**
   * Day of week field (0-7, where 0 and 7 are Sunday)
   */
  dayOfWeek: CronField;

  /**
   * Optional second field (0-59) for 6-field cron expressions
   */
  second?: CronField;

  /**
   * Whether this is a special expression like @daily, @hourly, etc.
   */
  isSpecial: boolean;

  /**
   * The special keyword if applicable
   */
  specialKeyword?: string;
}

/**
 * Locale options for formatting
 */
export type Locale = 'es' | 'en' | 'pt-BR';

/**
 * Options for formatting cron expressions
 */
export interface FormatterOptions {
  /**
   * Locale for the output text
   * @default 'en'
   */
  locale?: Locale;

  /**
   * Whether to use 24-hour format for times
   * @default true
   */
  use24HourFormat?: boolean;

  /**
   * Whether to include seconds in the output (for 6-field cron)
   * @default false
   */
  includeSeconds?: boolean;

  /**
   * Whether to use verbose descriptions
   * @default false
   */
  verbose?: boolean;
}

/**
 * Validation result for cron expressions
 */
export interface ValidationResult {
  /**
   * Whether the cron expression is valid
   */
  isValid: boolean;

  /**
   * Error message if validation failed
   */
  error?: string;

  /**
   * The field that caused the error (if applicable)
   */
  field?: 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek' | 'second';
}

/**
 * Special cron keywords and their equivalents
 */
export const SPECIAL_KEYWORDS: Record<string, string> = {
  '@yearly': '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly': '0 0 1 * *',
  '@weekly': '0 0 * * 0',
  '@daily': '0 0 * * *',
  '@midnight': '0 0 * * *',
  '@hourly': '0 * * * *',
};

/**
 * Field constraints for validation
 */
export interface FieldConstraints {
  min: number;
  max: number;
  name: string;
}

export const FIELD_CONSTRAINTS: Record<string, FieldConstraints> = {
  minute: { min: 0, max: 59, name: 'minute' },
  hour: { min: 0, max: 23, name: 'hour' },
  dayOfMonth: { min: 1, max: 31, name: 'day of month' },
  month: { min: 1, max: 12, name: 'month' },
  dayOfWeek: { min: 0, max: 7, name: 'day of week' },
  second: { min: 0, max: 59, name: 'second' },
};

/**
 * Month names mapping (1-12)
 */
export const MONTH_NAMES: Record<string, number> = {
  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12,
};

/**
 * Day of week names mapping (0-7)
 */
export const DAY_NAMES: Record<string, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};
