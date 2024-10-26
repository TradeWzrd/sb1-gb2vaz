import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Users, TrendingUp, BarChart2, Shield, Copy as CopyIcon } from 'lucide-react';

interface TraderProfileProps {
  traderId: string;
  onCopy: () => void;
}

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}M`,
  return: Math.random() * 20 - 5,
}));

export default function TraderProfile({ traderId, onCopy }: TraderProfileProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=100&h=100&q=80"
              alt="Trader"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">Alex Thompson</h3>
                <Award size={16} className="text-yellow-500" />
              </div>
              <p className="text-sm text-gray-400">Professional Trader • 5 years</p>
            </div>
          </div>
          <button
            onClick={onCopy}
            className="px-4 py-2 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <CopyIcon size={16} />
            Copy Trader
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-sm text-gray-400">Monthly Return</div>
            <div className="text-xl font-bold text-green-500">+15.8%</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-sm text-gray-400">Win Rate</div>
            <div className="text-xl font-bold text-white">82%</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-sm text-gray-400">Followers</div>
            <div className="text-xl font-bold text-indigo-500">2.3K</div>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis 
                dataKey="month" 
                stroke="#4B5563"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis
                stroke="#4B5563"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#6366F1"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
        <h4 className="text-white font-medium mb-4">Trading Style</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Risk Level</span>
            <span className="text-yellow-500">Medium</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Avg. Trade Duration</span>
            <span className="text-white">2-3 days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Preferred Markets</span>
            <span className="text-white">Forex, Crypto</span>
          </div>
        </div>
      </div>
    </div>
  );
}