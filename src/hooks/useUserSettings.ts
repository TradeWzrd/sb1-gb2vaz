import { useState, useEffect } from 'react';
import { UserPreferences } from '../types';
import { useAuth } from '../context/AuthContext';

const SETTINGS_KEY = 'tradewzrd_settings';

const defaultSettings: UserPreferences = {
  theme: 'dark',
  currency: 'USD',
  notifications: true
};

export function useUserSettings() {
  const { user, updateProfile } = useAuth();
  const [settings, setSettings] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      return user?.preferences || defaultSettings;
    } catch (error) {
      console.error('Error loading settings:', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    if (user?.preferences) {
      setSettings(user.preferences);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    if (user) {
      updateProfile({ preferences: settings });
    }
  }, [settings, user, updateProfile]);

  const updateSettings = (updates: Partial<UserPreferences>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return {
    settings,
    updateSettings
  };
}