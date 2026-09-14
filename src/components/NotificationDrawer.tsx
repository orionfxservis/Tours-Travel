import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  CheckCheck,
  Plane,
  Vote,
  Receipt,
  Sun,
  Clock,
  Sparkles
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationOpen,
    setNotificationOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useApp();

  if (!isNotificationOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4 text-sky-500" />;
      case 'vote':
        return <Vote className="w-4 h-4 text-primary" />;
      case 'expense':
        return <Receipt className="w-4 h-4 text-amber-500" />;
      case 'weather':
        return <Sun className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-secondary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-sm h-full shadow-2xl border-l border-surface-container-high/40 flex flex-col animate-slide-left">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-surface-container-high/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-on-surface">
              Trip Notifications
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={markAllNotificationsAsRead}
              className="p-2 rounded-lg hover:bg-surface-container text-xs text-secondary font-bold"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setNotificationOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Notifications */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant text-xs">
              No notifications at the moment.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  notif.isRead
                    ? 'bg-surface-container-low/50 border-surface-container-high/30 opacity-70'
                    : 'bg-surface-container-low border-primary/40 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-on-surface truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-outline ml-1 whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
