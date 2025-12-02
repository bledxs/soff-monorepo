<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff ID</h1>
  <p>Librería de validación de documentos LATAM - Valida NIT, RUT, CPF, CUIT, y más.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-id)](https://www.npmjs.com/package/soff-id)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-id)](https://bundlephobia.com/package/soff-id)

</div>

---

**Sin dependencias** · **TypeScript** · **~1KB por locale**

## Tabla de Contenidos

- [¿Por qué?](#por-qué)
- [Instalación](#instalación)
- [Inicio Rápido](#inicio-rápido)
- [Locales Disponibles](#locales-disponibles)
- [Referencia de API](#referencia-de-api)
- [Tamaño del Bundle](#tamaño-del-bundle)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## 🤔 ¿Por qué?

Validar documentos de identidad en LATAM es algo que **todos los desarrolladores** de la región tenemos que implementar:

| País         | Documentos      | Complejidad                            |
| ------------ | --------------- | -------------------------------------- |
| 🇨🇴 Colombia  | NIT, CC, CE, TI | ✅ Algoritmo de dígito de verificación |
| 🇧🇷 Brasil    | CPF, CNPJ       | ✅ Dos dígitos verificadores           |
| 🇦🇷 Argentina | DNI, CUIT, CUIL | ✅ Módulo 11                           |
| 🇨🇱 Chile     | RUT, RUN        | ✅ Dígito verificador con 'K'          |
| 🇲🇽 México    | RFC, CURP       | ✅ Validación compleja                 |

Esta librería provee **algoritmos oficiales** de forma modular y tree-shakeable. ¡Importa solo lo que necesitas! 🌳

## 📦 Instalación

```bash
# npm
npm install soff-id

# pnpm
pnpm add soff-id

# yarn
yarn add soff-id

# bun
bun add soff-id
```

## 🚀 Inicio Rápido

```typescript
// Solo Colombia incluido en el bundle (~1KB)
import { validateNIT, formatNIT, calculateNITCheckDigit } from 'soff-id/locales/co';

// ✅ Validar NIT
validateNIT('900123456-7'); // → true

// 🧠 Calcular dígito de verificación
calculateNITCheckDigit('900123456'); // → '7'

// 🎨 Formatear NIT
formatNIT('9001234567'); // → '900.123.456-7'
```

### Uso Multi-país

```typescript
import { validateCPF, validateCNPJ } from 'soff-id/locales/br';
import { validateRUT } from 'soff-id/locales/cl';
import { validateCUIT } from 'soff-id/locales/ar';
import { validateRFC } from 'soff-id/locales/mx';

// CPF Brasileño
validateCPF('123.456.789-09'); // → true/false

// RUT Chileno
validateRUT('12.345.678-5'); // → true/false

// CUIT Argentino
validateCUIT('20-12345678-9'); // → true/false

// RFC Mexicano
validateRFC('XAXX010101000'); // → true/false
```

## Locales Disponibles

| Locale       | Import               | Documentos      | Descripción                                        |
| ------------ | -------------------- | --------------- | -------------------------------------------------- |
| 🇨🇴 Colombia  | `soff-id/locales/co` | NIT, CC, CE, TI | NIT, Cédula, Cédula Extranjería, Tarjeta Identidad |
| 🇧🇷 Brasil    | `soff-id/locales/br` | CPF, CNPJ       | IDs Fiscales Individuales y Empresariales          |
| 🇦🇷 Argentina | `soff-id/locales/ar` | DNI, CUIT, CUIL | DNI e IDs Fiscales                                 |
| 🇨🇱 Chile     | `soff-id/locales/cl` | RUT, RUN        | ID Fiscal e ID Nacional                            |
| 🇲🇽 México    | `soff-id/locales/mx` | RFC, CURP       | ID Fiscal e ID Personal                            |

## Referencia de API

Cada locale exporta un conjunto consistente de funciones para cada tipo de documento:

### `validate{DOC}(value)`

Valida si el documento es válido.

```typescript
import { validateNIT } from 'soff-id/locales/co';

validateNIT('900123456-7'); // → true
validateNIT('900123456-0'); // → false (dígito incorrecto)
```

### `format{DOC}(value)`

Formatea el documento con los separadores apropiados.

```typescript
import { formatNIT } from 'soff-id/locales/co';

formatNIT('9001234567'); // → '900.123.456-7'
```

### `clean{DOC}(value)`

Remueve todo el formato del documento.

```typescript
import { cleanNIT } from 'soff-id/locales/co';

cleanNIT('900.123.456-7'); // → '9001234567'
```

### `calculate{DOC}CheckDigit(value)`

Calcula el dígito de verificación (donde aplique).

```typescript
import { calculateNITCheckDigit } from 'soff-id/locales/co';

calculateNITCheckDigit('900123456'); // → '7'
```

## Tamaño del Bundle

| Import       | Tamaño (minified) |
| ------------ | ----------------- |
| `locales/co` | ~1.1KB            |
| `locales/br` | ~1.0KB            |
| `locales/ar` | ~1.0KB            |
| `locales/cl` | ~0.8KB            |
| `locales/mx` | ~1.3KB            |
| Core only    | ~0.5KB            |

Tree-shaking asegura que solo envías lo que importas.

## Contribuir

Por favor lee [CONTRIBUTING.md](../../CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
