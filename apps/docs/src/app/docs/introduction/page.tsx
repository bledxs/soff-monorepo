import { Calendar, IdCard, Theater, Coins, MapPin, Phone, Sparkles, Target } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Introduction - Soff Libraries',
};

export default function IntroductionPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <div className="mb-8">
        <h1 className="mb-4 bg-linear-to-r from-soff-date via-soff-id to-soff-money bg-clip-text text-transparent">
          Introduction
        </h1>
        <p className="lead text-xl text-muted-foreground">
          Soff is a collection of lightweight, tree-shakeable utilities designed specifically for
          LATAM developers with automated versioning. Each library focuses on solving common
          problems in the region with official algorithms and locale-specific implementations.
        </p>
      </div>

      <h2 className="mb-4 flex items-center gap-2">
        <Target className="h-6 w-6 text-soff-id" />
        Philosophy
      </h2>

      <div className="not-prose mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-effect border-soff-date/20">
          <CardHeader>
            <CardTitle className="text-soff-date">Tree-shakeable</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Import only what you need. Each function and locale is independently importable.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-effect border-soff-geo/20">
          <CardHeader>
            <CardTitle className="text-soff-geo">Zero dependencies</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Pure TypeScript with no external runtime dependencies.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-effect border-soff-id/20">
          <CardHeader>
            <CardTitle className="text-soff-id">Type-safe</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Full TypeScript support with exported types.</CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-effect border-soff-mask/20">
          <CardHeader>
            <CardTitle className="text-soff-mask">Lightweight</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Optimized for bundle size, typically &lt;1KB per locale.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-effect border-soff-money/20">
          <CardHeader>
            <CardTitle className="text-soff-money">Universal</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Works in Node.js, browsers, and edge runtimes.</CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-effect border-soff-phone/20">
          <CardHeader>
            <CardTitle className="text-soff-phone">LATAM-first</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Built specifically for Latin American regional requirements.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-4 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-soff-money" />
        Available Libraries
      </h2>

      <div className="not-prose grid gap-4 md:grid-cols-2">
        <Link href="/docs/soff-cron" className="group">
          <Card className="h-full glass-effect border-soff-mask/20 transition-all hover:border-soff-mask/40 hover:shadow-lg hover:shadow-soff-mask/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-soff-mask/10 p-2 transition-all group-hover:bg-soff-mask/20">
                  <Theater size={24} className="text-soff-mask" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    soff-cron
                    <Badge className="bg-soff-mask/20 text-soff-mask">v0.1.0</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Cron expression parser and human-readable formatter with i18n support.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/soff-date" className="group">
          <Card className="h-full glass-effect border-soff-date/20 transition-all hover:border-soff-date/40 hover:shadow-lg hover:shadow-soff-date/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-soff-date/10 p-2 transition-all group-hover:bg-soff-date/20">
                  <Calendar size={24} className="text-soff-date" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    soff-date
                    <Badge className="bg-soff-date/20 text-soff-date">v0.2.0</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Holiday calculator with algorithmic date computation. Supports Colombia, USA,
                Mexico, Argentina, and Brazil.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/soff-geo" className="group">
          <Card className="h-full glass-effect border-soff-geo/20 transition-all hover:border-soff-geo/40 hover:shadow-lg hover:shadow-soff-geo/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-soff-geo/10 p-2 transition-all group-hover:bg-soff-geo/20">
                  <MapPin size={24} className="text-soff-geo" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    soff-geo
                    <Badge className="bg-soff-geo/20 text-soff-geo">v0.1.0</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Geographic data for LATAM. Departments, municipalities, states, and postal codes.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/soff-id" className="group">
          <Card className="h-full glass-effect border-soff-id/20 transition-all hover:border-soff-id/40 hover:shadow-lg hover:shadow-soff-id/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-soff-id/10 p-2 transition-all group-hover:bg-soff-id/20">
                  <IdCard size={24} className="text-soff-id" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    soff-id
                    <Badge className="bg-soff-id/20 text-soff-id">v0.1.0</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Document validation for LATAM. Validate NIT, RUT, CPF, CUIT, RFC, CURP and more.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/soff-mask" className="group">
          <Card className="h-full glass-effect border-soff-mask/20 transition-all hover:border-soff-mask/40 hover:shadow-lg hover:shadow-soff-mask/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-soff-mask/10 p-2 transition-all group-hover:bg-soff-mask/20">
                  <Theater size={24} className="text-soff-mask" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    soff-mask
                    <Badge className="bg-soff-mask/20 text-soff-mask">v0.1.0</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Input masking for forms. Phone numbers, documents, currency formatting.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/soff-money" className="group">
          <Card className="h-full glass-effect border-soff-money/20 transition-all hover:border-soff-money/40 hover:shadow-lg hover:shadow-soff-money/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-soff-money/10 p-2 transition-all group-hover:bg-soff-money/20">
                  <Coins size={24} className="text-soff-money" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    soff-money
                    <Badge className="bg-soff-money/20 text-soff-money">v0.1.0</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Currency formatting and calculation for LATAM currencies.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/soff-phone" className="group">
          <Card className="h-full glass-effect border-soff-phone/20 transition-all hover:border-soff-phone/40 hover:shadow-lg hover:shadow-soff-phone/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-soff-phone/10 p-2 transition-all group-hover:bg-soff-phone/20">
                  <Phone size={24} className="text-soff-phone" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    soff-phone
                    <Badge className="bg-soff-phone/20 text-soff-phone">v0.1.0</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Phone number validation and formatting for LATAM countries.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>

      <h2 className="mt-8">Supported Countries</h2>

      <div className="not-prose flex flex-wrap gap-2">
        <Badge variant="outline">🇨🇴 Colombia</Badge>
        <Badge variant="outline">🇲🇽 México</Badge>
        <Badge variant="outline">🇧🇷 Brasil</Badge>
        <Badge variant="outline">🇦🇷 Argentina</Badge>
        <Badge variant="outline">🇨🇱 Chile</Badge>
        <Badge variant="outline">🇺🇸 USA</Badge>
      </div>
    </article>
  );
}
