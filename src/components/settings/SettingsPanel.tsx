import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, X, Moon, Sun, Globe, Bell,
  Volume2, PaintBucket, Type, Zap, 
  Minimize2, RotateCcw, Monitor, DollarSign
} from 'lucide-react';
import { BackgroundGradient } from '../ui/BackgroundGradient';
import { ShimmerButton } from '../ui/ShimmerButton';
import { useSettings } from '../../context/SettingsContext';
import ColorSchemeSelector from './ColorSchemeSelector';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const {
    theme,
    language,
    notifications,
    soundEnabled,
    fontSize,
    reducedMotion,
    compactMode,
    initialBalance,
    updateSettings,
    resetSettings
  } = useSettings();

  const [balance, setBalance] = useState(initialBalance?.toString() || '10000');

  const panelVariants = {
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBalance(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateSettings({ initialBalance: numValue });
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      resetSettings();
      setBalance('10000');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
            className="fixed inset-y-0 right-0 w-full sm:w-[20rem] bg-gray-900 border-l border-gray-800 shadow-xl z-50 overflow-hidden"
          >
            <BackgroundGradient className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <Settings className="text-indigo-500" size={18} />
                    <h2 className="text-base font-bold text-white">Settings</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="text-gray-400 hover:text-white" size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                      <Monitor size={12} />
                      Theme
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateSettings({ theme: 'light' })}
                        className={`flex-1 p-1.5 rounded-lg border transition-colors ${
                          theme === 'light'
                            ? 'bg-gray-800/50 border-gray-700 text-white'
                            : 'border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        <Sun size={14} className="mx-auto mb-1" />
                        <span className="text-xs">Light</span>
                      </button>
                      <button
                        onClick={() => updateSettings({ theme: 'dark' })}
                        className={`flex-1 p-1.5 rounded-lg border transition-colors ${
                          theme === 'dark'
                            ? 'bg-gray-800/50 border-gray-700 text-white'
                            : 'border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        <Moon size={14} className="mx-auto mb-1" />
                        <span className="text-xs">Dark</span>
                      </button>
                    </div>
                  </div>

                  <ColorSchemeSelector />

                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                      <DollarSign size={12} />
                      Initial Balance
                    </h3>
                    <input
                      type="number"
                      value={balance}
                      onChange={handleBalanceChange}
                      step="1"
                      className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-800 p-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                      <Type size={12} />
                      Font Size
                    </h3>
                    <div className="flex gap-2">
                      {['sm', 'base', 'lg'].map((size) => (
                        <button
                          key={size}
                          onClick={() => updateSettings({ fontSize: size as any })}
                          className={`flex-1 p-1.5 rounded-lg border transition-colors ${
                            fontSize === size
                              ? 'bg-gray-800/50 border-gray-700 text-white'
                              : 'border-gray-800 text-gray-400 hover:border-gray-700'
                          }`}
                        >
                          <span className="text-xs">
                            {size === 'sm' ? 'Small' : size === 'base' ? 'Medium' : 'Large'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                      <Globe size={12} />
                      Language
                    </h3>
                    <select
                      value={language}
                      onChange={(e) => updateSettings({ language: e.target.value })}
                      className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-800 p-1.5 text-xs"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Bell size={12} className="text-gray-400" />
                        <span className="text-xs text-white">Notifications</span>
                      </div>
                      <button
                        onClick={() => updateSettings({ notifications: !notifications })}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          notifications ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                          notifications ? 'translate-x-4' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Volume2 size={12} className="text-gray-400" />
                        <span className="text-xs text-white">Sound Effects</span>
                      </div>
                      <button
                        onClick={() => updateSettings({ soundEnabled: !soundEnabled })}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          soundEnabled ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                          soundEnabled ? 'translate-x-4' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Zap size={12} className="text-gray-400" />
                        <span className="text-xs text-white">Reduced Motion</span>
                      </div>
                      <button
                        onClick={() => updateSettings({ reducedMotion: !reducedMotion })}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          reducedMotion ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                          reducedMotion ? 'translate-x-4' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Minimize2 size={12} className="text-gray-400" />
                        <span className="text-xs text-white">Compact Mode</span>
                      </div>
                      <button
                        onClick={() => updateSettings({ compactMode: !compactMode })}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          compactMode ? 'bg-indigo-600' : 'bg-gray-700'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                          compactMode ? 'translate-x-4' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-gray-800 space-y-2">
                  <button
                    onClick={handleReset}
                    className="w-full px-2 py-1 text-red-400 hover:text-red-300 flex items-center justify-center gap-1.5 text-xs"
                  >
                    <RotateCcw size={12} />
                    Reset to Default
                  </button>
                  <ShimmerButton onClick={onClose} className="w-full py-1 text-xs">
                    Save Changes
                  </ShimmerButton>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}