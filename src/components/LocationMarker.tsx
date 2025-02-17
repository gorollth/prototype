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
  Check,
  X,
  HelpCircle,
  Image,
} from "lucide-react";
import L from "leaflet";
import { SlideUpPanel } from "./SlideUpPanel";
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

interface PhotoViewerProps {
  images: { url: string; caption?: string }[];
  onClose: () => void;
  title: string;
}

const PhotoViewer = ({ images, onClose, title }: PhotoViewerProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">{title} Photos</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto">
          <div className="space-y-4">
            {images.map((image, index) => (
              <div key={index} className="space-y-2">
                <img
                  src={image.url}
                  alt={image.caption || `${title} image ${index + 1}`}
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

const AccessibilityFeatureItem = ({
  title,
  feature,
}: {
  title: string;
  feature: {
    votes: {
      like: number;
      dislike: number;
      notSure: number;
    };
    isLiked: boolean | null;
    images: { url: string; caption?: string }[];
  };
}) => {
  const [showPhotos, setShowPhotos] = useState(false);

  // Determine which count is highest
  const { like, dislike, notSure } = feature.votes;
  const maxCount = Math.max(like, dislike, notSure);
  const isLikeHighest = like === maxCount;
  const isDislikeHighest = dislike === maxCount;
  const isNotSureHighest = notSure === maxCount;

  return (
    <div className="border rounded-lg overflow-hidden bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-base text-gray-700">{title}</label>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <div
            className={`px-4 py-1.5 flex items-center gap-1 ${
              isLikeHighest ? "bg-green-100 text-green-700" : "text-gray-400"
            }`}
          >
            <Check className="w-4 h-4" />
            <span className="text-xs">{like}</span>
          </div>
          <div
            className={`px-4 py-1.5 border-l border-r border-gray-200 flex items-center gap-1 ${
              isDislikeHighest ? "bg-red-100 text-red-700" : "text-gray-400"
            }`}
          >
            <X className="w-4 h-4" />
            <span className="text-xs">{dislike}</span>
          </div>
          <div
            className={`px-4 py-1.5 flex items-center gap-1 ${
              isNotSureHighest ? "bg-gray-100 text-gray-700" : "text-gray-400"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs">{notSure}</span>
          </div>
        </div>
      </div>
      {feature.images.length > 0 && (
        <button
          onClick={() => setShowPhotos(true)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Image className="w-4 h-4" />
          <span>View {feature.images.length} photos</span>
        </button>
      )}
      {showPhotos && (
        <PhotoViewer
          images={feature.images}
          onClose={() => setShowPhotos(false)}
          title={title}
        />
      )}
    </div>
  );
};

function LocationContent({ location }: { location: Location }) {
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
  ] as const;

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <div className="flex items-center gap-2 text-gray-600">
        {getCategoryIcon(location.category)}
        <div>
          <h3 className="font-medium text-lg text-gray-900">{location.name}</h3>
          <p className="text-sm text-gray-600">{location.category}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">{location.description}</p>

      {/* Accessibility Features */}
      <div className="space-y-4">
        {accessibilityFeatures.map((key) => (
          <AccessibilityFeatureItem
            key={key}
            title={location.accessibilityScores[key].name}
            feature={location.accessibilityScores[key]}
          />
        ))}
      </div>

      {/* Review Button */}
      <button
        onClick={handleReviewClick}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <Star className="w-4 h-4" />
        <span>Write a Review</span>
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
