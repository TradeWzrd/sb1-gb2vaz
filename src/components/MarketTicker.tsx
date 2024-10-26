import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const stocks = [
  { symbol: 'AAPL', name: 'Apple', price: 173.50, change: 0.45 },
  { symbol: 'TSLA', name: 'Tesla', price: 238.45, change: 2.25 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 485.90, change: -0.85 },
  { symbol: 'META', name: 'Meta', price: 338.23, change: 0.23 },
  { symbol: 'AMZN', name: 'Amazon', price: 145.24, change: 0.89 },
];

export default function MarketTicker() {
  return (
    <div className="flex items-center gap-6 overflow-x-auto">
      <div className="flex items-center gap-2 text-sm">
        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
        <span className="text-gray-400">Market is open</span>
      </div>

      {stocks.map((stock) => (
        <div key={stock.symbol} className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">{stock.symbol}</span>
            <span className="text-xs text-gray-400">{stock.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-sm text-white">${stock.price}</span>
            <span className={`flex items-center text-xs ${
              stock.change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {stock.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(stock.change)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}