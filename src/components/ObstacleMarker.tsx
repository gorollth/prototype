"use client";

import { useState, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import type { Obstacle } from "@/lib/types/obstacle";
import { ObstacleRecheckSection } from "./ObstacleRecheckSection";
import { SlideUpPanel } from "./SlideUpPanel";

interface ObstacleMarkerProps {
  obstacle: Obstacle;
  onObstacleUpdate?: (
    obstacleId: string,
    newStatus: "active" | "resolved"
  ) => Promise<void>;
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
        cursor: pointer;
      ">
        ${icon}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export function ObstacleMarker({
  obstacle,
  onObstacleUpdate,
}: ObstacleMarkerProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const map = useMap();
  const icon = createObstacleIcon(obstacle.type);

  // Disable map interaction when panel is open
  useEffect(() => {
    if (isDetailsOpen) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
    } else {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
    }
  }, [isDetailsOpen, map]);

  const handleStatusUpdate = async (newStatus: "active" | "resolved") => {
    if (onObstacleUpdate) {
      await onObstacleUpdate(obstacle.id, newStatus);
    }
  };

  const handleMarkerClick = () => {
    // Center the map on the clicked marker
    map.setView(obstacle.position, map.getZoom());
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Marker
        position={obstacle.position}
        icon={icon}
        eventHandlers={{
          click: handleMarkerClick,
        }}
      />

      <SlideUpPanel
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      >
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">
            {obstacle.title}
          </h3>
          <p className="text-gray-600">{obstacle.description}</p>

          {obstacle.imageUrl && (
            <img
              src={obstacle.imageUrl}
              alt={obstacle.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          <div className="text-sm text-gray-500 space-y-1">
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
            className={`px-3 py-1.5 rounded-full text-sm inline-flex items-center ${
              obstacle.status === "active"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                obstacle.status === "active" ? "bg-red-500" : "bg-green-500"
              }`}
            ></span>
            {obstacle.status === "active" ? "Active" : "Resolved"}
          </div>

          <ObstacleRecheckSection
            obstacleId={obstacle.id}
            currentStatus={obstacle.status}
            onStatusUpdate={handleStatusUpdate}
            verifyCount={obstacle.verifyCount}
          />
        </div>
      </SlideUpPanel>
    </>
  );
}
