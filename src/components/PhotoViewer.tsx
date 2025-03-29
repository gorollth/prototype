// Path: src/components/PhotoViewer.tsx
"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface PhotoViewerProps {
  images: { url: string; caption?: string }[];
  onClose: () => void;
  title: string;
}

export const PhotoViewer = ({ images, onClose, title }: PhotoViewerProps) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // ไปรูปถัดไป
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // ไปรูปก่อนหน้า
  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // กำหนดค่าคีย์ลัด
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        goToNext();
        break;
      case "ArrowLeft":
        goToPrevious();
        break;
      case "Escape":
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg text-gray-600">
              {t("common.photos", { name: title })} ({currentIndex + 1}/
              {images.length})
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* หน้าจอแสดงรูปภาพ */}
          <div className="flex justify-center items-center h-[60vh] bg-gray-100">
            <img
              src={images[currentIndex].url}
              alt={t("common.photo", { name: title, number: currentIndex + 1 })}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* ปุ่มเลื่อนซ้าย-ขวา (แสดงเฉพาะเมื่อมีหลายรูป) */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* ตัวเลือกรูปขนาดเล็ก (thumbnail) */}
        {images.length > 1 && (
          <div className="p-4 border-t">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden ${
                    currentIndex === index
                      ? "ring-2 ring-blue-500"
                      : "opacity-70"
                  }`}
                >
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
