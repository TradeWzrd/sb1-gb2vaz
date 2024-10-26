import React from 'react';
import { Check, ExternalLink } from 'lucide-react';

interface BrokerListProps {
  onSelect: (broker: string) => void;
  selectedBroker: string | null;
}

const brokers = [
  {
    id: 'interactive-brokers',
    name: 'Interactive Brokers',
    logo: 'https://cdn.brokercomparison.com/logos/interactive-brokers.png',
    status: 'direct',
    assets: ['Stocks', 'Options', 'Futures', 'Forex']
  },
  {
    id: 'mt4',
    name: 'MetaTrader 4',
    logo: 'https://cdn.brokercomparison.com/logos/metatrader4.png',
    status: 'direct',
    assets: ['Forex', 'CFDs', 'Crypto']
  },
  {
    id: 'mt5',
    name: 'MetaTrader 5',
    logo: 'https://cdn.brokercomparison.com/logos/metatrader5.png',
    status: 'direct',
    assets: ['Forex', 'CFDs', 'Crypto', 'Stocks']
  }
];

export default function BrokerList({ onSelect, selectedBroker }: BrokerListProps) {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Supported Brokers</h3>
      
      <div className="space-y-4">
        {brokers.map((broker) => (
          <button
            key={broker.id}
            onClick={() => onSelect(broker.id)}
            className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
              selectedBroker === broker.id
                ? 'bg-indigo-600/20 border-indigo-500/50'
                : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={broker.logo}
                alt={broker.name}
                className="w-12 h-12 rounded-lg object-contain bg-white p-2"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-medium">{broker.name}</h4>
                  {broker.status === 'direct' && (
                    <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                      Direct Integration
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {broker.assets.map((asset) => (
                    <span
                      key={asset}
                      className="px-2 py-0.5 text-xs bg-gray-700/50 text-gray-300 rounded-full"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>

              <Check 
                size={20} 
                className={`${
                  selectedBroker === broker.id
                    ? 'text-indigo-500'
                    : 'text-gray-600'
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}