<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Mask</h1>
  <p>Librería de máscaras de input ligera y agnóstica de framework.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-mask)](https://www.npmjs.com/package/soff-mask)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-mask)](https://bundlephobia.com/package/soff-mask)

</div>

---

**Sin dependencias** · **TypeScript** · **~3KB core**

## Tabla de Contenidos

- [Soff Mask](#soff-mask)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [¿Por qué?](#por-qué)
  - [Instalación](#instalación)
  - [Inicio Rápido](#inicio-rápido)
  - [Sintaxis de Patrones de Máscara](#sintaxis-de-patrones-de-máscara)
    - [Ejemplos de Patrones](#ejemplos-de-patrones)
  - [Máscaras Pre-construidas](#máscaras-pre-construidas)
    - [Máscaras Pre-construidas Disponibles](#máscaras-pre-construidas-disponibles)
      - [Teléfonos](#teléfonos)
      - [Tarjetas de Crédito](#tarjetas-de-crédito)
      - [Documentos (LATAM)](#documentos-latam)
      - [Fechas y Hora](#fechas-y-hora)
      - [Otros](#otros)
  - [Funciones Utilitarias](#funciones-utilitarias)
  - [Integración DOM](#integración-dom)
    - [JavaScript Vanilla](#javascript-vanilla)
    - [Con React](#con-react)
    - [Controlador de Máscara](#controlador-de-máscara)
  - [Máscaras Dinámicas](#máscaras-dinámicas)
  - [Tamaño del Bundle](#tamaño-del-bundle)
  - [Contribuir](#contribuir)
  - [Licencia](#licencia)
  - [Documentación](#documentación)

## 🤔 ¿Por qué?

Hacer que un input se auto-formatee mientras escribes es **sorprendentemente difícil**:

```
Usuario escribe: 3001234567
Tú quieres:      (300) 123-4567 ✨
```

Soluciones actuales:

- ❌ Atadas a frameworks específicos (react-input-mask)
- ❌ Bundles pesados (10KB+)
- ❌ Personalización limitada

Esta librería es:

- ✅ **Agnóstica de framework** - Funciona con React, Vue, Angular o JS vanilla
- ✅ **Ligera** - ~3KB core
- ✅ **Flexible** - Máscaras personalizadas, patrones pre-construidos, máscaras dinámicas
- ✅ **TypeScript first** - Seguridad de tipos completa

## 📦 Instalación

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

## 🚀 Inicio Rápido

```typescript
import { mask, unmask } from 'soff-mask';

// ✨ Aplicar máscara
mask('3001234567', '(###) ###-####');
// → '(300) 123-4567'

// 🧹 Remover máscara
unmask('(300) 123-4567', '(###) ###-####');
// → '3001234567'
```

## Sintaxis de Patrones de Máscara

| Carácter | Descripción                |
| -------- | -------------------------- |
| `#`      | Cualquier dígito (0-9)     |
| `A`      | Cualquier letra (a-z, A-Z) |
| `S`      | Cualquier alfanumérico     |
| `*`      | Cualquier carácter         |
| Otro     | Carácter literal           |

### Ejemplos de Patrones

```typescript
// Formatos de teléfono
'(###) ###-####'; // US: (555) 123-4567
'### ### ####'; // CO: 300 123 4567
'+## ## ####-####'; // BR: +55 11 1234-5678

// Documentos
'###.###.###-##'; // CPF: 123.456.789-09
'##.###.###/####-##'; // CNPJ: 12.345.678/0001-90

// Tarjeta de Crédito
'#### #### #### ####'; // 4111 1111 1111 1111

// Fecha
'##/##/####'; // 25/12/2024
```

## Máscaras Pre-construidas

```typescript
import { phoneCO, phoneMX, phoneUS, creditCard, cpf, nit, date } from 'soff-mask';

mask('3001234567', phoneCO); // → '(300) 123-4567'
mask('4111111111111111', creditCard); // → '4111 1111 1111 1111'
mask('12345678909', cpf); // → '123.456.789-09'
mask('9001234567', nit); // → '900.123.456-7'
```

### Máscaras Pre-construidas Disponibles

#### Teléfonos

| Máscara     | Patrón              | Ejemplo de Salida |
| ----------- | ------------------- | ----------------- |
| `phoneCO`   | `(###) ### ####`    | (300) 123 4567    |
| `phoneMX`   | `(##) #### ####`    | (55) 1234 5678    |
| `phoneUS`   | `(###) ###-####`    | (555) 123-4567    |
| `phoneBR`   | `(##) #####-####`   | (11) 91234-5678   |
| `phoneAR`   | `(##) ####-####`    | (11) 1234-5678    |
| `phoneIntl` | `+# (###) ###-####` | +1 (555) 123-4567 |

#### Tarjetas de Crédito

| Máscara          | Patrón                | Ejemplo de Salida   |
| ---------------- | --------------------- | ------------------- |
| `creditCard`     | `#### #### #### ####` | 4111 1111 1111 1111 |
| `creditCardAmex` | `#### ###### #####`   | 3782 822463 10005   |
| `cardExpiry`     | `##/##`               | 12/24               |
| `cvv`            | `###`                 | 123                 |
| `cvvAmex`        | `####`                | 1234                |

#### Documentos (LATAM)

| Máscara | Patrón               | Ejemplo de Salida  |
| ------- | -------------------- | ------------------ |
| `cpf`   | `###.###.###-##`     | 123.456.789-09     |
| `cnpj`  | `##.###.###/####-##` | 12.345.678/0001-90 |
| `rut`   | `##.###.###-S`       | 12.345.678-9       |
| `cuit`  | `##-########-#`      | 20-12345678-9      |
| `nit`   | `###.###.###-#`      | 900.123.456-7      |

#### Fechas y Hora

| Máscara         | Patrón       | Ejemplo de Salida |
| --------------- | ------------ | ----------------- |
| `date`          | `##/##/####` | 25/12/2024        |
| `dateDMY`       | `##/##/####` | 25/12/2024        |
| `dateMDY`       | `##/##/####` | 12/25/2024        |
| `dateISO`       | `####-##-##` | 2024-12-25        |
| `time24`        | `##:##`      | 14:30             |
| `time24Seconds` | `##:##:##`   | 14:30:00          |
| `time12`        | `##:## AA`   | 02:30 PM          |

#### Otros

| Máscara      | Patrón            | Ejemplo de Salida |
| ------------ | ----------------- | ----------------- |
| `zipUS`      | `#####`           | 12345             |
| `zipUS4`     | `#####-####`      | 12345-6789        |
| `zipBR`      | `#####-###`       | 12345-678         |
| `ipAddress`  | `###.###.###.###` | 192.168.1.1       |
| `percentage` | `##.##%`          | 99.99%            |

## Funciones Utilitarias

Más allá del enmascaramiento básico, la librería provee utilidades para casos de uso comunes:

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

// Verificar si el input está completo
isComplete('(300) 123-4567', '(###) ###-####'); // → true
isComplete('(300) 123-45', '(###) ###-####'); // → false

// Obtener longitud esperada de la salida enmascarada
getPatternLength('(###) ###-####'); // → 14

// Generar texto de placeholder
getPlaceholder('(###) ###-####'); // → '(___) ___-____'
getPlaceholder('##/##/####', '*'); // → '**/**/****'

// Validar que el formato coincida con el patrón
isValidFormat('(300) 123-4567', '(###) ###-####'); // → true
isValidFormat('300-123-4567', '(###) ###-####'); // → false

// Obtener siguiente posición del cursor (útil para manejo de input)
getNextCursorPosition('(30', '(###) ###-####'); // → 3

// Extraer valor crudo (alias para unmask con extras removidos)
extractRaw('(300) 123-4567', '(###) ###-####'); // → '3001234567'

// Parsear patrón en tokens (uso avanzado)
parsePattern('##/##'); // → [{type: 'digit'}, {type: 'digit'}, {type: 'literal', char: '/'}, ...]
```

## Integración DOM

### JavaScript Vanilla

```typescript
import { maskInput } from 'soff-mask/dom';

const input = document.querySelector('input');
const cleanup = maskInput(input, '(###) ###-####');

// Después: cleanup() para remover event listeners
```

### Con React

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

### Controlador de Máscara

Para más control sobre el proceso de enmascaramiento:

```typescript
import { createMaskController } from 'soff-mask/dom';

const controller = createMaskController('(###) ###-####');

// Aplicar máscara programáticamente
controller.apply('3001234567'); // → '(300) 123-4567'

// Obtener valores actuales
controller.value; // → '(300) 123-4567'
controller.raw; // → '3001234567'

// Vincular a un input
const cleanup = controller.bind(inputElement, {
  onChange: (masked, raw) => console.log({ masked, raw }),
});
```

## Máscaras Dinámicas

Para inputs que necesitan diferentes máscaras según la longitud:

```typescript
import { createDynamicMask, mask } from 'soff-mask';

// Teléfono que acepta 9 o 10 dígitos
const phoneMask = createDynamicMask([
  { maxLength: 9, pattern: '#### ####' },
  { maxLength: 10, pattern: '(##) #### ####' },
]);

mask('12345678', phoneMask); // → '1234 5678'
mask('1234567890', phoneMask); // → '(12) 3456 7890'
```

## Tamaño del Bundle

| Import           | Tamaño (minified) |
| ---------------- | ----------------- |
| `core`           | ~3.2KB            |
| `masks`          | ~1.1KB            |
| `dom`            | ~3.7KB            |
| Paquete completo | ~5.8KB            |

Tree-shaking asegura que solo envías lo que importas.

## Contribuir

Por favor lee [CONTRIBUTING.md](../../CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](../LICENSE) para más detalles.

## Documentación

- [English](../README.md)
