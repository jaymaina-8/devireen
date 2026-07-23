"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-in" | "slide-right" | "slide-left" | "scale-in";

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  as?: "section" | "div" | "article";
}

export function AnimatedSection({
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
  as: Tag = "div",
  className,
  children,
  style,
  ...props
}: AnimatedSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animationStyles: Record<AnimationType, React.CSSProperties> = {
    "fade-up": {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(24px)",
    },
    "fade-in": {
      opacity: isVisible ? 1 : 0,
    },
    "slide-right": {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(-32px)",
    },
    "slide-left": {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(32px)",
    },
    "scale-in": {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "scale(1)" : "scale(0.92)",
    },
  };

  return (
    <Tag
      ref={ref}
      className={cn("transition-all duration-700", className)}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        ...animationStyles[animation],
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
