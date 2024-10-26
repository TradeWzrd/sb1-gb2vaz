import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, Percent } from 'lucide-react';
import { Trade } from '../../types/journal';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TradeStatsProps {
  trades: Trade[];
  timeframe: string;
}

export default function TradeStats({ trades, timeframe }: TradeStatsProps) {
  const calculateStats = () => {
    const closedTrades = trades.filter(t => t.status === 'closed');
    const winningTrades = closedTrades.filter(t => t.pnl > 0);
    
    const totalPnL = closedTrades.reduce((sum, t) => sum + t.pnl, 0);
    const winRate = (winningTrades.length / closedTrades.length) * 100;
    
    return {
      totalPnL,
      winRate,
      totalTrades: closedTrades.length,
      avgPnL: totalPnL / closedTrades.length,
    };
  };

  const generateChartData = () => {
    const sortedTrades = [...trades]
      .filter(t => t.status === 'closed')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let runningPnL = 0;
    return sortedTrades.map(trade => {
      runningPnL += trade.pnl;
      return {
        date: trade.date,
        pnl: runningPnL
      };
    });
  };

  const stats = calculateStats();
  const chartData = generateChartData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <BarChart2 className="text-indigo-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Trades</p>
              <h4 className="text-xl font-bold text-white">{stats.totalTrades}</h4>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Percent className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Win Rate</p>
              <h4 className="text-xl font-bold text-white">
                {stats.winRate.toFixed(1)}%
              </h4>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <TrendingUp className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total P&L</p>
              <h4 className="text-xl font-bold text-white">
                ${stats.totalPnL.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg. P&L</p>
              <h4 className="text-xl font-bold text-white">
                ${stats.avgPnL.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Over Time</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#4B5563"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis
                stroke="#4B5563"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#9CA3AF' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Cumulative P&L']}
              />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#6366F1"
                strokeWidth={2}
                dot={false}
                fill="url(#performanceGradient)"
                fillOpacity={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}