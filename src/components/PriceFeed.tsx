import React from 'react';

export default function PriceFeed() {
  return (
    <div className="w-full">
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
          {JSON.stringify({
            "symbols": [
              {
                "proName": "BINANCE:BTCUSDT",
                "title": "BTC/USDT"
              },
              {
                "proName": "BINANCE:ETHUSDT",
                "title": "ETH/USDT"
              },
              {
                "proName": "FX:EURUSD",
                "title": "EUR/USD"
              },
              {
                "proName": "FX:GBPUSD",
                "title": "GBP/USD"
              },
              {
                "proName": "FX:USDJPY",
                "title": "USD/JPY"
              }
            ],
            "colorTheme": "dark",
            "isTransparent": true,
            "showSymbolLogo": true,
            "locale": "en",
            "largeChartUrl": ""
          })}
        </script>
      </div>
    </div>
  );
}