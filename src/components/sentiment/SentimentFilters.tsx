import React from 'react';
import { Clock, Briefcase } from 'lucide-react';

interface SentimentFiltersProps {
  timeframes: string[];
  assetClasses: string[];
  selectedTimeframe: string;
  selectedAsset: string;
  onTimeframeChange: (timeframe: string) => void;
  onAssetChange: (asset: string) => void;
}

export default function SentimentFilters({
  timeframes,
  assetClasses,
  selectedTimeframe,
  selectedAsset,
  onTimeframeChange,
  onAssetChange,
}: SentimentFiltersProps) {
  return (
    <div className="bg-[#0a0c10] p-4 rounded-xl border border-gray-800">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            <Clock size={16} className="inline mr-2" />
            Timeframe
          </label>
          <div className="flex bg-gray-800 rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={`flex-1 px-3 py-1 rounded-md text-sm ${
                  selectedTimeframe === tf
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            <Briefcase size={16} className="inline mr-2" />
            Asset Class
          </label>
          <div className="flex bg-gray-800 rounded-lg p-1">
            {assetClasses.map((asset) => (
              <button
                key={asset}
                onClick={() => onAssetChange(asset)}
                className={`flex-1 px-3 py-1 rounded-md text-sm ${
                  selectedAsset === asset
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {asset}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}