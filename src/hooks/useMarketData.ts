import { useState, useEffect } from 'react';
import MarketDataService from '../services/marketDataService';

interface Market {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  type: 'forex' | 'crypto' | 'stocks';
  technicals: {
    rsi: number;
    macd: number;
    trend: 'bullish' | 'bearish' | 'neutral';
  };
}

export function useMarketData(type: string = 'all') {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const forexData = await MarketDataService.getLatestRates();
        setMarkets(forexData);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to fetch market data');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Update every 30 seconds
    intervalId = setInterval(fetchData, 30000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [type]);

  return { data: markets, loading, error };
}