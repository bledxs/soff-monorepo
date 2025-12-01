import Link from 'next/link';
import {
  Calendar,
  IdCard,
  Theater,
  Coins,
  TreeDeciduous,
  Package,
  Globe,
  Map,
  Phone,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { libraries as libraryData } from '@/lib/versions';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'soff-date': Calendar,
  'soff-geo': Map,
  'soff-id': IdCard,
  'soff-mask': Theater,
  'soff-money': Coins,
  'soff-phone': Phone,
};

const colorMap: Record<string, string> = {
  'soff-date': 'text-soff-date',
  'soff-geo': 'text-soff-geo',
  'soff-id': 'text-soff-id',
  'soff-mask': 'text-soff-mask',
  'soff-money': 'text-soff-money',
  'soff-phone': 'text-soff-phone',
};

const featuresMap: Record<string, string[]> = {
  'soff-date': ['Zero dependencies', '~3KB per locale', '5 countries'],
  'soff-geo': ['Comprehensive data', 'Zero dependencies', 'CO & MX support'],
  'soff-id': ['Official algorithms', '<1KB gzipped', '5 countries'],
  'soff-mask': ['Framework agnostic', 'DOM & headless', 'Custom masks'],
  'soff-money': ['Locale-aware', 'Precise decimals', 'Multiple currencies'],
  'soff-phone': ['Validation & Format', 'CO & MX support', 'Tree-shakeable'],
};

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
          {libraryData.map((lib) => {
            const Icon = iconMap[lib.name];
            const colorClass = colorMap[lib.name];
            const features = featuresMap[lib.name];
            return (
              <Link key={lib.name} href={`/docs/${lib.name}`} className="group">
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Icon size={24} className={colorClass} />
                        {lib.name}
                      </CardTitle>
                      <Badge variant="secondary">{lib.version}</Badge>
                    </div>
                    <CardDescription>{lib.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature) => (
                        <Badge key={feature} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
