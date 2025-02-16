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
  Camera,
} from "lucide-react";
import L from "leaflet";
import { SlideUpPanel } from "./SlideUpPanel";
import { FeatureVotes } from "./FeatureVotes";
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
          <h3 className="font-medium text-lg text-gray-600">{location.name}</h3>
          <p className="text-sm text-gray-600">{location.category}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">{location.description}</p>

      {/* Accessibility Features */}
      <div className="space-y-4 text-gray-600">
        {accessibilityFeatures.map((key) => {
          const feature = location.accessibilityScores[key];
          return (
            <div key={key} className="space-y-2">
              <FeatureVotes feature={feature} />
            </div>
          );
        })}
      </div>

      {/* Additional Features */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">
          Additional Features:
        </p>
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
