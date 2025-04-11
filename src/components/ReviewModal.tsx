// Path: src/components/ReviewModal.tsx
import React from "react";
import { X } from "lucide-react";
import { ReviewList } from "./ReviewList";
import { useLanguage } from "../../contexts/LanguageContext";

interface ReviewModalProps {
  locationId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ locationId, isOpen, onClose }: ReviewModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // ปิด modal เมื่อคลิกพื้นหลัง
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium text-lg">
            {t("reviews.written.title") || "รีวิวแบบข้อความ"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ReviewList locationId={locationId} showWrittenOnly={true} />
        </div>
      </div>
    </div>
  );
}
