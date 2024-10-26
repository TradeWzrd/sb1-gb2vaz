import React, { useState } from 'react';
import { BarChart2, Calendar, LineChart, TrendingUp, Newspaper, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import PerformanceMetrics from './PerformanceMetrics';
import TradingCalendar from './TradingCalendar';
import MarketNews from './MarketNews';
import BacktestingPanel from './BacktestingPanel';

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('performance');

  const renderContent = () => {
    switch (activeTab) {
      case 'performance':
        return <PerformanceMetrics />;
      case 'calendar':
        return <TradingCalendar />;
      case 'news':
        return <MarketNews />;
      case 'backtest':
        return <BacktestingPanel />;
      default:
        return <PerformanceMetrics />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Trading Analytics</h2>
          <p className="text-gray-400">Track and analyze your trading performance</p>
        </div>

        <div className="flex bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'performance'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart2 size={18} />
            Performance
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'calendar'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar size={18} />
            Economic Calendar
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'news'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Newspaper size={18} />
            Market News
          </button>
          <button
            onClick={() => setActiveTab('backtest')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'backtest'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LineChart size={18} />
            Backtesting
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Win Rate</p>
              <h4 className="text-xl font-bold text-white">68.5%</h4>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <ArrowUpRight className="text-indigo-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Profit Factor</p>
              <h4 className="text-xl font-bold text-white">2.45</h4>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <ArrowDownRight className="text-red-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Max Drawdown</p>
              <h4 className="text-xl font-bold text-white">12.3%</h4>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <BarChart2 className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Sharpe Ratio</p>
              <h4 className="text-xl font-bold text-white">1.82</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-panel p-6">
        {renderContent()}
      </div>
    </div>
  );
}