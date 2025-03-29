// Path: src/components/ObstacleMarker.tsx

"use client";

import { useState, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { AlertTriangle } from "lucide-react"; // เพิ่ม import สำหรับ icon
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

const createObstacleIcon = () => {
  // ใช้สีและรูปแบบเดียวกันสำหรับทุกประเภท
  const color = "#f97316"; // สีส้ม (orange-500)

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
        cursor: pointer;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
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
  // ใช้ icon เดียวกันสำหรับทุกประเภท
  const icon = createObstacleIcon();

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
    } catch {
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
              <AlertTriangle className="w-5 h-5 text-orange-500" />{" "}
              {/* ใช้ Lucide icon แทน emoji */}
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
