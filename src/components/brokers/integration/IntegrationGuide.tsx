import React from 'react';
import { FileText, ArrowRight, HelpCircle } from 'lucide-react';

interface IntegrationGuideProps {
  selectedBroker: string | null;
}

const guides = {
  'interactive-brokers': {
    steps: [
      'Log in to your Interactive Brokers account',
      'Go to Account Management > Settings > API Settings',
      'Enable "Read-Only API Access"',
      'Copy your API credentials',
      'Paste the credentials in TradeWzrd'
    ]
  },
  'mt4': {
    steps: [
      'Open MetaTrader 4 platform',
      'Go to Tools > History Center',
      'Select the symbols you want to export',
      'Click "Export to CSV"',
      'Upload the file to TradeWzrd'
    ]
  },
  'mt5': {
    steps: [
      'Open MetaTrader 5 platform',
      'Go to Tools > History Center',
      'Select the symbols you want to export',
      'Click "Export to CSV"',
      'Upload the file to TradeWzrd'
    ]
  }
};

export default function IntegrationGuide({ selectedBroker }: IntegrationGuideProps) {
  if (!selectedBroker) {
    return (
      <div className="glass-panel p-6 text-center">
        <div className="flex justify-center mb-4">
          <HelpCircle size={48} className="text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Select a Broker</h3>
        <p className="text-gray-400 text-sm">
          Choose a broker from the list to view integration instructions
        </p>
      </div>
    );
  }

  const guide = guides[selectedBroker as keyof typeof guides];

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Integration Guide</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          {guide.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-300">{step}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-700/50">
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
            <FileText size={18} />
            View Full Guide
          </button>
        </div>
      </div>
    </div>
  );
}