import { cn } from "~/lib/utils";
import { X, ChevronLeft, ChevronRight, Download, RotateCw } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface ImageData {
  id: number;
  src: string;
  alt: string;
  filename: string;
  fileSize: string;
  modifiedTime: string;
}

interface ImagePreviewProps {
  images: ImageData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (image: ImageData) => void;
}

export function ImagePreview({
  images,
  currentIndex,
  isOpen,
  onClose,
  onDownload
}: ImagePreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [rotation, setRotation] = useState(0);

  const currentImage = images[currentImageIndex];

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev > 0 ? prev - 1 : images.length - 1
    );
    setIsZoomed(false);
    setRotation(0);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev < images.length - 1 ? prev + 1 : 0
    );
    setIsZoomed(false);
    setRotation(0);
  }, [images.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  const rotateImage = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  // 同步外部传入的currentIndex
  useEffect(() => {
    setCurrentImageIndex(currentIndex);
    setIsZoomed(false);
    setRotation(0);
  }, [currentIndex]);

  // 键盘事件处理
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          toggleZoom();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, goToPrevious, goToNext, toggleZoom]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={()=>{}}
    >
      {/* 顶部工具栏 */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4 text-white">
          <h3 className="font-medium text-lg">{currentImage.filename}</h3>
          <span className="text-sm opacity-70">
            {currentImageIndex + 1} / {images.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {onDownload && (
            <button
              type="button"
              onClick={() => onDownload(currentImage)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              title="下载"
            >
              <Download className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={rotateImage}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            title="旋转"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            title="关闭 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 左右导航按钮 */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            title="上一张 (←)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            title="下一张 (→)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* 图片容器 */}
      <button 
        type="button"
        className="relative max-w-[90vw] max-h-[90vh] cursor-pointer"
        onClick={toggleZoom}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleZoom();
          }
        }}
        tabIndex={0}
        aria-label="点击缩放图片"
      >
        <img
          src={currentImage.src.replace('w=300&h=300', 'w=1200&h=1200')}
          alt={currentImage.alt}
          className={cn(
            "max-w-full max-h-full object-contain transition-transform duration-300",
            isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
          )}
          style={{ 
            transform: `rotate(${rotation}deg) ${isZoomed ? 'scale(1.5)' : 'scale(1)'}`
          }}
          draggable={false}
        />
      </button>

      {/* 底部信息栏 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-4">
            <span>{currentImage.fileSize}</span>
            <span>{currentImage.modifiedTime}</span>
          </div>
          <div className="text-xs opacity-70">
            点击图片缩放 • 空格键缩放 • ESC关闭 • ←→切换
          </div>
        </div>
      </div>

      {/* 缩略图导航 */}
      {images.length > 1 && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-1 p-2 bg-black/30 rounded-lg backdrop-blur-sm max-w-[80vw] overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsZoomed(false);
                  setRotation(0);
                }}
                className={cn(
                  "w-12 h-12 rounded overflow-hidden border-2 transition-all flex-shrink-0",
                  index === currentImageIndex 
                    ? "border-white" 
                    : "border-transparent hover:border-white/50"
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 