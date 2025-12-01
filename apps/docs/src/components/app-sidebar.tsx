'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  IdCard,
  Theater,
  Coins,
  BookOpen,
  Download,
  ExternalLink,
  Package,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarRail,
} from '@/components/ui/sidebar';

const gettingStarted = [
  {
    title: 'Introduction',
    href: '/docs/introduction',
    icon: BookOpen,
  },
  {
    title: 'Installation',
    href: '/docs/installation',
    icon: Download,
  },
];

const libraries = [
  {
    title: 'soff-date',
    href: '/docs/soff-date',
    icon: Calendar,
    version: '0.2.0',
    status: 'stable' as const,
  },
  {
    title: 'soff-id',
    href: '/docs/soff-id',
    icon: IdCard,
    version: '0.1.0',
    status: 'stable' as const,
  },
  {
    title: 'soff-mask',
    href: '/docs/soff-mask',
    icon: Theater,
    version: '0.1.0',
    status: 'beta' as const,
  },
  {
    title: 'soff-money',
    href: '/docs/soff-money',
    icon: Coins,
    version: '0.1.0',
    status: 'beta' as const,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b px-4 py-4 transition-all duration-200">
        <Link href="/" className="flex items-center gap-2">
          <Package className="size-5 shrink-0" />
          <span className="text-xl font-bold overflow-hidden whitespace-nowrap transition-all duration-200 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
            Soff Libraries
          </span>
        </Link>
        <p className="text-xs text-muted-foreground overflow-hidden whitespace-nowrap transition-all duration-200 group-data-[collapsible=icon]:h-0 group-data-[collapsible=icon]:opacity-0">
          LATAM utilities for developers
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {gettingStarted.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Libraries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {libraries.map((lib) => (
                <SidebarMenuItem key={lib.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === lib.href}
                    tooltip={`${lib.title} ${lib.version}`}
                  >
                    <Link href={lib.href}>
                      <lib.icon />
                      <span>{lib.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge
                    className={
                      lib.status === 'stable'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }
                  >
                    {lib.version}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="GitHub">
              <a
                href="https://github.com/bledxs/soff-monorepo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink />
                <span>GitHub</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
