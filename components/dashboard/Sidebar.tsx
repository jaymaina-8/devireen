'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tags,
  FileText,
  Users,
  ShoppingCart,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Command,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSidebarStore } from '@/hooks/use-sidebar';
import { useEffect, useState } from 'react';

export interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string | number;
  badgeVariant?: 'default' | 'warning' | 'danger' | 'info';
  shortcut?: string;
}

const mainNavItems: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Categories', href: '/dashboard/categories', icon: Tags },
  {
    name: 'Quotes',
    href: '/dashboard/quotes',
    icon: FileText,
    badge: 'New',
    badgeVariant: 'info',
  },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Testimonials', href: '/dashboard/testimonials', icon: Star },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapsed } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut Ctrl+\ or Cmd+\ to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        toggleCollapsed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCollapsed]);

  const collapsed = mounted ? isCollapsed : false;

  return (
    <aside
      className={twMerge(
        'fixed top-0 left-0 z-30 flex min-h-screen flex-col border-r border-slate-800/80 bg-slate-950 text-slate-200 shadow-xl transition-all duration-300 ease-in-out select-none',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header / Workspace Brand */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 overflow-hidden"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 font-black text-white shadow-md shadow-blue-500/20">
            D
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col transition-opacity duration-200">
              <span className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-white">
                DEVIREEN{' '}
                <span className="rounded border border-blue-500/20 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-blue-400 uppercase">
                  PRO
                </span>
              </span>
              <span className="truncate text-[11px] text-slate-400">
                Enterprise Operations
              </span>
            </div>
          )}
        </Link>

        {!collapsed && (
          <button
            onClick={toggleCollapsed}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white"
            title="Collapse Sidebar (Ctrl+\)"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main Navigation List */}
      <nav className="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div>
          {!collapsed && (
            <div className="mb-2 px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              Command Center
            </div>
          )}

          <ul className="space-y-1">
            {mainNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <li key={item.name} className="group relative">
                  <Link
                    href={item.href}
                    className={twMerge(
                      clsx(
                        'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                      )
                    )}
                  >
                    <Icon
                      className={twMerge(
                        'h-4 w-4 shrink-0 transition-transform group-hover:scale-110',
                        isActive ? 'text-white' : 'text-slate-400'
                      )}
                    />

                    {!collapsed && (
                      <span className="flex-1 truncate">{item.name}</span>
                    )}

                    {!collapsed && item.badge && (
                      <span
                        className={clsx(
                          'rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase',
                          item.badgeVariant === 'info' &&
                            'border border-blue-500/30 bg-blue-500/20 text-blue-400',
                          item.badgeVariant === 'warning' &&
                            'border border-amber-500/30 bg-amber-500/20 text-amber-400',
                          item.badgeVariant === 'danger' &&
                            'border border-red-500/30 bg-red-500/20 text-red-400',
                          !item.badgeVariant && 'bg-slate-800 text-slate-300'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Active Bar Indicator */}
                    {isActive && (
                      <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-white shadow-sm" />
                    )}
                  </Link>

                  {/* Tooltip for Collapsed Sidebar */}
                  {collapsed && (
                    <div className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 flex -translate-y-1/2 items-center gap-2 rounded-md border border-slate-700/80 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="py-0.2 rounded-full bg-blue-500 px-1.5 text-[9px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Expand Button for Collapsed State */}
      {collapsed && (
        <div className="flex justify-center border-t border-slate-800/80 p-3">
          <button
            onClick={toggleCollapsed}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white"
            title="Expand Sidebar (Ctrl+\)"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Footer Profile & Store Link */}
      {!collapsed && (
        <div className="space-y-3 border-t border-slate-800/80 bg-slate-950/80 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
              View Live Store
            </span>
            <span className="font-mono text-[10px] text-slate-500">v1.4.0</span>
          </Link>

          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-inner">
                AD
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-xs font-semibold text-slate-200">
                  Devireen Admin
                </span>
                <span className="truncate text-[10px] text-slate-400">
                  admin@devireen.com
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
