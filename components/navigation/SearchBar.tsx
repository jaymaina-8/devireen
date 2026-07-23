import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative w-full max-w-lg", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-text-muted" />
      </div>
      <input
        type="search"
        className="block w-full rounded-md border border-border-strong bg-surface py-2 pl-10 pr-3 text-sm placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all"
        placeholder="Search by product name, SKU, or brand..."
        {...props}
      />
    </div>
  );
}
