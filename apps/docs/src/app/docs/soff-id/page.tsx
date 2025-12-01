import { IdCard, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/code-block';
import {
  validateNIT,
  formatNIT,
  calculateNITCheckDigit,
  generateNIT,
  isNITCompany,
} from 'soff-id/locales/co';
import { NITValidator } from './nit-validator';
import { getVersion } from '@/lib/versions';
import { JsonLd } from '@/components/json-ld';

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
    generated: generateNIT(),
    isCompany: isNITCompany('9001234567'),
  };
}

export default function SoffIdPage() {
  const examples = getValidationExamples();
  const version = getVersion('soff-id');

  return (
    <article className="space-y-8">
      <JsonLd
        name="soff-id"
        description="LATAM document validation library - Validate NIT, RUT, CPF, CUIT, and more."
        package="soff-id"
      />
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <IdCard size={36} className="text-soff-id" />
          <h1 className="text-3xl font-bold">soff-id</h1>
          <Badge>v{version}</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          LATAM document validation library - Validate NIT, RUT, CPF, CUIT, and more.
        </p>
      </div>

      {/* Live Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio size={18} className="text-red-500" /> Live Demo - NIT Validator (Colombia)
          </CardTitle>
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">generateNIT()</p>
              <p className="text-lg font-mono font-semibold">{examples.generated}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">isNITCompany(&quot;9001234567&quot;)</p>
              <p className="text-lg font-mono font-semibold">
                {examples.isCompany ? 'true' : 'false'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
        <CodeBlock code="npm install soff-id">npm install soff-id</CodeBlock>
      </section>

      {/* Quick Start */}
      <section id="quick-start">
        <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
        <CodeBlock
          code={`// Import only what you need
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
validateCUIT('20-12345678-9');     // true/false`}
        >{`// Import only what you need
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
validateCUIT('20-12345678-9');     // true/false`}</CodeBlock>
      </section>

      {/* Available Locales */}
      <section id="available-locales">
        <h2 className="mb-4 text-2xl font-semibold">Available Locales</h2>
        <div className="grid gap-2">
          {[
            {
              flag: '🇨🇴',
              name: 'Colombia',
              import: 'soff-id/locales/co',
              docs: ['NIT', 'CC', 'CE', 'TI'],
              features: ['generate', 'isCompany/isPerson'],
            },
            {
              flag: '🇧🇷',
              name: 'Brasil',
              import: 'soff-id/locales/br',
              docs: ['CPF', 'CNPJ'],
              features: ['generate', 'isMatriz/isFilial', 'getBranchNumber'],
            },
            {
              flag: '🇦🇷',
              name: 'Argentina',
              import: 'soff-id/locales/ar',
              docs: ['DNI', 'CUIT', 'CUIL'],
              features: ['generate', 'getCUITType', 'getDNIFromCUIT'],
            },
            {
              flag: '🇨🇱',
              name: 'Chile',
              import: 'soff-id/locales/cl',
              docs: ['RUT', 'RUN'],
              features: ['generate', 'getFormattedIfValid'],
            },
            {
              flag: '🇲🇽',
              name: 'México',
              import: 'soff-id/locales/mx',
              docs: ['RFC', 'CURP'],
              features: ['parseCURP', 'parseRFC', 'getGender', 'getBirthDate'],
            },
          ].map((locale) => (
            <div
              key={locale.name}
              className="flex flex-col gap-2 rounded-lg border border-border p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{locale.flag}</span>
                  <span className="font-medium">{locale.name}</span>
                </div>
                <code className="text-xs text-muted-foreground sm:text-sm">{locale.import}</code>
              </div>
              <div className="flex flex-wrap gap-1">
                {locale.docs.map((doc) => (
                  <Badge key={doc} variant="outline">
                    {doc}
                  </Badge>
                ))}
                {locale.features.map((feat) => (
                  <Badge key={feat} variant="secondary" className="text-xs">
                    {feat}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference">
        <h2 className="mb-4 text-2xl font-semibold">API Reference</h2>

        <Tabs defaultValue="co">
          <TabsList className="flex-wrap">
            <TabsTrigger value="co">Colombia</TabsTrigger>
            <TabsTrigger value="br">Brasil</TabsTrigger>
            <TabsTrigger value="ar">Argentina</TabsTrigger>
            <TabsTrigger value="cl">Chile</TabsTrigger>
            <TabsTrigger value="mx">México</TabsTrigger>
          </TabsList>

          <TabsContent value="co" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Colombia - NIT, CC, CE, TI</h3>
            <CodeBlock
              code={`import { 
  validateNIT, formatNIT, cleanNIT, calculateNITCheckDigit,
  generateNIT, isNITCompany, isNITPerson,
  validateCC, formatCC, cleanCC,
  validateCE, formatCE, cleanCE,
  validateTI, formatTI, cleanTI
} from 'soff-id/locales/co';

// NIT (Número de Identificación Tributaria)
validateNIT('900123456-7')         // boolean
formatNIT('9001234567')            // '900.123.456-7'
cleanNIT('900.123.456-7')          // '9001234567'
calculateNITCheckDigit('900123456') // '7'
generateNIT()                      // generates valid random NIT
isNITCompany('9001234567')         // true (starts with 8 or 9)
isNITPerson('123456789')           // true

// CC (Cédula de Ciudadanía)
validateCC('1234567890')           // boolean
formatCC('1234567890')             // '1.234.567.890'`}
            >{`import { 
  validateNIT, formatNIT, cleanNIT, calculateNITCheckDigit,
  generateNIT, isNITCompany, isNITPerson,
  validateCC, formatCC, cleanCC,
  validateCE, formatCE, cleanCE,
  validateTI, formatTI, cleanTI
} from 'soff-id/locales/co';

// NIT (Número de Identificación Tributaria)
validateNIT('900123456-7')         // boolean
formatNIT('9001234567')            // '900.123.456-7'
cleanNIT('900.123.456-7')          // '9001234567'
calculateNITCheckDigit('900123456') // '7'
generateNIT()                      // generates valid random NIT
isNITCompany('9001234567')         // true (starts with 8 or 9)
isNITPerson('123456789')           // true

// CC (Cédula de Ciudadanía)
validateCC('1234567890')           // boolean
formatCC('1234567890')             // '1.234.567.890'`}</CodeBlock>
          </TabsContent>

          <TabsContent value="br" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Brasil - CPF & CNPJ</h3>
            <CodeBlock
              code={`import { 
  validateCPF, formatCPF, cleanCPF, calculateCPFCheckDigit, generateCPF,
  validateCNPJ, formatCNPJ, cleanCNPJ, calculateCNPJCheckDigit, generateCNPJ,
  isCNPJMatriz, isCNPJFilial, getCNPJBranchNumber
} from 'soff-id/locales/br';

// CPF (Individual)
validateCPF('123.456.789-09')      // boolean
formatCPF('12345678909')           // '123.456.789-09'
generateCPF()                      // generates valid random CPF

// CNPJ (Business)
validateCNPJ('12.345.678/0001-95') // boolean
formatCNPJ('12345678000195')       // '12.345.678/0001-95'
generateCNPJ()                     // generates valid random CNPJ
isCNPJMatriz('12345678000195')     // true (branch 0001)
isCNPJFilial('12345678000276')     // true (branch > 0001)
getCNPJBranchNumber('12345678000276') // 2`}
            >{`import { 
  validateCPF, formatCPF, cleanCPF, calculateCPFCheckDigit, generateCPF,
  validateCNPJ, formatCNPJ, cleanCNPJ, calculateCNPJCheckDigit, generateCNPJ,
  isCNPJMatriz, isCNPJFilial, getCNPJBranchNumber
} from 'soff-id/locales/br';

// CPF (Individual)
validateCPF('123.456.789-09')      // boolean
formatCPF('12345678909')           // '123.456.789-09'
generateCPF()                      // generates valid random CPF

// CNPJ (Business)
validateCNPJ('12.345.678/0001-95') // boolean
formatCNPJ('12345678000195')       // '12.345.678/0001-95'
generateCNPJ()                     // generates valid random CNPJ
isCNPJMatriz('12345678000195')     // true (branch 0001)
isCNPJFilial('12345678000276')     // true (branch > 0001)
getCNPJBranchNumber('12345678000276') // 2`}</CodeBlock>
          </TabsContent>

          <TabsContent value="ar" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Argentina - CUIT, CUIL & DNI</h3>
            <CodeBlock
              code={`import { 
  validateCUIT, formatCUIT, cleanCUIT, calculateCUITCheckDigit,
  validateCUIL, formatCUIL, cleanCUIL, calculateCUILCheckDigit,
  validateDNI, formatDNI, cleanDNI,
  isCUITCompany, isCUITPerson, getCUITType,
  getDNIFromCUIT, generateCUITFromDNI, generateCUIT
} from 'soff-id/locales/ar';

// CUIT (Business Tax ID)
validateCUIT('20-12345678-9')      // boolean
formatCUIT('20123456789')          // '20-12345678-9'
generateCUIT()                     // generates valid random CUIT
isCUITCompany('30123456789')       // true (prefix 30, 33, 34)
isCUITPerson('20123456789')        // true (prefix 20, 23, 24, 27)
getCUITType('20123456789')         // 'male' | 'female' | 'company' | 'other'
getDNIFromCUIT('20123456789')      // '12345678'

// Generate CUIT from existing DNI
generateCUITFromDNI('12345678', 'male')  // '20-12345678-X'`}
            >{`import { 
  validateCUIT, formatCUIT, cleanCUIT, calculateCUITCheckDigit,
  validateCUIL, formatCUIL, cleanCUIL, calculateCUILCheckDigit,
  validateDNI, formatDNI, cleanDNI,
  isCUITCompany, isCUITPerson, getCUITType,
  getDNIFromCUIT, generateCUITFromDNI, generateCUIT
} from 'soff-id/locales/ar';

// CUIT (Business Tax ID)
validateCUIT('20-12345678-9')      // boolean
formatCUIT('20123456789')          // '20-12345678-9'
generateCUIT()                     // generates valid random CUIT
isCUITCompany('30123456789')       // true (prefix 30, 33, 34)
isCUITPerson('20123456789')        // true (prefix 20, 23, 24, 27)
getCUITType('20123456789')         // 'male' | 'female' | 'company' | 'other'
getDNIFromCUIT('20123456789')      // '12345678'

// Generate CUIT from existing DNI
generateCUITFromDNI('12345678', 'male')  // '20-12345678-X'`}</CodeBlock>
          </TabsContent>

          <TabsContent value="cl" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Chile - RUT & RUN</h3>
            <CodeBlock
              code={`import { 
  validateRUT, formatRUT, cleanRUT, calculateRUTCheckDigit,
  validateRUN, formatRUN, cleanRUN, calculateRUNCheckDigit,
  generateRUT, getFormattedRUTIfValid
} from 'soff-id/locales/cl';

// RUT (Tax ID) - same algorithm as RUN
validateRUT('12.345.678-5')         // boolean
formatRUT('123456785')              // '12.345.678-5'
calculateRUTCheckDigit('12345678')  // '5'
generateRUT()                       // generates valid random RUT

// Validate and format in one step (returns null if invalid)
getFormattedRUTIfValid('123456785') // '12.345.678-5' or null

// RUN (Personal ID)
validateRUN('12.345.678-5')         // boolean (same as RUT)
formatRUN('123456785')              // '12.345.678-5'`}
            >{`import { 
  validateRUT, formatRUT, cleanRUT, calculateRUTCheckDigit,
  validateRUN, formatRUN, cleanRUN, calculateRUNCheckDigit,
  generateRUT, getFormattedRUTIfValid
} from 'soff-id/locales/cl';

// RUT (Tax ID) - same algorithm as RUN
validateRUT('12.345.678-5')         // boolean
formatRUT('123456785')              // '12.345.678-5'
calculateRUTCheckDigit('12345678')  // '5'
generateRUT()                       // generates valid random RUT

// Validate and format in one step (returns null if invalid)
getFormattedRUTIfValid('123456785') // '12.345.678-5' or null

// RUN (Personal ID)
validateRUN('12.345.678-5')         // boolean (same as RUT)
formatRUN('123456785')              // '12.345.678-5'`}</CodeBlock>
          </TabsContent>

          <TabsContent value="mx" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">México - RFC & CURP</h3>
            <CodeBlock
              code={`import { 
  validateRFC, formatRFC, cleanRFC,
  validateCURP, formatCURP, cleanCURP,
  isRFCCompany, isRFCPerson, getRFCDate, parseRFC,
  getCURPGender, getCURPBirthDate, getCURPBirthState, getCURPStateCode, parseCURP
} from 'soff-id/locales/mx';

// RFC (Tax ID)
validateRFC('XAXX010101000')       // boolean (generic)
validateRFC('GODE561231GR8')       // boolean (individual)
isRFCCompany('ABC123456XYZ')       // true (12 chars)
isRFCPerson('GODE561231GR8')       // true (13 chars)
getRFCDate('GODE561231GR8')        // Date object

// Parse RFC into components
parseRFC('GODE561231GR8')
// { name: 'GODE', date: Date, homoclave: 'GR8', type: 'person' }

// CURP (Personal ID)
validateCURP('GODE561231HDFRRN09') // boolean
getCURPGender('GODE561231HDFRRN09') // 'M' (male) or 'F' (female)
getCURPBirthDate('GODE561231HDFRRN09') // Date object
getCURPBirthState('GODE561231HDFRRN09') // 'DF' (Distrito Federal)
getCURPStateCode('DF')             // 'Ciudad de México'

// Parse CURP into all components
parseCURP('GODE561231HDFRRN09')
// { name, date, gender, state, consonants, digit }`}
            >{`import { 
  validateRFC, formatRFC, cleanRFC,
  validateCURP, formatCURP, cleanCURP,
  isRFCCompany, isRFCPerson, getRFCDate, parseRFC,
  getCURPGender, getCURPBirthDate, getCURPBirthState, getCURPStateCode, parseCURP
} from 'soff-id/locales/mx';

// RFC (Tax ID)
validateRFC('XAXX010101000')       // boolean (generic)
validateRFC('GODE561231GR8')       // boolean (individual)
isRFCCompany('ABC123456XYZ')       // true (12 chars)
isRFCPerson('GODE561231GR8')       // true (13 chars)
getRFCDate('GODE561231GR8')        // Date object

// Parse RFC into components
parseRFC('GODE561231GR8')
// { name: 'GODE', date: Date, homoclave: 'GR8', type: 'person' }

// CURP (Personal ID)
validateCURP('GODE561231HDFRRN09') // boolean
getCURPGender('GODE561231HDFRRN09') // 'M' (male) or 'F' (female)
getCURPBirthDate('GODE561231HDFRRN09') // Date object
getCURPBirthState('GODE561231HDFRRN09') // 'DF' (Distrito Federal)
getCURPStateCode('DF')             // 'Ciudad de México'

// Parse CURP into all components
parseCURP('GODE561231HDFRRN09')
// { name, date, gender, state, consonants, digit }`}</CodeBlock>
          </TabsContent>
        </Tabs>
      </section>
    </article>
  );
}
