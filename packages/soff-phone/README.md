<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Phone</h1>
  <p>Lightweight, tree-shakeable phone number validation and formatting library for LATAM.</p>
</div>

<div align="center">

</div>

---

## Features

- 🌲 **Tree-shakeable**: Import only the locales you need
- 📦 **Zero dependencies**: Lightweight and fast
- 🇨🇴 **Colombia**: Mobile and landline validation
- 🇲🇽 **Mexico**: 10-digit validation
- ⚡ **Typescript**: Fully typed

## Installation

```bash
npm install soff-phone
# or
pnpm add soff-phone
# or
yarn add soff-phone
```

## Usage

### Colombia 🇨🇴

```typescript
import { validate } from 'soff-phone/co';

// Validate mobile
const mobile = validate('3001234567');
console.log(mobile);
// { isValid: true, type: 'mobile', formatted: '3001234567' }

// Validate landline
const landline = validate('6011234567');
console.log(landline);
// { isValid: true, type: 'landline', formatted: '6011234567' }

// Format E.164
const e164 = validate('3001234567', { format: 'e164' });
console.log(e164.formatted); // +573001234567
```

### Mexico 🇲🇽

```typescript
import { validate } from 'soff-phone/mx';

const result = validate('5512345678');
console.log(result);
// { isValid: true, type: 'unknown', formatted: '5512345678' }
```

## Bundle Size

| Module | Size (minified) | Size (gzipped) |
| ------ | --------------- | -------------- |
| Core   | ~0.5KB          | ~0.3KB         |
| CO     | ~0.8KB          | ~0.4KB         |
| MX     | ~0.8KB          | ~0.4KB         |

## License

MIT © [Luis C. Rojas](https://github.com/bledxs)
