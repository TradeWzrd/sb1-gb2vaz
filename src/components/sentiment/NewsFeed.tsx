import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsFeedProps {
  region: string;
  assetClass: string;
}

const mockNews = [
  {
    id: 1,
    title: 'Fed Signals Potential Rate Cut',
    source: 'Financial Times',
    sentiment: 0.8,
    time: '5m ago',
  },
  {
    id: 2,
    title: 'ECB Maintains Current Policy Stance',
    source: 'Reuters',
    sentiment: 0.2,
    time: '15m ago',
  },
  {
    id: 3,
    title: 'Market Volatility Increases',
    source: 'Bloomberg',
    sentiment: -0.4,
    time: '30m ago',
  },
];

export default function NewsFeed({ region, assetClass }: NewsFeedProps) {
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Newspaper size={20} />
          Latest News
        </h3>
        <button className="text-sm text-indigo-400 hover:text-indigo-300">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockNews.map((news) => (
          <div
            key={news.id}
            className="glass-card p-3 hover:bg-gray-800/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white font-medium">{news.title}</h4>
                <p className="text-sm text-gray-400 mt-1">
                  {news.source} • {news.time}
                </p>
              </div>
              <button className="p-1 hover:bg-gray-700 rounded">
                <ExternalLink size={16} className="text-gray-400" />
              </button>
            </div>
            <div className="mt-2">
              <div
                className={`inline-block px-2 py-1 rounded text-xs ${
                  news.sentiment > 0.5
                    ? 'bg-green-500/20 text-green-400'
                    : news.sentiment > 0
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {news.sentiment > 0.5
                  ? 'Bullish'
                  : news.sentiment > 0
                  ? 'Neutral'
                  : 'Bearish'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}