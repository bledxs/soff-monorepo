<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Phone</h1>
  <p>Librería ligera y tree-shakeable para validación y formato de números telefónicos en LATAM.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-phone)](https://www.npmjs.com/package/soff-phone)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](../LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)

</div>

---

**Cero dependencias** · **TypeScript** · **Tree-shakeable**

## Características

- 🌲 **Tree-shakeable**: Importa solo los locales que necesites
- 📦 **Cero dependencias**: Ligera y rápida
- 🇨🇴 **Colombia**: Validación de móviles y fijos
- 🇲🇽 **México**: Validación de 10 dígitos
- ⚡ **Typescript**: Completamente tipado

## 📦 Instalación

```bash
# npm
npm install soff-phone

# pnpm
pnpm add soff-phone

# yarn
yarn add soff-phone

# bun
bun add soff-phone
```

## 🚀 Uso

### Colombia 🇨🇴

```typescript
import { validate } from 'soff-phone/co';

// ✅ Validar móvil
const mobile = validate('3001234567');
console.log(mobile);
// { isValid: true, type: 'mobile', formatted: '3001234567' }

// ☎️ Validar fijo
const landline = validate('6011234567');
console.log(landline);
// { isValid: true, type: 'landline', formatted: '6011234567' }

// 🌐 Formato E.164
const e164 = validate('3001234567', { format: 'e164' });
console.log(e164.formatted); // +573001234567
```

### México 🇲🇽

```typescript
import { validate } from 'soff-phone/mx';

const result = validate('5512345678');
console.log(result);
// { isValid: true, type: 'unknown', formatted: '5512345678' }
```

## Tamaño del Bundle

| Módulo | Tamaño (minified) | Tamaño (gzipped) |
| ------ | ----------------- | ---------------- |
| Core   | ~0.5KB            | ~0.3KB           |
| CO     | ~0.8KB            | ~0.4KB           |
| MX     | ~0.8KB            | ~0.4KB           |

## Contribuir

Por favor lee [CONTRIBUTING.md](../../CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## Licencia

MIT © [Luis C. Rojas](https://github.com/bledxs)

## Documentación

- [English](../README.md)
