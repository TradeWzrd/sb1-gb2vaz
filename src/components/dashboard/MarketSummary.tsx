import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Search, Filter, Globe2 } from 'lucide-react';
import { useMarketData } from '../../hooks/useMarketData';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

interface MarketSummaryProps {
  region: string;
}

export default function MarketSummary({ region }: MarketSummaryProps) {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: markets, loading, error } = useMarketData(selectedType as any);

  const filteredMarkets = markets.filter(market => 
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search markets..."
              className="bg-gray-800/30 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex bg-gray-800/30 rounded-lg p-1">
            {['all', 'forex', 'crypto', 'stocks'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Globe2 size={18} className="text-gray-400" />
          <select
            value={region}
            className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
          >
            <option value="Global">Global</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="wait">
          {filteredMarkets.map((market) => (
            <motion.div
              key={market.symbol}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{market.symbol}</h4>
                  <span className="text-xs text-gray-400">{market.name}</span>
                </div>
                <div className={`flex items-center ${
                  market.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {market.change >= 0 ? (
                    <TrendingUp size={16} className="mr-1" />
                  ) : (
                    <TrendingDown size={16} className="mr-1" />
                  )}
                  {Math.abs(market.change).toFixed(2)}%
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-400">Price</p>
                  <p className="text-white font-medium">
                    ${market.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Volume</p>
                  <p className="text-white">{market.volume.toLocaleString()}</p>
                </div>
              </div>

              {market.technicals && (
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-400">RSI</span>
                      <span className={`ml-2 ${
                        market.technicals.rsi > 70 ? 'text-red-400' :
                        market.technicals.rsi < 30 ? 'text-green-400' :
                        'text-white'
                      }`}>
                        {market.technicals.rsi.toFixed(1)}
                      </span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        market.technicals.trend === 'bullish' 
                          ? 'bg-green-500/20 text-green-400'
                          : market.technicals.trend === 'bearish'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {market.technicals.trend.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredMarkets.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-400">
            No markets found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}