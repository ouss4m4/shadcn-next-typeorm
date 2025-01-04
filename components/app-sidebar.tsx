'use client';
import * as React from 'react';
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Campaigns',
      url: '',

      items: [
        {
          title: 'Campaigns',
          url: '/campaigns',
        },
        {
          title: 'Lander',
          url: '/landers',
        },
      ],
    },
    {
      title: 'Clients',
      url: '/clients',

      items: [
        {
          title: 'Clients',
          url: '/clients',
        },
        {
          title: 'Users',
          url: '/users',
        },
      ],
    },
    {
      title: 'Billing',
      url: '#',
      items: [
        {
          title: 'Invoices',
          url: '/invoices',
        },
        {
          title: 'Credit History',
          url: '/credit-history',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const getIsItemActive = ({
    url,
  }: {
    title: string;
    url: string;
  }): boolean => {
    return pathname.includes(url);
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader className="my-4 flex items-center">
        <Link href="/">
          <Image
            src="/adwora.svg"
            alt="Logo"
            width={140}
            height={30}
            priority
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={getIsItemActive(item)}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
