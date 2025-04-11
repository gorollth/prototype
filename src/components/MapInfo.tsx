// src/components/MapInfo.tsx
import React from "react";
import { MapPin, Star, ThumbsUp, Info, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Location } from "@/lib/types/location";
import { getReviewsByLocationId, getAverageRating } from "@/data/reviews";
import { useLanguage } from "../../contexts/LanguageContext";

interface MapInfoProps {
  location: Location;
  onClose?: () => void;
}

export function MapInfo({ location, onClose }: MapInfoProps) {
  const router = useRouter();
  const { t } = useLanguage();

  // ดึงข้อมูลรีวิวและคะแนนเฉลี่ย
  const reviews = getReviewsByLocationId(location.id);
  const averageRating = getAverageRating(location.id);

  // ฟังก์ชันไปยังหน้ารายละเอียดสถานที่
  const goToDetails = () => {
    router.push(`/location/${location.id}`);
    if (onClose) onClose();
  };

  // ฟังก์ชันไปยังหน้ารีวิวโดยตรง
  const goToReviews = () => {
    router.push(`/location/${location.id}?tab=reviews`);
    if (onClose) onClose();
  };

  // Helper function: แปลงระดับการเข้าถึงเป็นข้อความ
  const getAccessibilityLabel = (level: string) => {
    switch (level) {
      case "high":
        return t("accessibility.high") || "เข้าถึงง่าย";
      case "medium":
        return t("accessibility.medium") || "เข้าถึงปานกลาง";
      case "low":
        return t("accessibility.low") || "เข้าถึงยาก";
      default:
        return level;
    }
  };

  // Helper function: แปลงระดับการเข้าถึงเป็นสี
  const getAccessibilityColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* หัวข้อ */}
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">{location.name}</h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <MapPin size={14} />
          <span>{location.category}</span>
        </div>
      </div>

      {/* เนื้อหา */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          {/* ระดับการเข้าถึง */}
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full ${getAccessibilityColor(
              location.accessibility
            )}`}
          >
            {getAccessibilityLabel(location.accessibility)}
          </span>

          {/* Rating */}
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-xs text-gray-500 ml-1">
              ({reviews.length})
            </span>
          </div>
        </div>

        {/* คำอธิบายสั้นๆ */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {location.description}
        </p>

        {/* แสดงคุณสมบัติการเข้าถึงที่สำคัญ */}
        <div className="mb-4">
          {Object.entries(location.accessibilityScores)
            .slice(0, 2)
            .map(([key, feature]) => {
              const { like, dislike } = feature.votes;
              const total = like + dislike;
              const votePercentage =
                total > 0 ? Math.round((like / total) * 100) : 0;

              return (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <span className="text-sm">{feature.name}</span>
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp size={14} className="text-green-600" />
                    <span className="text-xs font-medium">
                      {votePercentage}%
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* ปุ่มดำเนินการ */}
        <div className="flex gap-2">
          <button
            onClick={goToDetails}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          >
            <Info size={16} />
            <span>{t("location.details") || "รายละเอียด"}</span>
          </button>

          <button
            onClick={goToReviews}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
          >
            <MessageCircle size={16} />
            <span>
              {t("location.reviews") || "รีวิว"} ({reviews.length})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
