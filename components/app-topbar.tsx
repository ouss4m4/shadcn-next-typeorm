import { Separator } from "@radix-ui/react-separator";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";

// Function to prettify URL segments
const prettifySegment = (segment: string) => {
  return segment
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

export default function AppTopBar({
  breadcrumbs,
}: {
  breadcrumbs: { title: string; link: string }[];
}) {
  const generatedBreadcrumbs =
    breadcrumbs ??
    window.location.pathname
      .split("/")
      .filter(Boolean) // Remove empty segments
      .map((segment, index, segments) => ({
        title: prettifySegment(segment),
        link: `/${segments.slice(0, index + 1).join("/")}`, // Construct the URL link
      }));

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {generatedBreadcrumbs.map((item, index) => (
                <BreadcrumbItem
                  className="hidden md:block"
                  key={`${item.link}_${index}`}
                >
                  <BreadcrumbLink asChild>
                    <Link href={item.link}>{item.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    </>
  );
}
