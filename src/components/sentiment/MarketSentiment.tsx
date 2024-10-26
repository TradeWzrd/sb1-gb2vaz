import React, { useState } from 'react';
import { Globe, Filter, TrendingUp } from 'lucide-react';
import SentimentChart from './SentimentChart';
import SentimentFilters from './SentimentFilters';
import SentimentIndicator from './SentimentIndicator';
import NewsFeed from './NewsFeed';

const timeframes = ['1H', '4H', '1D', '1W', '1M'];
const assetClasses = ['Forex', 'Crypto', 'Stocks'];
const regions = ['Americas', 'Europe', 'Asia'];

const sentimentPairs = [
  { pair: 'BTC/USD', sentiment: 0.75, strength: 'Strong Buy', change: 2.5 },
  { pair: 'ETH/USD', sentiment: 0.45, strength: 'Buy', change: 1.2 },
  { pair: 'EUR/USD', sentiment: -0.25, strength: 'Sell', change: -0.8 },
  { pair: 'GBP/USD', sentiment: 0.15, strength: 'Neutral', change: 0.3 },
];

export default function MarketSentiment() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedAsset, setSelectedAsset] = useState('Crypto');
  const [selectedRegion, setSelectedRegion] = useState('Global');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Market Sentiment</h2>
          <p className="text-gray-400">Real-time market sentiment analysis and insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-gray-800/30 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
            >
              <option value="Global">Global</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <button className="p-2 bg-gray-800/30 rounded-lg text-gray-400 hover:text-white border border-gray-700/50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <SentimentFilters
        timeframes={timeframes}
        assetClasses={assetClasses}
        selectedTimeframe={selectedTimeframe}
        selectedAsset={selectedAsset}
        onTimeframeChange={setSelectedTimeframe}
        onAssetChange={setSelectedAsset}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Sentiment Trend</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Bullish</span>
              <div className="w-16 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />
              <span className="text-gray-400">Bearish</span>
            </div>
          </div>
          <SentimentChart
            region={selectedRegion}
            timeframe={selectedTimeframe}
            assetClass={selectedAsset}
          />
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Market Indicators</h3>
            <div className="space-y-3">
              {sentimentPairs.map((pair) => (
                <SentimentIndicator key={pair.pair} {...pair} />
              ))}
            </div>
          </div>

          <NewsFeed region={selectedRegion} assetClass={selectedAsset} />
        </div>
      </div>
    </div>
  );
}