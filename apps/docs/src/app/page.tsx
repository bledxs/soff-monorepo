import Link from 'next/link';
import { Calendar, IdCard, Theater, Coins, TreeDeciduous, Package, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

const libraries: {
  name: string;
  description: string;
  href: string;
  version: string;
  features: string[];
  icon: LucideIcon;
}[] = [
  {
    name: 'soff-date',
    description: 'Lightweight, tree-shakeable holiday calculator with algorithmic date computation',
    href: '/docs/soff-date',
    version: '0.2.0',
    features: ['Zero dependencies', '~3KB per locale', '5 countries'],
    icon: Calendar,
  },
  {
    name: 'soff-id',
    description: 'LATAM document validation library - Validate NIT, RUT, CPF, CUIT, and more',
    href: '/docs/soff-id',
    version: '0.1.0',
    features: ['Official algorithms', '<1KB gzipped', '5 countries'],
    icon: IdCard,
  },
  {
    name: 'soff-mask',
    description: 'Input masking for forms - Phone numbers, documents, currency',
    href: '/docs/soff-mask',
    version: '0.1.0',
    features: ['Framework agnostic', 'DOM & headless', 'Custom masks'],
    icon: Theater,
  },
  {
    name: 'soff-money',
    description: 'Currency formatting and calculation for LATAM currencies',
    href: '/docs/soff-money',
    version: '0.1.0',
    features: ['Locale-aware', 'Precise decimals', 'Multiple currencies'],
    icon: Coins,
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Soff Libraries</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          A collection of lightweight, tree-shakeable utilities designed for LATAM developers. Built
          with TypeScript, zero dependencies, and optimized for bundle size.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/docs/introduction">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/bledxs/soff-monorepo"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Libraries Grid */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold">Libraries</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {libraries.map((lib) => (
            <Link key={lib.name} href={lib.href} className="group">
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <lib.icon size={24} />
                      {lib.name}
                    </CardTitle>
                    <Badge variant="secondary">{lib.version}</Badge>
                  </div>
                  <CardDescription>{lib.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {lib.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold">Why Soff?</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border p-6">
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <TreeDeciduous size={18} /> Tree-shakeable
            </h3>
            <p className="text-sm text-muted-foreground">
              Import only what you need. Each locale and function is independently importable.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <Package size={18} /> Zero Dependencies
            </h3>
            <p className="text-sm text-muted-foreground">
              Pure TypeScript with no external dependencies. Keep your bundle clean.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <Globe size={18} /> LATAM First
            </h3>
            <p className="text-sm text-muted-foreground">
              Built for Colombia, Mexico, Brazil, Argentina, Chile and more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
