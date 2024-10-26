export interface TradeImage {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  timestamp: number;
  localPath?: string; // Add local path for downloaded images
}

export interface Trade {
  id: string;
  pair: string;
  type: 'long' | 'short';
  entryPrice: number;
  exitPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  size: number;
  date: string;
  time?: string;
  pnl: number;
  status: 'open' | 'closed';
  strategy: string;
  marketType?: 'forex' | 'crypto' | 'stocks';
  exitType?: 'tp' | 'sl' | 'manual';
  notes?: string;
  tags?: string[];
  images?: TradeImage[];
}

export interface TradeStats {
  totalTrades: number;
  winRate: number;
  totalPnL: number;
  avgPnL: number;
  bestTrade: number;
  worstTrade: number;
  profitFactor: number;
}