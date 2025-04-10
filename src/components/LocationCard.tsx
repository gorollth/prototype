// src/components/LocationCard.tsx
import React from "react";
import { MapPin, Star, MessageCircle, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Location } from "@/lib/types/location";
import { getReviewsByLocationId, getAverageRating } from "@/data/reviews";
import { useLanguage } from "../../contexts/LanguageContext";

interface LocationCardProps {
  location: Location;
  showDetails?: boolean; // เพิ่มออปชั่นให้ควบคุมการแสดงรายละเอียด
}

export function LocationCard({
  location,
  showDetails = true,
}: LocationCardProps) {
  const router = useRouter();
  const { t } = useLanguage();

  // ดึงข้อมูลรีวิวและคะแนนเฉลี่ย
  const reviews = getReviewsByLocationId(location.id);
  const averageRating = getAverageRating(location.id);

  // ฟังก์ชันสำหรับการนำทางไปยังหน้ารายละเอียดทั้งหมด
  const goToLocationDetail = () => {
    router.push(`/location/${location.id}`);
  };

  // ฟังก์ชันสำหรับการนำทางไปยังหน้ารีวิวโดยตรง
  const goToLocationReviews = (e: React.MouseEvent) => {
    e.stopPropagation(); // ป้องกันไม่ให้ trigger event ของ parent
    router.push(`/location/${location.id}?tab=reviews`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={goToLocationDetail}
    >
      {/* รูปภาพสถานที่ (ถ้ามี) */}
      <div className="aspect-video bg-gray-200 relative">
        <img
          src="/api/placeholder/400/200" // ใช้ placeholder แทนรูปจริง
          alt={location.name}
          className="w-full h-full object-cover"
        />

        {/* แสดงระดับการเข้าถึง */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full text-white ${
            location.accessibility === "high"
              ? "bg-green-500"
              : location.accessibility === "medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {location.accessibility === "high"
            ? t("accessibility.high") || "เข้าถึงง่าย"
            : location.accessibility === "medium"
            ? t("accessibility.medium") || "เข้าถึงปานกลาง"
            : t("accessibility.low") || "เข้าถึงยาก"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg truncate">{location.name}</h3>

        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <MapPin size={14} />
          <span>{location.category}</span>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{averageRating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 text-sm">
            ({reviews.length} {t("reviews.count") || "รีวิว"})
          </span>
        </div>

        {/* Description - แสดงเฉพาะเมื่อต้องการ */}
        {showDetails && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {location.description}
          </p>
        )}

        {/* Tags/Features */}
        {showDetails && location.features && location.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {location.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full"
              >
                {feature}
              </span>
            ))}
            {location.features.length > 3 && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                +{location.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={goToLocationDetail}
            className="flex-1 py-2 px-3 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center gap-1 hover:bg-blue-100"
          >
            <Info size={16} />
            <span>{t("location.details") || "รายละเอียด"}</span>
          </button>

          <button
            onClick={goToLocationReviews}
            className="flex-1 py-2 px-3 bg-gray-50 text-gray-600 rounded-md flex items-center justify-center gap-1 hover:bg-gray-100"
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
