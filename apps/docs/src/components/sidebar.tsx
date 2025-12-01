import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const libraries = [
  {
    name: 'soff-date',
    description: 'Holiday calculator',
    href: '/docs/soff-date',
    version: '0.2.0',
    status: 'stable' as const,
  },
  {
    name: 'soff-id',
    description: 'Document validation',
    href: '/docs/soff-id',
    version: '0.1.0',
    status: 'stable' as const,
  },
  {
    name: 'soff-mask',
    description: 'Input masking',
    href: '/docs/soff-mask',
    version: '0.1.0',
    status: 'beta' as const,
  },
  {
    name: 'soff-money',
    description: 'Currency formatting',
    href: '/docs/soff-money',
    version: '0.1.0',
    status: 'beta' as const,
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-sidebar p-6">
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold text-foreground">
          Soff Libraries
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">LATAM utilities for developers</p>
      </div>

      <nav className="space-y-6">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Getting Started
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/docs/introduction"
                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
              >
                Introduction
              </Link>
            </li>
            <li>
              <Link
                href="/docs/installation"
                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
              >
                Installation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Libraries
          </h3>
          <ul className="space-y-1">
            {libraries.map((lib) => (
              <li key={lib.name}>
                <Link
                  href={lib.href}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                >
                  <span>{lib.name}</span>
                  <Badge variant={lib.status === 'stable' ? 'default' : 'secondary'}>
                    {lib.version}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Resources
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com/bledxs/soff-monorepo"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
