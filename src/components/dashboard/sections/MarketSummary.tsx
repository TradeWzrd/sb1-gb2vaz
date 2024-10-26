import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, BarChart2, 
  Activity, Globe, Calendar, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketSummaryProps {
  isExpanded: boolean;
}

interface Market {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap?: number;
  type: 'crypto' | 'forex' | 'stock' | 'commodity';
  sentiment: number;
  cotData?: {
    longPositions: number;
    shortPositions: number;
    netPosition: number;
  };
  technicals: {
    rsi: number;
    macd: number;
    trend: 'bullish' | 'bearish' | 'neutral';
  };
}

const defaultMarkets: Market[] = [
  {
    symbol: 'EUR/USD',
    name: 'Euro',
    price: 1.0925,
    change: 0.15,
    volume: 125000,
    type: 'forex',
    sentiment: 65,
    cotData: {
      longPositions: 156789,
      shortPositions: 98765,
      netPosition: 58024
    },
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
    type: 'forex',
    sentiment: 45,
    cotData: {
      longPositions: 123456,
      shortPositions: 145678,
      netPosition: -22222
    },
    technicals: {
      rsi: 42,
      macd: -0.0015,
      trend: 'bearish'
    }
  }
];

export default function MarketSummary({ isExpanded }: MarketSummaryProps) {
  const [markets, setMarkets] = useState<Market[]>(defaultMarkets);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [view, setView] = useState<'overview' | 'sentiment' | 'cot' | 'technical'>('overview');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prevMarkets => 
        prevMarkets.map(market => ({
          ...market,
          price: market.price * (1 + (Math.random() - 0.5) * 0.001),
          change: market.change + (Math.random() - 0.5) * 0.1,
          sentiment: Math.min(100, Math.max(0, market.sentiment + (Math.random() - 0.5) * 5))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredMarkets = markets.filter(
    market => selectedType === 'all' || market.type === selectedType
  );

  const renderMarketCard = (market: Market) => {
    switch (view) {
      case 'sentiment':
        return (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">{market.symbol}</h3>
              <span className={`text-sm ${
                market.sentiment > 50 ? 'text-green-400' : 'text-red-400'
              }`}>
                {market.sentiment}% Bullish
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-green-500"
                style={{ width: `${market.sentiment}%` }}
              />
            </div>
          </div>
        );

      case 'cot':
        return market.cotData ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">{market.symbol}</h3>
              <span className={`text-sm ${
                market.cotData.netPosition > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                Net: {market.cotData.netPosition.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Long Positions</span>
                <div className="text-green-400">
                  {market.cotData.longPositions.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Short Positions</span>
                <div className="text-red-400">
                  {market.cotData.shortPositions.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-center py-4">No COT data available</div>
        );

      case 'technical':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">{market.symbol}</h3>
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
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">RSI</span>
                <div className={`font-medium ${
                  market.technicals.rsi > 70 ? 'text-red-400' :
                  market.technicals.rsi < 30 ? 'text-green-400' :
                  'text-white'
                }`}>
                  {market.technicals.rsi.toFixed(1)}
                </div>
              </div>
              <div>
                <span className="text-gray-400">MACD</span>
                <div className={`font-medium ${
                  market.technicals.macd > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {market.technicals.macd.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-medium">{market.symbol}</h3>
                <span className="text-xs text-gray-400">{market.name}</span>
              </div>
              <div className="mt-1">
                <span className="text-lg font-semibold">
                  ${market.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4
                  })}
                </span>
              </div>
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
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {['all', 'forex', 'crypto', 'stock', 'commodity'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedType === type
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView('overview')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
              view === 'overview'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart2 size={16} />
            Overview
          </button>
          <button
            onClick={() => setView('sentiment')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
              view === 'sentiment'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Activity size={16} />
            Sentiment
          </button>
          <button
            onClick={() => setView('cot')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
              view === 'cot'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe size={16} />
            COT Data
          </button>
          <button
            onClick={() => setView('technical')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
              view === 'technical'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <AlertCircle size={16} />
            Technical
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid gap-4">
          <AnimatePresence mode="wait">
            {filteredMarkets.map((market) => (
              <motion.div
                key={`${market.symbol}-${view}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
              >
                {renderMarketCard(market)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}