'use client';
import { Separator } from '@radix-ui/react-separator';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { SidebarTrigger } from './ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppTopBar() {
  const pathname = usePathname();

  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, allSegments) => ({
      title: segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      link: `/${allSegments.slice(0, index + 1).join('/')}`,
    }));

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={`${item.link}_${index}`}>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link href={item.link}>{item.title}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    </>
  );
}
