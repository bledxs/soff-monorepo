'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  Clock,
  IdCard,
  Theater,
  Coins,
  BookOpen,
  Download,
  ExternalLink,
  Map,
  Phone,
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
    name: 'soff-cron' as LibraryName,
    href: '/docs/soff-cron',
    icon: Clock,
    colorClass: 'text-soff-cron',
  },
  {
    name: 'soff-date' as LibraryName,
    href: '/docs/soff-date',
    icon: Calendar,
    colorClass: 'text-soff-date',
  },
  {
    name: 'soff-geo' as LibraryName,
    href: '/docs/soff-geo',
    icon: Map,
    colorClass: 'text-soff-geo',
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
  {
    name: 'soff-phone' as LibraryName,
    href: '/docs/soff-phone',
    icon: Phone,
    colorClass: 'text-soff-phone',
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b px-4 py-4 transition-all duration-200">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 shrink-0 rounded-lg bg-linear-to-br from-soff-date to-soff-id p-1.5 shadow-sm">
            <Image
              src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png"
              alt="Soff Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <div className="overflow-hidden whitespace-nowrap transition-all duration-200 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
            <span className="text-lg font-bold">Soff Libraries</span>
            <p className="text-xs text-muted-foreground">LATAM utilities</p>
          </div>
        </Link>
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
