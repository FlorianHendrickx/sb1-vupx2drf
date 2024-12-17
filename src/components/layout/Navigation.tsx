import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Inbox, 
  Users, 
  Network,
  ChevronLeft, 
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  const { user, currentView, setCurrentView } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    document.documentElement.style.setProperty('--nav-width', !isExpanded ? '240px' : '64px');
  };

  const NavItem = ({ icon: Icon, label, view }: { 
    icon: React.ElementType;
    label: string;
    view: 'prospects' | 'inbox' | 'network';
  }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-3 p-3 w-full rounded-lg transition-colors ${
        currentView === view
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
      }`}
    >
      <Icon className="w-5 h-5" />
      {isExpanded && <span>{label}</span>}
    </button>
  );

  return (
    <nav 
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-60' : 'w-16'
      }`}
      style={{ zIndex: 50 }}
    >
      <button
        onClick={handleToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      <div className="p-3 flex-1">
        <div className="space-y-1">
          <NavItem icon={Users} label="Prospects" view="prospects" />
          <NavItem icon={Inbox} label="Inbox" view="inbox" />
          <NavItem icon={Network} label="Your Network" view="network" />
        </div>
      </div>

      <div className="mt-auto p-3 border-t border-gray-200 dark:border-gray-800">
        <ThemeToggle />
        <button
          className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mt-2"
        >
          <img
            src={user?.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'}
            alt={user?.name || 'User'}
            className="w-8 h-8 rounded-full"
          />
          {isExpanded && (
            <div className="flex-1 text-left">
              <div className="font-medium truncate dark:text-white">{user?.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </div>
            </div>
          )}
        </button>
        <button 
          className="flex items-center gap-2 p-2 w-full rounded-lg text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 mt-1"
        >
          <LogOut className="w-5 h-5" />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </nav>
  );
};