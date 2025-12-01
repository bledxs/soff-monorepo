<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff ID</h1>
  <p>LATAM document validation library - Validate NIT, RUT, CPF, CUIT, and more.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-id)](https://www.npmjs.com/package/soff-id)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-id)](https://bundlephobia.com/package/soff-id)

</div>

---

**Zero dependencies** · **TypeScript** · **~1KB per locale**

## Table of Contents

- [Soff ID](#soff-id)
  - [Table of Contents](#table-of-contents)
  - [Why?](#why)
  - [Install](#install)
  - [Quick Start](#quick-start)
    - [Multi-country Usage](#multi-country-usage)
  - [Available Locales](#available-locales)
  - [API Reference](#api-reference)
    - [`validate{DOC}(value)`](#validatedocvalue)
    - [`format{DOC}(value)`](#formatdocvalue)
    - [`clean{DOC}(value)`](#cleandocvalue)
    - [`calculate{DOC}CheckDigit(value)`](#calculatedoccheckdigitvalue)
  - [Bundle Size](#bundle-size)
  - [Contributing](#contributing)
  - [License](#license)
  - [Documentation](#documentation)

## Why?

Validating a NIT in Colombia (calculating the verification digit), a RUT in Chile, a CPF in Brazil, or a CUIT in Argentina is something that all developers in the region have to reprogram over and over again.

This library provides a modular, tree-shakeable solution using the same architecture as `soff-date`. Import only the validators you need.

## Install

```bash
npm install soff-id
```

## Quick Start

```typescript
// Only Colombia included in bundle (~1KB)
import { validateNIT, formatNIT, calculateNITCheckDigit } from 'soff-id/locales/co';

// Validate NIT
validateNIT('900123456-7'); // → true

// Calculate check digit
calculateNITCheckDigit('900123456'); // → '7'

// Format NIT
formatNIT('9001234567'); // → '900.123.456-7'
```

### Multi-country Usage

```typescript
import { validateCPF, validateCNPJ } from 'soff-id/locales/br';
import { validateRUT } from 'soff-id/locales/cl';
import { validateCUIT } from 'soff-id/locales/ar';
import { validateRFC } from 'soff-id/locales/mx';

// Brazilian CPF
validateCPF('123.456.789-09'); // → true/false

// Chilean RUT
validateRUT('12.345.678-5'); // → true/false

// Argentine CUIT
validateCUIT('20-12345678-9'); // → true/false

// Mexican RFC
validateRFC('XAXX010101000'); // → true/false
```

## Available Locales

| Locale       | Import               | Documents       | Description                               |
| ------------ | -------------------- | --------------- | ----------------------------------------- |
| 🇨🇴 Colombia  | `soff-id/locales/co` | NIT, CC, CE, TI | Tax ID, Cédula, Foreign ID, Identity Card |
| 🇧🇷 Brasil    | `soff-id/locales/br` | CPF, CNPJ       | Individual & Business Tax IDs             |
| 🇦🇷 Argentina | `soff-id/locales/ar` | DNI, CUIT, CUIL | National ID & Tax IDs                     |
| 🇨🇱 Chile     | `soff-id/locales/cl` | RUT, RUN        | Tax ID & National ID                      |
| 🇲🇽 México    | `soff-id/locales/mx` | RFC, CURP       | Tax ID & Personal ID                      |

## API Reference

Each locale exports a consistent set of functions for each document type:

### `validate{DOC}(value)`

Validates if the document is valid.

```typescript
import { validateNIT } from 'soff-id/locales/co';

validateNIT('900123456-7'); // → true
validateNIT('900123456-0'); // → false (wrong check digit)
```

### `format{DOC}(value)`

Formats the document with proper separators.

```typescript
import { formatNIT } from 'soff-id/locales/co';

formatNIT('9001234567'); // → '900.123.456-7'
```

### `clean{DOC}(value)`

Removes all formatting from the document.

```typescript
import { cleanNIT } from 'soff-id/locales/co';

cleanNIT('900.123.456-7'); // → '9001234567'
```

### `calculate{DOC}CheckDigit(value)`

Calculates the check digit (where applicable).

```typescript
import { calculateNITCheckDigit } from 'soff-id/locales/co';

calculateNITCheckDigit('900123456'); // → '7'
```

## Bundle Size

| Import       | Size (minified) |
| ------------ | --------------- |
| `locales/co` | ~1.1KB          |
| `locales/br` | ~1.0KB          |
| `locales/ar` | ~1.0KB          |
| `locales/cl` | ~0.8KB          |
| `locales/mx` | ~1.3KB          |
| Core only    | ~0.5KB          |

Tree-shaking ensures you only ship what you import.

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Documentation

- [Español](docs/README.es.md)
