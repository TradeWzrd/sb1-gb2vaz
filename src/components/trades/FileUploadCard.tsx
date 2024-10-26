import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, AlertTriangle } from 'lucide-react';
import { scaleIn } from '../../utils/animations';

interface FileUploadCardProps {
  onBack: () => void;
}

export default function FileUploadCard({ onBack }: FileUploadCardProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

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
        <h3 className="text-xl font-semibold text-white mb-6">Upload Trade History</h3>
        
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            accept=".csv,.xlsx,.mt4,.mt5"
            className="hidden"
            id="file-upload"
          />
          
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.02 }}
          >
            <Upload size={48} className="text-gray-500 mb-4" />
            <label
              htmlFor="file-upload"
              className="text-indigo-400 hover:text-indigo-300 cursor-pointer text-lg font-medium"
            >
              Click to upload
            </label>
            <span className="text-gray-400 mt-2">or drag and drop</span>
            {file && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white"
              >
                Selected: {file.name}
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
            <div className="text-sm">
              <p className="text-yellow-200">Supported file formats:</p>
              <ul className="text-gray-300 mt-1 list-disc list-inside">
                <li>CSV files</li>
                <li>MetaTrader 4/5 History</li>
                <li>Excel Spreadsheets</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!file}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              file
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Import
          </button>
        </div>
      </div>
    </motion.div>
  );
}