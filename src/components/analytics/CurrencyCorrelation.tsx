import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Download, Info, X, Plus, Search } from 'lucide-react';
import MarketDataService from '../../services/marketDataService';
import LoadingSpinner from '../LoadingSpinner';
import { BackgroundGradient } from '../ui/BackgroundGradient';
import { ShimmerButton } from '../ui/ShimmerButton';

interface CorrelationData {
  [key: string]: {
    [key: string]: number;
  };
}

const availableCurrencies = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF',
  'AUD/USD', 'USD/CAD', 'NZD/USD', 'EUR/GBP',
  'EUR/JPY', 'GBP/JPY', 'USD/CNH', 'USD/MXN',
  'USD/ZAR', 'USD/TRY', 'EUR/CHF', 'GBP/CHF'
];

const currencyGroups = {
  'Major': ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF'],
  'Minor': ['EUR/GBP', 'EUR/CHF', 'GBP/JPY', 'EUR/JPY'],
  'Commodity': ['AUD/USD', 'USD/CAD', 'NZD/USD'],
  'Emerging': ['USD/CNH', 'USD/MXN', 'USD/ZAR', 'USD/TRY']
};

export default function CurrencyCorrelation() {
  const [timeframe, setTimeframe] = useState('1D');
  const [correlationData, setCorrelationData] = useState<CorrelationData>({});
  const [loading, setLoading] = useState(true);
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF'
  ]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('Major');

  useEffect(() => {
    const fetchCorrelations = async () => {
      setLoading(true);
      try {
        const correlations = await MarketDataService.calculateCorrelation(selectedCurrencies, timeframe);
        setCorrelationData(correlations);
      } catch (error) {
        console.error('Error fetching correlation data:', error);
      }
      setLoading(false);
    };

    fetchCorrelations();
  }, [timeframe, selectedCurrencies]);

  const getCorrelationColor = (value: number) => {
    if (value === 1) return 'bg-indigo-500';
    if (value >= 0.7) return 'bg-green-500';
    if (value >= 0.3) return 'bg-green-400/70';
    if (value >= 0) return 'bg-green-300/50';
    if (value >= -0.3) return 'bg-red-300/50';
    if (value >= -0.7) return 'bg-red-400/70';
    return 'bg-red-500';
  };

  const getCorrelationText = (value: number) => {
    if (value === 1) return 'text-white';
    if (Math.abs(value) >= 0.7) return 'text-white';
    return 'text-gray-200';
  };

  const toggleCurrency = (currency: string) => {
    if (selectedCurrencies.includes(currency)) {
      if (selectedCurrencies.length > 2) {
        setSelectedCurrencies(prev => prev.filter(c => c !== currency));
      }
    } else {
      setSelectedCurrencies(prev => [...prev, currency]);
    }
  };

  const filteredCurrencies = availableCurrencies.filter(currency =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group);
    setSelectedCurrencies(currencyGroups[group as keyof typeof currencyGroups]);
    setIsSelecting(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Currency Correlation</h2>
          <p className="text-gray-400">Analyze relationships between currency pairs</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-800/30 rounded-lg p-1">
            {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeframe === tf
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsSelecting(true)}
            className="p-2 bg-gray-800/30 text-gray-400 rounded-lg hover:text-white"
          >
            <Filter size={20} />
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 bg-gray-800/30 text-gray-400 rounded-lg hover:text-white"
          >
            <Info size={20} />
          </button>
        </div>
      </div>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
        >
          <h3 className="text-white font-medium mb-2">Understanding Correlations</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• +1.00: Perfect positive correlation</li>
            <li>• +0.70: Strong positive correlation</li>
            <li>• +0.30: Moderate positive correlation</li>
            <li>• 0.00: No correlation</li>
            <li>• -0.30: Moderate negative correlation</li>
            <li>• -0.70: Strong negative correlation</li>
            <li>• -1.00: Perfect negative correlation</li>
          </ul>
        </motion.div>
      )}

      {isSelecting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div className="bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-700/50 w-full max-w-2xl">
            <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Select Currency Pairs</h3>
              <button
                onClick={() => setIsSelecting(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              {/* Quick Selection Groups */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Quick Select</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(currencyGroups).map(group => (
                    <button
                      key={group}
                      onClick={() => handleGroupSelect(group)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        selectedGroup === group
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-800/50 text-gray-400 hover:text-white'
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search currency pairs..."
                  className="w-full bg-gray-900/50 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Currency Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto">
                {filteredCurrencies.map(currency => (
                  <button
                    key={currency}
                    onClick={() => toggleCurrency(currency)}
                    className={`p-2 rounded-lg border text-sm ${
                      selectedCurrencies.includes(currency)
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                        : 'border-gray-700/50 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-700/50">
              <ShimmerButton
                onClick={() => setIsSelecting(false)}
                className="w-full"
              >
                Apply Selection ({selectedCurrencies.length} pairs)
              </ShimmerButton>
            </div>
          </div>
        </motion.div>
      )}

      <BackgroundGradient>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left text-gray-400 text-sm">Pair</th>
                {selectedCurrencies.map(currency => (
                  <th key={currency} className="p-2 text-gray-400 text-sm">
                    {currency}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedCurrencies.map(base => (
                <tr 
                  key={base}
                  className={selectedPair === base ? 'bg-gray-800/30' : ''}
                  onMouseEnter={() => setSelectedPair(base)}
                  onMouseLeave={() => setSelectedPair(null)}
                >
                  <td className="p-2 text-white font-medium">{base}</td>
                  {selectedCurrencies.map(quote => {
                    const correlation = correlationData[base]?.[quote] || 0;
                    return (
                      <td 
                        key={`${base}-${quote}`}
                        className="p-2"
                      >
                        <div 
                          className={`w-full h-full p-2 rounded ${
                            getCorrelationColor(correlation)
                          } ${getCorrelationText(correlation)}`}
                        >
                          {correlation.toFixed(2)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BackgroundGradient>

      {selectedPair && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
        >
          <h3 className="text-white font-medium mb-4">
            {selectedPair} Correlation Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedCurrencies
              .filter(pair => pair !== selectedPair)
              .sort((a, b) => 
                Math.abs(correlationData[selectedPair][b]) - 
                Math.abs(correlationData[selectedPair][a])
              )
              .map(pair => (
                <div 
                  key={pair}
                  className="bg-gray-900/50 rounded-lg p-3 border border-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">{pair}</span>
                    <span className={`font-medium ${
                      correlationData[selectedPair][pair] >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {correlationData[selectedPair][pair].toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </motion.div>
      )}
    </div>
  );
}