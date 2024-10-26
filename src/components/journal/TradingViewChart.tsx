import React, { useEffect, useRef } from 'react';
import { Trade } from '../../types/journal';
import { getSymbolFromPair } from '../../utils/tradingViewUtils';

interface TradingViewChartProps {
  trade: Trade;
  timeframe: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function TradingViewChart({ trade, timeframe }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.createElement('div');
    container.style.height = '100%';
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(container);
    }

    const widget = new window.TradingView.widget({
      container_id: container.id,
      width: '100%',
      height: '100%',
      symbol: getSymbolFromPair(trade.pair),
      interval: timeframe,
      timezone: "Etc/UTC",
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#131722',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      backgroundColor: 'rgba(19, 23, 34, 1)',
      gridColor: 'rgba(240, 243, 250, 0.06)',
      allow_symbol_change: false,
      studies: [
        "MASimple@tv-basicstudies"
      ],
      drawings: {
        enabled: true
      },
      disabled_features: [
        "header_symbol_search",
        "symbol_search_hot_key",
        "header_compare",
        "header_undo_redo",
        "header_screenshot",
        "header_saveload"
      ],
      enabled_features: [
        "create_volume_indicator_by_default"
      ],
      overrides: {
        "mainSeriesProperties.candleStyle.upColor": "#26a69a",
        "mainSeriesProperties.candleStyle.downColor": "#ef5350",
        "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
        "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350"
      }
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [trade.pair, timeframe]);

  return (
    <div ref={containerRef} className="w-full h-full" />
  );
}