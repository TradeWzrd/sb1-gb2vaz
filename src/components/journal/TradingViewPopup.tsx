import React, { useState, useEffect, useRef } from 'react';
import { X, Clock } from 'lucide-react';
import { getSymbolFromPair } from '../../utils/tradingViewUtils';
import LoadingSpinner from '../LoadingSpinner';
import { Trade } from '../../types/journal';

interface TradingViewPopupProps {
  trade: Trade;
  onClose: () => void;
}

const timeframes = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '1h', value: '60' },
  { label: '4h', value: '240' },
  { label: '1D', value: 'D' },
  { label: '1W', value: 'W' }
];

export default function TradingViewPopup({ trade, onClose }: TradingViewPopupProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('60');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    let scriptLoaded = false;
    let widget: any = null;

    const loadTradingViewScript = () => {
      return new Promise((resolve, reject) => {
        if (window.TradingView) {
          resolve(window.TradingView);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => resolve(window.TradingView);
        script.onerror = () => reject(new Error('Failed to load TradingView script'));
        document.head.appendChild(script);
      });
    };

    const initializeWidget = async () => {
      if (!containerRef.current) return;

      try {
        setIsLoading(true);
        setError(null);

        // Load TradingView script if not already loaded
        await loadTradingViewScript();
        
        // Clean up previous widget if it exists
        if (widgetRef.current) {
          widgetRef.current.remove();
        }

        // Create new widget
        widget = new window.TradingView.widget({
          container: containerRef.current,
          symbol: getSymbolFromPair(trade.pair, trade.marketType),
          interval: selectedTimeframe,
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#131722",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          studies: ["MASimple@tv-basicstudies"],
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
          },
          loading_screen: { backgroundColor: "#131722" },
          autosize: true,
          width: "100%",
          height: "100%"
        });

        widgetRef.current = widget;

        widget.onChartReady(() => {
          setIsLoading(false);
          const chart = widget.chart();

          // Add trade levels
          try {
            chart.createShape(
              { price: trade.entryPrice },
              { shape: "horizontal_line", overrides: { linecolor: "#4CAF50", linewidth: 2, showLabel: true, text: "Entry" }}
            );

            if (trade.stopLoss) {
              chart.createShape(
                { price: trade.stopLoss },
                { shape: "horizontal_line", overrides: { linecolor: "#ef5350", linewidth: 2, showLabel: true, text: "SL" }}
              );
            }

            if (trade.takeProfit) {
              chart.createShape(
                { price: trade.takeProfit },
                { shape: "horizontal_line", overrides: { linecolor: "#2196F3", linewidth: 2, showLabel: true, text: "TP" }}
              );
            }
          } catch (err) {
            console.warn('Error adding trade levels:', err);
          }
        });

      } catch (err) {
        setError('Failed to initialize chart. Please try again.');
        setIsLoading(false);
      }
    };

    initializeWidget();

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (err) {
          console.warn('Error cleaning up widget:', err);
        }
      }
    };
  }, [trade.pair, trade.marketType, selectedTimeframe]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-700/50 w-full max-w-6xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-white">{trade.pair} Chart</h3>
            <div className="flex items-center gap-2 bg-gray-900/50 rounded-lg p-1">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setSelectedTimeframe(tf.value)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedTimeframe === tf.value
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="text-gray-400 hover:text-white" size={24} />
          </button>
        </div>

        <div className="flex-1 min-h-0 bg-[#131722] relative">
          <div ref={containerRef} className="absolute inset-0" />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">
                {error}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-400">Entry Price</div>
              <div className="text-white font-medium">${trade.entryPrice.toFixed(5)}</div>
            </div>
            {trade.stopLoss && (
              <div>
                <div className="text-sm text-gray-400">Stop Loss</div>
                <div className="text-red-500 font-medium">${trade.stopLoss.toFixed(5)}</div>
              </div>
            )}
            {trade.takeProfit && (
              <div>
                <div className="text-sm text-gray-400">Take Profit</div>
                <div className="text-green-500 font-medium">${trade.takeProfit.toFixed(5)}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-400">Type</div>
              <div className={`font-medium ${trade.type === 'long' ? 'text-green-500' : 'text-red-500'}`}>
                {trade.type.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}