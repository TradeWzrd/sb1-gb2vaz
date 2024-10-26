import React from 'react';
import { TrendingUp, TrendingDown, Award, Users, Clock } from 'lucide-react';

interface TopTradersProps {
  onSelect: (traderId: string) => void;
  selectedTrader: string | null;
}

const traders = [
  {
    id: '1',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=100&h=100&q=80',
    winRate: 78,
    followers: 2341,
    monthlyReturn: 12.5,
    risk: 'Medium',
    verified: true,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=100&h=100&q=80',
    winRate: 82,
    followers: 1892,
    monthlyReturn: 15.8,
    risk: 'Low',
    verified: true,
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=100&h=100&q=80',
    winRate: 75,
    followers: 1243,
    monthlyReturn: 9.2,
    risk: 'High',
    verified: false,
  },
];

export default function TopTraders({ onSelect, selectedTrader }: TopTradersProps) {
  return (
    <div className="bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Top Traders</h3>
      
      <div className="space-y-4">
        {traders.map((trader) => (
          <button
            key={trader.id}
            onClick={() => onSelect(trader.id)}
            className={`w-full p-4 rounded-lg border transition-all duration-200 ${
              selectedTrader === trader.id
                ? 'bg-indigo-600/20 border-indigo-500/50'
                : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={trader.avatar}
                alt={trader.name}
                className="w-12 h-12 rounded-full"
              />
              
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-medium">{trader.name}</h4>
                  {trader.verified && (
                    <Award size={16} className="text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Users size={14} />
                    {trader.followers.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock size={14} />
                    {trader.risk} Risk
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-green-500 flex items-center gap-1 justify-end">
                  <TrendingUp size={16} />
                  {trader.monthlyReturn}%
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Win Rate: {trader.winRate}%
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}