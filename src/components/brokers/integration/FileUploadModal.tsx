import React, { useState } from 'react';
import { X, Upload, AlertTriangle } from 'lucide-react';

interface FileUploadModalProps {
  onClose: () => void;
}

export default function FileUploadModal({ onClose }: FileUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-700/50 w-full max-w-lg">
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Import Trades</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
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
              onChange={handleChange}
              accept=".csv,.xlsx,.mt4,.mt5"
              className="hidden"
              id="file-upload"
            />
            
            <div className="flex flex-col items-center">
              <Upload size={48} className="text-gray-500 mb-4" />
              <label
                htmlFor="file-upload"
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                Click to upload
              </label>
              <span className="text-gray-400 mt-2">or drag and drop</span>
              {file && (
                <div className="mt-4 text-white">
                  Selected: {file.name}
                </div>
              )}
            </div>
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

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
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
      </div>
    </div>
  );
}