"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Building2,
  Landmark,
  Briefcase,
  HeartPulse,
  Hotel,
  Church,
} from "lucide-react";

interface ClientType {
  icon: React.ReactNode;
  label: string;
}

const clients: ClientType[] = [
  { icon: <GraduationCap className="h-5 w-5" />, label: "Schools & Universities" },
  { icon: <Building2 className="h-5 w-5" />, label: "Corporate Offices" },
  { icon: <Landmark className="h-5 w-5" />, label: "Government Agencies" },
  { icon: <Briefcase className="h-5 w-5" />, label: "SMEs & Startups" },
  { icon: <HeartPulse className="h-5 w-5" />, label: "Hospitals & Clinics" },
  { icon: <Hotel className="h-5 w-5" />, label: "Hotels & Hospitality" },
  { icon: <Church className="h-5 w-5" />, label: "NGOs & Faith Organizations" },
];

interface LogoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ClientType[];
}

export function LogoCarousel({ items = clients, className, ...props }: LogoCarouselProps) {
  // Double the items for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <div className={cn("w-full overflow-hidden", className)} {...props}>
      <div className="flex animate-logo-scroll w-max">
        {doubled.map((client, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-6 py-3 mx-3 rounded-lg border border-border-subtle bg-surface/80 whitespace-nowrap text-sm text-text-muted shrink-0"
          >
            <span className="text-primary-500">{client.icon}</span>
            <span className="font-medium">{client.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
