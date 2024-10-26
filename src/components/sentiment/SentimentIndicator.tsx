import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SentimentIndicatorProps {
  pair: string;
  sentiment: number;
  strength: string;
  change: number;
}

export default function SentimentIndicator({
  pair,
  sentiment,
  strength,
  change,
}: SentimentIndicatorProps) {
  const isPositive = sentiment > 0;
  const strengthColor = isPositive ? 'text-green-500' : 'text-red-500';
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="flex items-center justify-between p-3 glass-card">
      <div>
        <h4 className="text-white font-medium">{pair}</h4>
        <p className={`text-sm ${strengthColor} flex items-center gap-1`}>
          <Icon size={16} />
          {strength}
        </p>
      </div>
      <div className="text-right">
        <div className="text-white font-medium">{(sentiment * 100).toFixed(1)}%</div>
        <p className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? '+' : ''}{change}%
        </p>
      </div>
    </div>
  );
}