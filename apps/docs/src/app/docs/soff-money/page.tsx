import { Coins, Radio, Gem, Binary, Globe, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/code-block';
import { Money, COP, USD, MXN, BRL, ARS } from 'soff-money';
import { MoneyCalculator } from './money-calculator';
import { getVersion } from '@/lib/versions';

export const metadata = {
  title: 'soff-money - Currency Formatting',
};

function getFormattingExamples() {
  const cop = Money.fromDecimal(1500000, COP);
  const usd = Money.fromDecimal(100.5, USD);
  const mxn = Money.fromDecimal(25000, MXN);

  return {
    cop: cop.format(),
    usd: usd.format(),
    mxn: mxn.format(),
    copNoDecimals: cop.format({ showDecimals: false }),
    addition: cop.add(Money.fromDecimal(500000, COP)).format(),
    distribution: Money.fromDecimal(100, USD)
      .distribute(3)
      .map((m) => m.format()),
  };
}

export default function SoffMoneyPage() {
  const examples = getFormattingExamples();
  const version = getVersion('soff-money');

  return (
    <article className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <Coins size={36} className="text-soff-money" />
          <h1 className="text-3xl font-bold">soff-money</h1>
          <Badge>v{version}</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Immutable money class with precise arithmetic for LATAM currencies.
        </p>
      </div>

      {/* Live Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio size={18} className="text-red-500" /> Live Demo - Money Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MoneyCalculator />
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Formatting Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">COP (Colombian Peso)</p>
              <p className="font-mono text-lg font-semibold">{examples.cop}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">USD (US Dollar)</p>
              <p className="font-mono text-lg font-semibold">{examples.usd}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">MXN (Mexican Peso)</p>
              <p className="font-mono text-lg font-semibold">{examples.mxn}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Addition (COP)</p>
              <p className="font-mono text-lg font-semibold">{examples.addition}</p>
            </div>
            <div className="rounded-lg bg-muted p-4 sm:col-span-2">
              <p className="text-sm text-muted-foreground">$100 USD ÷ 3 (fair distribution)</p>
              <p className="font-mono text-lg font-semibold">{examples.distribution.join(' + ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Installation */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
        <CodeBlock code="npm install soff-money">npm install soff-money</CodeBlock>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`import { Money, COP, USD, MXN } from 'soff-money';

// Create money from decimal
const price = Money.fromDecimal(1500000, COP);
price.format();  // '$ 1.500.000'

// Create from cents (smallest unit)
const cents = Money.fromCents(10050, USD);
cents.format();  // '$100.50'

// Arithmetic (immutable - returns new instance)
const total = price.add(Money.fromDecimal(500000, COP));
total.format();  // '$ 2.000.000'

// Distribution without losing cents
const shares = Money.fromDecimal(100, USD).distribute(3);
// [$33.34, $33.33, $33.33] - no cents lost!`}</code>
        </pre>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Gem size={16} /> Immutable
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              All operations return new Money instances. Safe for React state.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Binary size={16} /> Integer Arithmetic
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Uses cents internally to avoid floating-point precision issues.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Globe size={16} /> LATAM Currencies
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pre-configured COP, MXN, BRL, ARS, USD with correct formatting.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Scale size={16} /> Fair Distribution
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Split money without losing cents. Perfect for bill splitting.
            </p>
          </div>
        </div>
      </section>

      {/* Available Currencies */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Available Currencies</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Currency</th>
                <th className="px-4 py-3 text-left font-medium">Code</th>
                <th className="px-4 py-3 text-left font-medium">Symbol</th>
                <th className="px-4 py-3 text-left font-medium">Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: '🇨🇴 Colombian Peso', code: 'COP', symbol: '$', example: '$ 1.500.000' },
                { name: '🇲🇽 Mexican Peso', code: 'MXN', symbol: '$', example: '$25,000.00' },
                { name: '🇧🇷 Brazilian Real', code: 'BRL', symbol: 'R$', example: 'R$ 1.500,00' },
                { name: '🇦🇷 Argentine Peso', code: 'ARS', symbol: '$', example: '$ 150.000,00' },
                { name: '🇺🇸 US Dollar', code: 'USD', symbol: '$', example: '$1,500.00' },
              ].map((c) => (
                <tr key={c.code} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3 font-mono">{c.code}</td>
                  <td className="px-4 py-3 font-mono">{c.symbol}</td>
                  <td className="px-4 py-3 font-mono">{c.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* API Reference */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">API Reference</h2>

        <Tabs defaultValue="creation">
          <TabsList>
            <TabsTrigger value="creation">Creation</TabsTrigger>
            <TabsTrigger value="arithmetic">Arithmetic</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="formatting">Formatting</TabsTrigger>
          </TabsList>

          <TabsContent value="creation" className="mt-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`// From decimal amount
Money.fromDecimal(100.50, USD)    // $100.50

// From cents (smallest unit)
Money.fromCents(10050, USD)       // $100.50

// Zero money
Money.zero(USD)                   // $0.00`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="arithmetic" className="mt-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`const a = Money.fromDecimal(100, USD);
const b = Money.fromDecimal(50, USD);

a.add(b)          // $150.00
a.subtract(b)     // $50.00
a.multiply(2)     // $200.00
a.divide(4)       // $25.00
a.abs()           // absolute value
a.negate()        // -$100.00

// Distribution
a.distribute(3)              // [$33.34, $33.33, $33.33]
a.distributeByRatios([1,2,2]) // [$20.00, $40.00, $40.00]`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="comparison" className="mt-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`const a = Money.fromDecimal(100, USD);
const b = Money.fromDecimal(50, USD);

a.equals(b)              // false
a.greaterThan(b)         // true
a.lessThan(b)            // false
a.greaterThanOrEqual(b)  // true
a.lessThanOrEqual(b)     // false

a.isZero()      // false
a.isPositive()  // true
a.isNegative()  // false`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="formatting" className="mt-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`const price = Money.fromDecimal(1500.50, USD);

price.format()                          // '$1,500.50'
price.format({ showSymbol: false })     // '1,500.50'
price.format({ showDecimals: false })   // '$1,501'
price.format({ symbolPosition: 'after' }) // '1,500.50 $'

price.toDecimal()  // 1500.50
price.cents        // 150050
price.toJSON()     // { cents: 150050, currency: 'USD' }
price.toString()   // '$1,500.50'`}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </section>

      {/* Common Patterns */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Common Patterns</h2>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`// Shopping cart total
const items = [
  Money.fromDecimal(29.99, USD),
  Money.fromDecimal(49.99, USD),
  Money.fromDecimal(19.99, USD),
];
const total = items.reduce((sum, item) => sum.add(item), Money.zero(USD));

// Apply discount
const discount = total.multiply(0.10);  // 10% off
const final = total.subtract(discount);

// Tax calculation
const tax = final.multiply(0.19);  // 19% IVA
const withTax = final.add(tax);

// Split bill
const perPerson = withTax.distribute(4);  // 4 people`}</code>
        </pre>
      </section>
    </article>
  );
}
