// src/app/map/components/Map.tsx
'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation } from 'lucide-react';

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Example route coordinates
const routeCoordinates = [
  // Siam Paragon
  [13.7466, 100.5347],
  // Via Ratchadamri Road
  [13.7470, 100.5385],
  // Central World
  [13.7466, 100.5393]
];

// Example locations
const locations = {
  siamParagon: {
    position: [13.7466, 100.5347],
    name: "Siam Paragon",
    accessibility: "Fully accessible",
    features: ["Elevators", "Ramps", "Accessible restrooms"]
  },
  centralWorld: {
    position: [13.7466, 100.5393],
    name: "Central World",
    accessibility: "Fully accessible",
    features: ["Elevators", "Wide corridors", "Accessible parking"]
  }
};

// LocationMarker component for user's location
function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export function Map() {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useEffect(() => {
    // Center on Siam area by default
    setPosition(L.latLng(13.7466, 100.5347));
  }, []);

  if (!position) return <div>Loading map...</div>;

  return (
    <MapContainer 
      center={position} 
      zoom={16} 
      className="w-full h-full"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Route Line */}
      <Polyline 
        positions={routeCoordinates}
        pathOptions={{ color: 'green', weight: 6 }}
      />

      {/* Location Markers */}
      <Marker 
        position={locations.siamParagon.position as L.LatLngExpression} 
        icon={icon}
      >
        <Popup>
          <div className="p-2">
            <h3 className="font-medium">{locations.siamParagon.name}</h3>
            <p className="text-sm text-green-600">{locations.siamParagon.accessibility}</p>
            <div className="mt-2">
              {locations.siamParagon.features.map((feature, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs mr-1 mb-1"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </Popup>
      </Marker>

      <Marker 
        position={locations.centralWorld.position as L.LatLngExpression} 
        icon={icon}
      >
        <Popup>
          <div className="p-2">
            <h3 className="font-medium">{locations.centralWorld.name}</h3>
            <p className="text-sm text-green-600">{locations.centralWorld.accessibility}</p>
            <div className="mt-2">
              {locations.centralWorld.features.map((feature, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs mr-1 mb-1"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </Popup>
      </Marker>

      {/* Additional features can be added here */}
    </MapContainer>
  );
}