'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileSidebar } from '@/components/dashboard/MobileSidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { Toaster } from '@/components/ui/Toaster';
import { FloatingQuickCreate } from '@/components/dashboard/FloatingQuickCreate';
import { useSidebarStore } from '@/hooks/use-sidebar';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Slide-over Drawer */}
      <MobileSidebar />

      {/* Main Layout Area */}
      <div
        className={twMerge(
          'flex min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out',
          isCollapsed ? 'md:pl-16' : 'md:pl-64'
        )}
      >
        <Topbar />
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 overflow-x-hidden p-4 pb-20 sm:p-6 sm:pb-8 lg:p-8">
          {children}
        </main>
      </div>

      {/* Floating Speed Dial Quick Create FAB */}
      <FloatingQuickCreate />

      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  );
}
