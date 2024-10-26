import React from 'react';
import { PaintBucket } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const colorSchemes = [
  { id: 'indigo', name: 'Indigo', color: '#4F46E5' },
  { id: 'emerald', name: 'Emerald', color: '#10B981' },
  { id: 'rose', name: 'Rose', color: '#E11D48' },
  { id: 'amber', name: 'Amber', color: '#F59E0B' },
  { id: 'violet', name: 'Violet', color: '#7C3AED' },
  { id: 'cyan', name: 'Cyan', color: '#06B6D4' }
];

export default function ColorSchemeSelector() {
  const { colorScheme, updateSettings } = useSettings();

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
        <PaintBucket size={12} />
        Color Scheme
      </h3>
      <div className="grid grid-cols-3 gap-1.5">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => updateSettings({ colorScheme: scheme.id as any })}
            className={`p-1.5 rounded-lg border transition-all ${
              colorScheme === scheme.id
                ? 'bg-gray-800/50 border-gray-700'
                : 'border-gray-800 hover:border-gray-700'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: scheme.color }}
              />
              <span className={`text-[10px] ${
                colorScheme === scheme.id ? 'text-white' : 'text-gray-400'
              }`}>
                {scheme.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}