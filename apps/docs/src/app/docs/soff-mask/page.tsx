import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'soff-mask - Input Masking',
};

export default function SoffMaskPage() {
  return (
    <article className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎭</span>
          <h1 className="text-3xl font-bold">soff-mask</h1>
          <Badge variant="secondary">v0.1.0</Badge>
          <Badge variant="outline">Coming Soon</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Input masking for forms - Phone numbers, documents, currency formatting.
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <p className="text-muted-foreground">Documentation coming soon...</p>
      </div>
    </article>
  );
}
