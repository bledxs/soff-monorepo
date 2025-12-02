import { Coins, Radio, Gem, Binary, Globe, Scale, Percent, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/code-block';
import { Money, COP, USD, MXN, CLP, EUR } from 'soff-money';
import { MoneyCalculator } from './money-calculator';
import { getVersion } from '@/lib/versions';
import { JsonLd } from '@/components/json-ld';

export const metadata = {
  title: 'soff-money - Currency Formatting',
};

function getFormattingExamples() {
  const cop = Money.fromDecimal(1500000, COP);
  const usd = Money.fromDecimal(100.5, USD);
  const mxn = Money.fromDecimal(25000, MXN);
  const clp = Money.fromDecimal(150000, CLP);
  const eur = Money.fromDecimal(1500, EUR);

  return {
    cop: cop.format(),
    usd: usd.format(),
    mxn: mxn.format(),
    clp: clp.format(),
    eur: eur.format(),
    copNoDecimals: cop.format({ showDecimals: false }),
    addition: cop.add(Money.fromDecimal(500000, COP)).format(),
    distribution: Money.fromDecimal(100, USD)
      .distribute(3)
      .map((m) => m.format()),
    percentage: usd.percentage(19).format(),
    withTax: usd.addPercentage(19).format(),
  };
}

export default function SoffMoneyPage() {
  const examples = getFormattingExamples();
  const version = getVersion('soff-money');

  return (
    <article className="space-y-8">
      <JsonLd
        name="soff-money"
        description="Immutable money class with precise arithmetic for LATAM currencies."
        package="soff-money"
      />
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-soff-money/10 p-2">
            <Coins size={36} className="text-soff-money" />
          </div>
          <h1 className="bg-linear-to-r from-soff-money to-soff-money/70 bg-clip-text text-3xl font-bold text-transparent">
            soff-money
          </h1>
          <Badge className="bg-soff-money/20 text-soff-money">v{version}</Badge>
          <Badge variant="outline">~2KB Core</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Immutable money class with precise arithmetic for LATAM currencies.
        </p>
      </div>

      {/* Live Demo */}
      <Card className="border-soff-money/20">
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
              <p className="text-sm text-muted-foreground">CLP (Chilean Peso)</p>
              <p className="font-mono text-lg font-semibold">{examples.clp}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">EUR (Euro)</p>
              <p className="font-mono text-lg font-semibold">{examples.eur}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">19% Tax on $100.50</p>
              <p className="font-mono text-lg font-semibold">{examples.withTax}</p>
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
      <section id="installation">
        <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
        <CodeBlock code="npm install soff-money">npm install soff-money</CodeBlock>
      </section>

      {/* Quick Start */}
      <section id="quick-start">
        <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
        <CodeBlock
          code={`import { Money, COP, USD, MXN } from 'soff-money';

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
// [$33.34, $33.33, $33.33] - no cents lost!`}
        >{`import { Money, COP, USD, MXN } from 'soff-money';

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
// [$33.34, $33.33, $33.33] - no cents lost!`}</CodeBlock>
      </section>

      {/* Key Features */}
      <section id="key-features">
        <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <Globe size={16} /> 9 Currencies
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              COP, MXN, BRL, ARS, USD, CLP, PEN, UYU, EUR with correct formatting.
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
          <div className="rounded-lg border border-border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Percent size={16} /> Percentage Ops
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Calculate, add, or subtract percentages. Perfect for tax/discounts.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Calculator size={16} /> Static Helpers
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Money.sum(), Money.average(), Money.minimum(), Money.maximum()
            </p>
          </div>
        </div>
      </section>

      {/* Available Currencies */}
      <section id="available-currencies">
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
                { name: '🇨🇱 Chilean Peso', code: 'CLP', symbol: '$', example: '$ 150.000' },
                { name: '🇵🇪 Peruvian Sol', code: 'PEN', symbol: 'S/', example: 'S/ 1,500.00' },
                { name: '🇺🇾 Uruguayan Peso', code: 'UYU', symbol: '$', example: '$ 1.500,00' },
                { name: '🇪🇺 Euro', code: 'EUR', symbol: '€', example: '1.500,00 €' },
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
      <section id="api-reference">
        <h2 className="mb-4 text-2xl font-semibold">API Reference</h2>

        <Tabs defaultValue="creation">
          <TabsList className="flex-wrap">
            <TabsTrigger value="creation">Creation</TabsTrigger>
            <TabsTrigger value="arithmetic">Arithmetic</TabsTrigger>
            <TabsTrigger value="percentage">Percentage</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="static">Static Methods</TabsTrigger>
            <TabsTrigger value="formatting">Formatting</TabsTrigger>
          </TabsList>

          <TabsContent value="creation" className="mt-4">
            <CodeBlock
              code={`// From decimal amount
Money.fromDecimal(100.50, USD)    // $100.50

// From cents (smallest unit)
Money.fromCents(10050, USD)       // $100.50

// Zero money
Money.zero(USD)                   // $0.00`}
            >{`// From decimal amount
Money.fromDecimal(100.50, USD)    // $100.50

// From cents (smallest unit)
Money.fromCents(10050, USD)       // $100.50

// Zero money
Money.zero(USD)                   // $0.00`}</CodeBlock>
          </TabsContent>

          <TabsContent value="arithmetic" className="mt-4">
            <CodeBlock
              code={`const a = Money.fromDecimal(100, USD);
const b = Money.fromDecimal(50, USD);

a.add(b)          // $150.00
a.subtract(b)     // $50.00
a.multiply(2)     // $200.00
a.divide(4)       // $25.00
a.abs()           // absolute value
a.negate()        // -$100.00

// Distribution
a.distribute(3)              // [$33.34, $33.33, $33.33]
a.distributeByRatios([1,2,2]) // [$20.00, $40.00, $40.00]`}
            >{`const a = Money.fromDecimal(100, USD);
const b = Money.fromDecimal(50, USD);

a.add(b)          // $150.00
a.subtract(b)     // $50.00
a.multiply(2)     // $200.00
a.divide(4)       // $25.00
a.abs()           // absolute value
a.negate()        // -$100.00

// Distribution
a.distribute(3)              // [$33.34, $33.33, $33.33]
a.distributeByRatios([1,2,2]) // [$20.00, $40.00, $40.00]`}</CodeBlock>
          </TabsContent>

          <TabsContent value="percentage" className="mt-4">
            <CodeBlock
              code={`const price = Money.fromDecimal(100, USD);

// Calculate percentage
price.percentage(19)         // $19.00 (19% of $100)

// Add percentage (tax)
price.addPercentage(19)      // $119.00 (price + 19%)

// Subtract percentage (discount)
price.subtractPercentage(10) // $90.00 (price - 10%)

// Real-world example: Price with tax and discount
const subtotal = Money.fromDecimal(250, USD);
const withTax = subtotal.addPercentage(19);     // $297.50
const withDiscount = withTax.subtractPercentage(5); // $282.63`}
            >{`const price = Money.fromDecimal(100, USD);

// Calculate percentage
price.percentage(19)         // $19.00 (19% of $100)

// Add percentage (tax)
price.addPercentage(19)      // $119.00 (price + 19%)

// Subtract percentage (discount)
price.subtractPercentage(10) // $90.00 (price - 10%)

// Real-world example: Price with tax and discount
const subtotal = Money.fromDecimal(250, USD);
const withTax = subtotal.addPercentage(19);     // $297.50
const withDiscount = withTax.subtractPercentage(5); // $282.63`}</CodeBlock>
          </TabsContent>

          <TabsContent value="comparison" className="mt-4">
            <CodeBlock
              code={`const a = Money.fromDecimal(100, USD);
const b = Money.fromDecimal(50, USD);
const c = Money.fromDecimal(150, USD);

a.equals(b)              // false
a.greaterThan(b)         // true
a.lessThan(b)            // false
a.greaterThanOrEqual(b)  // true
a.lessThanOrEqual(b)     // false

// Min/Max/Clamp
a.min(b)                 // $50.00
a.max(b)                 // $100.00
a.clamp(b, c)            // $100.00 (between $50 and $150)

// Range check
a.isBetween(b, c)        // true (100 is between 50 and 150)

// State checks
a.isZero()      // false
a.isPositive()  // true
a.isNegative()  // false`}
            >{`const a = Money.fromDecimal(100, USD);
const b = Money.fromDecimal(50, USD);
const c = Money.fromDecimal(150, USD);

a.equals(b)              // false
a.greaterThan(b)         // true
a.lessThan(b)            // false
a.greaterThanOrEqual(b)  // true
a.lessThanOrEqual(b)     // false

// Min/Max/Clamp
a.min(b)                 // $50.00
a.max(b)                 // $100.00
a.clamp(b, c)            // $100.00 (between $50 and $150)

// Range check
a.isBetween(b, c)        // true (100 is between 50 and 150)

// State checks
a.isZero()      // false
a.isPositive()  // true
a.isNegative()  // false`}</CodeBlock>
          </TabsContent>

          <TabsContent value="static" className="mt-4">
            <CodeBlock
              code={`const items = [
  Money.fromDecimal(29.99, USD),
  Money.fromDecimal(49.99, USD),
  Money.fromDecimal(19.99, USD),
];

// Sum all values
Money.sum(items)       // $99.97

// Get minimum
Money.minimum(items)   // $19.99

// Get maximum
Money.maximum(items)   // $49.99

// Calculate average
Money.average(items)   // $33.32`}
            >{`const items = [
  Money.fromDecimal(29.99, USD),
  Money.fromDecimal(49.99, USD),
  Money.fromDecimal(19.99, USD),
];

// Sum all values
Money.sum(items)       // $99.97

// Get minimum
Money.minimum(items)   // $19.99

// Get maximum
Money.maximum(items)   // $49.99

// Calculate average
Money.average(items)   // $33.32`}</CodeBlock>
          </TabsContent>

          <TabsContent value="formatting" className="mt-4">
            <CodeBlock
              code={`const price = Money.fromDecimal(1500.50, USD);

price.format()                          // '$1,500.50'
price.format({ showSymbol: false })     // '1,500.50'
price.format({ showDecimals: false })   // '$1,501'
price.format({ symbolPosition: 'after' }) // '1,500.50 $'

price.toDecimal()  // 1500.50
price.toCents()    // 150050 (alias for .cents)
price.cents        // 150050
price.toJSON()     // { cents: 150050, currency: 'USD' }
price.toString()   // '$1,500.50'`}
            >{`const price = Money.fromDecimal(1500.50, USD);

price.format()                          // '$1,500.50'
price.format({ showSymbol: false })     // '1,500.50'
price.format({ showDecimals: false })   // '$1,501'
price.format({ symbolPosition: 'after' }) // '1,500.50 $'

price.toDecimal()  // 1500.50
price.toCents()    // 150050 (alias for .cents)
price.cents        // 150050
price.toJSON()     // { cents: 150050, currency: 'USD' }
price.toString()   // '$1,500.50'`}</CodeBlock>
          </TabsContent>
        </Tabs>
      </section>

      {/* Common Patterns */}
      <section id="common-patterns">
        <h2 className="mb-4 text-2xl font-semibold">Common Patterns</h2>
        <CodeBlock
          code={`// Shopping cart total
const items = [
  Money.fromDecimal(29.99, USD),
  Money.fromDecimal(49.99, USD),
  Money.fromDecimal(19.99, USD),
];
const total = Money.sum(items);  // $99.97

// Apply discount (10% off)
const discounted = total.subtractPercentage(10);  // $89.97

// Tax calculation (19% IVA)
const withTax = discounted.addPercentage(19);  // $107.07

// Split bill (4 people)
const perPerson = withTax.distribute(4);
// [$26.77, $26.77, $26.77, $26.76]

// Price validation
const minOrder = Money.fromDecimal(50, USD);
const maxOrder = Money.fromDecimal(500, USD);

if (!total.isBetween(minOrder, maxOrder)) {
  throw new Error('Order must be between $50 and $500');
}

// Find cheapest/most expensive item
const cheapest = Money.minimum(items);  // $19.99
const mostExpensive = Money.maximum(items);  // $49.99
const average = Money.average(items);  // $33.32`}
        >{`// Shopping cart total
const items = [
  Money.fromDecimal(29.99, USD),
  Money.fromDecimal(49.99, USD),
  Money.fromDecimal(19.99, USD),
];
const total = Money.sum(items);  // $99.97

// Apply discount (10% off)
const discounted = total.subtractPercentage(10);  // $89.97

// Tax calculation (19% IVA)
const withTax = discounted.addPercentage(19);  // $107.07

// Split bill (4 people)
const perPerson = withTax.distribute(4);
// [$26.77, $26.77, $26.77, $26.76]

// Price validation
const minOrder = Money.fromDecimal(50, USD);
const maxOrder = Money.fromDecimal(500, USD);

if (!total.isBetween(minOrder, maxOrder)) {
  throw new Error('Order must be between $50 and $500');
}

// Find cheapest/most expensive item
const cheapest = Money.minimum(items);  // $19.99
const mostExpensive = Money.maximum(items);  // $49.99
const average = Money.average(items);  // $33.32`}</CodeBlock>
      </section>
    </article>
  );
}
