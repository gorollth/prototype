// src/components/ReviewList.tsx
import React, { useState } from "react";
import { ThumbsUp, Star, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { getReviewsByLocationId } from "@/data/reviews";
import { useLanguage } from "../../contexts/LanguageContext";

interface ReviewListProps {
  locationId: number;
  showWrittenOnly?: boolean; // เพิ่ม prop นี้
}

type SortOption = "latest" | "highest" | "lowest" | "mostLiked";

export function ReviewList({
  locationId,
  showWrittenOnly = false,
}: ReviewListProps) {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [showSortOptions, setShowSortOptions] = useState(false);

  // ดึงรีวิวทั้งหมด
  const allReviews = getReviewsByLocationId(locationId);

  // กรองรีวิวตาม showWrittenOnly parameter
  const reviews = showWrittenOnly
    ? allReviews.filter(
        (review) => review.comment && review.comment.trim().length > 0
      )
    : allReviews;

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "mostLiked":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // ฟังก์ชั่นสำหรับแสดงจำนวนเรตติ้งเป็นดาว
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= Math.round(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getSortLabel = (option: SortOption): string => {
    switch (option) {
      case "latest":
        return t("reviews.sort.latest") || "ล่าสุด";
      case "highest":
        return t("reviews.sort.highest") || "คะแนนสูงสุด";
      case "lowest":
        return t("reviews.sort.lowest") || "คะแนนต่ำสุด";
      case "mostLiked":
        return t("reviews.sort.most.liked") || "ถูกใจมากที่สุด";
      default:
        return "";
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">{t("reviews.none") || "ยังไม่มีรีวิว"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">
            {t("reviews.title") || "รีวิวจากผู้ใช้"} ({reviews.length})
          </h3>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center gap-1 text-sm text-gray-600 px-3 py-1 rounded-full border hover:bg-gray-50"
            >
              <Filter size={14} />
              <span>{getSortLabel(sortBy)}</span>
              {showSortOptions ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>

            {showSortOptions && (
              <div className="absolute right-0 top-full mt-1 bg-white shadow-md rounded-md z-10 w-40 py-1 border">
                {(
                  ["latest", "highest", "lowest", "mostLiked"] as SortOption[]
                ).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortOptions(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === option
                        ? "font-medium text-blue-600 bg-blue-50"
                        : "text-gray-700"
                    }`}
                  >
                    {getSortLabel(option)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="divide-y">
        {sortedReviews.map((review) => (
          <div key={review.id} className="p-4">
            {/* User info and rating */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={review.profileImage || "/api/placeholder/40/40"}
                    alt={review.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{review.username}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString("th-TH")}
                  </p>
                </div>
              </div>

              {/* Rating stars */}
              {renderStars(review.rating)}
            </div>

            {/* Review content */}
            <p className="text-gray-700 my-2">{review.comment}</p>

            {/* Like button */}
            <div className="flex items-center gap-1 text-gray-500">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ThumbsUp size={16} />
              </button>
              <span className="text-sm">{review.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
