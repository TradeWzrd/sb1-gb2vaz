import React, { useState, useCallback, useRef } from 'react';
import { X, DollarSign, Percent, Clock, Image as ImageIcon, X as XIcon } from 'lucide-react';
import RiskCalculator from './RiskCalculator';
import { Trade, TradeImage } from '../../types/journal';

interface AddTradeModalProps {
  onClose: () => void;
  onAdd: (trade: Trade) => void;
  onEdit: (trade: Trade) => void;
  editingTrade?: Trade;
}

export default function AddTradeModal({ onClose, onAdd, onEdit, editingTrade }: AddTradeModalProps) {
  const [trade, setTrade] = useState<Partial<Trade>>({
    pair: editingTrade?.pair || '',
    type: editingTrade?.type || 'long',
    entryPrice: editingTrade?.entryPrice || 0,
    stopLoss: editingTrade?.stopLoss || 0,
    takeProfit: editingTrade?.takeProfit || 0,
    size: editingTrade?.size || 0,
    date: editingTrade?.date || new Date().toISOString().split('T')[0],
    time: editingTrade?.time || new Date().toTimeString().split(' ')[0].slice(0, 5),
    strategy: editingTrade?.strategy || '',
    notes: editingTrade?.notes || '',
    status: editingTrade?.status || 'open',
    marketType: editingTrade?.marketType || 'crypto',
    exitType: editingTrade?.exitType,
    exitPrice: editingTrade?.exitPrice || 0,
    images: editingTrade?.images || []
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newImages: TradeImage[] = [];

    for (const file of fileArray) {
      try {
        const reader = new FileReader();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const imageId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        localStorage.setItem(`trade_image_${imageId}`, dataUrl);

        const newImage: TradeImage = {
          id: imageId,
          url: dataUrl,
          name: file.name,
          type: file.type,
          size: file.size,
          timestamp: Date.now()
        };

        newImages.push(newImage);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }

    setTrade(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages]
    }));
  };

  const removeImage = (imageId: string) => {
    localStorage.removeItem(`trade_image_${imageId}`);
    setTrade(prev => ({
      ...prev,
      images: (prev.images || []).filter(img => img.id !== imageId)
    }));
  };

  const handleRiskCalculation = useCallback(({ positionSize, riskAmount }: { 
    positionSize: number;
    riskAmount: number;
    potentialLoss: number;
  }) => {
    setTrade(prev => ({
      ...prev,
      size: positionSize,
      riskAmount
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pnl = calculatePnL();
    const finalTrade = {
      ...trade,
      id: editingTrade?.id || Date.now().toString(),
      pnl
    } as Trade;

    if (editingTrade) {
      onEdit(finalTrade);
    } else {
      onAdd(finalTrade);
    }
    onClose();
  };

  const calculatePnL = () => {
    const { type, entryPrice, exitPrice, size } = trade;
    if (!exitPrice) return 0;
    if (type === 'long') {
      return (exitPrice - (entryPrice || 0)) * (size || 0);
    } else {
      return ((entryPrice || 0) - exitPrice) * (size || 0);
    }
  };

  const handleExitTypeChange = (type: Trade['exitType']) => {
    let exitPrice = 0;
    if (type === 'tp') {
      exitPrice = trade.takeProfit || 0;
    } else if (type === 'sl') {
      exitPrice = trade.stopLoss || 0;
    }
    setTrade(prev => ({
      ...prev,
      exitType: type,
      exitPrice,
      status: type ? 'closed' : 'open'
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-700/50 w-full max-w-lg">
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">
              {editingTrade ? 'Edit Trade' : 'Add New Trade'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Market</label>
              <select
                value={trade.marketType}
                onChange={(e) => setTrade({ ...trade, marketType: e.target.value as Trade['marketType'] })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
                <option value="stocks">Stocks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Trading Pair</label>
              <input
                type="text"
                value={trade.pair}
                onChange={(e) => setTrade({ ...trade, pair: e.target.value })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                placeholder="BTC/USD"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input
                type="date"
                value={trade.date}
                onChange={(e) => setTrade({ ...trade, date: e.target.value })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
              <input
                type="time"
                value={trade.time}
                onChange={(e) => setTrade({ ...trade, time: e.target.value })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
              <select
                value={trade.type}
                onChange={(e) => setTrade({ ...trade, type: e.target.value as 'long' | 'short' })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="long">Long</option>
                <option value="short">Short</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Entry Price</label>
              <input
                type="number"
                value={trade.entryPrice || ''}
                onChange={(e) => setTrade({ ...trade, entryPrice: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
                step="any"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Stop Loss</label>
              <input
                type="number"
                value={trade.stopLoss || ''}
                onChange={(e) => setTrade({ ...trade, stopLoss: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
                step="any"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Take Profit</label>
              <input
                type="number"
                value={trade.takeProfit || ''}
                onChange={(e) => setTrade({ ...trade, takeProfit: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                step="any"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Strategy</label>
              <input
                type="text"
                value={trade.strategy}
                onChange={(e) => setTrade({ ...trade, strategy: e.target.value })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                placeholder="e.g., Breakout"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Trade Result</label>
              <select
                value={trade.exitType || ''}
                onChange={(e) => handleExitTypeChange(e.target.value as Trade['exitType'])}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="">Open Trade</option>
                <option value="tp">Take Profit (TP)</option>
                <option value="sl">Stop Loss (SL)</option>
                <option value="manual">Manual Exit</option>
              </select>
            </div>
          </div>

          {trade.exitType === 'manual' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Exit Price</label>
              <input
                type="number"
                value={trade.exitPrice || ''}
                onChange={(e) => setTrade({ ...trade, exitPrice: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                step="any"
                required
              />
            </div>
          )}

          <RiskCalculator
            entryPrice={trade.entryPrice || 0}
            stopLoss={trade.stopLoss || 0}
            onCalculate={handleRiskCalculation}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
            <textarea
              value={trade.notes}
              onChange={(e) => setTrade({ ...trade, notes: e.target.value })}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Add your trade notes here..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Trade Images
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {trade.images?.map((image, index) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.url}
                    alt={`Trade ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <ImageIcon size={18} />
              Add Images
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-500 transition-colors duration-200"
            >
              {editingTrade ? 'Update Trade' : 'Add Trade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}