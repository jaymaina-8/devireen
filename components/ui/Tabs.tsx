'use client';

import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

export function Tabs({ defaultValue, children, className = '' }: { defaultValue: string, children: React.ReactNode, className?: string }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex items-center space-x-2 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '' }: { value: string, children: React.ReactNode, className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be inside Tabs');
  
  const isActive = context.activeTab === value;
  
  return (
    <button
      type="button"
      onClick={() => context.setActiveTab(value)}
      className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
        isActive 
          ? 'border-blue-600 text-blue-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }: { value: string, children: React.ReactNode, className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be inside Tabs');
  
  if (context.activeTab !== value) return null;
  
  return <div className={`pt-4 ${className}`}>{children}</div>;
}
