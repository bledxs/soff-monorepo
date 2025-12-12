import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/code-block';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Package, Zap, Code2 } from 'lucide-react';

export const metadata = {
  title: 'Installation - Soff Libraries',
};

export default function InstallationPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <div className="mb-8">
        <h1 className="mb-4 bg-gradient-to-r from-soff-date via-soff-id to-soff-money bg-clip-text text-transparent">
          Installation
        </h1>
        <p className="lead text-xl text-muted-foreground">
          Each Soff library can be installed independently. Install only what you need.
        </p>
      </div>

      <div className="not-prose mb-8 grid gap-4 md:grid-cols-3">
        <Card className="glass-effect">
          <CardHeader>
            <CheckCircle2 className="mb-2 h-8 w-8 text-soff-date" />
            <CardTitle>Tree-shakeable</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Import only what you need. Each locale is independently importable.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <Package className="mb-2 h-8 w-8 text-soff-id" />
            <CardTitle>Zero dependencies</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Pure TypeScript with no external runtime dependencies.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <Zap className="mb-2 h-8 w-8 text-soff-money" />
            <CardTitle>Lightweight</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Optimized for bundle size, typically &lt;1KB per locale.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-4 flex items-center gap-2">
        <Code2 className="h-6 w-6 text-soff-mask" />
        Package Managers
      </h2>

      <Tabs defaultValue="npm" className="not-prose">
        <TabsList>
          <TabsTrigger value="npm">npm</TabsTrigger>
          <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          <TabsTrigger value="yarn">yarn</TabsTrigger>
          <TabsTrigger value="bun">bun</TabsTrigger>
        </TabsList>

        <TabsContent value="npm" className="mt-4">
          <CodeBlock
            code={`# Cron parser
npm install soff-cron

# Holiday calculator
npm install soff-date

# Geographic data
npm install soff-geo

# Document validation
npm install soff-id

# Input masking
npm install soff-mask

# Currency formatting
npm install soff-money

# Phone validation
npm install soff-phone`}
          >{`# Cron parser
npm install soff-cron

# Holiday calculator
npm install soff-date

# Geographic data
npm install soff-geo

# Document validation
npm install soff-id

# Input masking
npm install soff-mask

# Currency formatting
npm install soff-money

# Phone validation
npm install soff-phone`}</CodeBlock>
        </TabsContent>

        <TabsContent value="pnpm" className="mt-4">
          <CodeBlock
            code={`# Cron parser
pnpm add soff-cron

# Holiday calculator
pnpm add soff-date

# Geographic data
pnpm add soff-geo

# Document validation
pnpm add soff-id

# Input masking
pnpm add soff-mask

# Currency formatting
pnpm add soff-money

# Phone validation
pnpm add soff-phone`}
          >{`# Cron parser
pnpm add soff-cron

# Holiday calculator
pnpm add soff-date

# Geographic data
pnpm add soff-geo

# Document validation
pnpm add soff-id

# Input masking
pnpm add soff-mask

# Currency formatting
pnpm add soff-money

# Phone validation
pnpm add soff-phone`}</CodeBlock>
        </TabsContent>

        <TabsContent value="yarn" className="mt-4">
          <CodeBlock
            code={`# Cron parser
yarn add soff-cron

# Holiday calculator
yarn add soff-date

# Geographic data
yarn add soff-geo

# Document validation
yarn add soff-id

# Input masking
yarn add soff-mask

# Currency formatting
yarn add soff-money

# Phone validation
yarn add soff-phone`}
          >{`# Cron parser
yarn add soff-cron

# Holiday calculator
yarn add soff-date

# Geographic data
yarn add soff-geo

# Document validation
yarn add soff-id

# Input masking
yarn add soff-mask

# Currency formatting
yarn add soff-money

# Phone validation
yarn add soff-phone`}</CodeBlock>
        </TabsContent>

        <TabsContent value="bun" className="mt-4">
          <CodeBlock
            code={`# Cron parser
bun add soff-cron

# Holiday calculator
bun add soff-date

# Geographic data
bun add soff-geo

# Document validation
bun add soff-id

# Input masking
bun add soff-mask

# Currency formatting
bun add soff-money

# Phone validation
bun add soff-phone`}
          >{`# Cron parser
bun add soff-cron

# Holiday calculator
bun add soff-date

# Geographic data
bun add soff-geo

# Document validation
bun add soff-id

# Input masking
bun add soff-mask

# Currency formatting
bun add soff-money

# Phone validation
bun add soff-phone`}</CodeBlock>
        </TabsContent>
      </Tabs>

      <div className="not-prose my-8">
        <Card className="border-soff-geo/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-soff-geo" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-soff-geo" />
                Node.js 20 or higher
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-soff-geo" />
                TypeScript 5.0+ (optional, but recommended)
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-4 flex items-center gap-2">
        <Zap className="h-6 w-6 text-soff-date" />
        Tree-shaking
      </h2>

      <p>
        All libraries support tree-shaking. Import only the locales you need to minimize bundle
        size:
      </p>

      <div className="not-prose">
        <CodeBlock
          code={`// ✅ Good - only Colombia is bundled (~3KB)
import { getHolidays } from 'soff-date/locales/co';

// ❌ Avoid - imports all locales
import { getHolidays } from 'soff-date';`}
        >{`// ✅ Good - only Colombia is bundled (~3KB)
import { getHolidays } from 'soff-date/locales/co';

// ❌ Avoid - imports all locales
import { getHolidays } from 'soff-date';`}</CodeBlock>
      </div>

      <h2 className="mb-4 flex items-center gap-2">
        <Package className="h-6 w-6 text-soff-id" />
        ESM & CommonJS
      </h2>

      <p>All libraries ship both ESM and CommonJS builds:</p>

      <div className="not-prose">
        <CodeBlock
          code={`// ESM
import { validateNIT } from 'soff-id/locales/co';

// CommonJS
const { validateNIT } = require('soff-id/locales/co');`}
        >{`// ESM
import { validateNIT } from 'soff-id/locales/co';

// CommonJS
const { validateNIT } = require('soff-id/locales/co');`}</CodeBlock>
      </div>
    </article>
  );
}
