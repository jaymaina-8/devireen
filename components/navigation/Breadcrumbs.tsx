import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-text-muted", className)} {...props}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-primary-600 transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-text-muted/50" />
            {item.href && index !== items.length - 1 ? (
              <Link href={item.href} className="hover:text-primary-600 transition-colors font-medium">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-main font-semibold" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
