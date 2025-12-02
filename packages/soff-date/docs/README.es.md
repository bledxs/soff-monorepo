<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Date</h1>
  <p>Calculadora de festivos ligera y "tree-shakeable" con cálculo algorítmico de fechas.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-date)](https://www.npmjs.com/package/soff-date)
[![License](https://img.shields.io/github/license/bledxs/soff-date)](../LICENSE)
[![Build Status](https://github.com/bledxs/soff-date/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-date/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-date/branch/main/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-date)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-date)](https://bundlephobia.com/package/soff-date)
[![All Contributors](https://img.shields.io/github/all-contributors/bledxs/soff-date?color=ee8449&style=flat-square)](#contributors)

</div>

---

**Cero dependencias** · **TypeScript** · **~3KB por locale**

## Tabla de Contenidos

- [Tabla de Contenidos](#tabla-de-contenidos)
- [🤔 ¿Por qué?](#-por-qué)
- [📦 Instalación](#-instalación)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [🌍 Soporte i18n](#-soporte-i18n)
- [Locales Disponibles](#locales-disponibles)
- [Idiomas Disponibles](#idiomas-disponibles)
- [Explicación de Reglas de Traslado](#explicación-de-reglas-de-traslado)
  - [Emiliani (Colombia, Argentina)](#emiliani-colombia-argentina)
  - [Observed US (USA, UK)](#observed-us-usa-uk)
- [Avanzado: Crea Tu Propio Locale](#avanzado-crea-tu-propio-locale)
- [Avanzado: Usar Algoritmos Directamente](#avanzado-usar-algoritmos-directamente)
- [Tamaño del Bundle](#tamaño-del-bundle)
- [Referencia de API](#referencia-de-api)
  - [`getHolidays(year, options?)`](#getholidaysyear-options)
  - [`isHoliday(date, options?)`](#isholidaydate-options)
  - [`getNextHoliday(from?, options?)`](#getnextholidayfrom-options)
- [Cálculo de Días Hábiles](#cálculo-de-días-hábiles)
- [Tipos](#tipos)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Documentación](#documentación)
- [Contribuidores](#contribuidores)

## 🤔 ¿Por qué?

La mayoría de las librerías de festivos incluyen **archivos JSON gigantes** con fechas hasta 2050. Esta librería **calcula las fechas algorítmicamente**, soportando:

| Característica            | Descripción                      | Ejemplo                         |
| ------------------------- | -------------------------------- | ------------------------------- |
| 📅 **Fechas Fijas**       | Fechas estáticas cada año        | 25 de Diciembre (Navidad)       |
| 📆 **N-ésimo Día**        | Cálculos relativos de días       | 3er Lunes de Enero (MLK Day)    |
| ✨ **Relativo a Pascua**  | Basado en el cálculo de Pascua   | Viernes Santo = Pascua - 2 días |
| 🔄 **Reglas de Traslado** | Mover festivos a días laborables | Ley Emiliani de Colombia        |

**Resultado:** ¡Tamaño de bundle diminuto (~3KB) con soporte ilimitado de años! 🎉

## 📦 Instalación

```bash
# npm
npm install soff-date

# pnpm
pnpm add soff-date

# yarn
yarn add soff-date

# bun
bun add soff-date
```

## 🚀 Inicio Rápido

```typescript
// Solo Colombia incluido en el bundle (~3KB)
import { getHolidays, isHoliday, getNextHoliday } from 'soff-date/locales/co';

// 🏆 Obtener todos los festivos de un año
getHolidays(2025);
// → [{ date: '2025-01-01', key: 'newYear', name: 'Año Nuevo' }, ...]

// ❓ Verificar si una fecha es festivo
isHoliday(new Date('2025-01-01'));
// → { date: '2025-01-01', key: 'newYear', name: 'Año Nuevo' }

isHoliday(new Date('2025-01-02'));
// → null

// ➡️ Obtener el próximo festivo desde una fecha
getNextHoliday(new Date('2025-01-02'));
// → { date: '2025-01-06', key: 'epiphany', name: 'Día de los Reyes Magos' }
```

## 🌍 Soporte i18n

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';

getHolidays(2025, { lang: en });
// → [{ date: '2025-01-01', key: 'newYear', name: "New Year's Day" }, ...]

// Sobrescritura personalizada
getHolidays(2025, { lang: { ...en, newYear: 'Happy New Year!' } });
```

## Locales Disponibles

| Locale       | Import                 | Festivos | Regla de Traslado |
| ------------ | ---------------------- | -------- | ----------------- |
| 🇨🇴 Colombia  | `soff-date/locales/co` | 18       | Emiliani          |
| 🇺🇸 USA       | `soff-date/locales/us` | 10       | Observed          |
| 🇲🇽 México    | `soff-date/locales/mx` | 8        | NthWeekday        |
| 🇦🇷 Argentina | `soff-date/locales/ar` | 16       | NearestMon        |
| 🇧🇷 Brasil    | `soff-date/locales/br` | 13       | None              |

## Idiomas Disponibles

| Idioma    | Import              |
| --------- | ------------------- |
| Español   | `soff-date/i18n/es` |
| English   | `soff-date/i18n/en` |
| Português | `soff-date/i18n/pt` |

## Explicación de Reglas de Traslado

### Emiliani (Colombia, Argentina)

Los festivos que caen en fin de semana **se mueven al Lunes**.

```typescript
// 6 de Enero, 2024 = Sábado → Lunes 8 de Enero
{ date: '2024-01-08', key: 'epiphany', isShifted: true }
```

### Observed US (USA, UK)

- Sábado → Viernes (anterior)
- Domingo → Lunes (siguiente)

```typescript
// 4 de Julio, 2026 = Sábado → Viernes 3 de Julio
{ date: '2026-07-03', key: 'independenceDayUS', isShifted: true }
```

## Avanzado: Crea Tu Propio Locale

```typescript
import type { HolidayDefinition, Holiday, HolidayNames } from 'soff-date';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from 'soff-date';

const definitions: HolidayDefinition[] = [
  // Fecha fija
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },

  // Fija con traslado
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 }, shift: 'observedUS' },

  // N-ésimo día de la semana: 3er Lunes de Enero
  { key: 'mlkDay', rule: { type: 'nthWeekday', month: 1, weekday: 1, n: 3 } },

  // Último Lunes de Mayo
  { key: 'memorialDay', rule: { type: 'nthWeekday', month: 5, weekday: 1, n: -1 } },

  // Relativo a Pascua: Viernes Santo = Pascua - 2
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },

  // Cálculo personalizado
  {
    key: 'custom',
    rule: {
      type: 'custom',
      calc: (year) => new Date(year, 5, 15), // 15 de Junio
    },
  },
];

const names: HolidayNames = {
  newYear: "New Year's Day",
  christmas: 'Christmas',
  // ...
};

export function getHolidays(year: number): Holiday[] {
  return resolveHolidays(definitions, year, names);
}
```

## Avanzado: Usar Algoritmos Directamente

```typescript
import { getEasterSunday } from 'soff-date/core/algorithms/easter';
import { getNthWeekday } from 'soff-date/core/algorithms/nth-weekday';
import { applyShift } from 'soff-date/core/algorithms/shifts';

// Domingo de Pascua 2025
getEasterSunday(2025); // → Date(2025, 3, 20)

// 4to Jueves de Noviembre 2025 (Acción de Gracias)
getNthWeekday(2025, 11, 4, 4); // → Date(2025, 10, 27)

// Aplicar traslado observed
applyShift(new Date('2026-07-04'), 'observedUS');
// → { date: Date(2026-07-03), shifted: true }
```

## Tamaño del Bundle

| Import       | Tamaño (minificado) |
| ------------ | ------------------- |
| `locales/co` | ~5.8KB              |
| `locales/us` | ~4.5KB              |
| `i18n/es`    | ~1.9KB              |
| `i18n/en`    | ~1.1KB              |
| Core only    | ~2.7KB              |

El "Tree-shaking" asegura que solo envíes lo que importas.

## Referencia de API

### `getHolidays(year, options?)`

Retorna todos los festivos para un año dado.

> **Nota:** Algunos festivos pueden caer en la misma fecha (ej. un festivo fijo coincidiendo con uno móvil). Usa siempre `holiday.key` como identificador único, no la fecha.

```typescript
interface GetHolidaysOptions {
  lang?: HolidayNames; // Traducciones personalizadas
}

interface Holiday {
  date: string; // Fecha ISO: '2025-01-01'
  key: string; // Identificador: 'newYear'
  name: string; // Nombre visible: 'Año Nuevo'
  isShifted?: boolean; // True si fue movido por regla de traslado
}
```

### `isHoliday(date, options?)`

Retorna información del festivo si la fecha es festivo, `null` en caso contrario.

### `getNextHoliday(from?, options?)`

Retorna el próximo festivo desde una fecha dada (por defecto hoy).

## Cálculo de Días Hábiles

Además del cálculo de festivos, `soff-date` proporciona utilidades para trabajar con días hábiles (omitiendo fines de semana y festivos).

```typescript
import { isBusinessDay, businessDays, diffBusinessDays } from 'soff-date/locales/co';

// Verificar si una fecha es día hábil
isBusinessDay(new Date('2025-01-01')); // false (Festivo)
isBusinessDay(new Date('2025-01-04')); // false (Sábado)
isBusinessDay(new Date('2025-01-02')); // true

// Sumar días hábiles
businessDays(new Date('2025-01-03'), 1);
// → Date('2025-01-06') (Viernes + 1 día hábil = Lunes)

// Calcular diferencia en días hábiles
diffBusinessDays(new Date('2025-01-06'), new Date('2025-01-10'));
// → 4
```

## Tipos

```typescript
type ShiftRule = 'none' | 'emiliani' | 'observedUS' | 'nextMonday';

type HolidayRule =
  | { type: 'fixed'; month: number; day: number }
  | { type: 'nthWeekday'; month: number; weekday: number; n: number }
  | { type: 'easterRelative'; offset: number }
  | { type: 'custom'; calc: (year: number) => Date };

interface HolidayDefinition {
  key: string;
  rule: HolidayRule;
  shift?: ShiftRule;
}
```

## Contribuir

Por favor lee [CONTRIBUTING.md](../CONTRIBUTING.md) para detalles sobre nuestro código de conducta, y el proceso para enviarnos pull requests.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - mira el archivo [LICENSE](../LICENSE) para detalles.

## Documentación

- [English](../README.md)

## Contribuidores

Gracias a estas personas maravillosas ([emoji key](https://all-contributors.js.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bledxs"><img src="https://avatars.githubusercontent.com/u/90062924?v=4" width="100px;" alt="Luis C. Rojas"/><br /><sub><b>Luis C. Rojas</b></sub></a><br /><a href="https://github.com/bledxs/soff-date/commits?author=bledxs" title="Code">💻</a> <a href="https://github.com/bledxs/soff-date/commits?author=bledxs" title="Documentation">📖</a> <a href="#maintenance-bledxs" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Este proyecto sigue la especificación [all-contributors](https://github.com/all-contributors/all-contributors). ¡Contribuciones de cualquier tipo son bienvenidas!
