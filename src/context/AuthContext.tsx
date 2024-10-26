import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types';

const STORAGE_KEY = 'tradewzrd_auth';

// Test accounts with predefined credentials
const TEST_ACCOUNTS = [
  {
    email: 'demo@tradewzrd.com',
    password: 'demo123',
    name: 'Demo User',
    initialBalance: 10000
  },
  {
    email: 'test@tradewzrd.com',
    password: 'test123',
    name: 'Test User',
    initialBalance: 25000
  }
] as const;

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          user: parsed.user,
          isAuthenticated: true,
          isLoading: false
        };
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
  });

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        user: state.user,
        lastLogin: new Date().toISOString()
      }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state.isAuthenticated, state.user]);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Find matching test account
      const account = TEST_ACCOUNTS.find(
        acc => acc.email === email && acc.password === password
      );

      if (!account) {
        throw new Error('Invalid credentials. Please use a test account.');
      }

      const user: User = {
        id: account.email,
        name: account.name,
        email: account.email,
        avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${account.email}`,
        preferences: {
          theme: 'dark',
          currency: 'USD',
          notifications: true,
          initialBalance: account.initialBalance
        },
        stats: {
          tradesCount: 0,
          winRate: 0,
          totalPnL: 0,
          avgTradeSize: 0
        },
        createdAt: new Date().toISOString()
      };

      setState({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('tradewzrd_settings');
    localStorage.removeItem('tradewzrd_trades');
  };

  const register = async (email: string, password: string, name: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      throw new Error('Registration is disabled. Please use a test account.');
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) throw new Error('No user logged in');

    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null
    }));
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      register,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}