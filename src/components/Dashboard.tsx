import React from 'react';
import { Trade } from '../types/journal';
import AccountOverview from './dashboard/AccountOverview';
import PerformanceChart from './dashboard/PerformanceChart';
import RecentTrades from './dashboard/RecentTrades';
import MarketOverview from './dashboard/MarketOverview';

interface DashboardProps {
  trades: Trade[];
  onViewAllTrades?: () => void;
  currentBalance: number;
}

export default function Dashboard({ trades, onViewAllTrades, currentBalance }: DashboardProps) {
  const [timeframe, setTimeframe] = React.useState('1W');
  const [selectedRegion, setSelectedRegion] = React.useState('Global');

  // Calculate trading statistics
  const stats = React.useMemo(() => {
    const closedTrades = trades.filter(t => t.status === 'closed');
    const winningTrades = closedTrades.filter(t => t.pnl > 0);
    const totalPnL = closedTrades.reduce((sum, t) => sum + t.pnl, 0);
    const grossProfit = winningTrades.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = closedTrades.reduce((sum, t) => t.pnl < 0 ? sum + Math.abs(t.pnl) : sum, 0);
    
    return {
      currentBalance,
      totalPnL,
      winRate: closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0,
      profitFactor: grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : '∞',
      avgTradeDuration: '2.5h'
    };
  }, [trades, currentBalance]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome, Trader</h1>
          <p className="text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <AccountOverview {...stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart 
            data={trades}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>

        <RecentTrades 
          trades={trades.slice(0, 5)}
          onViewAll={onViewAllTrades}
        />
      </div>

      <MarketOverview region={selectedRegion} />
    </div>
  );
}