import React, { useState } from 'react';
import { Plus, Save, Play, Settings2, AlertTriangle } from 'lucide-react';

interface Indicator {
  id: string;
  type: string;
  settings: Record<string, any>;
}

interface Rule {
  id: string;
  condition: string;
  value: string;
  action: string;
}

export default function StrategyBuilder() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('H1');

  const addIndicator = () => {
    const newIndicator: Indicator = {
      id: Date.now().toString(),
      type: 'MA',
      settings: { period: 14, type: 'SMA' }
    };
    setIndicators([...indicators, newIndicator]);
  };

  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      condition: 'crossover',
      value: '',
      action: 'buy'
    };
    setRules([...rules, newRule]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Strategy Builder</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-gray-800/30 text-gray-300 rounded-lg border border-gray-700/50 hover:text-white flex items-center gap-2"
          >
            <Save size={18} />
            Save Strategy
          </button>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Play size={18} />
            Test Strategy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Indicators */}
        <div className="glass-panel p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Technical Indicators</h4>
            <button
              onClick={addIndicator}
              className="p-2 bg-gray-800/50 text-gray-300 rounded-lg hover:text-white"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-3">
            {indicators.map((indicator) => (
              <div
                key={indicator.id}
                className="bg-gray-800/30 rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <select
                    value={indicator.type}
                    onChange={() => {}}
                    className="bg-transparent text-white border-none focus:outline-none"
                  >
                    <option value="MA">Moving Average</option>
                    <option value="RSI">RSI</option>
                    <option value="MACD">MACD</option>
                    <option value="BB">Bollinger Bands</option>
                  </select>
                </div>
                <button
                  onClick={() => {}}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <Settings2 size={16} />
                </button>
              </div>
            ))}

            {indicators.length === 0 && (
              <div className="text-center text-gray-400 py-4">
                No indicators added yet
              </div>
            )}
          </div>
        </div>

        {/* Trading Rules */}
        <div className="glass-panel p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Trading Rules</h4>
            <button
              onClick={addRule}
              className="p-2 bg-gray-800/50 text-gray-300 rounded-lg hover:text-white"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="bg-gray-800/30 rounded-lg p-3 flex items-center gap-2"
              >
                <select
                  value={rule.condition}
                  onChange={() => {}}
                  className="bg-transparent text-white border-none focus:outline-none"
                >
                  <option value="crossover">Crosses Above</option>
                  <option value="crossunder">Crosses Below</option>
                  <option value="greater">Greater Than</option>
                  <option value="less">Less Than</option>
                </select>

                <input
                  type="text"
                  value={rule.value}
                  onChange={() => {}}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="Value"
                />

                <select
                  value={rule.action}
                  onChange={() => {}}
                  className="bg-transparent text-white border-none focus:outline-none"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="close">Close Position</option>
                </select>
              </div>
            ))}

            {rules.length === 0 && (
              <div className="text-center text-gray-400 py-4">
                No rules added yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Risk Management */}
      <div className="glass-panel p-4">
        <h4 className="text-white font-medium mb-4">Risk Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Stop Loss (pips)
            </label>
            <input
              type="number"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Take Profit (pips)
            </label>
            <input
              type="number"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="90"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Risk per Trade (%)
            </label>
            <input
              type="number"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="1"
            />
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
          <p className="text-sm text-yellow-200">
            Remember to thoroughly test your strategy before using it with real money. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
}