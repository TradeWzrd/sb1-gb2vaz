import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: any[];
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export default function PerformanceChart({
  data,
  timeframe,
  onTimeframeChange
}: PerformanceChartProps) {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Performance Over Time</h3>
        <div className="flex bg-gray-800/30 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
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
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']}
            />
            <Area
              type="monotone"
              dataKey="pnl"
              stroke="#6366F1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPnL)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}