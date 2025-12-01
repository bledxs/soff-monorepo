import { Calendar, IdCard, Theater, Coins } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Introduction - Soff Libraries',
};

export default function IntroductionPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Introduction</h1>

      <p className="lead text-xl text-muted-foreground">
        Soff is a collection of lightweight, tree-shakeable utilities designed specifically for
        LATAM developers. Each library focuses on solving common problems in the region with
        official algorithms and locale-specific implementations.
      </p>

      <h2>Philosophy</h2>

      <ul>
        <li>
          <strong>Tree-shakeable:</strong> Import only what you need. Each function and locale is
          independently importable.
        </li>
        <li>
          <strong>Zero dependencies:</strong> Pure TypeScript with no external runtime dependencies.
        </li>
        <li>
          <strong>Type-safe:</strong> Full TypeScript support with exported types.
        </li>
        <li>
          <strong>Lightweight:</strong> Optimized for bundle size, typically &lt;1KB per locale.
        </li>
        <li>
          <strong>Universal:</strong> Works in Node.js, browsers, and edge runtimes.
        </li>
      </ul>

      <h2>Available Libraries</h2>

      <div className="not-prose grid gap-4">
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-2">
            <Calendar size={24} className="text-primary" />
            <h3 className="text-lg font-semibold">soff-date</h3>
            <Badge>v0.2.0</Badge>
          </div>
          <p className="mt-2 text-muted-foreground">
            Holiday calculator with algorithmic date computation. Supports Colombia, USA, Mexico,
            Argentina, and Brazil.
          </p>
        </div>

        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-2">
            <IdCard size={24} className="text-primary" />
            <h3 className="text-lg font-semibold">soff-id</h3>
            <Badge>v0.1.0</Badge>
          </div>
          <p className="mt-2 text-muted-foreground">
            Document validation for LATAM. Validate NIT, RUT, CPF, CUIT, RFC, CURP and more.
          </p>
        </div>

        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-2">
            <Theater size={24} className="text-primary" />
            <h3 className="text-lg font-semibold">soff-mask</h3>
            <Badge variant="secondary">v0.1.0</Badge>
          </div>
          <p className="mt-2 text-muted-foreground">
            Input masking for forms. Phone numbers, documents, currency formatting.
          </p>
        </div>

        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-2">
            <Coins size={24} className="text-primary" />
            <h3 className="text-lg font-semibold">soff-money</h3>
            <Badge variant="secondary">v0.1.0</Badge>
          </div>
          <p className="mt-2 text-muted-foreground">
            Currency formatting and calculation for LATAM currencies.
          </p>
        </div>
      </div>

      <h2>Supported Countries</h2>

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
