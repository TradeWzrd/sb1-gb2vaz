import axios from 'axios';

const API_KEY = 'fca_live_0gieJ1tOlB4rufivf0hyeBBzWpjoeAI9arT4GhEu';
const BASE_URL = 'https://api.freecurrencyapi.com/v1';

class MarketDataService {
  private static instance: MarketDataService;
  private lastRates: { [key: string]: number } = {};
  private historicalData: { [key: string]: any[] } = {};

  private constructor() {}

  public static getInstance(): MarketDataService {
    if (!MarketDataService.instance) {
      MarketDataService.instance = new MarketDataService();
    }
    return MarketDataService.instance;
  }

  async getLatestRates(baseCurrency: string = 'USD'): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/latest`, {
        params: {
          apikey: API_KEY,
          base_currency: baseCurrency
        }
      });

      const currentRates = response.data.data;
      const changes: { [key: string]: number } = {};

      Object.keys(currentRates).forEach(currency => {
        if (this.lastRates[currency]) {
          const change = ((currentRates[currency] - this.lastRates[currency]) / this.lastRates[currency]) * 100;
          changes[currency] = change;
        } else {
          changes[currency] = 0;
        }
      });

      this.lastRates = { ...currentRates };

      return Object.entries(currentRates).map(([currency, rate]) => ({
        symbol: `${currency}/${baseCurrency}`,
        name: this.getCurrencyName(currency),
        price: rate as number,
        change: changes[currency] || 0,
        volume: Math.floor(Math.random() * 1000000),
        type: 'forex',
        technicals: this.generateTechnicals()
      }));
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      throw new Error('Failed to fetch currency rates');
    }
  }

  async getHistoricalData(pair: string, timeframe: string): Promise<any[]> {
    // In a real app, we would fetch historical data from the API
    // For now, we'll generate mock data
    const dataPoints = timeframe === '1D' ? 24 : 
                      timeframe === '1W' ? 7 : 
                      timeframe === '1M' ? 30 : 
                      timeframe === '3M' ? 90 : 365;

    const data = [];
    let price = 1.0;
    for (let i = 0; i < dataPoints; i++) {
      price += (Math.random() - 0.5) * 0.002;
      data.push({
        timestamp: new Date(Date.now() - (i * 3600000)).toISOString(),
        price
      });
    }
    return data.reverse();
  }

  async calculateCorrelation(pairs: string[], timeframe: string): Promise<any> {
    // In a real app, we would calculate correlation from historical data
    // For now, we'll return mock correlation data
    const correlations: { [key: string]: { [key: string]: number } } = {};
    
    pairs.forEach(base => {
      correlations[base] = {};
      pairs.forEach(quote => {
        if (base === quote) {
          correlations[base][quote] = 1;
        } else {
          correlations[base][quote] = Math.round((Math.random() * 2 - 1) * 100) / 100;
        }
      });
    });

    return correlations;
  }

  private getCurrencyName(code: string): string {
    const currencyNames: { [key: string]: string } = {
      EUR: 'Euro',
      GBP: 'British Pound',
      JPY: 'Japanese Yen',
      AUD: 'Australian Dollar',
      CAD: 'Canadian Dollar',
      CHF: 'Swiss Franc',
      CNY: 'Chinese Yuan',
      NZD: 'New Zealand Dollar'
    };
    return currencyNames[code] || code;
  }

  private generateTechnicals() {
    const rsi = 30 + Math.random() * 40;
    const macd = -0.002 + Math.random() * 0.004;
    
    let trend: 'bullish' | 'bearish' | 'neutral';
    if (rsi > 60) trend = 'bullish';
    else if (rsi < 40) trend = 'bearish';
    else trend = 'neutral';

    return { rsi, macd, trend };
  }
}

export default MarketDataService.getInstance();