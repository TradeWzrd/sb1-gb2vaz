import React from 'react';
import { X, Check, Minus } from 'lucide-react';
import { Broker } from '../../types/broker';

interface BrokerCompareModalProps {
  brokers: Broker[];
  onClose: () => void;
}

export default function BrokerCompareModal({ brokers, onClose }: BrokerCompareModalProps) {
  const [broker1, broker2] = brokers;

  const compareValue = (value1: any, value2: any) => {
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 === value2 ? 'text-gray-300' : value1 < value2 ? 'text-green-500' : 'text-red-500';
    }
    return 'text-gray-300';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-700/50 w-full max-w-5xl">
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Compare Brokers</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-3 gap-6">
            {/* Header */}
            <div className="text-gray-400"></div>
            {brokers.map(broker => (
              <div key={broker.id} className="text-center">
                <img
                  src={broker.logo}
                  alt={broker.name}
                  className="w-24 h-24 mx-auto rounded-lg object-contain bg-white p-4 mb-2"
                />
                <h4 className="text-lg font-semibold text-white">{broker.name}</h4>
              </div>
            ))}

            {/* General Info */}
            <div className="col-span-3">
              <h4 className="text-lg font-semibold text-white mb-4">General Information</h4>
            </div>

            <div className="text-gray-400">Rating</div>
            <div className={`text-center ${compareValue(broker1.rating, broker2.rating)}`}>
              {broker1.rating.toFixed(1)}/5.0
            </div>
            <div className={`text-center ${compareValue(broker2.rating, broker1.rating)}`}>
              {broker2.rating.toFixed(1)}/5.0
            </div>

            <div className="text-gray-400">Minimum Deposit</div>
            <div className={`text-center ${compareValue(broker1.minDeposit, broker2.minDeposit)}`}>
              ${broker1.minDeposit}
            </div>
            <div className={`text-center ${compareValue(broker2.minDeposit, broker1.minDeposit)}`}>
              ${broker2.minDeposit}
            </div>

            {/* Trading Fees */}
            <div className="col-span-3">
              <h4 className="text-lg font-semibold text-white mb-4 mt-6">Trading Fees</h4>
            </div>

            <div className="text-gray-400">EUR/USD Spread</div>
            <div className={`text-center ${compareValue(broker1.tradingFees.spread.eurusd, broker2.tradingFees.spread.eurusd)}`}>
              {broker1.tradingFees.spread.eurusd} pips
            </div>
            <div className={`text-center ${compareValue(broker2.tradingFees.spread.eurusd, broker1.tradingFees.spread.eurusd)}`}>
              {broker2.tradingFees.spread.eurusd} pips
            </div>

            <div className="text-gray-400">Commission</div>
            <div className={`text-center ${compareValue(broker1.tradingFees.commission, broker2.tradingFees.commission)}`}>
              ${broker1.tradingFees.commission}/lot
            </div>
            <div className={`text-center ${compareValue(broker2.tradingFees.commission, broker1.tradingFees.commission)}`}>
              ${broker2.tradingFees.commission}/lot
            </div>

            {/* Features */}
            <div className="col-span-3">
              <h4 className="text-lg font-semibold text-white mb-4 mt-6">Features</h4>
            </div>

            {Array.from(new Set([...broker1.features, ...broker2.features])).map(feature => (
              <React.Fragment key={feature}>
                <div className="text-gray-400">{feature}</div>
                <div className="text-center">
                  {broker1.features.includes(feature) ? (
                    <Check className="inline-block text-green-500" size={20} />
                  ) : (
                    <Minus className="inline-block text-red-500" size={20} />
                  )}
                </div>
                <div className="text-center">
                  {broker2.features.includes(feature) ? (
                    <Check className="inline-block text-green-500" size={20} />
                  ) : (
                    <Minus className="inline-block text-red-500" size={20} />
                  )}
                </div>
              </React.Fragment>
            ))}

            {/* Platforms */}
            <div className="col-span-3">
              <h4 className="text-lg font-semibold text-white mb-4 mt-6">Trading Platforms</h4>
            </div>

            {Array.from(new Set([...broker1.platforms, ...broker2.platforms])).map(platform => (
              <React.Fragment key={platform}>
                <div className="text-gray-400">{platform}</div>
                <div className="text-center">
                  {broker1.platforms.includes(platform) ? (
                    <Check className="inline-block text-green-500" size={20} />
                  ) : (
                    <Minus className="inline-block text-red-500" size={20} />
                  )}
                </div>
                <div className="text-center">
                  {broker2.platforms.includes(platform) ? (
                    <Check className="inline-block text-green-500" size={20} />
                  ) : (
                    <Minus className="inline-block text-red-500" size={20} />
                  )}
                </div>
              </React.Fragment>
            ))}

            {/* Customer Support */}
            <div className="col-span-3">
              <h4 className="text-lg font-semibold text-white mb-4 mt-6">Customer Support</h4>
            </div>

            <div className="text-gray-400">Email Support</div>
            <div className="text-center">
              {broker1.customerSupport.email ? (
                <Check className="inline-block text-green-500" size={20} />
              ) : (
                <Minus className="inline-block text-red-500" size={20} />
              )}
            </div>
            <div className="text-center">
              {broker2.customerSupport.email ? (
                <Check className="inline-block text-green-500" size={20} />
              ) : (
                <Minus className="inline-block text-red-500" size={20} />
              )}
            </div>

            <div className="text-gray-400">Phone Support</div>
            <div className="text-center">
              {broker1.customerSupport.phone ? (
                <Check className="inline-block text-green-500" size={20} />
              ) : (
                <Minus className="inline-block text-red-500" size={20} />
              )}
            </div>
            <div className="text-center">
              {broker2.customerSupport.phone ? (
                <Check className="inline-block text-green-500" size={20} />
              ) : (
                <Minus className="inline-block text-red-500" size={20} />
              )}
            </div>

            <div className="text-gray-400">Live Chat</div>
            <div className="text-center">
              {broker1.customerSupport.livechat ? (
                <Check className="inline-block text-green-500" size={20} />
              ) : (
                <Minus className="inline-block text-red-500" size={20} />
              )}
            </div>
            <div className="text-center">
              {broker2.customerSupport.livechat ? (
                <Check className="inline-block text-green-500" size={20} />
              ) : (
                <Minus className="inline-block text-red-500" size={20} />
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700/50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}