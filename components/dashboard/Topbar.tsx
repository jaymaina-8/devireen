import { Menu } from 'lucide-react';
import { GlobalSearch } from './GlobalSearch';
import { NotificationCenter } from './NotificationCenter';
import { QuickActions } from './QuickActions';

export function Topbar() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 w-full transition-all">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-gray-900 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden sm:block">
          <GlobalSearch />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <QuickActions />
        <div className="sm:hidden">
          <GlobalSearch />
        </div>
        <NotificationCenter />
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer border-2 border-white ring-2 ring-gray-100">
          DE
        </div>
      </div>
    </header>
  );
}
