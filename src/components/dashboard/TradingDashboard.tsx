import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, Globe2, TrendingUp, Users, 
  DollarSign, AlertTriangle, Calendar, Search,
  Maximize2, Minimize2, Settings
} from 'lucide-react';
import MarketSummary from './sections/MarketSummary';
import TechnicalAnalysis from './sections/TechnicalAnalysis';
import ProInsights from './sections/ProInsights';
import SentimentAnalysis from './sections/SentimentAnalysis';
import FundamentalTools from './sections/FundamentalTools';
import MacroHub from './sections/MacroHub';

export default function TradingDashboard() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [layout, setLayout] = useState('grid'); // 'grid' or 'list'

  const sections = [
    {
      id: 'market',
      title: 'Market Summary',
      icon: BarChart2,
      component: MarketSummary,
      color: 'indigo'
    },
    {
      id: 'technical',
      title: 'Technical Analysis',
      icon: TrendingUp,
      component: TechnicalAnalysis,
      color: 'green'
    },
    {
      id: 'insights',
      title: 'Pro Insights',
      icon: Users,
      component: ProInsights,
      color: 'blue'
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      icon: Globe2,
      component: SentimentAnalysis,
      color: 'purple'
    },
    {
      id: 'fundamental',
      title: 'Fundamental Analysis',
      icon: DollarSign,
      component: FundamentalTools,
      color: 'orange'
    },
    {
      id: 'macro',
      title: 'Macro-Economic Hub',
      icon: Calendar,
      component: MacroHub,
      color: 'red'
    }
  ];

  const toggleExpand = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Trading Dashboard</h1>
          <p className="text-gray-400">Real-time market analysis and insights</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search markets..."
              className="bg-gray-800/30 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => setLayout(layout === 'grid' ? 'list' : 'grid')}
            className="p-2 bg-gray-800/30 text-gray-300 rounded-lg border border-gray-700/50 hover:text-white"
          >
            {layout === 'grid' ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>

          <button className="p-2 bg-gray-800/30 text-gray-300 rounded-lg border border-gray-700/50 hover:text-white">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Market Alert Banner */}
      <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-yellow-500" size={20} />
          <p className="text-yellow-200">
            FOMC Meeting Minutes Release in 2 hours. Expected market volatility increase.
          </p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className={`grid gap-6 ${
        layout === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {sections.map((section) => {
          const Component = section.component;
          const isExpanded = expandedSection === section.id;

          return (
            <motion.div
              key={section.id}
              layout
              className={`bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden ${
                isExpanded ? 'col-span-full' : ''
              }`}
            >
              <div className="p-4 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${section.color}-500/10 rounded-lg`}>
                      <section.icon className={`text-${section.color}-500`} size={20} />
                    </div>
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                  </div>
                  <button
                    onClick={() => toggleExpand(section.id)}
                    className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                </div>
              </div>

              <div className={`p-4 ${isExpanded ? 'h-[calc(100vh-12rem)]' : 'h-[400px]'}`}>
                <Component isExpanded={isExpanded} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}