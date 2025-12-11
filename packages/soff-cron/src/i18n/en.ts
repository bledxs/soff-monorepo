import type { I18nStrings } from './es.js';
import { parseTimeString, parseDayOfWeek } from '../core/humanizer.js';

export const en: I18nStrings = {
  at: 'at',
  every: 'every',
  everyMinute: 'every minute',
  everyHour: 'every hour',
  everyDay: 'every day',
  everyWeek: 'every week',
  everyMonth: 'every month',
  everyYear: 'every year',
  minute: 'minute',
  minutes: 'minutes',
  hour: 'hour',
  hours: 'hours',
  day: 'day',
  days: 'days',
  week: 'week',
  weeks: 'weeks',
  month: 'month',
  months: 'months',
  year: 'year',
  years: 'years',
  on: 'on',
  in: 'in',
  and: 'and',
  between: 'between',
  through: 'through',
  of: 'of',
  second: 'second',
  seconds: 'seconds',

  // Day names
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',

  // Month names
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',

  // Time periods
  am: 'AM',
  pm: 'PM',
  midnight: 'midnight',
  noon: 'noon',

  // Special
  weekday: 'weekday',
  weekend: 'weekend',
};

/**
 * Pattern for converting natural language to cron
 */
export interface HumanizerPattern {
  /**
   * Regular expression to match the pattern
   */
  regex: RegExp;

  /**
   * Function to convert match groups to cron expression
   */
  toCron: (match: RegExpMatchArray, patterns: HumanizerPatterns) => string;

  /**
   * Description of what this pattern matches
   */
  description: string;
}

/**
 * Collection of patterns and helper data for humanizer
 */
export interface HumanizerPatterns {
  days: string[];
  months: string[];
  patterns: HumanizerPattern[];
}

export const enPatterns: HumanizerPatterns = {
  days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  months: [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ],

  patterns: [
    // "every minute" → */1 * * * *
    {
      regex: /^every\s+minute$/,
      toCron: () => '* * * * *',
      description: 'Every minute',
    },

    // "every 5 minutes" → */5 * * * *
    {
      regex: /^every\s+(\d+)\s+minutes?$/,
      toCron: (match) => `*/${match[1]} * * * *`,
      description: 'Every N minutes',
    },

    // "every hour" → 0 * * * *
    {
      regex: /^every\s+hour$/,
      toCron: () => '0 * * * *',
      description: 'Every hour',
    },

    // "every 2 hours" → 0 */2 * * *
    {
      regex: /^every\s+(\d+)\s+hours?$/,
      toCron: (match) => `0 */${match[1]} * * *`,
      description: 'Every N hours',
    },

    // "every day" → 0 0 * * *
    {
      regex: /^every\s+day$/,
      toCron: () => '0 0 * * *',
      description: 'Every day at midnight',
    },

    // "every day at 2am" or "every day at 14:30"
    {
      regex: /^every\s+day\s+at\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Invalid time format');
        return `${time.minute} ${time.hour} * * *`;
      },
      description: 'Every day at specific time',
    },

    // "every week" → 0 0 * * 0
    {
      regex: /^every\s+week$/,
      toCron: () => '0 0 * * 0',
      description: 'Every week (Sunday at midnight)',
    },

    // "every monday" or "every mon"
    {
      regex:
        /^every\s+(monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun)$/,
      toCron: (match, patterns) => {
        const day = parseDayOfWeek(match[1], patterns);
        if (day === null) throw new Error('Invalid day');
        return `0 0 * * ${day}`;
      },
      description: 'Every specific day of week',
    },

    // "every monday at 10am"
    {
      regex:
        /^every\s+(monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun)\s+at\s+(.+)$/,
      toCron: (match, patterns) => {
        const day = parseDayOfWeek(match[1], patterns);
        const time = parseTimeString(match[2]);
        if (day === null || !time) throw new Error('Invalid day or time');
        return `${time.minute} ${time.hour} * * ${day}`;
      },
      description: 'Every specific day at specific time',
    },

    // "every month" → 0 0 1 * *
    {
      regex: /^every\s+month$/,
      toCron: () => '0 0 1 * *',
      description: 'Every month (1st at midnight)',
    },

    // "on the 1st of every month" or "on the 15th of every month"
    {
      regex: /^on\s+the\s+(\d{1,2})(?:st|nd|rd|th)?\s+of\s+every\s+month(?:\s+at\s+(.+))?$/,
      toCron: (match) => {
        const day = parseInt(match[1], 10);
        if (day < 1 || day > 31) throw new Error('Invalid day of month');

        if (match[2]) {
          const time = parseTimeString(match[2]);
          if (!time) throw new Error('Invalid time format');
          return `${time.minute} ${time.hour} ${day} * *`;
        }
        return `0 0 ${day} * *`;
      },
      description: 'Specific day of every month',
    },

    // "every year" → 0 0 1 1 *
    {
      regex: /^every\s+year$/,
      toCron: () => '0 0 1 1 *',
      description: 'Every year (Jan 1st at midnight)',
    },

    // "at 2am" or "at 14:30"
    {
      regex: /^at\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Invalid time format');
        return `${time.minute} ${time.hour} * * *`;
      },
      description: 'Daily at specific time',
    },

    // "weekdays at 9am" or "on weekdays at 9am"
    {
      regex: /^(?:on\s+)?weekdays?\s+at\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Invalid time format');
        return `${time.minute} ${time.hour} * * 1-5`;
      },
      description: 'Weekdays at specific time',
    },

    // "weekends at 10am" or "on weekends at 10am"
    {
      regex: /^(?:on\s+)?weekends?\s+at\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Invalid time format');
        return `${time.minute} ${time.hour} * * 0,6`;
      },
      description: 'Weekends at specific time',
    },
  ],
};
