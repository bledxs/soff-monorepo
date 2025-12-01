# soff-phone

Librería ligera y tree-shakeable para validación y formato de números telefónicos en LATAM.

## Características

- 🌲 **Tree-shakeable**: Importa solo los locales que necesites
- 📦 **Cero dependencias**: Ligera y rápida
- 🇨🇴 **Colombia**: Validación de móviles y fijos
- 🇲🇽 **México**: Validación de 10 dígitos
- ⚡ **Typescript**: Completamente tipado

## Instalación

```bash
npm install soff-phone
# o
pnpm add soff-phone
# o
yarn add soff-phone
```

## Uso

### Colombia 🇨🇴

```typescript
import { validate } from 'soff-phone/co';

// Validar móvil
const mobile = validate('3001234567');
console.log(mobile);
// { isValid: true, type: 'mobile', formatted: '3001234567' }

// Validar fijo
const landline = validate('6011234567');
console.log(landline);
// { isValid: true, type: 'landline', formatted: '6011234567' }

// Formato E.164
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

## Licencia

MIT © [Luis C. Rojas](https://github.com/bledxs)
