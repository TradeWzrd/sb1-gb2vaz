import React from 'react';
import { 
  Star, Shield, DollarSign, Globe, Phone, Mail, 
  MessageSquare, CheckCircle, AlertTriangle, CreditCard,
  Smartphone, Award, Wallet, Users, Clock
} from 'lucide-react';
import { Broker } from '../../types/broker';
import { BackgroundGradient } from '../ui/BackgroundGradient';

interface BrokerDetailsProps {
  broker: Broker;
}

export default function BrokerDetails({ broker }: BrokerDetailsProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center">
            <img
              src={broker.logo}
              alt={broker.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-white">{broker.name}</h3>
              {broker.region === 'US' && (
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                  US Traders
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span>{broker.rating.toFixed(1)}</span>
              </div>
              {broker.regulation[0] && (
                <span className="text-sm text-blue-400 flex items-center gap-1">
                  <Shield size={14} />
                  {broker.regulation[0]}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-sm text-gray-400">Min. Deposit</div>
            <div className="text-lg font-semibold text-white">${broker.minDeposit}</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-sm text-gray-400">EUR/USD Spread</div>
            <div className="text-lg font-semibold text-white">{broker.tradingFees.spread.eurusd} pips</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="text-sm text-gray-400">Commission</div>
            <div className="text-lg font-semibold text-white">${broker.tradingFees.commission}/lot</div>
          </div>
        </div>
      </div>

      {/* Account Types */}
      <div className="glass-panel p-4">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <Users size={16} className="text-indigo-400" />
          Account Types
        </h4>
        <div className="space-y-3">
          {broker.accountTypes.map((account) => (
            <div key={account.name} className="bg-gray-800/30 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{account.name}</span>
                <span className="text-sm text-gray-400">
                  Min. ${account.minDeposit}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span>Spread: {account.spread} pips</span>
                <span>Commission: ${account.commission}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features & Platforms */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-4">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Award size={16} className="text-green-400" />
            Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {broker.features.map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full flex items-center gap-1"
              >
                <CheckCircle size={12} className="text-green-400" />
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-panel p-4">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Smartphone size={16} className="text-purple-400" />
            Platforms
          </h4>
          <div className="flex flex-wrap gap-2">
            {broker.platforms.map((platform) => (
              <span
                key={platform}
                className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="glass-panel p-4">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <Wallet size={16} className="text-amber-400" />
          Payment Methods
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-2">Deposits</div>
            <div className="flex flex-wrap gap-2">
              {broker.depositMethods.map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">Withdrawals</div>
            <div className="flex flex-wrap gap-2">
              {broker.withdrawalMethods.map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Support */}
      <div className="glass-panel p-4">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <MessageSquare size={16} className="text-blue-400" />
          Customer Support
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-300">
              {broker.customerSupport.email && <Mail size={16} className="text-green-400" />}
              {broker.customerSupport.phone && <Phone size={16} className="text-green-400" />}
              {broker.customerSupport.livechat && <MessageSquare size={16} className="text-green-400" />}
            </div>
            <div className="text-sm text-gray-400">
              Available 24/7
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">Languages</div>
            <div className="flex flex-wrap gap-2">
              {broker.customerSupport.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regulation Warning */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
          <div className="text-sm">
            <p className="text-yellow-200 font-medium">Important Notice</p>
            <p className="text-gray-300 mt-1">
              Trading involves significant risk. Always verify the broker's regulatory status and read all terms and conditions before opening an account.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <a
        href={broker.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-4 py-3 bg-indigo-600 text-white rounded-lg text-center hover:bg-indigo-700 transition-colors"
      >
        Visit Official Website
      </a>
    </div>
  );
}