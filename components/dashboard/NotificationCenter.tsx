'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // We could fetch this periodically or via a websocket
  // For now we'll fetch on mount
  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data.notifications || []))
      .catch(console.error);
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  async function markAsRead(id: string) {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-700 relative transition-colors focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden flex flex-col max-h-96">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">{unreadCount} new</span>
              )}
            </div>
            <div className="overflow-y-auto flex-1 p-2 space-y-1">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className={`p-3 rounded-lg flex items-start gap-3 group transition-colors ${!n.is_read ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                    <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${!n.is_read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!n.is_read ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-gray-400">
                          {new Date(n.created_at).toLocaleDateString()}
                        </span>
                        {n.link && (
                          <Link href={n.link} className="text-[10px] text-blue-600 hover:underline flex items-center" onClick={() => setIsOpen(false)}>
                            View <ExternalLink className="w-3 h-3 ml-0.5" />
                          </Link>
                        )}
                        {!n.is_read && (
                          <button onClick={() => markAsRead(n.id)} className="text-[10px] text-gray-400 hover:text-gray-700 ml-auto flex items-center">
                            <Check className="w-3 h-3 mr-0.5" /> Mark read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
