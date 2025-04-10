// Path: src/components/LocationContent.tsx
"use client";

import { useState, useEffect } from "react";
import { Star, Clock } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { AccessibilityFeatureItem } from "./AccessibilityFeatureItem";
import { hasRecentData, getCategoryIcon } from "../../utils/locationUtils";
import type { Location } from "@/lib/types/location";

interface LocationContentProps {
  location: Location;
}

export function LocationContent({ location }: LocationContentProps) {
  const { t } = useLanguage();
  const [timeFilter, setTimeFilter] = useState<"all" | "recent">("recent");

  // Check if there's any recent data for any of the features
  const [hasAnyRecentData, setHasAnyRecentData] = useState(false);

  // Check if any feature has recent data when component mounts
  useEffect(() => {
    const checkForRecentData = () => {
      for (const key of accessibilityFeatures) {
        if (hasRecentData(location.accessibilityScores[key])) {
          return true;
        }
      }
      return false;
    };

    const anyRecentData = checkForRecentData();
    setHasAnyRecentData(anyRecentData);

    // If no recent data is found, switch to "all" view automatically
    if (!anyRecentData) {
      setTimeFilter("all");
    }
  }, [location]);

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/review/${location.id}`;
  };

  const accessibilityFeatures = [
    "parking",
    "entrance",
    "ramp",
    "pathway",
    "elevator",
    "restroom",
    "seating",
    "staffAssistance",
    "etc",
  ] as const;

  // แปลหมวดหมู่สถานที่
  const translateCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Shopping Mall": "accessibility.place.shopping.mall",
      "Public Transport": "accessibility.place.transport.hub",
      Park: "accessibility.place.park",
    };

    return t(categoryMap[category] || "accessibility.place.other");
  };

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <div className="flex items-center gap-2 text-gray-600">
        {getCategoryIcon(location.category)}
        <div>
          <h3 className="font-medium text-lg text-gray-900">{location.name}</h3>
          <p className="text-sm text-gray-600">
            {translateCategory(location.category)}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">{location.description}</p>

      {/* Time Filter and View Reviews Button */}
      <div className="flex justify-between items-center">
        {/* View Reviews Button */}
        <button
          onClick={() =>
            (window.location.href = `/location/${location.id}?tab=reviews`)
          }
          className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
        >
          <Star className="w-4 h-4" />
          <span>{t("common.view.reviews") || "ดูรีวิวทั้งหมด"}</span>
        </button>

        {/* Time Filter */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setTimeFilter("recent")}
            className={`px-3 py-1 text-xs rounded-md flex items-center gap-1 ${
              timeFilter === "recent"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            } ${!hasAnyRecentData ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!hasAnyRecentData}
          >
            <Clock className="w-3 h-3" />
            <span>{t("location.filter.recent") || "24 ชั่วโมงล่าสุด"}</span>
          </button>
          <button
            onClick={() => setTimeFilter("all")}
            className={`px-3 py-1 text-xs rounded-md ${
              timeFilter === "all" ? "bg-blue-600 text-white" : "text-gray-600"
            }`}
          >
            <span>{t("location.filter.all") || "ทั้งหมด"}</span>
          </button>
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="space-y-4">
        {accessibilityFeatures.map((key) => (
          <AccessibilityFeatureItem
            key={key}
            title={location.accessibilityScores[key].name}
            feature={location.accessibilityScores[key]}
            timeFilter={timeFilter}
          />
        ))}
      </div>

      {/* Review Button */}
      <button
        onClick={handleReviewClick}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <Star className="w-4 h-4" />
        <span>{t("common.write.review")}</span>
      </button>
    </div>
  );
}
