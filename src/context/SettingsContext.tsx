import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorScheme = 'indigo' | 'emerald' | 'rose' | 'amber' | 'violet' | 'cyan';
type Theme = 'light' | 'dark';
type Layout = 'grid' | 'list';
type ChartStyle = 'candlestick' | 'line' | 'area' | 'bars';

interface Settings {
  theme: Theme;
  language: string;
  layout: Layout;
  chartStyle: ChartStyle;
  notifications: boolean;
  soundEnabled: boolean;
  colorScheme: ColorScheme;
  fontSize: 'sm' | 'base' | 'lg';
  reducedMotion: boolean;
  compactMode: boolean;
  initialBalance: number;
}

interface SettingsContextType extends Settings {
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const STORAGE_KEY = 'tradewzrd_settings';

const defaultSettings: Settings = {
  theme: 'dark',
  language: 'en',
  layout: 'grid',
  chartStyle: 'candlestick',
  notifications: true,
  soundEnabled: true,
  colorScheme: 'indigo',
  fontSize: 'base',
  reducedMotion: false,
  compactMode: false,
  initialBalance: 10000
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch (error) {
      console.error('Error loading settings:', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      
      // Apply theme
      document.documentElement.classList.toggle('dark', settings.theme === 'dark');
      
      // Apply color scheme
      document.documentElement.setAttribute('data-color-scheme', settings.colorScheme);
      
      // Apply font size
      document.documentElement.style.fontSize = {
        sm: '14px',
        base: '16px',
        lg: '18px'
      }[settings.fontSize];
      
      // Apply reduced motion
      if (settings.reducedMotion) {
        document.documentElement.style.setProperty('--motion-reduce', 'reduce');
      } else {
        document.documentElement.style.removeProperty('--motion-reduce');
      }
      
      // Apply compact mode
      document.documentElement.classList.toggle('compact', settings.compactMode);
      
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}