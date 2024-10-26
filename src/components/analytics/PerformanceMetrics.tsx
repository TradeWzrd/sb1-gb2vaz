import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const performanceData = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-${String(i + 1).padStart(2, '0')}-01`,
  pnl: Math.random() * 1000 - 500,
  winRate: Math.random() * 100,
  trades: Math.floor(Math.random() * 20)
}));

export default function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      {/* Equity Curve */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Equity Curve</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
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
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#6366F1"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Win Rate & Trade Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Win Rate Trend</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis 
                  dataKey="date" 
                  stroke="#4B5563"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis
                  stroke="#4B5563"
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value) => `${value.toFixed(0)}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: '#9CA3AF' }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Win Rate']}
                />
                <Line
                  type="monotone"
                  dataKey="winRate"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Trade Volume</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis 
                  dataKey="date" 
                  stroke="#4B5563"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis
                  stroke="#4B5563"
                  tick={{ fill: '#9CA3AF' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: '#9CA3AF' }}
                  formatter={(value: number) => [value, 'Trades']}
                />
                <Bar
                  dataKey="trades"
                  fill="#6366F1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}