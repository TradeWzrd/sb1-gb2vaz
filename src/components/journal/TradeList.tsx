import React, { useState } from 'react';
import { Edit2, Trash2, LineChart, Info, Image as ImageIcon, FileImage } from 'lucide-react';
import TradingViewPopup from './TradingViewPopup';
import TradeImageModal from './TradeImageModal';
import { Trade } from '../../types/journal';

interface TradeListProps {
  trades: Trade[];
  onDelete: (id: string) => void;
  onEdit: (trade: Trade) => void;
  strategyFilter: string;
}

export default function TradeList({ trades, onDelete, onEdit, strategyFilter }: TradeListProps) {
  const [tooltipTrade, setTooltipTrade] = useState<string | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [imageModalState, setImageModalState] = useState<{
    isOpen: boolean;
    tradeId: string | null;
    currentIndex: number;
  }>({
    isOpen: false,
    tradeId: null,
    currentIndex: 0
  });

  const getRiskRewardRatio = (trade: Trade) => {
    if (!trade.exitPrice) return '-';
    const risk = Math.abs(trade.entryPrice - (trade.stopLoss || trade.entryPrice));
    const reward = Math.abs(trade.entryPrice - trade.exitPrice);
    return (reward / risk).toFixed(2);
  };

  const getMarketTypeStyle = (marketType: string = 'crypto') => {
    switch (marketType) {
      case 'forex':
        return 'bg-blue-500/20 text-blue-400';
      case 'crypto':
        return 'bg-orange-500/20 text-orange-400';
      case 'stocks':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleOpenImageModal = (tradeId: string) => {
    setImageModalState({
      isOpen: true,
      tradeId,
      currentIndex: 0
    });
  };

  const handleCloseImageModal = () => {
    setImageModalState({
      isOpen: false,
      tradeId: null,
      currentIndex: 0
    });
  };

  const handleNextImage = () => {
    const trade = trades.find(t => t.id === imageModalState.tradeId);
    if (trade?.images && imageModalState.currentIndex < trade.images.length - 1) {
      setImageModalState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
    }
  };

  const handlePreviousImage = () => {
    if (imageModalState.currentIndex > 0) {
      setImageModalState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
    }
  };

  const currentTrade = trades.find(t => t.id === imageModalState.tradeId);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-4">Date</th>
              <th className="pb-4">Market</th>
              <th className="pb-4">Pair</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Entry</th>
              <th className="pb-4">Exit</th>
              <th className="pb-4">Size</th>
              <th className="pb-4">P&L</th>
              <th className="pb-4">R/R</th>
              <th className="pb-4">Strategy</th>
              <th className="pb-4">Notes</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {trades.map((trade) => (
              <tr key={trade.id} className="border-t border-gray-800">
                <td className="py-3 text-gray-300">{trade.date}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${getMarketTypeStyle(trade.marketType)}`}>
                    {trade.marketType?.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 text-white font-medium">{trade.pair}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    trade.type === 'long'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 text-gray-300">${trade.entryPrice.toFixed(2)}</td>
                <td className="py-3 text-gray-300">${trade.exitPrice?.toFixed(2) || '-'}</td>
                <td className="py-3 text-gray-300">{trade.size}</td>
                <td className={`py-3 font-medium ${
                  trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  ${trade.pnl.toFixed(2)}
                </td>
                <td className="py-3 text-gray-300">{getRiskRewardRatio(trade)}</td>
                <td className="py-3 text-gray-300">{trade.strategy}</td>
                <td className="py-3">
                  {trade.notes && (
                    <div className="relative">
                      <button 
                        className="p-1.5 hover:bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                        onMouseEnter={() => setTooltipTrade(trade.id)}
                        onMouseLeave={() => setTooltipTrade(null)}
                      >
                        <Info size={16} />
                      </button>
                      {tooltipTrade === trade.id && (
                        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64">
                          <div className="bg-gray-900 text-white text-sm rounded-lg shadow-lg p-3 border border-gray-700">
                            {trade.notes}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 border-r border-b border-gray-700"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(trade)}
                      className="p-1.5 hover:bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                      title="Edit trade"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(trade.id)}
                      className="p-1.5 hover:bg-gray-800/50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete trade"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => setSelectedTrade(trade)}
                      className="p-1.5 hover:bg-gray-800/50 rounded-lg text-gray-400 hover:text-indigo-500 transition-colors"
                      title="Show chart"
                    >
                      <LineChart size={16} />
                    </button>
                    {trade.images && trade.images.length > 0 && (
                      <button
                        onClick={() => handleOpenImageModal(trade.id)}
                        className="p-1.5 hover:bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                        title={`View ${trade.images.length} image${trade.images.length > 1 ? 's' : ''}`}
                      >
                        <ImageIcon size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTrade && (
        <TradingViewPopup
          trade={selectedTrade}
          onClose={() => setSelectedTrade(null)}
        />
      )}

      {currentTrade?.images && (
        <TradeImageModal
          images={currentTrade.images}
          currentIndex={imageModalState.currentIndex}
          isOpen={imageModalState.isOpen}
          onClose={handleCloseImageModal}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
        />
      )}
    </>
  );
}