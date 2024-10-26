import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';

interface MarketOverviewProps {
  region?: string;
}

interface Market {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  technicals?: {
    rsi: number;
    macd: number;
    trend: 'bullish' | 'bearish' | 'neutral';
  };
}

const mockMarkets: Market[] = [
  {
    symbol: 'EUR/USD',
    name: 'Euro',
    price: 1.0925,
    change: 0.15,
    volume: 125000,
    technicals: {
      rsi: 58,
      macd: 0.0025,
      trend: 'bullish'
    }
  },
  {
    symbol: 'GBP/USD',
    name: 'British Pound',
    price: 1.2634,
    change: -0.22,
    volume: 98000,
    technicals: {
      rsi: 42,
      macd: -0.0015,
      trend: 'bearish'
    }
  }
];

export default function MarketOverview({ region = 'global' }: MarketOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [markets, setMarkets] = useState<Market[]>(mockMarkets);
  const [loading, setLoading] = useState(false);

  const filteredMarkets = markets.filter(market =>
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prevMarkets => 
        prevMarkets.map(market => ({
          ...market,
          price: market.price * (1 + (Math.random() - 0.5) * 0.001),
          change: market.change + (Math.random() - 0.5) * 0.1
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={18} 
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search currencies..."
            className="w-full bg-gray-800/30 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
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
                  <p className="text-gray-400">Rate</p>
                  <p className="text-white font-medium">
                    {market.price.toFixed(4)}
                  </p>
                </div>
                {market.technicals && (
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
                )}
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
                      <span className="text-gray-400">MACD</span>
                      <span className={`ml-2 ${
                        market.technicals.macd >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {market.technicals.macd.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredMarkets.length === 0 && (
          <motion.div 
            className="col-span-full text-center py-8 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No currencies found matching your criteria
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}