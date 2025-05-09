// Path: src/components/SimpleLocationMap.tsx
"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: "/image/gps.png", // ต้องแน่ใจว่ามีไฟล์นี้ใน public folder
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

interface SimpleLocationMapProps {
  position: [number, number];
  onPositionChange?: (position: [number, number]) => void;
}

// DraggableMarker component
function DraggableMarker({
  position,
  onPositionChange,
}: {
  position: [number, number];
  onPositionChange?: (position: [number, number]) => void;
}) {
  const [markerPosition, setMarkerPosition] = useState(position);

  useEffect(() => {
    setMarkerPosition(position);
  }, [position]);

  return (
    <Marker
      position={markerPosition}
      icon={icon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          const newPos: [number, number] = [position.lat, position.lng];
          setMarkerPosition(newPos);
          if (onPositionChange) {
            onPositionChange(newPos);
          }
        },
      }}
    />
  );
}

export default function SimpleLocationMap({
  position,
  onPositionChange,
}: SimpleLocationMapProps) {
  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
      <DraggableMarker
        position={position}
        onPositionChange={onPositionChange}
      />
    </MapContainer>
  );
}
