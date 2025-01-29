// src/app/map/components/LocationMarker.tsx
'use client';

import { Marker, Popup } from 'react-leaflet';
import { ShoppingBag, Bus, Trees, Accessibility, Star } from 'lucide-react';
import L from 'leaflet';

interface LocationFeature {
  name: string;
  score: number;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  position: [number, number];  // Tuple type for coordinates
  category: 'Shopping Mall' | 'Public Transport' | 'Park' | 'Restaurant';
  accessibility: 'high' | 'medium' | 'low';
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

interface LocationMarkerProps {
  location: Location;
}

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
    case 'Shopping Mall':
      return <ShoppingBag className="w-5 h-5" />;
    case 'Public Transport':
      return <Bus className="w-5 h-5" />;
    case 'Park':
      return <Trees className="w-5 h-5" />;
    default:
      return <Accessibility className="w-5 h-5" />;
  }
}

function ScoreBar({ score, name }: LocationFeature) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>{name}</span>
        <span>{score}/10</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${
            score >= 7 ? 'bg-green-500' :
            score >= 4 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

export function LocationMarker({ location }: LocationMarkerProps) {
  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/review/${location.id}`;
  };

  return (
    <Marker
      position={location.position}
      icon={getMarkerIcon(location.accessibility)}
    >
      <Popup>
        <div className="p-2 min-w-[300px]">
          {/* Location Header */}
          <div className="flex items-center gap-2 mb-2">
            {getCategoryIcon(location.category)}
            <div>
              <h3 className="font-medium text-lg">{location.name}</h3>
              <p className="text-sm text-gray-600">{location.category}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4">
            {location.description}
          </p>

          {/* Accessibility Scores */}
          <div className="space-y-3 mb-4">
            {Object.entries(location.accessibilityScores).map(([key, feature]) => (
              <ScoreBar key={key} {...feature} />
            ))}
          </div>

          {/* Features */}
          <div className="space-y-1 mb-4">
            <p className="text-sm font-medium">Features:</p>
            <div className="flex flex-wrap gap-1">
              {location.features.map((feature, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full"
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
      </Popup>
    </Marker>
  );
}