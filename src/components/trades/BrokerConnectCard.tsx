import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { scaleIn } from '../../utils/animations';

interface BrokerConnectCardProps {
  onBack: () => void;
}

const brokers = [
  {
    id: 'interactive-brokers',
    name: 'Interactive Brokers',
    logo: 'https://cdn.brokercomparison.com/logos/interactive-brokers.png',
    status: 'Ready'
  },
  {
    id: 'mt4',
    name: 'MetaTrader 4',
    logo: 'https://cdn.brokercomparison.com/logos/metatrader4.png',
    status: 'Ready'
  },
  {
    id: 'mt5',
    name: 'MetaTrader 5',
    logo: 'https://cdn.brokercomparison.com/logos/metatrader5.png',
    status: 'Ready'
  }
];

export default function BrokerConnectCard({ onBack }: BrokerConnectCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-700/50">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to methods
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Select Your Broker</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.map((broker) => (
            <motion.div
              key={broker.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 cursor-pointer hover:bg-gray-900/70 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={broker.logo}
                  alt={broker.name}
                  className="w-12 h-12 rounded-lg object-contain bg-white p-2"
                />
                <div>
                  <h4 className="text-white font-medium">{broker.name}</h4>
                  <span className="text-sm text-green-400">{broker.status}</span>
                </div>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                Connect
                <ExternalLink size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}