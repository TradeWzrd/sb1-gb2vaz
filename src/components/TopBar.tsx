import React from 'react';
import { Search, Bell, Menu, X, ChevronDown, Settings, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TopBarProps {
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export default function TopBar({ onOpenSettings, onOpenHelp }: TopBarProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-30 w-full">
      <div className="bg-[#0f1117]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex-1 flex items-center lg:justify-start">
              <div className="hidden lg:block w-full max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search markets..."
                    className="w-full bg-gray-900/50 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded={isSearchOpen}
              >
                <Search size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onOpenSettings}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>

              <button 
                onClick={onOpenHelp}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Help"
              >
                <HelpCircle size={20} />
              </button>

              <button 
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                  aria-expanded={isProfileOpen}
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=32&h=32&q=80"}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm text-white font-medium">{user?.name || 'Guest'}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Your Profile
                    </a>
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Settings
                    </a>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isSearchOpen && (
            <div className="lg:hidden px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="w-full bg-gray-900/50 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}