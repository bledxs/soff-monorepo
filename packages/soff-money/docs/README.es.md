# Soff Money

[![npm](https://img.shields.io/npm/v/soff-money)](https://www.npmjs.com/package/soff-money)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-money)](https://bundlephobia.com/package/soff-money)

Manejo seguro de dinero para JavaScript con aritmética basada en enteros y formato de locales LATAM.

**Sin dependencias** · **TypeScript** · **~6KB core**

## Tabla de Contenidos

- [¿Por qué?](#por-qué)
- [Instalación](#instalación)
- [Inicio Rápido](#inicio-rápido)
- [Distribución Justa](#distribución-justa)
- [Locales Disponibles](#locales-disponibles)
- [Referencia de API](#referencia-de-api)
- [Tamaño del Bundle](#tamaño-del-bundle)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## ¿Por qué?

En JavaScript, `0.1 + 0.2 === 0.30000000000000004`. Esto es fatal para aplicaciones de e-commerce o financieras. Además, formatear monedas en Latinoamérica es doloroso - ¿el símbolo va antes o después? ¿Puntos o comas para los miles?

Esta librería maneja dinero usando enteros (patrón Safe Money) y formatea según el locale del país.

## Instalación

```bash
npm install soff-money
```

## Inicio Rápido

```typescript
import { Money, COP, USD } from 'soff-money';

// Crear dinero desde decimal (seguro - convertido a centavos internamente)
const precio = Money.fromDecimal(1500000, COP);

// Operaciones aritméticas (todas retornan nuevas instancias de Money)
const conIva = precio.multiply(1.19); // Agregar 19% IVA
const conDescuento = conIva.multiply(0.9); // 10% descuento

// Formatear para mostrar
console.log(precio.format()); // "$ 1.500.000"
console.log(conDescuento.format()); // "$ 1.606.500"

// Comparaciones seguras
precio.equals(Money.fromDecimal(1500000, COP)); // true
precio.greaterThan(conDescuento); // false
```

## Distribución Justa

Cuando divides dinero, nunca pierdes centavos:

```typescript
const cuenta = Money.fromDecimal(100, COP);
const [alice, bob, charlie] = cuenta.distribute(3);

// alice:   $33.34
// bob:     $33.33
// charlie: $33.33
// Total:   $100.00 ✓ (¡no $99.99!)
```

¡El centavo extra va a la primera persona - no se pierde dinero!

### Distribución Proporcional

```typescript
const total = Money.fromDecimal(100, USD);
const [parte1, parte2] = total.distributeBy([70, 30]);

// parte1: $70.00 (70%)
// parte2: $30.00 (30%)
```

## Locales Disponibles

| Locale       | Import                  | Moneda | Símbolo | Formato     |
| ------------ | ----------------------- | ------ | ------- | ----------- |
| 🇨🇴 Colombia  | `soff-money/locales/co` | COP    | $       | $ 1.500.000 |
| 🇲🇽 México    | `soff-money/locales/mx` | MXN    | $       | $1,500.00   |
| 🇦🇷 Argentina | `soff-money/locales/ar` | ARS    | $       | $ 1.500,00  |
| 🇧🇷 Brasil    | `soff-money/locales/br` | BRL    | R$      | R$ 1.500,00 |
| 🇺🇸 USA       | `soff-money/locales/us` | USD    | $       | $1,500.00   |

## Referencia de API

### Crear Money

```typescript
// Desde decimal (recomendado)
Money.fromDecimal(1500.5, COP);

// Desde centavos (cuando ya tienes centavos)
Money.fromCents(150050, COP);

// Cero
Money.zero(COP);
```

### Operaciones Aritméticas

Todas las operaciones retornan nuevas instancias de Money (inmutable):

```typescript
const a = Money.fromDecimal(100, COP);
const b = Money.fromDecimal(50, COP);

a.add(b); // $150
a.subtract(b); // $50
a.multiply(2); // $200
a.multiply(0.5); // $50
a.divide(2); // $50
a.percentage(10); // $10 (10% de a)
a.negate(); // -$100
a.abs(); // $100 (valor absoluto)
```

### Comparaciones

```typescript
a.equals(b); // false
a.greaterThan(b); // true
a.greaterThanOrEqual(b); // true
a.lessThan(b); // false
a.lessThanOrEqual(b); // false
a.isZero(); // false
a.isPositive(); // true
a.isNegative(); // false
```

### Formateo

```typescript
const precio = Money.fromDecimal(1500000, COP);

precio.format(); // "$ 1.500.000"
precio.toDecimal(); // 1500000
precio.toCents(); // 150000000
precio.toString(); // "COP 1500000.00"
```

## Tamaño del Bundle

| Import           | Tamaño (minified) |
| ---------------- | ----------------- |
| `core`           | ~6.2KB            |
| `locales/co`     | ~0.3KB            |
| `locales/mx`     | ~0.3KB            |
| `locales/ar`     | ~0.3KB            |
| `locales/br`     | ~0.3KB            |
| `locales/us`     | ~0.3KB            |
| Paquete completo | ~7.2KB            |

Tree-shaking asegura que solo envías lo que importas.

## Contribuir

Por favor lee [CONTRIBUTING.md](../../CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
