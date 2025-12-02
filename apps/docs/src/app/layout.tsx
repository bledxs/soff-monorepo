import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Soff Libraries - Lightweight TypeScript Utilities for LATAM',
    template: '%s | Soff Libraries',
  },
  description:
    'A collection of lightweight, tree-shakeable, and zero-dependency TypeScript utilities designed for Latin American developers. Includes modules for dates, IDs, masks, money, and phone validation.',
  keywords: [
    'typescript',
    'utilities',
    'latam',
    'colombia',
    'mexico',
    'argentina',
    'brazil',
    'chile',
    'validation',
    'formatting',
    'date',
    'money',
    'mask',
    'id',
    'phone',
    'zero-dependency',
    'tree-shakeable',
  ],
  authors: [{ name: 'Luis C. Rojas', url: 'https://github.com/bledxs' }],
  creator: 'Luis C. Rojas',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://soff.dev', // Placeholder, update if real URL exists
    title: 'Soff Libraries - Lightweight TypeScript Utilities for LATAM',
    description:
      'Optimize your development with Soff: A modular suite of TypeScript tools for LATAM. Zero dependencies, maximum performance.',
    siteName: 'Soff Libraries',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soff Libraries - Lightweight TypeScript Utilities for LATAM',
    description:
      'Optimize your development with Soff: A modular suite of TypeScript tools for LATAM. Zero dependencies, maximum performance.',
    creator: '@bledxs', // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="flex-1 overflow-auto">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
