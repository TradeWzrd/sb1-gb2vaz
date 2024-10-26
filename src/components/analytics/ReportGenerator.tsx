import React, { useState } from 'react';
import { Calendar, Download, FileText, Filter, RefreshCw } from 'lucide-react';

export default function ReportGenerator() {
  const [dateRange, setDateRange] = useState('1M');
  const [reportType, setReportType] = useState('summary');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">Report Generator</h3>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
          >
            <option value="1W">Last Week</option>
            <option value="1M">Last Month</option>
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months</option>
            <option value="1Y">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-gray-800/30 text-gray-300 px-3 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
          >
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Analysis</option>
            <option value="performance">Performance Metrics</option>
            <option value="tax">Tax Report</option>
          </select>

          <button
            onClick={generateReport}
            disabled={isGenerating}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isGenerating
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText size={18} />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Report */}
        <div className="glass-panel p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium">Summary Report</h4>
            <button className="p-2 text-gray-400 hover:text-white">
              <Download size={18} />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Trades</span>
              <span className="text-white">156</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Win Rate</span>
              <span className="text-green-500">68.5%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Net Profit</span>
              <span className="text-green-500">$2,458.32</span>
            </div>
          </div>
        </div>

        {/* Performance Report */}
        <div className="glass-panel p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium">Performance Report</h4>
            <button className="p-2 text-gray-400 hover:text-white">
              <Download size={18} />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Sharpe Ratio</span>
              <span className="text-white">1.82</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Max Drawdown</span>
              <span className="text-red-500">15.2%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Profit Factor</span>
              <span className="text-white">2.34</span>
            </div>
          </div>
        </div>

        {/* Tax Report */}
        <div className="glass-panel p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium">Tax Report</h4>
            <button className="p-2 text-gray-400 hover:text-white">
              <Download size={18} />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Profit</span>
              <span className="text-green-500">$3,245.67</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Loss</span>
              <span className="text-red-500">$787.35</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Net P/L</span>
              <span className="text-green-500">$2,458.32</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Date Range (shown when 'custom' is selected) */}
      {dateRange === 'custom' && (
        <div className="glass-panel p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Report Settings */}
      <div className="glass-panel p-4">
        <h4 className="text-white font-medium mb-4">Report Settings</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeCharts"
              className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="includeCharts" className="text-sm text-gray-300">
              Include Charts
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeMetrics"
              className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="includeMetrics" className="text-sm text-gray-300">
              Include Metrics
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeTrades"
              className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="includeTrades" className="text-sm text-gray-300">
              Include Trade List
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeNotes"
              className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="includeNotes" className="text-sm text-gray-300">
              Include Notes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}