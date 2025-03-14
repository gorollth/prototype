// Path: components/ObstacleMarker.tsx

"use client";

import { useState, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Obstacle, ObstacleCategory } from "@/lib/types/obstacle";
import { ObstacleRecheckSection } from "./ObstacleRecheckSection";
import { SlideUpPanel } from "./SlideUpPanel";

interface ObstacleMarkerProps {
  obstacle: Obstacle;
  onObstacleUpdate?: (
    obstacleId: string,
    newStatus: "active" | "resolved"
  ) => Promise<void>;
}

const createObstacleIcon = (category: ObstacleCategory) => {
  const getIconConfig = () => {
    switch (category) {
      case "sidewalk_issues":
        return {
          color: "#ef4444", // red
          icon: "🚧",
        };
      case "permanent_obstacles":
        return {
          color: "#f59e0b", // amber
          icon: "⚠️",
        };
      case "temporary_obstacles":
        return {
          color: "#3b82f6", // blue
          icon: "⏱️",
        };
      case "connection_issues":
        return {
          color: "#8b5cf6", // purple
          icon: "🔌",
        };
      case "safety_issues":
        return {
          color: "#dc2626", // red
          icon: "⚡",
        };
      default:
        return {
          color: "#6b7280", // gray
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
  const { t } = useLanguage();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const map = useMap();
  const icon = createObstacleIcon(obstacle.category);

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

  const getCategoryLabel = (category: ObstacleCategory): string => {
    const labels = {
      sidewalk_issues: t("obstacle.category.sidewalk_issues"),
      permanent_obstacles: t("obstacle.category.permanent_obstacles"),
      temporary_obstacles: t("obstacle.category.temporary_obstacles"),
      connection_issues: t("obstacle.category.connection_issues"),
      safety_issues: t("obstacle.category.safety_issues"),
    };
    return labels[category];
  };

  const handleStatusUpdate = async (newStatus: "active" | "resolved") => {
    if (onObstacleUpdate) {
      await onObstacleUpdate(obstacle.id, newStatus);
    }
  };

  const handleMarkerClick = () => {
    map.setView(obstacle.position, map.getZoom());
    setIsDetailsOpen(true);
  };

  const getTypeLabel = (type: string): string => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
          <div className="space-y-1">
            <span className="text-sm font-medium text-gray-500">
              {getCategoryLabel(obstacle.category)}
            </span>
            <h3 className="font-semibold text-lg text-gray-900">
              {getTypeLabel(obstacle.type)}
            </h3>
          </div>

          <p className="text-gray-600">{obstacle.description}</p>

          {obstacle.imageUrl && (
            <img
              src={obstacle.imageUrl}
              alt={getTypeLabel(obstacle.type)}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          <div className="text-sm text-gray-500 space-y-1">
            <p>{t("obstacle.reported.by", { name: obstacle.reportedBy })}</p>
            <p>
              {t("obstacle.reported.date", {
                date: new Date(obstacle.reportedAt).toLocaleDateString(),
              })}
            </p>
            {obstacle.lastVerified && (
              <p>
                {t("obstacle.last.verified", {
                  date: new Date(obstacle.lastVerified).toLocaleDateString(),
                })}
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
            {obstacle.status === "active"
              ? t("obstacle.status.active")
              : t("obstacle.status.resolved")}
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
