// Path: src/components/ObstacleMarker.tsx

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
          icon: "🛑",
        };
      case "permanent_obstacles":
        return {
          color: "#f59e0b", // amber
          icon: "🚧",
        };
      case "temporary_obstacles":
        return {
          color: "#facc15", // yellow
          icon: "⚠️",
        };
      case "other_obstacles":
        return {
          color: "#6b7280", // gray
          icon: "❓",
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
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid ${color};
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;
      ">
        ${icon}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
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
      sidewalk_issues: "ปัญหาทางเท้าที่สำคัญ",
      permanent_obstacles: "สิ่งกีดขวางถาวรที่สำคัญ",
      temporary_obstacles: "สิ่งกีดขวางชั่วคราวที่สำคัญ",
      other_obstacles: "อื่นๆ",
    };
    return labels[category] || t("obstacle.category." + category);
  };

  const getCategoryEmoji = (category: ObstacleCategory): string => {
    const emojis = {
      sidewalk_issues: "🛑",
      permanent_obstacles: "🚧",
      temporary_obstacles: "⚠️",
      other_obstacles: "❓",
    };
    return emojis[category] || "⚠️";
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

  const formatReportDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getTypeLabel = (type: string): string => {
    // สร้าง mapping ของ type เป็นชื่อที่อ่านง่าย
    const typeLabels: Record<string, string> = {
      // ปัญหาทางเท้าที่สำคัญ
      rough_surface: "พื้นผิวขรุขระ/ชำรุด",
      broken_drain: "ท่อระบายน้ำชำรุด/ฝาท่อหาย",
      narrow_path: "ทางเท้าแคบเกินไป",
      no_ramp: "ไม่มีทางลาดขึ้น-ลง",

      // สิ่งกีดขวางถาวรที่สำคัญ
      utility_pole: "เสาไฟฟ้า/เสาป้าย",
      footbridge_no_lift: "สะพานลอยที่ไม่มีลิฟต์/ทางลาด",
      construction: "จุดก่อสร้างถาวร",

      // สิ่งกีดขวางชั่วคราวที่สำคัญ
      vehicles_on_sidewalk: "ยานพาหนะบนทางเท้า",
      construction_material: "วัสดุก่อสร้าง",
      garbage_bin: "ถังขยะ",

      // อื่นๆ
      other: "อื่นๆ",
    };

    // ถ้ามีใน mapping ให้ใช้ค่าจาก mapping ถ้าไม่มีให้แปลง snake_case เป็น Title Case
    return (
      typeLabels[type] ||
      type
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
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
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {getCategoryEmoji(obstacle.category)}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {getCategoryLabel(obstacle.category)}
              </span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              {obstacle.title || getTypeLabel(obstacle.type)}
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
            <p>รายงานโดย: {obstacle.reportedBy}</p>
            <p>วันที่รายงาน: {formatReportDate(obstacle.reportedAt)}</p>
            {obstacle.lastVerified && (
              <p>ตรวจสอบล่าสุด: {formatReportDate(obstacle.lastVerified)}</p>
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
            {obstacle.status === "active" ? "ยังมีอยู่" : "แก้ไขแล้ว"}
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
