// src/components/RoutePreviewMap.tsx
"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// แก้ปัญหา icon ของ Leaflet
const startIcon = L.divIcon({
  className: "route-start-marker",
  html: `<div style="width: 14px; height: 14px; background-color: #16a34a; border-radius: 50%; border: 3px solid white;"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const endIcon = L.divIcon({
  className: "route-end-marker",
  html: `<div style="width: 14px; height: 14px; background-color: #ef4444; border-radius: 50%; border: 3px solid white;"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

interface RoutePreviewMapProps {
  path: [number, number][];
}

// คอมโพเนนต์ที่จะปรับมุมมองแผนที่ให้ครอบคลุมเส้นทางทั้งหมด
function FitBounds({ path }: { path: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (path.length > 0) {
      const bounds = L.latLngBounds(path.map((p) => L.latLng(p[0], p[1])));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, path]);

  return null;
}

export function RoutePreviewMap({ path }: RoutePreviewMapProps) {
  if (path.length === 0) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">ไม่มีข้อมูลเส้นทาง</p>
      </div>
    );
  }

  // คำนวณจุดกึ่งกลางของเส้นทางสำหรับจุดเริ่มต้นของแผนที่
  const center: [number, number] = [
    path.reduce((sum, point) => sum + point[0], 0) / path.length,
    path.reduce((sum, point) => sum + point[1], 0) / path.length,
  ];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false} // ซ่อนปุ่ม zoom เพื่อความสวยงาม
      attributionControl={false} // ซ่อนข้อความ attribution
      dragging={false} // ไม่ให้เลื่อนแผนที่ได้
      touchZoom={false} // ไม่ให้ zoom ด้วย touch
      scrollWheelZoom={false} // ไม่ให้ zoom ด้วย scroll
      doubleClickZoom={false} // ไม่ให้ zoom ด้วยการดับเบิลคลิก
    >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
      <Polyline
        positions={path as L.LatLngExpression[]}
        pathOptions={{ color: "#15803d", weight: 5, opacity: 0.8 }}
      />

      {/* จุดเริ่มต้น */}
      <Marker
        position={path[0] as L.LatLngExpression}
        icon={startIcon}
        interactive={false} // ไม่ให้มี interaction
      />

      {/* จุดสิ้นสุด */}
      <Marker
        position={path[path.length - 1] as L.LatLngExpression}
        icon={endIcon}
        interactive={false} // ไม่ให้มี interaction
      />

      {/* ปรับมุมมองแผนที่ให้พอดีกับเส้นทาง */}
      <FitBounds path={path} />
    </MapContainer>
  );
}

export default RoutePreviewMap;
