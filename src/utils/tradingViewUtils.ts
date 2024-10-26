export const getSymbolFromPair = (pair?: string, marketType: string = 'crypto'): string => {
  if (!pair) return 'BINANCE:BTCUSDT';
  
  switch (marketType) {
    case 'forex':
      return `FX:${pair.replace('/', '')}`;
    case 'crypto':
      return `BINANCE:${pair.replace('/', '')}`;
    case 'stocks':
      return `NYSE:${pair.split('/')[0]}`;
    default:
      return `BINANCE:${pair.replace('/', '')}`;
  }
};