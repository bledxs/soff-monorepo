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
import { versions, type LibraryName } from '@/lib/versions';

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
    name: 'soff-date' as LibraryName,
    href: '/docs/soff-date',
    icon: Calendar,
    colorClass: 'text-soff-date',
  },
  {
    name: 'soff-id' as LibraryName,
    href: '/docs/soff-id',
    icon: IdCard,
    colorClass: 'text-soff-id',
  },
  {
    name: 'soff-mask' as LibraryName,
    href: '/docs/soff-mask',
    icon: Theater,
    colorClass: 'text-soff-mask',
  },
  {
    name: 'soff-money' as LibraryName,
    href: '/docs/soff-money',
    icon: Coins,
    colorClass: 'text-soff-money',
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
                    tooltip={`${lib.name} v${versions[lib.name]}`}
                  >
                    <Link href={lib.href}>
                      <lib.icon className={lib.colorClass} />
                      <span>{lib.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="bg-muted text-muted-foreground">
                    {versions[lib.name]}
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
