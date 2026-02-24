import React, { useState } from 'react';
import { Bell, X, Check, AlertCircle, Info, BookOpen, CheckCircle } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'homework',
    title: 'Homework Due Tomorrow',
    message: 'Physics Chapter 3 - 10 questions due by 5 PM tomorrow',
    timestamp: '2026-02-24T17:30:00.000Z',
    read: false,
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    type: 'test',
    title: 'Mock Test Results Available',
    message: 'Your Physics mock test (Scored 78/100) results are ready',
    timestamp: '2026-02-24T17:00:00.000Z',
    read: false,
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 3,
    type: 'doubt',
    title: 'Your Doubt Was Answered',
    message: "Your question about Newton's Second Law has been answered",
    timestamp: '2026-02-24T16:00:00.000Z',
    read: true,
    icon: AlertCircle,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'You reached a 7-day learning streak!',
    timestamp: '2026-02-24T06:00:00.000Z',
    read: true,
    icon: CheckCircle,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 5,
    type: 'resource',
    title: 'New Study Material Available',
    message: 'Chapter 4 of your course now has video explanations',
    timestamp: '2026-02-23T18:00:00.000Z',
    read: true,
    icon: Info,
    color: 'bg-indigo-100 text-indigo-600',
  },
];

function buildInitialNotifications() {
  return INITIAL_NOTIFICATIONS.map((notification) => ({
    ...notification,
    timestamp: new Date(notification.timestamp),
  }));
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => buildInitialNotifications());

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
          aria-expanded={isOpen}
          className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg transition"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span
              className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold"
              aria-hidden="false"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-80 sm:w-96 max-w-screen-sm bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-96 overflow-hidden flex flex-col"
            role="region"
            aria-label="Notifications panel"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close notifications panel"
                className="p-1 hover:bg-gray-200 rounded transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-600">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map(notif => {
                  const IconComponent = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                        !notif.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${notif.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm">{notif.title}</p>
                          <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
                          <p className="text-gray-500 text-xs mt-2">{getTimeAgo(notif.timestamp)}</p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          {!notif.read && (
                            <button
                              onClick={() => handleMarkAsRead(notif.id)}
                              className="p-1 hover:bg-blue-200 rounded transition"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4 text-blue-600" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteNotification(notif.id)}
                            className="p-1 hover:bg-red-200 rounded transition"
                            title="Delete"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50 flex gap-2">
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-100 rounded transition"
                >
                  Mark all as read
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="flex-1 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 rounded transition"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
