import React from 'react';
import { DollarSign, TrendingUp, Clock, BarChart2 } from 'lucide-react';

interface AccountOverviewProps {
  currentBalance: number;
  totalPnL: number;
  winRate: number;
  profitFactor: string | number;
  avgTradeDuration: string;
}

export default function AccountOverview({
  currentBalance,
  totalPnL,
  winRate,
  profitFactor,
  avgTradeDuration
}: AccountOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass-panel p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <DollarSign className="text-indigo-500" size={20} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Account Balance</p>
            <h4 className="text-xl font-bold text-white">
              ${Number(currentBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h4>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Win Rate</p>
            <h4 className="text-xl font-bold text-white">
              {winRate.toFixed(1)}%
            </h4>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <BarChart2 className="text-purple-500" size={20} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Profit Factor</p>
            <h4 className="text-xl font-bold text-white">{profitFactor}</h4>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Clock className="text-blue-500" size={20} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Avg Trade Duration</p>
            <h4 className="text-xl font-bold text-white">{avgTradeDuration}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}