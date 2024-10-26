export type MarketType = 'forex' | 'crypto' | 'stock' | 'commodity';

export interface Market {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  type: MarketType;
  lastUpdate: number;
  technicals?: {
    rsi: number;
    macd: number;
    trend: 'bullish' | 'bearish' | 'neutral';
  };
}

export interface MarketState {
  data: Market[];
  loading: boolean;
  error: string | null;
  lastUpdate: number;
}