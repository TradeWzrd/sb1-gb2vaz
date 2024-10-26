import { useState, useEffect } from 'react';
import { Trade, TradeImage } from '../types/journal';

const STORAGE_KEY = 'tradewzrd_trades';
const CHUNK_SIZE = 50; // Reduced chunk size for better performance
const IMAGE_COMPRESSION_QUALITY = 0.7; // Added image compression

export function useTradeStorage(initialTrades: Trade[]) {
  const [trades, setTrades] = useState<Trade[]>(() => {
    try {
      // Get the number of chunks
      const chunkCount = parseInt(localStorage.getItem(`${STORAGE_KEY}_count`) || '0');
      if (chunkCount === 0) return initialTrades;

      // Reconstruct trades from chunks
      let storedTrades: Trade[] = [];
      for (let i = 0; i < chunkCount; i++) {
        const chunk = localStorage.getItem(`${STORAGE_KEY}_${i}`);
        if (chunk) {
          storedTrades = [...storedTrades, ...JSON.parse(chunk)];
        }
      }
      return storedTrades;
    } catch (error) {
      console.error('Error loading trades:', error);
      return initialTrades;
    }
  });

  // Compress image before storing
  const compressImage = async (dataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', IMAGE_COMPRESSION_QUALITY));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    });
  };

  // Save trades to localStorage in chunks
  useEffect(() => {
    const saveTrades = async () => {
      try {
        // Split trades into chunks
        const chunks = trades.reduce((acc: Trade[][], trade, index) => {
          const chunkIndex = Math.floor(index / CHUNK_SIZE);
          if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
          }
          acc[chunkIndex].push(trade);
          return acc;
        }, []);

        // Store chunks
        localStorage.setItem(`${STORAGE_KEY}_count`, chunks.length.toString());
        
        // Process and store each chunk
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          // Compress images in chunk before storing
          const processedChunk = await Promise.all(
            chunk.map(async (trade) => ({
              ...trade,
              images: trade.images 
                ? await Promise.all(trade.images.map(async (img) => ({
                    ...img,
                    url: await compressImage(img.url)
                  })))
                : undefined
            }))
          );
          localStorage.setItem(`${STORAGE_KEY}_${i}`, JSON.stringify(processedChunk));
        }

        // Clean up old chunks
        const oldChunkCount = parseInt(localStorage.getItem(`${STORAGE_KEY}_count`) || '0');
        for (let i = chunks.length; i < oldChunkCount; i++) {
          localStorage.removeItem(`${STORAGE_KEY}_${i}`);
        }
      } catch (error) {
        console.error('Error saving trades:', error);
      }
    };

    saveTrades();
  }, [trades]);

  const addTrade = (trade: Trade) => {
    setTrades(prevTrades => {
      const newTrades = [...prevTrades, trade];
      // Sort trades by date, most recent first
      return newTrades.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  };

  const updateTrade = (updatedTrade: Trade) => {
    setTrades(prevTrades => 
      prevTrades.map(trade => 
        trade.id === updatedTrade.id ? updatedTrade : trade
      )
    );
  };

  const deleteTrade = (tradeId: string) => {
    setTrades(prevTrades => {
      const tradeToDelete = prevTrades.find(t => t.id === tradeId);
      // Clean up associated images
      if (tradeToDelete?.images) {
        tradeToDelete.images.forEach(img => {
          localStorage.removeItem(`trade_image_${img.id}`);
        });
      }
      return prevTrades.filter(trade => trade.id !== tradeId);
    });
  };

  const importTrades = (newTrades: Trade[]) => {
    setTrades(prevTrades => {
      const combinedTrades = [...prevTrades, ...newTrades];
      // Remove duplicates and sort by date
      return Array.from(new Map(combinedTrades.map(trade => [trade.id, trade])).values())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  const clearTrades = () => {
    // Clear all chunks and images
    const chunkCount = parseInt(localStorage.getItem(`${STORAGE_KEY}_count`) || '0');
    for (let i = 0; i < chunkCount; i++) {
      localStorage.removeItem(`${STORAGE_KEY}_${i}`);
    }
    localStorage.removeItem(`${STORAGE_KEY}_count`);
    
    // Clear all trade images
    trades.forEach(trade => {
      trade.images?.forEach(img => {
        localStorage.removeItem(`trade_image_${img.id}`);
      });
    });
    
    setTrades([]);
  };

  const exportTrades = () => {
    const exportData = {
      trades,
      version: '1.0',
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(exportData);
  };

  return {
    trades,
    addTrade,
    updateTrade,
    deleteTrade,
    importTrades,
    clearTrades,
    exportTrades
  };
}