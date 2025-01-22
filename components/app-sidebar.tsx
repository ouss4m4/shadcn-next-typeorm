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
import { usePathname, useRouter } from 'next/navigation';
import { useUserInfo } from '@/app/(private)/context/UserInfoContext';

const data = {
  navMain: [
    {
      title: 'Campaigns',
      visibleTo: ['Advertiser'],
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
      title: 'Tracking Links',
      visibleTo: ['Publisher'],
      items: [
        {
          title: 'Placements',
          url: '/placements',
        },
        {
          title: 'Traffic Sources',
          url: '/traffic-sources',
        },
        {
          title: 'Sub Sources',
          url: '/sub-sources',
        },
      ],
    },
    {
      title: 'Billing',
      visibleTo: ['Publisher', 'Advertiser'],
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
  const router = useRouter();
  const pathname = usePathname();
  const userInfo = useUserInfo();
  const getIsItemActive = (url: string): boolean => {
    return pathname.includes(url);
  };

  const handleLogout = async () => {
    document.cookie = 'jwt=; Max-Age=0; path=/;';
    document.cookie = 'name=; Max-Age=0; path=/;';
    router.push('/login');
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
        {data.navMain.map(({ title, items, visibleTo }) => {
          if (
            userInfo &&
            userInfo.role != 'Admin' &&
            !visibleTo?.includes(userInfo?.role)
          ) {
            return;
          }
          return (
            <SidebarGroup key={title}>
              <SidebarGroupLabel>{title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(({ title, url }) => (
                    <SidebarMenuItem key={title}>
                      <SidebarMenuButton
                        asChild
                        isActive={getIsItemActive(url)}
                      >
                        <Link href={url} prefetch={false}>
                          {title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}

        <SidebarMenuItem key="logout" className="mb-14 mt-auto">
          <SidebarMenuButton onClick={handleLogout}>Logout</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
