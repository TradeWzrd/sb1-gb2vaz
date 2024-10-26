import React, { useState } from 'react';
import { Search, Filter, Star, DollarSign, Shield, Scale, Globe2, Users } from 'lucide-react';
import { Broker } from '../../types/broker';
import BrokerList from './BrokerList';
import BrokerDetails from './BrokerDetails';
import BrokerCompareModal from './BrokerCompareModal';
import { mockBrokers } from './mockData';

export default function BrokerComparison() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [selectedForComparison, setSelectedForComparison] = useState<Broker[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'US' | 'International'>('all');

  const handleToggleComparison = (broker: Broker) => {
    if (selectedForComparison.find(b => b.id === broker.id)) {
      setSelectedForComparison(prev => prev.filter(b => b.id !== broker.id));
    } else if (selectedForComparison.length < 2) {
      setSelectedForComparison(prev => [...prev, broker]);
    }

    if (selectedForComparison.length === 1) {
      setShowCompareModal(true);
    }
  };

  const filteredBrokers = mockBrokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || broker.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Broker Comparison</h2>
          <p className="text-gray-400">Compare and find the best broker for your trading needs</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search brokers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800/30 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as 'all' | 'US' | 'International')}
            className="bg-gray-800/30 text-gray-300 px-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Regions</option>
            <option value="US">US Traders</option>
            <option value="International">International</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <DollarSign className="text-green-500" size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">Lowest Spread</h3>
              <p className="text-sm text-gray-400">From 0.0 pips</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Shield className="text-indigo-500" size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">Regulated Brokers</h3>
              <p className="text-sm text-gray-400">Top tier regulation</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Scale className="text-purple-500" size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">Fair Trading</h3>
              <p className="text-sm text-gray-400">Transparent execution</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BrokerList
            brokers={filteredBrokers}
            onSelect={setSelectedBroker}
            selectedBroker={selectedBroker}
            selectedForComparison={selectedForComparison}
            onToggleComparison={handleToggleComparison}
          />
        </div>

        <div>
          {selectedBroker ? (
            <BrokerDetails broker={selectedBroker} />
          ) : (
            <div className="glass-panel p-6 text-center">
              <div className="flex justify-center mb-4">
                <Globe2 size={48} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Select a Broker</h3>
              <p className="text-gray-400">
                Choose a broker from the list to view detailed information
              </p>
            </div>
          )}
        </div>
      </div>

      {showCompareModal && selectedForComparison.length === 2 && (
        <BrokerCompareModal
          brokers={selectedForComparison}
          onClose={() => {
            setShowCompareModal(false);
            setSelectedForComparison([]);
          }}
        />
      )}

      <div className="glass-panel p-6 text-center">
        <div className="flex justify-center mb-4">
          <Users size={48} className="text-indigo-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Don't see your broker?</h3>
        <p className="text-gray-400 mb-4">
          Contact us to suggest additional brokers for our comparison list
        </p>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}