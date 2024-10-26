import React, { useState, useEffect } from 'react';
import { DollarSign, Percent } from 'lucide-react';

interface RiskCalculatorProps {
  entryPrice: number;
  stopLoss: number;
  onCalculate: (calculation: {
    positionSize: number;
    riskAmount: number;
    potentialLoss: number;
  }) => void;
}

export default function RiskCalculator({ 
  entryPrice, 
  stopLoss,
  onCalculate 
}: RiskCalculatorProps) {
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);

  useEffect(() => {
    if (entryPrice && stopLoss && accountBalance && riskPercent) {
      const riskAmount = (accountBalance * (riskPercent / 100));
      const priceDifference = Math.abs(entryPrice - stopLoss);
      const positionSize = priceDifference ? riskAmount / priceDifference : 0;
      const potentialLoss = riskAmount;

      onCalculate({
        positionSize,
        riskAmount,
        potentialLoss
      });
    }
  }, [entryPrice, stopLoss, accountBalance, riskPercent, onCalculate]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Account Balance
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="number"
              value={accountBalance}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  setAccountBalance(value);
                }
              }}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter account balance"
              min="0"
              step="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Risk Percentage
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="number"
              value={riskPercent}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 100) {
                  setRiskPercent(value);
                }
              }}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter risk percentage"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}