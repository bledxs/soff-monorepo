'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ExternalLink } from 'lucide-react';
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

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
        <Link href="/" className="font-bold text-foreground">
          Soff Libraries
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={`fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-72 transform border-r border-border bg-sidebar p-6 transition-transform duration-200 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Getting Started
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/docs/introduction"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                >
                  Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/installation"
                  onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
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
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                >
                  GitHub <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
