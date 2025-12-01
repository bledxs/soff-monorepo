import { Theater, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/code-block';
import { mask, unmask, maskWithResult } from 'soff-mask';
import { phoneCO, cpf, creditCard, dateDMY } from 'soff-mask';
import { MaskDemo } from './mask-demo';

export const metadata = {
  title: 'soff-mask - Input Masking',
};

function getMaskingExamples() {
  return {
    phone: mask('3001234567', phoneCO),
    cpf: mask('12345678909', cpf),
    card: mask('4111111111111111', creditCard),
    date: mask('25122024', dateDMY),
    unmaskExample: unmask('(300) 123 4567', phoneCO),
    maskResult: maskWithResult('300123', phoneCO),
  };
}

export default function SoffMaskPage() {
  const examples = getMaskingExamples();

  return (
    <article className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <Theater size={36} className="text-primary" />
          <h1 className="text-3xl font-bold">soff-mask</h1>
          <Badge>v0.1.0</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Input masking for forms - Phone numbers, documents, credit cards, dates and more.
        </p>
      </div>

      {/* Live Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio size={18} className="text-red-500" /> Live Demo - Try it!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MaskDemo />
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Masking Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">mask(&quot;3001234567&quot;, phoneCO)</p>
              <p className="font-mono text-lg font-semibold">{examples.phone}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">mask(&quot;12345678909&quot;, cpf)</p>
              <p className="font-mono text-lg font-semibold">{examples.cpf}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                mask(&quot;4111111111111111&quot;, creditCard)
              </p>
              <p className="font-mono text-lg font-semibold">{examples.card}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">unmask(&quot;(300) 123 4567&quot;)</p>
              <p className="font-mono text-lg font-semibold">{examples.unmaskExample}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Installation */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
        <CodeBlock code="npm install soff-mask">npm install soff-mask</CodeBlock>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`import { mask, unmask, maskWithResult } from 'soff-mask';
import { phoneCO, cpf, creditCard } from 'soff-mask';

// Apply a mask
mask('3001234567', phoneCO);        // '(300) 123 4567'
mask('12345678909', cpf);            // '123.456.789-09'

// Remove mask
unmask('(300) 123 4567', phoneCO);   // '3001234567'

// Get detailed result
maskWithResult('300123', phoneCO);
// { value: '(300) 123', raw: '300123', complete: false, cursorPosition: 9 }

// Custom pattern
mask('ABC123', 'AAA-###');           // 'ABC-123'`}</code>
        </pre>
      </section>

      {/* Pattern Tokens */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Pattern Tokens</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[400px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Token</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-left font-medium">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono">#</td>
                <td className="px-4 py-3">Any digit (0-9)</td>
                <td className="px-4 py-3 font-mono">###-#### → 123-4567</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono">A</td>
                <td className="px-4 py-3">Any letter (a-z, A-Z)</td>
                <td className="px-4 py-3 font-mono">AAA → ABC</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono">S</td>
                <td className="px-4 py-3">Any alphanumeric</td>
                <td className="px-4 py-3 font-mono">SSS → A1B</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono">*</td>
                <td className="px-4 py-3">Any character</td>
                <td className="px-4 py-3 font-mono">*** → @#!</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">\</td>
                <td className="px-4 py-3">Escape next character</td>
                <td className="px-4 py-3 font-mono">\## → #1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pre-built Masks */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Pre-built Masks</h2>

        <Tabs defaultValue="phone">
          <TabsList>
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="dates">Dates</TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="mt-4">
            <div className="grid gap-2">
              {[
                { name: 'phoneCO', pattern: '(###) ### ####', example: '(300) 123 4567' },
                { name: 'phoneMX', pattern: '(##) #### ####', example: '(55) 1234 5678' },
                { name: 'phoneUS', pattern: '(###) ###-####', example: '(555) 123-4567' },
                { name: 'phoneBR', pattern: '(##) #####-####', example: '(11) 91234-5678' },
                { name: 'phoneAR', pattern: '(##) ####-####', example: '(11) 1234-5678' },
              ].map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <code className="font-semibold">{m.name}</code>
                  <span className="font-mono text-muted-foreground">{m.example}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <div className="grid gap-2">
              {[
                { name: 'cpf', pattern: '###.###.###-##', example: '123.456.789-09' },
                { name: 'cnpj', pattern: '##.###.###/####-##', example: '12.345.678/0001-90' },
                { name: 'rut', pattern: '##.###.###-S', example: '12.345.678-K' },
                { name: 'cuit', pattern: '##-########-#', example: '20-12345678-9' },
                { name: 'nit', pattern: '###.###.###-#', example: '900.123.456-7' },
              ].map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <code className="font-semibold">{m.name}</code>
                  <span className="font-mono text-muted-foreground">{m.example}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cards" className="mt-4">
            <div className="grid gap-2">
              {[
                {
                  name: 'creditCard',
                  pattern: '#### #### #### ####',
                  example: '4111 1111 1111 1111',
                },
                {
                  name: 'creditCardAmex',
                  pattern: '#### ###### #####',
                  example: '3782 822463 10005',
                },
                { name: 'cardExpiry', pattern: '##/##', example: '12/24' },
                { name: 'cvv', pattern: '###', example: '123' },
              ].map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <code className="font-semibold">{m.name}</code>
                  <span className="font-mono text-muted-foreground">{m.example}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dates" className="mt-4">
            <div className="grid gap-2">
              {[
                { name: 'dateDMY', pattern: '##/##/####', example: '25/12/2024' },
                { name: 'dateMDY', pattern: '##/##/####', example: '12/25/2024' },
                { name: 'dateISO', pattern: '####-##-##', example: '2024-12-25' },
                { name: 'time24', pattern: '##:##', example: '14:30' },
              ].map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <code className="font-semibold">{m.name}</code>
                  <span className="font-mono text-muted-foreground">{m.example}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* DOM Integration */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">DOM Integration</h2>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`import { maskInput, createMaskController } from 'soff-mask';
import { phoneCO } from 'soff-mask';

// Vanilla JS - Apply to an input element
const input = document.querySelector('input');
const controller = maskInput(input, { pattern: phoneCO });

// Get raw value
controller.getRawValue();  // '3001234567'

// Cleanup
controller.destroy();

// React usage (controlled)
function PhoneInput() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(mask(e.target.value, phoneCO));
  };
  
  return <input value={value} onChange={handleChange} />;
}`}</code>
        </pre>
      </section>

      {/* API Reference */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">API Reference</h2>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`// Core functions
mask(value: string, pattern: string, options?: MaskOptions): string
unmask(value: string, pattern: string): string
maskWithResult(value: string, pattern: string): MaskResult

// Utilities
parsePattern(pattern: string): MaskToken[]
isComplete(value: string, pattern: string): boolean
getPatternLength(pattern: string): number
createDynamicMask(rules: DynamicMaskRule[]): (value: string) => string

// DOM
maskInput(element: HTMLInputElement, options: MaskInputOptions): MaskController

interface MaskResult {
  value: string;      // Masked value
  raw: string;        // Raw value without mask
  complete: boolean;  // True if all positions filled
  cursorPosition: number;
}`}</code>
        </pre>
      </section>
    </article>
  );
}
