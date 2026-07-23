import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart, FileText, CheckCircle, Truck } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  timeframe?: string;
}

const defaultSteps: Step[] = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Browse",
    description: "Explore our catalogue of 500+ products across all categories.",
    timeframe: "At your pace",
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Add to Quote",
    description: "Add items with quantities to your quote cart — no account required.",
    timeframe: "Minutes",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Receive Quote",
    description: "Our sales team prepares a detailed, itemized quotation for your review.",
    timeframe: "Within 24 hours",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Approve & Pay",
    description: "Review pricing, confirm your order, and process payment securely.",
    timeframe: "Same day",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Delivery",
    description: "Fast, reliable delivery to your office, school, or institution nationwide.",
    timeframe: "1–3 business days",
  },
];

interface ProcessTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: Step[];
}

export function ProcessTimeline({
  steps = defaultSteps,
  className,
  ...props
}: ProcessTimelineProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Desktop: Horizontal */}
      <div className="hidden md:flex items-start justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-7 left-[10%] right-[10%] h-[2px] bg-border-subtle" aria-hidden="true">
          <div className="h-full bg-primary-200 w-full" />
        </div>

        {steps.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center flex-1 px-2">
            <div className="relative z-10 h-14 w-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md mb-4">
              {step.icon}
            </div>
            <h4 className="text-sm font-bold text-text-main mb-1">{step.title}</h4>
            <p className="text-xs text-text-muted leading-relaxed max-w-[160px]">{step.description}</p>
            {step.timeframe && (
              <span className="mt-2 inline-block text-[10px] font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 border border-primary-100 rounded-full px-2 py-0.5">
                {step.timeframe}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical */}
      <div className="md:hidden space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4 relative">
            {/* Vertical line */}
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md shrink-0 z-10">
                {step.icon}
              </div>
              {i < steps.length - 1 && (
                <div className="w-[2px] flex-1 bg-primary-200 my-1" aria-hidden="true" />
              )}
            </div>
            <div className="pb-8">
              <h4 className="text-sm font-bold text-text-main">{step.title}</h4>
              <p className="text-xs text-text-muted leading-relaxed mt-1">{step.description}</p>
              {step.timeframe && (
                <span className="mt-2 inline-block text-[10px] font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 border border-primary-100 rounded-full px-2 py-0.5">
                  {step.timeframe}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
