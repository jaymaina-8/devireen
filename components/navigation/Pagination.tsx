import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange, className, ...props }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center space-x-2", className)} {...props}>
      <Button 
        variant="outline" 
        size="icon" 
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-text-main">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <Button 
        variant="outline" 
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </nav>
  );
}
