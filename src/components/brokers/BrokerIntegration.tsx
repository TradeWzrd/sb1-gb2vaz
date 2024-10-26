import React, { useState } from 'react';
import { Upload, FileText, ArrowRight, HelpCircle, Shield } from 'lucide-react';
import BrokerList from './integration/BrokerList';
import IntegrationGuide from './integration/IntegrationGuide';
import FileUploadModal from './integration/FileUploadModal';

export default function BrokerIntegration() {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Broker Integration</h2>
          <p className="text-gray-400">Connect your broker account to sync trades automatically</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Upload size={18} />
          Import Trades
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Shield className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Supported Brokers</p>
              <h4 className="text-xl font-bold text-white">200+</h4>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <FileText className="text-indigo-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">File Formats</p>
              <h4 className="text-xl font-bold text-white">CSV, MT4/5</h4>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <HelpCircle className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">24/7 Support</p>
              <h4 className="text-xl font-bold text-white">Live Chat</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BrokerList 
            onSelect={setSelectedBroker}
            selectedBroker={selectedBroker}
          />
        </div>

        <div>
          <IntegrationGuide selectedBroker={selectedBroker} />
        </div>
      </div>

      {showUploadModal && (
        <FileUploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}