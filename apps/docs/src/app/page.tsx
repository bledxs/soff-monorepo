import Link from 'next/link';
import {
  Calendar,
  Clock,
  IdCard,
  Theater,
  Coins,
  TreeDeciduous,
  Package,
  Globe,
  Map,
  Phone,
  Sparkles,
  Zap,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LibraryCard } from '@/components/library-card';
import { libraries as libraryData } from '@/lib/versions';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iconMap: Record<string, LucideIcon> = {
  'soff-cron': Clock,
  'soff-date': Calendar,
  'soff-geo': Map,
  'soff-id': IdCard,
  'soff-mask': Theater,
  'soff-money': Coins,
  'soff-phone': Phone,
};

const colorMap: Record<string, string> = {
  'soff-cron': 'text-soff-cron',
  'soff-date': 'text-soff-date',
  'soff-geo': 'text-soff-geo',
  'soff-id': 'text-soff-id',
  'soff-mask': 'text-soff-mask',
  'soff-money': 'text-soff-money',
  'soff-phone': 'text-soff-phone',
};

const gradientMap: Record<string, string> = {
  'soff-cron': 'gradient-soff-cron',
  'soff-date': 'gradient-soff-date',
  'soff-geo': 'gradient-soff-geo',
  'soff-id': 'gradient-soff-id',
  'soff-mask': 'gradient-soff-mask',
  'soff-money': 'gradient-soff-money',
  'soff-phone': 'gradient-soff-phone',
};

const glowMap: Record<string, string> = {
  'soff-cron': 'glow-cron',
  'soff-date': 'glow-date',
  'soff-geo': 'glow-geo',
  'soff-id': 'glow-id',
  'soff-mask': 'glow-mask',
  'soff-money': 'glow-money',
  'soff-phone': 'glow-phone',
};

const featuresMap: Record<string, string[]> = {
  'soff-cron': ['Human-readable', 'i18n support', 'Zero dependencies'],
  'soff-date': ['Zero dependencies', '~3KB per locale', '5 countries'],
  'soff-geo': ['Comprehensive data', 'Zero dependencies', 'CO & MX support'],
  'soff-id': ['Official algorithms', '<1KB gzipped', '5 countries'],
  'soff-mask': ['Framework agnostic', 'DOM & headless', 'Custom masks'],
  'soff-money': ['Locale-aware', 'Precise decimals', 'Multiple currencies'],
  'soff-phone': ['Validation & Format', 'CO & MX support', 'Tree-shakeable'],
};

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="mb-20 text-center relative">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-soff-date/20 via-soff-id/20 to-soff-money/20 blur-3xl rounded-full animate-gradient opacity-50" />
        </div>

        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Modern utilities for LATAM</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient animate-gradient">Soff Libraries</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            A collection of{' '}
            <span className="font-semibold text-foreground">lightweight, tree-shakeable</span>{' '}
            utilities designed for LATAM developers. Built with TypeScript, zero dependencies, and
            optimized for bundle size.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="group">
              <Link href="/docs/introduction">
                Get Started
                <Zap size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="group">
              <a
                href="https://github.com/bledxs/soff-monorepo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Package size={16} className="mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass-effect rounded-xl border border-border/50 p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-sm text-muted-foreground">Libraries</div>
          </div>
          <div className="glass-effect rounded-xl border border-border/50 p-6 text-center">
            <div className="text-3xl font-bold text-soff-money mb-2">0</div>
            <div className="text-sm text-muted-foreground">Dependencies</div>
          </div>
          <div className="glass-effect rounded-xl border border-border/50 p-6 text-center">
            <div className="text-3xl font-bold text-soff-mask mb-2">~3KB</div>
            <div className="text-sm text-muted-foreground">Avg. Bundle Size</div>
          </div>
        </div>
      </section>

      {/* Libraries Grid */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Libraries</h2>
          <Badge variant="outline" className="text-xs">
            All packages
          </Badge>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {libraryData.map((lib) => {
            const Icon = iconMap[lib.name];
            const colorClass = colorMap[lib.name];
            const gradientClass = gradientMap[lib.name];
            const glowClass = glowMap[lib.name];
            const features = featuresMap[lib.name];
            return (
              <LibraryCard
                key={lib.name}
                name={lib.name}
                description={lib.description}
                version={lib.version}
                icon={Icon}
                href={`/docs/${lib.name}`}
                features={features}
                colorClass={colorClass}
                gradientClass={gradientClass}
                glowClass={glowClass}
              />
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="mb-8 text-3xl font-bold text-center">Why Soff?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-soff-date/50 hover:shadow-lg hover:shadow-soff-date/10">
            <div className="mb-4 inline-flex p-3 rounded-lg bg-soff-date/10 text-soff-date transition-transform group-hover:scale-110">
              <TreeDeciduous size={24} />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Tree-shakeable</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Import only what you need. Each locale and function is independently importable,
              keeping your bundle size minimal.
            </p>
          </div>

          <div className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-soff-money/50 hover:shadow-lg hover:shadow-soff-money/10">
            <div className="mb-4 inline-flex p-3 rounded-lg bg-soff-money/10 text-soff-money transition-transform group-hover:scale-110">
              <Shield size={24} />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Zero Dependencies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pure TypeScript with no external dependencies. Keep your bundle clean and avoid
              version conflicts.
            </p>
          </div>

          <div className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-soff-id/50 hover:shadow-lg hover:shadow-soff-id/10">
            <div className="mb-4 inline-flex p-3 rounded-lg bg-soff-id/10 text-soff-id transition-transform group-hover:scale-110">
              <Globe size={24} />
            </div>
            <h3 className="mb-3 text-xl font-semibold">LATAM First</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built specifically for Latin America: Colombia, Mexico, Brazil, Argentina, Chile and
              more countries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
