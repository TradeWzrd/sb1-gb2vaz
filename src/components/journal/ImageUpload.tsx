import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { TradeImage } from '../../types/journal';

interface ImageUploadProps {
  images: TradeImage[];
  onImagesChange: (images: TradeImage[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return false;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return false;
    }

    return true;
  };

  const processFiles = async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setError(null);
    const newImages: TradeImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!validateFile(file)) {
        continue;
      }

      try {
        const url = await readFileAsDataURL(file);
        newImages.push({
          id: Date.now().toString() + i,
          url,
          name: file.name,
          type: file.type,
          size: file.size,
          timestamp: Date.now()
        });
      } catch (err) {
        console.error('Error processing file:', err);
        setError('Error processing image');
      }
    }

    onImagesChange([...images, ...newImages]);
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const removeImage = (imageId: string) => {
    onImagesChange(images.filter(img => img.id !== imageId));
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragging
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
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          multiple
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-2">
          <Upload size={24} className="text-gray-500" />
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-indigo-400 hover:text-indigo-300"
            >
              Click to upload
            </button>
            <span className="text-gray-400"> or drag and drop</span>
          </div>
          <p className="text-xs text-gray-400">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-700"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-full hover:bg-red-500"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-xs text-white truncate">{image.name}</div>
                  <div className="text-xs text-gray-300">
                    {(image.size / 1024).toFixed(1)}KB
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}