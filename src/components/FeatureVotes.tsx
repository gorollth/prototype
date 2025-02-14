"use client";

import { useState, useRef } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LocationFeature } from "@/lib/types/location";

interface FeatureVotesProps {
  feature: LocationFeature;
}

export function FeatureVotes({ feature }: FeatureVotesProps) {
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Using mock images for testing - remove this in production
  const mockImages = Array(10)
    .fill(null)
    .map((_, i) => ({
      url: "/api/placeholder/400/300",
      caption: `Test image ${i + 1}`,
    }));

  const images = feature.images || mockImages;
  const hasImages = images && images.length > 0;

  const likePercentage =
    feature.totalVotes > 0
      ? Math.round(
          ((feature.isLiked ? feature.totalVotes : 0) / feature.totalVotes) *
            100
        )
      : 0;

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300; // Adjust this value to control scroll distance
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-sm">{feature.name}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-green-600">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-xs">{likePercentage}%</span>
            </div>
            <div className="flex items-center text-red-600">
              <ThumbsDown className="w-4 h-4 mr-1" />
              <span className="text-xs">{100 - likePercentage}%</span>
            </div>
            {hasImages && (
              <button
                onClick={() => setIsImagesOpen(!isImagesOpen)}
                className="flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                <span className="text-xs mr-1">
                  See Photos ({images.length})
                </span>
                {isImagesOpen ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${likePercentage}%` }}
          />
        </div>
      </div>

      {/* Image Carousel */}
      {isImagesOpen && hasImages && (
        <div className="mt-2 relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/75 text-white p-1.5 rounded-full transform -translate-x-1/2"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/75 text-white p-1.5 rounded-full transform translate-x-1/2"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              padding: "0 20px", // Offset for the navigation buttons
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-none w-48 h-32 snap-start mr-2 last:mr-0"
              >
                <div className="relative h-full">
                  <img
                    src={image.url}
                    alt={image.caption || `${feature.name} photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 text-xs rounded-b-lg">
                      {image.caption}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
