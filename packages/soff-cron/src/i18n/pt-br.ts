/**
 * Internationalization strings for Portuguese (Brazil)
 */
import type { I18nStrings } from './es.js';

export const ptBR: I18nStrings = {
  at: 'às',
  every: 'a cada',
  everyMinute: 'a cada minuto',
  everyHour: 'a cada hora',
  everyDay: 'todos os dias',
  everyWeek: 'toda semana',
  everyMonth: 'todo mês',
  everyYear: 'todo ano',
  minute: 'minuto',
  minutes: 'minutos',
  hour: 'hora',
  hours: 'horas',
  day: 'dia',
  days: 'dias',
  week: 'semana',
  weeks: 'semanas',
  month: 'mês',
  months: 'meses',
  year: 'ano',
  years: 'anos',
  on: 'em',
  in: 'em',
  and: 'e',
  between: 'entre',
  through: 'até',
  of: 'de',
  second: 'segundo',
  seconds: 'segundos',

  // Day names
  sunday: 'domingo',
  monday: 'segunda-feira',
  tuesday: 'terça-feira',
  wednesday: 'quarta-feira',
  thursday: 'quinta-feira',
  friday: 'sexta-feira',
  saturday: 'sábado',

  // Month names
  january: 'janeiro',
  february: 'fevereiro',
  march: 'março',
  april: 'abril',
  may: 'maio',
  june: 'junho',
  july: 'julho',
  august: 'agosto',
  september: 'setembro',
  october: 'outubro',
  november: 'novembro',
  december: 'dezembro',

  // Time periods
  am: 'AM',
  pm: 'PM',
  midnight: 'meia-noite',
  noon: 'meio-dia',

  // Special
  weekday: 'dias da semana',
  weekend: 'finais de semana',
};

import type { HumanizerPatterns } from './en.js';
import { parseTimeString, parseDayOfWeek } from '../core/humanizer.js';

export const ptBRPatterns: HumanizerPatterns = {
  days: [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ],
  months: [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ],

  patterns: [
    // "a cada minuto" → * * * * *
    {
      regex: /^a\s+cada\s+minuto$/,
      toCron: () => '* * * * *',
      description: 'A cada minuto',
    },

    // "a cada 5 minutos" → */5 * * * *
    {
      regex: /^a\s+cada\s+(\d+)\s+minutos?$/,
      toCron: (match) => `*/${match[1]} * * * *`,
      description: 'A cada N minutos',
    },

    // "a cada hora" → 0 * * * *
    {
      regex: /^a\s+cada\s+hora$/,
      toCron: () => '0 * * * *',
      description: 'A cada hora',
    },

    // "a cada 2 horas" → 0 */2 * * *
    {
      regex: /^a\s+cada\s+(\d+)\s+horas?$/,
      toCron: (match) => `0 */${match[1]} * * *`,
      description: 'A cada N horas',
    },

    // "todos os dias" → 0 0 * * *
    {
      regex: /^todos\s+os\s+dias$/,
      toCron: () => '0 0 * * *',
      description: 'Todos os dias à meia-noite',
    },

    // "todos os dias às 2am" or "todos os dias as 14:30"
    {
      regex: /^todos\s+os\s+dias\s+[aà]s?\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Formato de hora inválido');
        return `${time.minute} ${time.hour} * * *`;
      },
      description: 'Todos os dias a uma hora específica',
    },

    // "toda semana" → 0 0 * * 0
    {
      regex: /^toda\s+semana$/,
      toCron: () => '0 0 * * 0',
      description: 'Toda semana (domingo à meia-noite)',
    },

    // "todas as segundas" or "toda segunda-feira"
    {
      regex:
        /^(?:todas\s+as|toda)\s+(segunda-feira|ter[çc]a-feira|quarta-feira|quinta-feira|sexta-feira|s[aá]bado|domingo|segundas|ter[çc]as|quartas|quintas|sextas)$/,
      toCron: (match, patterns) => {
        // Strip plural/suffix if needed or map directly
        const dayStr = match[1].replace(/s$/, '').replace('-feira', '');
        // handle 'segunda', 'terça' to map correctly
        const dayMap: Record<string, string> = {
          segunda: 'segunda-feira',
          terça: 'terça-feira',
          terca: 'terça-feira',
          quarta: 'quarta-feira',
          quinta: 'quinta-feira',
          sexta: 'sexta-feira',
          sábado: 'sábado',
          sabado: 'sábado',
          domingo: 'domingo',
        };
        const mapped = dayMap[dayStr] || match[1];
        const day = parseDayOfWeek(mapped, patterns);
        if (day === null) throw new Error('Dia inválido');
        return `0 0 * * ${day}`;
      },
      description: 'Cada dia específico da semana',
    },

    // "todas as segundas às 10am"
    {
      regex: /^(?:todas\s+as|toda)\s+(.+?)\s+[aà]s?\s+(.+)$/,
      toCron: (match, patterns) => {
        const dayStr = match[1].replace(/s$/, '').replace('-feira', '');
        const dayMap: Record<string, string> = {
          segunda: 'segunda-feira',
          terça: 'terça-feira',
          terca: 'terça-feira',
          quarta: 'quarta-feira',
          quinta: 'quinta-feira',
          sexta: 'sexta-feira',
          sábado: 'sábado',
          sabado: 'sábado',
          domingo: 'domingo',
        };
        const mapped = dayMap[dayStr] || match[1];
        const day = parseDayOfWeek(mapped, patterns);
        const time = parseTimeString(match[2]);
        if (day === null || !time) throw new Error('Dia ou hora inválida');
        return `${time.minute} ${time.hour} * * ${day}`;
      },
      description: 'Cada dia específico a uma hora específica',
    },

    // "todo mês" → 0 0 1 * *
    {
      regex: /^todo\s+m[êe]s$/,
      toCron: () => '0 0 1 * *',
      description: 'Todo mês (dia 1 à meia-noite)',
    },

    // "todo ano" → 0 0 1 1 *
    {
      regex: /^todo\s+ano$/,
      toCron: () => '0 0 1 1 *',
      description: 'Todo ano (1 de janeiro à meia-noite)',
    },

    // "às 2am" or "as 14:30"
    {
      regex: /^[aà]s?\s+(.+)$/,
      toCron: (match) => {
        const time = parseTimeString(match[1]);
        if (!time) throw new Error('Formato de hora inválido');
        return `${time.minute} ${time.hour} * * *`;
      },
      description: 'Diariamente a uma hora específica',
    },
  ],
};
