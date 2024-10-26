import React from 'react';
import { X, Star } from 'lucide-react';
import { BrokerFilters as FilterType } from '../../types/broker';

interface BrokerFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
  onClose: () => void;
}

const platforms = ['MT4', 'MT5', 'cTrader', 'WebTrader'];
const regulations = ['FCA', 'CySEC', 'ASIC', 'FSCA'];
const features = ['Demo Account', 'Islamic Account', 'Copy Trading', 'Education'];

export default function BrokerFilters({ filters, onChange, onClose }: BrokerFiltersProps) {
  const handleRatingChange = (rating: number) => {
    onChange({ ...filters, minRating: rating });
  };

  const handleDepositChange = (deposit: number) => {
    onChange({ ...filters, maxMinDeposit: deposit });
  };

  const togglePlatform = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];
    onChange({ ...filters, platforms: newPlatforms });
  };

  const toggleRegulation = (regulation: string) => {
    const newRegulations = filters.regulation.includes(regulation)
      ? filters.regulation.filter(r => r !== regulation)
      : [...filters.regulation, regulation];
    onChange({ ...filters, regulation: newRegulations });
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    onChange({ ...filters, features: newFeatures });
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minimum Rating
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`p-2 rounded-lg ${
                  filters.minRating >= rating
                    ? 'text-yellow-500'
                    : 'text-gray-500'
                }`}
              >
                <Star size={20} fill={filters.minRating >= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Maximum Minimum Deposit
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.maxMinDeposit}
            onChange={(e) => handleDepositChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-400 mt-1">
            Up to ${filters.maxMinDeposit}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Trading Platforms
          </label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.platforms.includes(platform)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800/30 text-gray-400 hover:text-white'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Regulation
          </label>
          <div className="flex flex-wrap gap-2">
            {regulations.map((regulation) => (
              <button
                key={regulation}
                onClick={() => toggleRegulation(regulation)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.regulation.includes(regulation)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800/30 text-gray-400 hover:text-white'
                }`}
              >
                {regulation}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Features
          </label>
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <button
                key={feature}
                onClick={() => toggleFeature(feature)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.features.includes(feature)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800/30 text-gray-400 hover:text-white'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}