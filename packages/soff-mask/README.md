<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Mask</h1>
  <p>Lightweight, framework-agnostic input masking library.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-mask)](https://www.npmjs.com/package/soff-mask)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-mask)](https://bundlephobia.com/package/soff-mask)

</div>

---

**Zero dependencies** · **TypeScript** · **~3KB core**

## Table of Contents

- [Soff Mask](#soff-mask)
  - [Table of Contents](#table-of-contents)
  - [Why?](#why)
  - [Install](#install)
  - [Quick Start](#quick-start)
  - [Mask Pattern Syntax](#mask-pattern-syntax)
    - [Pattern Examples](#pattern-examples)
  - [Pre-built Masks](#pre-built-masks)
    - [Available Pre-built Masks](#available-pre-built-masks)
      - [Phones](#phones)
      - [Credit Cards](#credit-cards)
      - [Documents (LATAM)](#documents-latam)
      - [Dates and Time](#dates-and-time)
      - [Other](#other)
  - [Utility Functions](#utility-functions)
  - [DOM Integration](#dom-integration)
    - [Vanilla JavaScript](#vanilla-javascript)
    - [With React](#with-react)
    - [Mask Controller](#mask-controller)
  - [Dynamic Masks](#dynamic-masks)
  - [Bundle Size](#bundle-size)
  - [Contributing](#contributing)
  - [License](#license)
  - [Documentation](#documentation)

## 🤔 Why?

Making an input auto-format as you type is **surprisingly hard**:

```
User types: 3001234567
You want:   (300) 123-4567 ✨
```

Current solutions:

- ❌ Tied to specific frameworks (react-input-mask)
- ❌ Heavy bundles (10KB+)
- ❌ Limited customization

This library is:

- ✅ **Framework agnostic** - Works with React, Vue, Angular, or vanilla JS
- ✅ **Lightweight** - ~3KB core
- ✅ **Flexible** - Custom masks, pre-built patterns, dynamic masks
- ✅ **TypeScript first** - Full type safety

## 📦 Install

```bash
# npm
npm install soff-mask

# pnpm
pnpm add soff-mask

# yarn
yarn add soff-mask

# bun
bun add soff-mask
```

## 🚀 Quick Start

```typescript
import { mask, unmask } from 'soff-mask';

// ✨ Apply mask
mask('3001234567', '(###) ###-####');
// → '(300) 123-4567'

// 🧯 Remove mask
unmask('(300) 123-4567', '(###) ###-####');
// → '3001234567'
```

## Mask Pattern Syntax

| Character | Description                |
| --------- | -------------------------- |
| `#`       | Any digit (0-9)            |
| `A`       | Any letter (a-z, A-Z)      |
| `S`       | Any alphanumeric character |
| `*`       | Any character              |
| Other     | Literal character          |

### Pattern Examples

```typescript
// Phone formats
'(###) ###-####'; // US: (555) 123-4567
'### ### ####'; // CO: 300 123 4567
'+## ## ####-####'; // BR: +55 11 1234-5678

// Documents
'###.###.###-##'; // CPF: 123.456.789-09
'##.###.###/####-##'; // CNPJ: 12.345.678/0001-90

// Credit Card
'#### #### #### ####'; // 4111 1111 1111 1111

// Date
'##/##/####'; // 25/12/2024
```

## Pre-built Masks

```typescript
import { phoneCO, phoneMX, phoneUS, creditCard, cpf, nit, date } from 'soff-mask';

mask('3001234567', phoneCO); // → '(300) 123-4567'
mask('4111111111111111', creditCard); // → '4111 1111 1111 1111'
mask('12345678909', cpf); // → '123.456.789-09'
mask('9001234567', nit); // → '900.123.456-7'
```

### Available Pre-built Masks

#### Phones

| Mask        | Pattern             | Example Output    |
| ----------- | ------------------- | ----------------- |
| `phoneCO`   | `(###) ### ####`    | (300) 123 4567    |
| `phoneMX`   | `(##) #### ####`    | (55) 1234 5678    |
| `phoneUS`   | `(###) ###-####`    | (555) 123-4567    |
| `phoneBR`   | `(##) #####-####`   | (11) 91234-5678   |
| `phoneAR`   | `(##) ####-####`    | (11) 1234-5678    |
| `phoneIntl` | `+# (###) ###-####` | +1 (555) 123-4567 |

#### Credit Cards

| Mask             | Pattern               | Example Output      |
| ---------------- | --------------------- | ------------------- |
| `creditCard`     | `#### #### #### ####` | 4111 1111 1111 1111 |
| `creditCardAmex` | `#### ###### #####`   | 3782 822463 10005   |
| `cardExpiry`     | `##/##`               | 12/24               |
| `cvv`            | `###`                 | 123                 |
| `cvvAmex`        | `####`                | 1234                |

#### Documents (LATAM)

| Mask   | Pattern              | Example Output     |
| ------ | -------------------- | ------------------ |
| `cpf`  | `###.###.###-##`     | 123.456.789-09     |
| `cnpj` | `##.###.###/####-##` | 12.345.678/0001-90 |
| `rut`  | `##.###.###-S`       | 12.345.678-9       |
| `cuit` | `##-########-#`      | 20-12345678-9      |
| `nit`  | `###.###.###-#`      | 900.123.456-7      |

#### Dates and Time

| Mask            | Pattern      | Example Output |
| --------------- | ------------ | -------------- |
| `date`          | `##/##/####` | 25/12/2024     |
| `dateDMY`       | `##/##/####` | 25/12/2024     |
| `dateMDY`       | `##/##/####` | 12/25/2024     |
| `dateISO`       | `####-##-##` | 2024-12-25     |
| `time24`        | `##:##`      | 14:30          |
| `time24Seconds` | `##:##:##`   | 14:30:00       |
| `time12`        | `##:## AA`   | 02:30 PM       |

#### Other

| Mask         | Pattern           | Example Output |
| ------------ | ----------------- | -------------- |
| `zipUS`      | `#####`           | 12345          |
| `zipUS4`     | `#####-####`      | 12345-6789     |
| `zipBR`      | `#####-###`       | 12345-678      |
| `ipAddress`  | `###.###.###.###` | 192.168.1.1    |
| `percentage` | `##.##%`          | 99.99%         |

## Utility Functions

Beyond basic masking, the library provides utilities for common use cases:

```typescript
import {
  mask,
  unmask,
  maskWithResult,
  isComplete,
  getPatternLength,
  getPlaceholder,
  isValidFormat,
  getNextCursorPosition,
  extractRaw,
  parsePattern,
  createDynamicMask,
} from 'soff-mask';

// Check if input is complete
isComplete('(300) 123-4567', '(###) ###-####'); // → true
isComplete('(300) 123-45', '(###) ###-####'); // → false

// Get expected length of masked output
getPatternLength('(###) ###-####'); // → 14

// Generate placeholder text
getPlaceholder('(###) ###-####'); // → '(___) ___-____'
getPlaceholder('##/##/####', '*'); // → '**/**/****'

// Validate format matches pattern
isValidFormat('(300) 123-4567', '(###) ###-####'); // → true
isValidFormat('300-123-4567', '(###) ###-####'); // → false

// Get next cursor position (useful for input handling)
getNextCursorPosition('(30', '(###) ###-####'); // → 3

// Extract raw value (alias for unmask with extras stripped)
extractRaw('(300) 123-4567', '(###) ###-####'); // → '3001234567'

// Parse pattern into tokens (advanced use)
parsePattern('##/##'); // → [{type: 'digit'}, {type: 'digit'}, {type: 'literal', char: '/'}, ...]
```

## DOM Integration

### Vanilla JavaScript

```typescript
import { maskInput } from 'soff-mask/dom';

const input = document.querySelector('input');
const cleanup = maskInput(input, '(###) ###-####');

// Later: cleanup() to remove event listeners
```

### With React

```typescript
import { useEffect, useRef } from 'react';
import { maskInput } from 'soff-mask/dom';
import { phoneCO } from 'soff-mask';

function PhoneInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      return maskInput(inputRef.current, phoneCO);
    }
  }, []);

  return <input ref={inputRef} />;
}
```

### Mask Controller

For more control over the masking process:

```typescript
import { createMaskController } from 'soff-mask/dom';

const controller = createMaskController('(###) ###-####');

// Apply mask programmatically
controller.apply('3001234567'); // → '(300) 123-4567'

// Get current values
controller.value; // → '(300) 123-4567'
controller.raw; // → '3001234567'

// Bind to an input
const cleanup = controller.bind(inputElement, {
  onChange: (masked, raw) => console.log({ masked, raw }),
});
```

## Dynamic Masks

For inputs that need different masks based on length:

```typescript
import { createDynamicMask, mask } from 'soff-mask';

// Phone that accepts 9 or 10 digits
const phoneMask = createDynamicMask([
  { maxLength: 9, pattern: '#### ####' },
  { maxLength: 10, pattern: '(##) #### ####' },
]);

mask('12345678', phoneMask); // → '1234 5678'
mask('1234567890', phoneMask); // → '(12) 3456 7890'
```

## Bundle Size

| Import       | Size (minified) |
| ------------ | --------------- |
| `core`       | ~3.2KB          |
| `masks`      | ~1.1KB          |
| `dom`        | ~3.7KB          |
| Full package | ~5.8KB          |

Tree-shaking ensures you only ship what you import.

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Documentation

- [Español](docs/README.es.md)
