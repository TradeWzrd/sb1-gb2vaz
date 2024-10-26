import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onAuthClick: () => void;
}

function Navbar({ darkMode, toggleDarkMode, onAuthClick }: NavbarProps) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className={`fixed w-full z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Trade Wzrd
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Dashboard', 'Markets', 'Signals', 'Journal', 'Community'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700
                    transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700
                  transition-colors duration-200"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;