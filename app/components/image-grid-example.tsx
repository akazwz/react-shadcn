import { ImageCard } from "./image-card";
import { ImagePreview } from "./image-preview";
import { useState } from "react";

// 网盘图片文件示例数据
const sampleImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    alt: "山景照片",
    filename: "mountain_sunrise.jpg",
    fileSize: "2.4 MB",
    modifiedTime: "2024-01-15"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop",
    alt: "森林照片",
    filename: "forest_path.jpg",
    fileSize: "3.1 MB",
    modifiedTime: "2024-01-14"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop",
    alt: "海滩照片",
    filename: "ocean_view.jpg",
    fileSize: "1.8 MB",
    modifiedTime: "2024-01-13"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
    alt: "星空照片",
    filename: "night_sky.jpg",
    fileSize: "4.2 MB",
    modifiedTime: "2024-01-12"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=300&fit=crop",
    alt: "花卉照片",
    filename: "spring_flowers.jpg",
    fileSize: "2.7 MB",
    modifiedTime: "2024-01-11"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=300&fit=crop",
    alt: "城市照片",
    filename: "city_lights.jpg",
    fileSize: "3.5 MB",
    modifiedTime: "2024-01-10"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    alt: "风景照片",
    filename: "landscape_01.jpg",
    fileSize: "2.9 MB",
    modifiedTime: "2024-01-09"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop",
    alt: "自然照片",
    filename: "nature_shot.jpg",
    fileSize: "1.9 MB",
    modifiedTime: "2024-01-08"
  }
];

export function ImageGridExample() {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number>(-1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleImageClick = (image: typeof sampleImages[0]) => {
    const index = sampleImages.findIndex(img => img.id === image.id);
    setPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewIndex(-1);
  };

  const handleImageSelect = (imageId: number, selected: boolean) => {
    setSelectedImages(prev => 
      selected 
        ? [...prev, imageId]
        : prev.filter(id => id !== imageId)
    );
  };

  const handleDownload = (image: typeof sampleImages[0]) => {
    console.log("下载图片:", image.filename);
    // 这里可以实现下载逻辑
  };

  const handleMore = (image: typeof sampleImages[0]) => {
    console.log("更多操作:", image.filename);
    // 这里可以打开上下文菜单
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {selectedImages.length > 0 && (
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            已选择 {selectedImages.length} 个文件
          </div>
        )}
      </div>
      
      {/* 网盘风格的网格布局 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {sampleImages.map((image) => (
          <ImageCard
            key={image.id}
            src={image.src}
            alt={image.alt}
            filename={image.filename}
            fileSize={image.fileSize}
            modifiedTime={image.modifiedTime}
            isSelected={selectedImages.includes(image.id)}
            onClick={() => handleImageClick(image)}
            onSelect={(selected) => handleImageSelect(image.id, selected)}
            onDownload={() => handleDownload(image)}
            onMore={() => handleMore(image)}
          />
        ))}
      </div>

      {/* 图片预览组件 */}
      <ImagePreview
        images={sampleImages}
        currentIndex={previewIndex}
        isOpen={isPreviewOpen}
        onClose={closePreview}
        onDownload={handleDownload}
      />
    </div>
  );
} 