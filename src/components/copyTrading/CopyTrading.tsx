import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Award, Shield, Settings as SettingsIcon } from 'lucide-react';
import TopTraders from './TopTraders';
import TraderProfile from './TraderProfile';
import CopySettings from './CopySettings';

const CopyTrading: React.FC = () => {
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Copy Trading</h2>
          <p className="text-gray-400">Follow and copy trades from successful traders</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search traders..."
              className="bg-gray-800/30 backdrop-blur-sm text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button className="p-2 bg-gray-800/30 backdrop-blur-sm rounded-lg text-gray-400 hover:text-white border border-gray-700/50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopTraders onSelect={setSelectedTrader} selectedTrader={selectedTrader} />
        </div>

        <div>
          {selectedTrader ? (
            <TraderProfile traderId={selectedTrader} onCopy={() => setShowSettings(true)} />
          ) : (
            <div className="bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-700/50 p-6 text-center">
              <div className="flex justify-center mb-4">
                <Shield size={48} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Select a Trader</h3>
              <p className="text-gray-400 text-sm">
                Choose a trader from the list to view their profile and start copying their trades
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Metrics moved to bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-700/50 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">Success Rate</h3>
              <p className="text-sm text-gray-400">Average across top traders</p>
            </div>
            <span className="ml-auto text-2xl font-bold text-green-500">76%</span>
          </div>
        </div>

        <div className="bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-700/50 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Award className="text-indigo-500" size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">Active Traders</h3>
              <p className="text-sm text-gray-400">Professional traders</p>
            </div>
            <span className="ml-auto text-2xl font-bold text-indigo-500">2.4K</span>
          </div>
        </div>

        <div className="bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-700/50 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Shield className="text-purple-500" size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">Protected Value</h3>
              <p className="text-sm text-gray-400">Total assets secured</p>
            </div>
            <span className="ml-auto text-2xl font-bold text-purple-500">$12.5M</span>
          </div>
        </div>
      </div>

      {showSettings && (
        <CopySettings onClose={() => setShowSettings(false)} traderId={selectedTrader!} />
      )}
    </div>
  );
};

export default CopyTrading;