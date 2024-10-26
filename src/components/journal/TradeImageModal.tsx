import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  RotateCw, Edit2, Download, Move
} from 'lucide-react';
import { TradeImage } from '../../types/journal';
import ImageCanvas from './ImageCanvas';

interface TradeImageModalProps {
  images: TradeImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function TradeImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious
}: TradeImageModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);

  // Reset transformations when image changes
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case '+':
          setZoom(prev => Math.min(prev + 0.1, 3));
          break;
        case '-':
          setZoom(prev => Math.max(prev - 0.1, 0.5));
          break;
        case 'r':
          setRotation(prev => (prev + 90) % 360);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  const handleSaveEdit = useCallback((editedImageUrl: string) => {
    const currentImage = images[currentIndex];
    localStorage.setItem(`trade_image_${currentImage.id}`, editedImageUrl);
    currentImage.url = editedImageUrl;
    setIsEditing(false);
  }, [images, currentIndex]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];

  if (isEditing) {
    return (
      <ImageCanvas
        imageUrl={currentImage.url}
        onSave={handleSaveEdit}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-[95vw] h-[90vh] max-w-7xl mx-auto bg-gray-900/95 rounded-lg overflow-hidden border border-gray-800/50"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 z-10">
            <h3 className="text-lg font-medium text-white">
              Trade Analysis Image {currentIndex + 1} of {images.length}
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 flex items-center gap-2 min-w-[40px] min-h-[40px] justify-center"
                title="Edit Image"
              >
                <Edit2 size={20} className="flex-shrink-0" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.1, 3))}
                className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
                title="Zoom In"
              >
                <ZoomIn size={20} className="flex-shrink-0" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
                className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
                title="Zoom Out"
              >
                <ZoomOut size={20} className="flex-shrink-0" />
              </button>
              <button
                onClick={() => setRotation(prev => (prev + 90) % 360)}
                className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
                title="Rotate"
              >
                <RotateCw size={20} className="flex-shrink-0" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center ml-2"
                title="Close"
              >
                <X size={20} className="flex-shrink-0" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-6 pt-20 pb-24">
            <motion.div
              className="relative cursor-grab active:cursor-grabbing"
              animate={{
                scale: zoom,
                rotate: rotation,
                x: position.x,
                y: position.y
              }}
              drag
              dragMomentum={false}
              dragConstraints={{
                left: -300,
                right: 300,
                top: -300,
                bottom: 300
              }}
            >
              <img
                src={currentImage.url}
                alt="Trade Analysis"
                className="max-w-full max-h-[calc(90vh-12rem)] object-contain rounded-lg"
                draggable={false}
              />
            </motion.div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onPrevious();
                  }}
                  className="absolute left-8 top-1/2 -translate-y-1/2 p-3 text-gray-400 hover:text-white rounded-full bg-gray-800/70 hover:bg-gray-800/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft size={24} className="flex-shrink-0" />
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 p-3 text-gray-400 hover:text-white rounded-full bg-gray-800/70 hover:bg-gray-800/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentIndex === images.length - 1}
                >
                  <ChevronRight size={24} className="flex-shrink-0" />
                </button>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800/50">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div>
                <p className="font-medium text-white">{currentImage.name}</p>
                <p className="mt-1">
                  Added on {new Date(currentImage.timestamp).toLocaleString()} • 
                  {' '}{(currentImage.size / 1024).toFixed(1)}KB
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
                <span>•</span>
                <span>Rotation: {rotation}°</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}