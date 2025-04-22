// Path: src/components/MapPicker.tsx
"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: "/image/marker-pin.png", // Make sure this file exists in your public folder
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

interface MapPickerProps {
  initialPosition: [number, number];
  onSelectPosition: (position: [number, number]) => void;
}

// DraggableMarker component to allow marker repositioning
function DraggableMarker({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
}) {
  const [markerPosition, setMarkerPosition] = useState(position);

  useEffect(() => {
    setMarkerPosition(position);
  }, [position]);

  const map = useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setMarkerPosition(newPos);
      setPosition(newPos);
    },
  });

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
          setPosition(newPos);
        },
      }}
    />
  );
}

export default function MapPicker({
  initialPosition,
  onSelectPosition,
}: MapPickerProps) {
  const [position, setPosition] = useState<[number, number]>(initialPosition);

  // Function to handle position changes and pass to parent
  const handlePositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
    onSelectPosition(newPosition);
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={position[0] !== 0 ? position : [13.7563, 100.5018]} // Default to Bangkok if no position
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker
          position={position}
          setPosition={handlePositionChange}
        />
      </MapContainer>
    </div>
  );
}
