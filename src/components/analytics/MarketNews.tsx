import React, { useState } from 'react';
import { Globe, TrendingUp, TrendingDown, ExternalLink, Filter, Search } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  time: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: string[];
  category: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Fed Signals Potential Rate Cuts in 2024',
    summary: 'Federal Reserve officials indicated they expect to cut interest rates three times in 2024 as inflation continues to moderate.',
    source: 'Reuters',
    time: '5 minutes ago',
    url: '#',
    sentiment: 'positive',
    impact: ['USD', 'Stocks', 'Gold'],
    category: 'monetary'
  },
  {
    id: '2',
    title: 'ECB Maintains Hawkish Stance on Inflation',
    summary: 'European Central Bank President Christine Lagarde emphasized the need to remain vigilant on inflation despite recent improvements.',
    source: 'Bloomberg',
    time: '15 minutes ago',
    url: '#',
    sentiment: 'negative',
    impact: ['EUR', 'Bonds'],
    category: 'monetary'
  },
  {
    id: '3',
    title: 'Oil Prices Surge on Supply Concerns',
    summary: 'Crude oil prices jumped as geopolitical tensions in the Middle East raised concerns about potential supply disruptions.',
    source: 'Financial Times',
    time: '30 minutes ago',
    url: '#',
    sentiment: 'neutral',
    impact: ['Oil', 'CAD'],
    category: 'commodities'
  }
];

export default function MarketNews() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getSentimentStyle = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500 bg-green-500/10';
      case 'negative':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-blue-500 bg-blue-500/10';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp size={16} />;
      case 'negative':
        return <TrendingDown size={16} />;
      default:
        return <Globe size={16} />;
    }
  };

  const filteredNews = mockNews.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search news..."
            className="w-full bg-gray-800/30 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All News
          </button>
          <button
            onClick={() => setSelectedCategory('monetary')}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedCategory === 'monetary'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Monetary
          </button>
          <button
            onClick={() => setSelectedCategory('commodities')}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedCategory === 'commodities'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Commodities
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div key={item.id} className="glass-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-indigo-400 transition-colors"
                  >
                    {item.title}
                  </a>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white ml-2"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                
                <p className="text-gray-400 text-sm mt-2">{item.summary}</p>
                
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm text-gray-400">{item.source}</span>
                  <span className="text-sm text-gray-400">{item.time}</span>
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                    getSentimentStyle(item.sentiment)
                  }`}>
                    {getSentimentIcon(item.sentiment)}
                    {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {item.impact.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-700/50">
                <span className="text-sm text-gray-400">Impact:</span>
                {item.impact.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredNews.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No news found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}