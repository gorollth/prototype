// src/app/map/components/ObstacleMarker.tsx
"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Obstacle } from "@/lib/types/obstacle";

interface ObstacleMarkerProps {
  obstacle: Obstacle;
}

const createObstacleIcon = (type: Obstacle["type"]) => {
  const getIconConfig = () => {
    switch (type) {
      case "construction":
        return {
          color: "#f59e0b",
          icon: "🚧",
        };
      case "broken_elevator":
        return {
          color: "#ef4444",
          icon: "⚠️",
        };
      case "steep_slope":
        return {
          color: "#f59e0b",
          icon: "⛰️",
        };
      case "narrow_path":
        return {
          color: "#eab308",
          icon: "↔️",
        };
      case "blocked_path":
        return {
          color: "#ef4444",
          icon: "🚫",
        };
      case "stairs_only":
        return {
          color: "#ef4444",
          icon: "🪜",
        };
      case "temporary":
        return {
          color: "#3b82f6",
          icon: "⏱️",
        };
      default:
        return {
          color: "#6b7280",
          icon: "⚠️",
        };
    }
  };

  const { color, icon } = getIconConfig();

  return L.divIcon({
    className: "custom-obstacle-marker",
    html: `
      <div style="
        background-color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid ${color};
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      ">
        ${icon}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

export function ObstacleMarker({ obstacle }: ObstacleMarkerProps) {
  const icon = createObstacleIcon(obstacle.type);

  return (
    <Marker position={obstacle.position} icon={icon}>
      <Popup>
        <div className="p-2 max-w-xs">
          <h3 className="font-semibold text-gray-900">{obstacle.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{obstacle.description}</p>

          {obstacle.imageUrl && (
            <img
              src={obstacle.imageUrl}
              alt={obstacle.title}
              className="w-full h-32 object-cover rounded-md mt-2"
            />
          )}

          <div className="mt-2 text-xs text-gray-500">
            <p>Reported by: {obstacle.reportedBy}</p>
            <p>Date: {new Date(obstacle.reportedAt).toLocaleDateString()}</p>
            {obstacle.lastVerified && (
              <p>
                Last verified:{" "}
                {new Date(obstacle.lastVerified).toLocaleDateString()}
              </p>
            )}
          </div>

          <div
            className={`mt-2 px-2 py-1 rounded-full text-xs inline-flex items-center ${
              obstacle.status === "active"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-1 ${
                obstacle.status === "active" ? "bg-red-500" : "bg-green-500"
              }`}
            ></span>
            {obstacle.status === "active" ? "Active" : "Resolved"}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
