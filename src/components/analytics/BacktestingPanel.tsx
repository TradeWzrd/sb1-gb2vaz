import React, { useState } from 'react';
import { Play, Settings, Download, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockBacktestData = Array.from({ length: 100 }, (_, i) => ({
  trade: i + 1,
  equity: 10000 + Math.random() * 5000 - 2500 + i * 50,
  drawdown: Math.random() * -15
}));

export default function BacktestingPanel() {
  const [timeframe, setTimeframe] = useState('H1');
  const [symbol, setSymbol] = useState('EURUSD');
  const [period, setPeriod] = useState('3M');
  const [isRunning, setIsRunning] = useState(false);

  const runBacktest = () => {
    setIsRunning(true);
    // Simulate backtesting process
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
        >
          <option value="EURUSD">EUR/USD</option>
          <option value="GBPUSD">GBP/USD</option>
          <option value="USDJPY">USD/JPY</option>
        </select>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
        >
          <option value="M5">M5</option>
          <option value="M15">M15</option>
          <option value="H1">H1</option>
          <option value="H4">H4</option>
          <option value="D1">D1</option>
        </select>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
        >
          <option value="1M">1 Month</option>
          <option value="3M">3 Months</option>
          <option value="6M">6 Months</option>
          <option value="1Y">1 Year</option>
        </select>

        <button
          onClick={() => {}}
          className="px-4 py-2 bg-gray-800/30 text-gray-300 rounded-lg border border-gray-700/50 hover:text-white flex items-center gap-2"
        >
          <Settings size={18} />
          Strategy Settings
        </button>

        <button
          onClick={runBacktest}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            isRunning
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isRunning ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play size={18} />
              Run Backtest
            </>
          )}
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Curve */}
        <div className="glass-panel p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Equity Curve</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockBacktestData}>
                <XAxis 
                  dataKey="trade" 
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
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Equity']}
                />
                <Line
                  type="monotone"
                  dataKey="equity"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Drawdown */}
        <div className="glass-panel p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Drawdown</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockBacktestData}>
                <XAxis 
                  dataKey="trade" 
                  stroke="#4B5563"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis
                  stroke="#4B5563"
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value) => `${value.toFixed(1)}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: '#9CA3AF' }}
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Drawdown']}
                />
                <Line
                  type="monotone"
                  dataKey="drawdown"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Net Profit</div>
          <div className="text-xl font-bold text-green-500">$2,458.32</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Win Rate</div>
          <div className="text-xl font-bold text-white">65.8%</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Max Drawdown</div>
          <div className="text-xl font-bold text-red-500">-15.2%</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400">Profit Factor</div>
          <div className="text-xl font-bold text-white">2.34</div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-gray-800/30 text-gray-300 rounded-lg border border-gray-700/50 hover:text-white flex items-center gap-2"
        >
          <Download size={18} />
          Export Report
        </button>
      </div>
    </div>
  );
}