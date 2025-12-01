# Soff Mask

[![npm](https://img.shields.io/npm/v/soff-mask)](https://www.npmjs.com/package/soff-mask)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-mask)](https://bundlephobia.com/package/soff-mask)

Librería de máscaras de input ligera y agnóstica de framework.

**Sin dependencias** · **TypeScript** · **~3KB core**

## Tabla de Contenidos

- [¿Por qué?](#por-qué)
- [Instalación](#instalación)
- [Inicio Rápido](#inicio-rápido)
- [Sintaxis de Patrones](#sintaxis-de-patrones)
- [Máscaras Pre-construidas](#máscaras-pre-construidas)
- [Integración DOM](#integración-dom)
- [Máscaras Dinámicas](#máscaras-dinámicas)
- [Tamaño del Bundle](#tamaño-del-bundle)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## ¿Por qué?

Hacer que un input de teléfono se auto-formatee mientras escribes `(300) 123-4567` es difícil. Las librerías actuales (react-input-mask, etc.) suelen ser pesadas o estar atadas a un framework específico.

Esta librería provee un motor de máscaras en JavaScript puro que funciona con cualquier cosa - React, Vue, Angular, o HTML plano.

## Instalación

```bash
npm install soff-mask
```

## Inicio Rápido

```typescript
import { mask, unmask } from 'soff-mask';

// Aplicar máscara
mask('3001234567', '(###) ###-####');
// → '(300) 123-4567'

// Remover máscara
unmask('(300) 123-4567', '(###) ###-####');
// → '3001234567'
```

## Sintaxis de Patrones

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

| Máscara      | Patrón                | Ejemplo de Salida   |
| ------------ | --------------------- | ------------------- |
| `phoneCO`    | `(###) ### ####`      | (300) 123 4567      |
| `phoneMX`    | `(##) #### ####`      | (55) 1234 5678      |
| `phoneUS`    | `(###) ###-####`      | (555) 123-4567      |
| `creditCard` | `#### #### #### ####` | 4111 1111 1111 1111 |
| `cpf`        | `###.###.###-##`      | 123.456.789-09      |
| `cnpj`       | `##.###.###/####-##`  | 12.345.678/0001-90  |
| `nit`        | `###.###.###-#`       | 900.123.456-7       |
| `date`       | `##/##/####`          | 25/12/2024          |

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

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
