import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, ArrowRight, Database, Shield, RefreshCw } from 'lucide-react';
import BrokerConnectCard from './BrokerConnectCard';
import FileUploadCard from './FileUploadCard';
import ManualEntryCard from './ManualEntryCard';
import { fadeIn, slideUp } from '../../utils/animations';

export default function AddTradesSection() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const methods = [
    {
      id: 'broker',
      title: 'Connect Broker',
      description: 'Automatically sync trades from your broker',
      icon: Database,
      color: 'indigo'
    },
    {
      id: 'file',
      title: 'File Upload',
      description: 'Import trades from CSV, MT4/5, or Excel',
      icon: Upload,
      color: 'green'
    },
    {
      id: 'manual',
      title: 'Manual Entry',
      description: 'Add trades manually one by one',
      icon: FileText,
      color: 'blue'
    }
  ];

  const renderSelectedMethod = () => {
    switch (selectedMethod) {
      case 'broker':
        return <BrokerConnectCard onBack={() => setSelectedMethod(null)} />;
      case 'file':
        return <FileUploadCard onBack={() => setSelectedMethod(null)} />;
      case 'manual':
        return <ManualEntryCard onBack={() => setSelectedMethod(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1 
            variants={slideUp}
            className="text-4xl font-bold text-white mb-4"
          >
            Add Your Trades
          </motion.h1>
          <motion.p 
            variants={slideUp}
            className="text-gray-400 text-lg"
          >
            Choose how you want to add trades to your TradeWzrd account
          </motion.p>
        </div>

        {!selectedMethod ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {methods.map((method, index) => (
              <motion.div
                key={method.id}
                variants={slideUp}
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => setSelectedMethod(method.id)}
                  className="w-full h-full p-6 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl hover:bg-gray-800/70 transition-all duration-300 text-left group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-${method.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className={`text-${method.color}-500`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-400 mb-4">{method.description}</p>
                  <div className="flex items-center text-sm text-indigo-400 group-hover:translate-x-1 transition-transform duration-300">
                    Get Started
                    <ArrowRight size={16} className="ml-1" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSelectedMethod()}
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div 
          variants={fadeIn}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 bg-gray-800/30 backdrop-blur-xl rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <RefreshCw className="text-green-500" size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold">Auto Sync</h4>
                <p className="text-gray-400 text-sm">Real-time trade updates</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-800/30 backdrop-blur-xl rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Database className="text-blue-500" size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold">200+ Brokers</h4>
                <p className="text-gray-400 text-sm">Wide compatibility</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-800/30 backdrop-blur-xl rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Shield className="text-purple-500" size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold">Secure Import</h4>
                <p className="text-gray-400 text-sm">End-to-end encryption</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}