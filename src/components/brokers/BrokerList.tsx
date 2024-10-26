import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { Broker } from '../../types/broker';

interface BrokerListProps {
  brokers: Broker[];
  onSelect: (broker: Broker) => void;
  selectedBroker: Broker | null;
  selectedForComparison: Broker[];
  onToggleComparison: (broker: Broker) => void;
}

export default function BrokerList({
  brokers,
  onSelect,
  selectedBroker,
  selectedForComparison,
  onToggleComparison
}: BrokerListProps) {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Featured Brokers</h3>
      
      <div className="space-y-4">
        {brokers.map((broker) => (
          <div
            key={broker.id}
            className={`w-full p-4 rounded-lg border transition-all duration-200 ${
              selectedBroker?.id === broker.id
                ? 'bg-indigo-600/20 border-indigo-500/50'
                : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={broker.logo}
                  alt={broker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelect(broker)}
                    className="text-white font-medium hover:text-indigo-400"
                  >
                    {broker.name}
                  </button>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span className="text-sm">{broker.rating.toFixed(1)}</span>
                  </div>
                  {broker.region === 'US' && (
                    <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                      US Traders
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {broker.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-0.5 text-xs bg-gray-700/50 text-gray-300 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleComparison(broker)}
                  className={`p-2 rounded-lg transition-colors ${
                    selectedForComparison.find(b => b.id === broker.id)
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white'
                  }`}
                  title={
                    selectedForComparison.find(b => b.id === broker.id)
                      ? 'Selected for comparison'
                      : 'Select for comparison'
                  }
                >
                  <Check size={18} />
                </button>

                <a
                  href={broker.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}

        {brokers.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No brokers found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}