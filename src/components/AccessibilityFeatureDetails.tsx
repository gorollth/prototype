// src/components/AccessibilityFeatureDetails.tsx
import React from "react";
import { ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";
import { LocationFeature } from "@/lib/types/location";
import { useLanguage } from "../../contexts/LanguageContext";

interface AccessibilityFeatureDetailsProps {
  feature: LocationFeature;
  featureKey: string;
}

export function AccessibilityFeatureDetails({
  feature,
  featureKey,
}: AccessibilityFeatureDetailsProps) {
  const { t } = useLanguage();

  // ฟังก์ชันแปลงชื่อคุณสมบัติเป็นคีย์สำหรับแปลภาษา
  const getFeatureTranslationKey = (key: string): string => {
    const mapping: Record<string, string> = {
      parking: "review.feature.parking",
      entrance: "review.feature.entrance",
      ramp: "review.feature.ramp",
      pathway: "review.feature.pathway",
      elevator: "review.feature.elevator",
      restroom: "review.feature.restroom",
      seating: "review.feature.seating",
      staffAssistance: "review.feature.staff",
      etc: "review.feature.other",
    };
    return mapping[key] || key;
  };

  // คำนวณเปอร์เซ็นต์การโหวต
  const calculatePercentage = () => {
    const { like, dislike, notSure } = feature.votes;
    const total = like + dislike + notSure;
    if (total === 0) return { like: 0, dislike: 0, notSure: 0 };

    return {
      like: Math.round((like / total) * 100),
      dislike: Math.round((dislike / total) * 100),
      notSure: Math.round((notSure / total) * 100),
    };
  };

  const percentages = calculatePercentage();
  const totalVotes =
    feature.votes.like + feature.votes.dislike + feature.votes.notSure;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-medium text-lg">
          {t(getFeatureTranslationKey(featureKey)) || feature.name}
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Description */}
        <p className="text-gray-700">{feature.description}</p>

        {/* Voting stats */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">
            {t("accessibility.votes") || "การประเมินการเข้าถึง"}
          </h4>

          <div className="space-y-3">
            {/* Like votes */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <ThumbsUp size={16} className="text-green-600" />
                  <span className="text-sm">
                    {t("accessibility.good") || "ดี"}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {feature.votes.like} ({percentages.like}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${percentages.like}%` }}
                ></div>
              </div>
            </div>

            {/* Dislike votes */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <ThumbsDown size={16} className="text-red-600" />
                  <span className="text-sm">
                    {t("accessibility.bad") || "ไม่ดี"}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {feature.votes.dislike} ({percentages.dislike}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${percentages.dislike}%` }}
                ></div>
              </div>
            </div>

            {/* Not sure votes */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <HelpCircle size={16} className="text-yellow-600" />
                  <span className="text-sm">
                    {t("accessibility.notsure") || "ไม่แน่ใจ"}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {feature.votes.notSure} ({percentages.notSure}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${percentages.notSure}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-500 text-center">
            {t("accessibility.total.votes", { count: totalVotes }) ||
              `ทั้งหมด ${totalVotes} โหวต`}
          </div>
        </div>

        {/* Images */}
        {feature.images && feature.images.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">
              {t("accessibility.photos") || "รูปภาพ"}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {feature.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded overflow-hidden bg-gray-100"
                >
                  <img
                    src={image.url}
                    alt={image.caption || `${feature.name} image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
