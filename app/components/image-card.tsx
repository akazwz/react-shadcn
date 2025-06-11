import { cn } from "~/lib/utils";
import { Check, Download, MoreHorizontal } from "lucide-react";

interface ImageCardProps {
  src: string;
  alt: string;
  filename: string;
  fileSize: string;
  modifiedTime: string;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
  onSelect?: (selected: boolean) => void;
  onDownload?: () => void;
  onMore?: () => void;
}

export function ImageCard({ 
  src, 
  alt, 
  filename,
  fileSize,
  modifiedTime,
  className,
  isSelected = false,
  onClick,
  onSelect,
  onDownload,
  onMore
}: ImageCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && onClick) {
      event.preventDefault();
      onClick();
    }
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(!isSelected);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.();
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMore?.();
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700",
        isSelected && "ring-2 ring-blue-500 border-blue-500",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {/* 选择按钮 */}
      {onSelect && (
        <button
          type="button"
          onClick={handleSelectClick}
          className={cn(
            "absolute top-2 left-2 z-10 w-5 h-5 rounded-full border-2 transition-all duration-200",
            isSelected 
              ? "bg-blue-500 border-blue-500 text-white" 
              : "bg-white/80 border-zinc-300 hover:border-zinc-400 backdrop-blur-sm"
          )}
        >
          {isSelected && <Check className="w-3 h-3" />}
        </button>
      )}

      {/* 操作按钮 */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {onDownload && (
          <button
            type="button"
            onClick={handleDownloadClick}
            className="w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
          </button>
        )}
        {onMore && (
          <button
            type="button"
            onClick={handleMoreClick}
            className="w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-colors"
          >
            <MoreHorizontal className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
          </button>
        )}
      </div>

      {/* 图片容器 */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* 文件信息 */}
      <div className="p-3">
        <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-2 leading-tight">
          {filename}
        </h3>
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>{fileSize}</span>
          <span>{modifiedTime}</span>
        </div>
      </div>
    </div>
  );
}
