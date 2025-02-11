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
  X,
} from "lucide-react";
import L from "leaflet";

// Interfaces remain the same
interface LocationFeature {
  name: string;
  isLiked: boolean;
  totalVotes: number;
  description: string;
}

interface Location {
  id: number;
  name: string;
  position: [number, number];
  category: "Shopping Mall" | "Public Transport" | "Park" | "Restaurant";
  accessibility: "high" | "medium" | "low";
  features: string[];
  description: string;
  accessibilityScores: {
    parking?: LocationFeature;
    elevator?: LocationFeature;
    restroom?: LocationFeature;
    entrance?: LocationFeature;
    pathway?: LocationFeature;
    assistance?: LocationFeature;
  };
}

// Utility functions remain the same
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
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
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

function FeatureVotes({ feature }: { feature: LocationFeature }) {
  const likePercentage =
    feature.totalVotes > 0
      ? Math.round(
          ((feature.isLiked ? feature.totalVotes : 0) / feature.totalVotes) *
            100
        )
      : 0;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm">{feature.name}</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-green-600">
            <ThumbsUp className="w-4 h-4 mr-1" />
            <span className="text-xs">{likePercentage}%</span>
          </div>
          <div className="flex items-center text-red-600">
            <ThumbsDown className="w-4 h-4 mr-1" />
            <span className="text-xs">{100 - likePercentage}%</span>
          </div>
        </div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${likePercentage}%` }}
        />
      </div>
    </div>
  );
}

// LocationPanel component
function LocationPanel({
  location,
  isOpen,
  onClose,
}: {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!location) return null;

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/review/${location.id}`;
  };

  return (
    <>
      {/* Semi-transparent overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 1000 }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed inset-x-0 bottom-0 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ zIndex: 1001 }}
      >
        <div className="bg-white rounded-t-xl shadow-lg max-h-[80vh] overflow-y-auto">
          {/* Close button */}
          <div className="sticky top-0 bg-white p-4 border-b">
            <div className="flex justify-between items-center">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Location Header */}
            <div className="flex items-center gap-2 mb-2 text-gray-600">
              {getCategoryIcon(location.category)}
              <div>
                <h3 className="font-medium text-lg text-gray-600">
                  {location.name}
                </h3>
                <p className="text-sm text-gray-600">{location.category}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 text-gray-600">
              {location.description}
            </p>

            {/* Accessibility Features with Like/Dislike */}
            <div className="space-y-3 mb-4 text-gray-600">
              {Object.entries(location.accessibilityScores).map(
                ([key, feature]) => (
                  <FeatureVotes key={key} feature={feature} />
                )
              )}
            </div>

            {/* Features */}
            <div className="space-y-1 mb-4">
              <p className="text-sm font-medium text-gray-600">Features:</p>
              <div className="flex flex-wrap gap-1">
                {location.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Review Button */}
            <button
              onClick={handleReviewClick}
              className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Main exported component that combines marker and panel functionality
export function LocationMarker({ location }: { location: Location }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkerClick = () => {
    console.log("Marker clicked, opening panel..."); // Debug log
    setIsOpen(true);
  };

  const handlePanelClose = () => {
    console.log("Closing panel..."); // Debug log
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
      <LocationPanel
        location={isOpen ? location : null}
        isOpen={isOpen}
        onClose={handlePanelClose}
      />
    </>
  );
}

export default LocationMarker;
