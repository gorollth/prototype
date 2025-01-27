// src/app/map/components/Map.tsx
'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation, Crosshair } from 'lucide-react';

// Sample routes data with accessibility levels
const exampleRoutes = [
  {
    id: 1,
    accessibility: 'high',
    color: '#22c55e', // green
    path: [
      [13.7466, 100.5347], // Siam Paragon
      [13.7470, 100.5385],
      [13.7466, 100.5393]  // Central World
    ],
    name: "Siam to Central World",
    description: "Fully accessible route via skywalk"
  },
  {
    id: 2,
    accessibility: 'medium',
    color: '#eab308', // yellow
    path: [
      [13.7457, 100.5331], // Siam Discovery
      [13.7442, 100.5314],
      [13.7431, 100.5302]  // MBK
    ],
    name: "Siam Discovery to MBK",
    description: "Partially accessible, some uneven surfaces"
  },
  {
    id: 3,
    accessibility: 'low',
    color: '#ef4444', // red
    path: [
      [13.7466, 100.5347], // Siam
      [13.7480, 100.5322],
      [13.7494, 100.5315]  // Ratchathewi
    ],
    name: "Siam to Ratchathewi",
    description: "Limited accessibility, stairs present"
  }
];

// Wheelchair-friendly locations
const accessibleLocations = [
  {
    id: 1,
    name: "Siam Paragon",
    position: [13.7466, 100.5347],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Elevators",
      "Accessible Restrooms",
      "Wide Walkways",
      "Wheelchair Rentals",
      "Disabled Parking"
    ],
    description: "Fully accessible shopping mall with multiple elevators and facilities"
  },
  {
    id: 2,
    name: "Central World",
    position: [13.7466, 100.5393],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Elevators",
      "Accessible Restrooms",
      "Ramps",
      "Disabled Parking"
    ],
    description: "Large shopping center with complete accessibility features"
  },
  {
    id: 3,
    name: "BTS Siam Station",
    position: [13.7455, 100.5331],
    category: "Public Transport",
    accessibility: "medium",
    features: [
      "Elevators",
      "Staff Assistance",
      "Tactile Paving"
    ],
    description: "Accessible via elevator, staff available for assistance"
  },
  {
    id: 4,
    name: "Lumpini Park",
    position: [13.7322, 100.5418],
    category: "Park",
    accessibility: "high",
    features: [
      "Paved Paths",
      "Accessible Restrooms",
      "Rest Areas",
      "Level Ground"
    ],
    description: "Wheelchair-friendly park with paved paths and facilities"
  }
];

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for each accessibility level
function getMarkerIcon(accessibility: string) {
  const color = accessibility === 'high' ? '#22c55e' : 
                accessibility === 'medium' ? '#eab308' : '#ef4444';
                
  return L.divIcon({
    className: 'custom-div-icon',
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
    iconAnchor: [15, 15]
  });
}

// Location Button Component for current location
function LocationButton() {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
      setLoading(false);
    }).on("locationerror", function(e) {
      console.log("Location error:", e);
      setLoading(false);
    });
  };

  return (
    <button 
      onClick={handleClick}
      className={`absolute right-4 top-20 z-[1000] bg-white p-3 rounded-full shadow-lg
        ${loading ? 'animate-pulse' : ''}`}
      disabled={loading}
    >
      <Crosshair size={24} className="text-blue-600" />
    </button>
  );
}

// Location Marker Component for showing current location
function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

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
      
      {/* Example Routes */}
      {exampleRoutes.map((route) => (
        <Polyline
          key={route.id}
          positions={route.path as L.LatLngExpression[]}
          pathOptions={{ 
            color: route.color,
            weight: 6,
            opacity: 0.8
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-medium">{route.name}</h3>
              <p className="text-sm text-gray-600">{route.description}</p>
              <p className={`text-sm mt-2 ${
                route.accessibility === 'high' ? 'text-green-600' :
                route.accessibility === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {route.accessibility === 'high' ? 'Fully Accessible' :
                 route.accessibility === 'medium' ? 'Partially Accessible' :
                 'Limited Accessibility'}
              </p>
            </div>
          </Popup>
        </Polyline>
      ))}

      {/* Accessible Locations Markers */}
      {accessibleLocations.map((location) => (
        <Marker
          key={location.id}
          position={location.position as L.LatLngExpression}
          icon={getMarkerIcon(location.accessibility)}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-medium text-lg">{location.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{location.category}</p>
              
              <div className={`text-sm mb-2 ${
                location.accessibility === 'high' ? 'text-green-600' :
                location.accessibility === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {location.accessibility === 'high' ? '★★★ Fully Accessible' :
                 location.accessibility === 'medium' ? '★★ Partially Accessible' :
                 '★ Limited Accessibility'}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{location.description}</p>
              
              <div className="space-y-1">
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
            </div>
          </Popup>
        </Marker>
      ))}

      <LocationMarker />
      <LocationButton />
    </MapContainer>
  );
}