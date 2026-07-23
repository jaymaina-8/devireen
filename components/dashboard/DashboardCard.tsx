"use client";

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: any;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function DashboardCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: DashboardCardProps) {
  return (
    <div className={twMerge(clsx("bg-white rounded-xl border border-gray-200 p-6 shadow-sm", className))}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {(description || trend) && (
          <div className="mt-2 flex items-center text-sm">
            {trend && (
              <span
                className={clsx(
                  "font-medium mr-2",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "+" : "-"}{trend.value}%
              </span>
            )}
            {description && <span className="text-gray-500">{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
