import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImagePreviewModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ImagePreviewModal({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}: ImagePreviewModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50"
        >
          <X size={24} />
        </button>
      </div>

      <div className="relative w-full h-full flex items-center justify-center p-4">
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50"
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Trade chart analysis"
            className="max-w-full max-h-full object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? 'bg-white' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}