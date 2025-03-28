// Path: src/components/LocationMarker.tsx

"use client";

import React, { useState } from "react";
import { Marker } from "react-leaflet";
import {
  ShoppingBag,
  Bus,
  Trees,
  Accessibility,
  Star,
  ThumbsUp,
  ThumbsDown,
  Image,
  Clock,
  Filter,
} from "lucide-react";
import L from "leaflet";
import { SlideUpPanel } from "./SlideUpPanel";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Location } from "@/lib/types/location";

function getMarkerIcon(accessibility: string) {
  const color =
    accessibility === "high"
      ? "#22c55e"
      : accessibility === "medium"
      ? "#eab308"
      : "#ef4444";

  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background-color: ${color};
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        cursor: pointer;
      "></div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Shopping Mall":
      return <ShoppingBag className="w-5 h-5" />;
    case "Public Transport":
      return <Bus className="w-5 h-5" />;
    case "Park":
      return <Trees className="w-5 h-5" />;
    default:
      return <Accessibility className="w-5 h-5" />;
  }
}

// ฟังก์ชันเพื่อรับคีย์การแปลสำหรับชื่อคุณสมบัติการเข้าถึง
function getAccessibilityFeatureTranslationKey(featureName: string): string {
  // แปลงเป็นตัวพิมพ์เล็กและตัดช่องว่าง
  const normalizedName = featureName.toLowerCase().trim();

  // แมปชื่อภาษาอังกฤษเป็นคีย์การแปล
  const translationMap: Record<string, string> = {
    parking: "review.feature.parking",
    "main entrance": "review.feature.entrance",
    ramps: "review.feature.ramp",
    pathways: "review.feature.pathway",
    elevators: "review.feature.elevator",
    restrooms: "review.feature.restroom",
    "seating areas": "review.feature.seating",
    "staff assistance": "review.feature.staff",
    etc: "review.feature.other",
  };

  // ส่งคืนคีย์การแปลหรือชื่อเดิมถ้าไม่พบ
  return (
    translationMap[normalizedName] ||
    `review.feature.${normalizedName.replace(/\s+/g, ".")}`
  );
}

interface PhotoViewerProps {
  images: { url: string; caption?: string }[];
  onClose: () => void;
  title: string;
}

const PhotoViewer = ({ images, onClose, title }: PhotoViewerProps) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">
              {t("common.photos", { name: title })}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ThumbsDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto">
          <div className="space-y-4">
            {images.map((image, index) => (
              <div key={index} className="space-y-2">
                <img
                  src={image.url}
                  alt={
                    image.caption ||
                    t("common.photo", {
                      name: title,
                      number: index + 1,
                    })
                  }
                  className="w-full rounded-lg"
                />
                {image.caption && (
                  <p className="text-sm text-gray-600">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to check if date is within last 24 hours
const isWithinLast24Hours = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  return hoursDifference <= 24;
};

const AccessibilityFeatureItem = ({
  title,
  feature,
  timeFilter,
}: {
  title: string;
  feature: {
    votes: {
      like: number;
      dislike: number;
    };
    isLiked: boolean | null;
    images: { url: string; caption?: string; timestamp?: string }[];
  };
  timeFilter: "all" | "recent";
}) => {
  const { t } = useLanguage();
  const [showPhotos, setShowPhotos] = useState(false);

  // หาคีย์การแปลสำหรับชื่อคุณสมบัติ
  const translationKey = getAccessibilityFeatureTranslationKey(title);

  // Filter votes based on timeFilter (in a real app, votes would have timestamps)
  // In this example, we're simulating this since the original data doesn't have timestamps
  // In a real implementation, you would filter the actual vote data
  const filteredVotes = {
    like:
      timeFilter === "recent"
        ? Math.floor(feature.votes.like * 0.3)
        : feature.votes.like,
    dislike:
      timeFilter === "recent"
        ? Math.floor(feature.votes.dislike * 0.3)
        : feature.votes.dislike,
  };

  // Filter images based on timeFilter
  const filteredImages =
    timeFilter === "recent"
      ? feature.images.filter(
          (img) => !img.timestamp || isWithinLast24Hours(img.timestamp)
        )
      : feature.images;

  // Determine which count is highest
  const { like, dislike } = filteredVotes;
  const maxCount = Math.max(like, dislike);
  const isLikeHighest = like === maxCount && like > 0;
  const isDislikeHighest = dislike === maxCount && dislike > 0;

  return (
    <div className="border rounded-lg overflow-hidden bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-base text-gray-700">{t(translationKey)}</label>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <div
            className={`px-4 py-1.5 flex items-center gap-1 ${
              isLikeHighest ? "bg-green-100 text-green-700" : "text-gray-400"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs">{like}</span>
          </div>
          <div
            className={`px-4 py-1.5 border-l border-gray-200 flex items-center gap-1 ${
              isDislikeHighest ? "bg-red-100 text-red-700" : "text-gray-400"
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span className="text-xs">{dislike}</span>
          </div>
        </div>
      </div>
      {filteredImages.length > 0 && (
        <button
          onClick={() => setShowPhotos(true)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Image className="w-4 h-4" />
          <span>ดู {filteredImages.length} รูปภาพ</span>
        </button>
      )}
      {showPhotos && (
        <PhotoViewer
          images={filteredImages}
          onClose={() => setShowPhotos(false)}
          title={t(translationKey)}
        />
      )}
    </div>
  );
};

function LocationContent({ location }: { location: Location }) {
  const { t } = useLanguage();
  const [timeFilter, setTimeFilter] = useState<"all" | "recent">("all");

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

      {/* Time Filter */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span>แสดงข้อมูล:</span>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setTimeFilter("recent")}
            className={`px-3 py-1 text-xs rounded-md flex items-center gap-1 ${
              timeFilter === "recent"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>24 ชั่วโมงล่าสุด</span>
          </button>
          <button
            onClick={() => setTimeFilter("all")}
            className={`px-3 py-1 text-xs rounded-md ${
              timeFilter === "all" ? "bg-blue-600 text-white" : "text-gray-600"
            }`}
          >
            <span>ทั้งหมด</span>
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

export function LocationMarker({ location }: { location: Location }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkerClick = () => {
    setIsOpen(true);
  };

  const handlePanelClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Marker
        position={location.position}
        icon={getMarkerIcon(location.accessibility)}
        eventHandlers={{
          click: handleMarkerClick,
        }}
      />
      <SlideUpPanel isOpen={isOpen} onClose={handlePanelClose}>
        <LocationContent location={location} />
      </SlideUpPanel>
    </>
  );
}

export default LocationMarker;
