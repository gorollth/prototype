// src/app/location/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, Star, ChevronRight } from "lucide-react";
import { accessibleLocations } from "@/data/locations";
import { getReviewsByLocationId, getAverageRating } from "@/data/reviews";
import { ReviewList } from "@/components/ReviewList";
import { useLanguage } from "../../../../contexts/LanguageContext";

export default function LocationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const locationId = params?.id ? parseInt(params.id as string) : 0;

  // ตรวจสอบ query parameter เพื่อเปิด tab ที่ต้องการโดยตรง
  const tabParam = searchParams?.get("tab");

  const [location, setLocation] = useState(
    accessibleLocations.find((loc) => loc.id === locationId)
  );
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "features">(
    tabParam === "reviews"
      ? "reviews"
      : tabParam === "features"
      ? "features"
      : "info"
  );
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (locationId) {
      const foundLocation = accessibleLocations.find(
        (loc) => loc.id === locationId
      );
      setLocation(foundLocation);

      // Get reviews and average rating
      const reviews = getReviewsByLocationId(locationId);
      setReviewCount(reviews.length);
      setAverageRating(getAverageRating(locationId));
    }
  }, [locationId]);

  // ตรวจสอบและอัพเดท tab เมื่อ query parameter เปลี่ยน
  useEffect(() => {
    if (tabParam === "reviews") {
      setActiveTab("reviews");
    } else if (tabParam === "features") {
      setActiveTab("features");
    } else if (tabParam === "info") {
      setActiveTab("info");
    }
  }, [tabParam]);

  const handleBack = () => {
    router.back();
  };

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">สถานที่ไม่พบ</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-medium">{location.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Cover Image */}
        <div className="aspect-video bg-gray-200 rounded-lg mb-6 overflow-hidden">
          <img
            src="/api/placeholder/800/400"
            alt={location.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h2 className="text-xl font-semibold">{location.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin size={16} />
            <span>{location.category}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="text-yellow-400 fill-yellow-400" size={18} />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">
              ({reviewCount} {t("reviews.count") || "รีวิว"})
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {location.features.map((feature, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-700">{location.description}</p>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {location.features.map((feature, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <button
            onClick={() => setActiveTab("reviews")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Star size={18} className="fill-white" />
            {t("location.view.all.reviews") || "ดูรีวิวทั้งหมด"} ({reviewCount})
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 py-3 text-center ${
                activeTab === "info"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {t("location.tab.info") || "ข้อมูล"}
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`flex-1 py-3 text-center ${
                activeTab === "features"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {t("location.tab.accessibility") || "การเข้าถึง"}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 py-3 text-center ${
                activeTab === "reviews"
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {t("location.tab.reviews") || "รีวิว"} ({reviewCount})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "info" && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">
                  {t("location.about") || "เกี่ยวกับสถานที่"}
                </h3>
                <p className="text-gray-700">{location.description}</p>

                {/* ข้อมูลอื่นๆ ที่เกี่ยวข้อง เช่น ที่อยู่ เบอร์โทร เวลาทำการ ฯลฯ สามารถเพิ่มได้ที่นี่ */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">
                    {t("location.contact") || "ข้อมูลติดต่อ"}
                  </h4>
                  <p className="text-gray-700">
                    {/* สมมติข้อมูล */}
                    {t("location.phone") || "โทรศัพท์"}: 02-XXX-XXXX
                  </p>
                  <p className="text-gray-700">
                    {t("location.website") || "เว็บไซต์"}: www.example.com
                  </p>
                  <p className="text-gray-700">
                    {t("location.hours") || "เวลาเปิด-ปิด"}: 10:00 - 22:00
                  </p>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">
                  {t("location.accessibility.features") ||
                    "สิ่งอำนวยความสะดวกสำหรับการเข้าถึง"}
                </h3>
                <div className="space-y-2">
                  {/* ตรงนี้จะแสดงรายละเอียดการเข้าถึงแต่ละหมวดหมู่ ใช้คอมโพเนนต์ที่มีอยู่แล้ว */}
                  {Object.entries(location.accessibilityScores).map(
                    ([key, feature]) => (
                      <div
                        key={key}
                        className="p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{feature.name}</span>
                          <ChevronRight size={18} className="text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <ReviewList locationId={locationId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
