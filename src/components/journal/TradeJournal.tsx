import React, { useState } from 'react';
import { Calendar, BarChart2, Filter, Plus, Download, Upload } from 'lucide-react';
import TradeList from './TradeList';
import TradeStats from './TradeStats';
import AddTradeModal from './AddTradeModal';
import { Trade } from '../../types/journal';
import { exportToCsv, importFromCsv } from '../../utils/csvUtils';

interface TradeJournalProps {
  trades: Trade[];
  onAddTrade: (trade: Trade) => void;
  onUpdateTrade: (trade: Trade) => void;
  onDeleteTrade: (id: string) => void;
  onImportTrades: (trades: Trade[]) => void;
}

export default function TradeJournal({
  trades,
  onAddTrade,
  onUpdateTrade,
  onDeleteTrade,
  onImportTrades
}: TradeJournalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [selectedStrategy, setSelectedStrategy] = useState('all');
  const [selectedMarketType, setSelectedMarketType] = useState('all');
  const [editingTrade, setEditingTrade] = useState<Trade | undefined>(undefined);

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const importedTrades = importFromCsv(text);
        onImportTrades(importedTrades);
      };
      reader.readAsText(file);
    }
  };

  const handleExportCSV = () => {
    exportToCsv(trades, 'trade_journal_export.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Trade Journal</h2>
          <p className="text-gray-400">Track and analyze your trading performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-800/30 rounded-lg p-1">
            {['1W', '1M', '3M', '1Y', 'ALL'].map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedTimeframe === tf
                    ? 'glass-button'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="px-3 py-2 bg-gray-800/30 text-gray-300 rounded-lg border border-gray-700/50 hover:text-white cursor-pointer flex items-center gap-2"
            >
              <Upload size={18} />
              Import CSV
            </label>

            <button
              onClick={handleExportCSV}
              className="px-3 py-2 bg-gray-800/30 text-gray-300 rounded-lg border border-gray-700/50 hover:text-white flex items-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>

            <button 
              onClick={() => {
                setEditingTrade(undefined);
                setIsModalOpen(true);
              }}
              className="glass-button px-4 py-2 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Trade
            </button>
          </div>
        </div>
      </div>

      <TradeStats trades={trades} timeframe={selectedTimeframe} />

      <div className="glass-panel p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-white">Trade History</h3>
          
          <div className="flex items-center gap-3">
            <select
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="bg-gray-800/30 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Strategies</option>
              <option value="trend">Trend Following</option>
              <option value="range">Range Trading</option>
              <option value="breakout">Breakout</option>
            </select>

            <select
              value={selectedMarketType}
              onChange={(e) => setSelectedMarketType(e.target.value)}
              className="bg-gray-800/30 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700/50 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Markets</option>
              <option value="forex">Forex</option>
              <option value="crypto">Crypto</option>
              <option value="stocks">Stocks</option>
            </select>

            <button className="p-2 bg-gray-800/30 rounded-lg text-gray-400 hover:text-white">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <TradeList 
          trades={trades.filter(trade => 
            (selectedStrategy === 'all' || trade.strategy.toLowerCase().includes(selectedStrategy)) &&
            (selectedMarketType === 'all' || trade.marketType === selectedMarketType)
          )}
          onDelete={onDeleteTrade}
          onEdit={(trade) => {
            setEditingTrade(trade);
            setIsModalOpen(true);
          }}
          strategyFilter={selectedStrategy}
        />
      </div>

      {isModalOpen && (
        <AddTradeModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingTrade(undefined);
          }}
          onAdd={onAddTrade}
          onEdit={onUpdateTrade}
          editingTrade={editingTrade}
        />
      )}
    </div>
  );
}