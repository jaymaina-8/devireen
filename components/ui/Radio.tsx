import * as React from "react";
import { cn } from "@/lib/utils";

export const Radio = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      type="radio"
      ref={ref}
      className={cn(
        "h-4 w-4 rounded-full border-border-strong text-primary focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 appearance-none checked:bg-primary checked:border-primary",
        className
      )}
      {...props}
    />
  )
);
Radio.displayName = "Radio";
