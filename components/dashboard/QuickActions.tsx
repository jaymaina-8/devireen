'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Package, FileText, Users, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    { label: 'New Quote', href: '/dashboard/quotes/new', icon: <FileText className="w-4 h-4 mr-2" /> },
    { label: 'New Product', href: '/dashboard/products/new', icon: <Package className="w-4 h-4 mr-2" /> },
    { label: 'New Customer', href: '/dashboard/customers/new', icon: <Users className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="primary" 
        size="sm" 
        className="hidden sm:flex rounded-full shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus className="w-4 h-4 mr-1.5" /> Create
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
          {actions.map((action, idx) => (
            <Link 
              key={idx} 
              href={action.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              {action.icon}
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
