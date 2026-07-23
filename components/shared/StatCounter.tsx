"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  sublabel,
  className,
  ...props
}: StatCounterProps) {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  React.useEffect(() => {
    if (!hasAnimated) return;

    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasAnimated, value, duration]);

  return (
    <div ref={ref} className={cn("text-center", className)} {...props}>
      <div className="text-4xl md:text-5xl font-bold text-primary-600 tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm font-semibold text-text-main uppercase tracking-wider">{label}</div>
      {sublabel && <div className="mt-1 text-xs text-text-muted">{sublabel}</div>}
    </div>
  );
}
