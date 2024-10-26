import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Trade } from '../../types/journal';

interface RecentTradesProps {
  trades: Trade[];
  onViewAll?: () => void;
}

export default function RecentTrades({ trades, onViewAll }: RecentTradesProps) {
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Trades</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View All
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-medium">{trade.pair}</h4>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    trade.type === 'long'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {trade.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{trade.date}</p>
              </div>
              <div className={`flex items-center ${
                trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {trade.pnl >= 0 ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                ${Math.abs(trade.pnl).toFixed(2)}
              </div>
            </div>
          </div>
        ))}

        {trades.length === 0 && (
          <div className="text-center text-gray-400 py-4">
            No recent trades
          </div>
        )}
      </div>
    </div>
  );
}