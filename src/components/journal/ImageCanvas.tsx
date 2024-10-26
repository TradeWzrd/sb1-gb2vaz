import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Pencil, Eraser, Square, Circle, Type, 
  Undo2, Redo2, Download, RotateCw, ZoomIn, 
  ZoomOut, Move, X, Minus
} from 'lucide-react';

interface ImageCanvasProps {
  imageUrl: string;
  onSave: (dataUrl: string) => void;
  onClose: () => void;
}

interface Point {
  x: number;
  y: number;
}

export default function ImageCanvas({ imageUrl, onSave, onClose }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'rectangle' | 'circle' | 'text' | 'move'>('pen');
  const [color, setColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(2);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panPosition, setPanPosition] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });

  // Initialize canvas and load image
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    setCtx(context);

    const img = new Image();
    img.onload = () => {
      setOriginalImageSize({ width: img.width, height: img.height });
      resizeCanvas(img, container, context);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current || !ctx) return;
      const img = new Image();
      img.onload = () => {
        resizeCanvas(img, containerRef.current!, ctx);
      };
      img.src = imageUrl;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageUrl, ctx]);

  const resizeCanvas = (img: HTMLImageElement, container: HTMLDivElement, context: CanvasRenderingContext2D) => {
    // Get container dimensions with padding
    const containerWidth = container.clientWidth - 32; // 2rem padding
    const containerHeight = container.clientHeight - 32;
    
    // Calculate aspect ratios
    const containerRatio = containerWidth / containerHeight;
    const imageRatio = img.width / img.height;
    
    let width, height;
    
    // Determine dimensions while maintaining aspect ratio
    if (imageRatio > containerRatio) {
      width = containerWidth;
      height = containerWidth / imageRatio;
    } else {
      height = containerHeight;
      width = containerHeight * imageRatio;
    }

    // Update canvas size
    canvasRef.current!.width = width;
    canvasRef.current!.height = height;

    // Clear and draw image
    context.clearRect(0, 0, width, height);
    context.drawImage(img, 0, 0, width, height);

    // Save initial state
    const initialState = context.getImageData(0, 0, width, height);
    setHistory([initialState]);
    setHistoryIndex(0);
  };

  // Drawing functions remain the same
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    setIsDrawing(true);
    setLastPoint({ x, y });

    if (tool === 'pen' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current || !lastPoint) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    ctx.strokeStyle = tool === 'eraser' ? '#000000' : color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    switch (tool) {
      case 'pen':
      case 'eraser':
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      case 'rectangle':
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (historyIndex >= 0) {
          ctx.putImageData(history[historyIndex], 0, 0);
        }
        ctx.strokeRect(lastPoint.x, lastPoint.y, x - lastPoint.x, y - lastPoint.y);
        break;
      case 'circle':
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (historyIndex >= 0) {
          ctx.putImageData(history[historyIndex], 0, 0);
        }
        const radius = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        break;
    }
  };

  const stopDrawing = () => {
    if (!isDrawing || !ctx || !canvasRef.current) return;

    ctx.closePath();
    setIsDrawing(false);
    setLastPoint(null);

    const newState = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newState]);
    setHistoryIndex(newHistory.length);
  };

  // Tool handlers
  const handleUndo = () => {
    if (historyIndex > 0 && ctx && canvasRef.current) {
      setHistoryIndex(historyIndex - 1);
      ctx.putImageData(history[historyIndex - 1], 0, 0);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1 && ctx && canvasRef.current) {
      setHistoryIndex(historyIndex + 1);
      ctx.putImageData(history[historyIndex + 1], 0, 0);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handlePanStart = (e: React.MouseEvent) => {
    if (tool === 'move') {
      setIsPanning(true);
      setLastPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePanMove = (e: React.MouseEvent) => {
    if (!isPanning || !lastPoint || tool !== 'move') return;

    const deltaX = e.clientX - lastPoint.x;
    const deltaY = e.clientY - lastPoint.y;

    setPanPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastPoint({ x: e.clientX, y: e.clientY });
  };

  const handlePanEnd = () => {
    setIsPanning(false);
    setLastPoint(null);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSave(dataUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTool('pen')}
            className={`p-2.5 rounded-lg ${tool === 'pen' ? 'bg-indigo-600' : 'bg-gray-800'} min-w-[40px] min-h-[40px] flex items-center justify-center`}
          >
            <Pencil size={20} className="flex-shrink-0" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2.5 rounded-lg ${tool === 'eraser' ? 'bg-indigo-600' : 'bg-gray-800'} min-w-[40px] min-h-[40px] flex items-center justify-center`}
          >
            <Eraser size={20} className="flex-shrink-0" />
          </button>
          <button
            onClick={() => setTool('rectangle')}
            className={`p-2.5 rounded-lg ${tool === 'rectangle' ? 'bg-indigo-600' : 'bg-gray-800'} min-w-[40px] min-h-[40px] flex items-center justify-center`}
          >
            <Square size={20} className="flex-shrink-0" />
          </button>
          <button
            onClick={() => setTool('circle')}
            className={`p-2.5 rounded-lg ${tool === 'circle' ? 'bg-indigo-600' : 'bg-gray-800'} min-w-[40px] min-h-[40px] flex items-center justify-center`}
          >
            <Circle size={20} className="flex-shrink-0" />
          </button>
          <button
            onClick={() => setTool('move')}
            className={`p-2.5 rounded-lg ${tool === 'move' ? 'bg-indigo-600' : 'bg-gray-800'} min-w-[40px] min-h-[40px] flex items-center justify-center`}
          >
            <Move size={20} className="flex-shrink-0" />
          </button>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer bg-gray-800 border-2 border-gray-700"
          />
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
            <Minus size={16} className="text-gray-400" />
            <input
              type="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value))}
              className="w-32"
            />
            <Minus size={16} className="text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-2.5 bg-gray-800 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center disabled:opacity-50"
          >
            <Undo2 size={20} className="flex-shrink-0" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-2.5 bg-gray-800 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center disabled:opacity-50"
          >
            <Redo2 size={20} className="flex-shrink-0" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2.5 bg-gray-800 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <ZoomIn size={20} className="flex-shrink-0" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2.5 bg-gray-800 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <ZoomOut size={20} className="flex-shrink-0" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2.5 bg-gray-800 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <RotateCw size={20} className="flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-hidden relative"
        onMouseDown={handlePanStart}
        onMouseMove={handlePanMove}
        onMouseUp={handlePanEnd}
        onMouseLeave={handlePanEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.canvas
            ref={canvasRef}
            animate={{
              scale: zoom,
              rotate: rotation,
              x: panPosition.x,
              y: panPosition.y
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="max-w-full max-h-full cursor-crosshair bg-transparent rounded-lg shadow-xl"
            style={{ touchAction: 'none' }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800/50">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}