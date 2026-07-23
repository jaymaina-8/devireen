'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Package, Users, FileText, ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'product': return <Package className="w-4 h-4 text-gray-500" />;
      case 'customer': return <Users className="w-4 h-4 text-gray-500" />;
      case 'quote': return <FileText className="w-4 h-4 text-gray-500" />;
      case 'order': return <ShoppingCart className="w-4 h-4 text-gray-500" />;
      default: return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm text-gray-400 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors w-48 md:w-64 border border-transparent"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-gray-300 bg-white px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-gray-500">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center px-4 border-b border-gray-100">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent border-0 h-14 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 text-lg"
                placeholder="Search products, customers, orders..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query.length < 2 && (
                <div className="p-8 text-center text-gray-500 text-sm">
                  Type at least 2 characters to search.
                </div>
              )}
              {query.length >= 2 && !loading && results.length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No results found for &quot;{query}&quot;.
                </div>
              )}
              {results.length > 0 && (
                <ul className="p-2 space-y-1">
                  {results.map((result, idx) => (
                    <li key={idx}>
                      <Link 
                        href={result.url} 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100">
                          {getIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                          <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded-full uppercase tracking-wider">
                          {result.type}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="p-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between">
              <span>Use arrows to navigate</span>
              <span>esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
