import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SentimentChartProps {
  region: string;
  timeframe: string;
  assetClass: string;
}

const generateSentimentData = (points: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}:00`,
    sentiment: Math.sin(i / 5) * 0.5 + Math.random() * 0.3,
    volume: Math.random() * 100 + 50,
  }));
};

export default function SentimentChart({ region, timeframe, assetClass }: SentimentChartProps) {
  const data = generateSentimentData(24);

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke="#4B5563"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis
            stroke="#4B5563"
            tick={{ fill: '#9CA3AF' }}
            domain={[-1, 1]}
            tickFormatter={(value) => `${value.toFixed(1)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              backdropFilter: 'blur(8px)',
            }}
          />
          <Area
            type="monotone"
            dataKey="sentiment"
            stroke="#22C55E"
            fillOpacity={1}
            fill="url(#sentimentGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}