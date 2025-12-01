import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { validateNIT, formatNIT, calculateNITCheckDigit } from 'soff-id/locales/co';
import { NITValidator } from './nit-validator';

export const metadata = {
  title: 'soff-id - Document Validation',
};

function getValidationExamples() {
  const validNIT = '900123456-7';
  const invalidNIT = '900123456-0';

  return {
    validNIT,
    invalidNIT,
    validResult: validateNIT(validNIT),
    invalidResult: validateNIT(invalidNIT),
    formatted: formatNIT('9001234567'),
    checkDigit: calculateNITCheckDigit('900123456'),
  };
}

export default function SoffIdPage() {
  const examples = getValidationExamples();

  return (
    <article className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-4xl">🪪</span>
          <h1 className="text-3xl font-bold">soff-id</h1>
          <Badge>v0.1.0</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          LATAM document validation library - Validate NIT, RUT, CPF, CUIT, and more.
        </p>
      </div>

      {/* Live Demo */}
      <Card>
        <CardHeader>
          <CardTitle>🔴 Live Demo - NIT Validator (Colombia)</CardTitle>
        </CardHeader>
        <CardContent>
          <NITValidator />
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Validation Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                validateNIT(&quot;{examples.validNIT}&quot;)
              </p>
              <p className="text-lg font-semibold text-green-500">
                {examples.validResult ? '✓ Valid' : '✗ Invalid'}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                validateNIT(&quot;{examples.invalidNIT}&quot;)
              </p>
              <p className="text-lg font-semibold text-red-500">
                {examples.invalidResult ? '✓ Valid' : '✗ Invalid'}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">formatNIT(&quot;9001234567&quot;)</p>
              <p className="text-lg font-mono font-semibold">{examples.formatted}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                calculateNITCheckDigit(&quot;900123456&quot;)
              </p>
              <p className="text-lg font-mono font-semibold">{examples.checkDigit}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Installation */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
        <pre className="rounded-lg bg-muted p-4">
          <code>npm install soff-id</code>
        </pre>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
        <pre className="rounded-lg bg-muted p-4 text-sm">
          <code>{`// Import only what you need
import { validateNIT, formatNIT, calculateNITCheckDigit } from 'soff-id/locales/co';
import { validateCPF, validateCNPJ } from 'soff-id/locales/br';
import { validateRUT } from 'soff-id/locales/cl';
import { validateCUIT } from 'soff-id/locales/ar';

// Colombian NIT
validateNIT('900123456-7');        // true
calculateNITCheckDigit('900123456'); // '7'
formatNIT('9001234567');            // '900.123.456-7'

// Brazilian CPF
validateCPF('123.456.789-09');     // true/false

// Chilean RUT
validateRUT('12.345.678-5');       // true/false

// Argentine CUIT
validateCUIT('20-12345678-9');     // true/false`}</code>
        </pre>
      </section>

      {/* Available Locales */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Available Locales</h2>
        <div className="grid gap-2">
          {[
            {
              flag: '🇨🇴',
              name: 'Colombia',
              import: 'soff-id/locales/co',
              docs: ['NIT', 'CC', 'CE', 'TI'],
            },
            {
              flag: '🇧🇷',
              name: 'Brasil',
              import: 'soff-id/locales/br',
              docs: ['CPF', 'CNPJ'],
            },
            {
              flag: '🇦🇷',
              name: 'Argentina',
              import: 'soff-id/locales/ar',
              docs: ['DNI', 'CUIT', 'CUIL'],
            },
            {
              flag: '🇨🇱',
              name: 'Chile',
              import: 'soff-id/locales/cl',
              docs: ['RUT', 'RUN'],
            },
            {
              flag: '🇲🇽',
              name: 'México',
              import: 'soff-id/locales/mx',
              docs: ['RFC', 'CURP'],
            },
          ].map((locale) => (
            <div
              key={locale.name}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{locale.flag}</span>
                <span className="font-medium">{locale.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-sm text-muted-foreground">{locale.import}</code>
                <div className="flex gap-1">
                  {locale.docs.map((doc) => (
                    <Badge key={doc} variant="outline">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">API Reference</h2>

        <Tabs defaultValue="co">
          <TabsList>
            <TabsTrigger value="co">Colombia</TabsTrigger>
            <TabsTrigger value="br">Brasil</TabsTrigger>
            <TabsTrigger value="ar">Argentina</TabsTrigger>
            <TabsTrigger value="cl">Chile</TabsTrigger>
            <TabsTrigger value="mx">México</TabsTrigger>
          </TabsList>

          <TabsContent value="co" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Colombia - NIT</h3>
            <pre className="rounded-lg bg-muted p-4 text-sm">
              <code>{`import { validateNIT, formatNIT, cleanNIT, calculateNITCheckDigit } from 'soff-id/locales/co';

validateNIT('900123456-7')         // boolean
formatNIT('9001234567')            // '900.123.456-7'
cleanNIT('900.123.456-7')          // '9001234567'
calculateNITCheckDigit('900123456') // '7'`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="br" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Brasil - CPF & CNPJ</h3>
            <pre className="rounded-lg bg-muted p-4 text-sm">
              <code>{`import { validateCPF, formatCPF, validateCNPJ, formatCNPJ } from 'soff-id/locales/br';

// CPF (Individual)
validateCPF('123.456.789-09')      // boolean
formatCPF('12345678909')           // '123.456.789-09'

// CNPJ (Business)
validateCNPJ('12.345.678/0001-95') // boolean
formatCNPJ('12345678000195')       // '12.345.678/0001-95'`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="ar" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Argentina - CUIT & CUIL</h3>
            <pre className="rounded-lg bg-muted p-4 text-sm">
              <code>{`import { validateCUIT, formatCUIT, validateCUIL } from 'soff-id/locales/ar';

validateCUIT('20-12345678-9')      // boolean
formatCUIT('20123456789')          // '20-12345678-9'
validateCUIL('20-12345678-9')      // boolean (same algorithm)`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="cl" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Chile - RUT</h3>
            <pre className="rounded-lg bg-muted p-4 text-sm">
              <code>{`import { validateRUT, formatRUT, calculateRUTCheckDigit } from 'soff-id/locales/cl';

validateRUT('12.345.678-5')         // boolean
formatRUT('123456785')              // '12.345.678-5'
calculateRUTCheckDigit('12345678')  // '5'`}</code>
            </pre>
          </TabsContent>

          <TabsContent value="mx" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">México - RFC & CURP</h3>
            <pre className="rounded-lg bg-muted p-4 text-sm">
              <code>{`import { validateRFC, validateCURP } from 'soff-id/locales/mx';

// RFC (Tax ID)
validateRFC('XAXX010101000')       // boolean (generic)
validateRFC('GODE561231GR8')       // boolean (individual)

// CURP (Personal ID)
validateCURP('GODE561231HDFRRN09') // boolean`}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </section>
    </article>
  );
}
