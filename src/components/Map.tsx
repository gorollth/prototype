// src/app/map/components/Map.tsx
"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Crosshair } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { LocationMarker } from "./LocationMarker";
import { ObstacleMarker } from "./ObstacleMarker";
import { sampleObstacles } from "@/data/obstacles";
import { accessibleLocations } from "@/data/locations";

// Sample routes data with accessibility levels
const exampleRoutes = [
  {
    id: 1,
    accessibility: "high",
    color: "#22c55e", // green
    path: [
      [13.7466, 100.5347] as [number, number], // Siam Paragon
      [13.747, 100.5385] as [number, number],
      [13.7466, 100.5393] as [number, number], // Central World
    ],
    name: "Siam to Central World",
    description: "Fully accessible route via skywalk",
  },
  {
    id: 2,
    accessibility: "medium",
    color: "#eab308", // yellow
    path: [
      [13.7457, 100.5331] as [number, number], // Siam Discovery
      [13.7442, 100.5314] as [number, number],
      [13.7431, 100.5302] as [number, number], // MBK
    ],
    name: "Siam Discovery to MBK",
    description: "Partially accessible, some uneven surfaces",
  },
  {
    id: 3,
    accessibility: "low",
    color: "#ef4444", // red
    path: [
      [13.7466, 100.5347] as [number, number], // Siam
      [13.748, 100.5322] as [number, number],
      [13.7494, 100.5315] as [number, number], // Ratchathewi
    ],
    name: "Siam to Ratchathewi",
    description: "Limited accessibility, stairs present",
  },
  {
    id: 4,
    accessibility: "high",
    color: "#22c55e",
    path: [
      [13.7305, 100.5697] as [number, number], // EmQuartier entrance
      [13.7309, 100.5694] as [number, number], // Skywalk connection
      [13.7314, 100.5691] as [number, number], // Intermediate point
      [13.7318, 100.5689] as [number, number], // EmSphere entrance
    ],
    name: "EmQuartier to EmSphere",
    description: "Fully accessible covered skywalk route with elevators",
  },
  {
    id: 5,
    accessibility: "high",
    color: "#22c55e",
    path: [
      [13.7301, 100.5698] as [number, number], // BTS Phrom Phong
      [13.7303, 100.5697] as [number, number], // Skywalk entrance
      [13.7305, 100.5697] as [number, number], // EmQuartier entrance
    ],
    name: "Phrom Phong BTS to EmQuartier",
    description: "Direct covered walkway with elevator access",
  },
  {
    id: 6,
    accessibility: "high",
    color: "#22c55e",
    path: [
      [13.7318, 100.5689] as [number, number], // EmSphere
      [13.7321, 100.5687] as [number, number], // Connecting bridge
      [13.7324, 100.5685] as [number, number], // EmpoRium
    ],
    name: "EmSphere to EmpoRium",
    description: "Connected route through Em District skywalks",
  },
];

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: "/image/gps.png",
  // shadowUrl: "/images/marker-shadow.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Location Button Component for current location
function LocationButton() {
  const { t } = useLanguage();
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    map
      .locate()
      .on("locationfound", function (e) {
        map.flyTo(e.latlng, map.getZoom());
        setLoading(false);
      })
      .on("locationerror", function (e) {
        console.log("Location error:", e);
        setLoading(false);
      });
  };

  return (
    <button
      onClick={handleClick}
      title={t("map.locate.current.location")}
      className={`absolute right-4 top-20 z-[1000] bg-white p-3 rounded-full shadow-lg
        ${loading ? "animate-pulse" : ""}`}
      disabled={loading}
    >
      <Crosshair size={24} className="text-blue-600" />
    </button>
  );
}

// Current Location Marker Component
function CurrentLocationMarker() {
  const { t } = useLanguage();
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
      <Popup>{t("map.current.location")}</Popup>
    </Marker>
  );
}

interface MapProps {
  routePath?: [number, number][];
  searchQuery?: string;
}

export function Map({ routePath = [], searchQuery }: MapProps) {
  const { t } = useLanguage();
  const defaultPosition = L.latLng(13.7466, 100.5347); // Siam area
  const [position, setPosition] = useState(() => defaultPosition);
  const [activeRoutes, setActiveRoutes] = useState(() => exampleRoutes);

  // Handle route path changes
  useEffect(() => {
    if (routePath.length > 0) {
      const newPosition = L.latLng(routePath[0][0], routePath[0][1]);
      setPosition(newPosition);
      setActiveRoutes([
        {
          id: 999,
          accessibility: "high",
          color: "#22c55e",
          path: routePath,
          name: t("map.selected.route"),
          description: t("map.selected.route.description"),
        },
      ]);
    }
  }, [routePath, t]);

  // Handle search query
  useEffect(() => {
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
    }
  }, [searchQuery]);

  return (
    <MapContainer
      center={position}
      zoom={16}
      className="w-full h-full"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />

      {/* Routes */}
      {activeRoutes.map((route) => (
        <Polyline
          key={route.id}
          positions={route.path as L.LatLngExpression[]}
          pathOptions={{
            color:
              route.accessibility === "high"
                ? "#15803d" // darker green
                : route.accessibility === "medium"
                ? "#b45309" // darker yellow
                : "#dc2626", // darker red
            weight: 6,
            opacity: 0.8,
          }}
        ></Polyline>
      ))}

      {/* Location Markers */}
      {accessibleLocations.map((location) => (
        <LocationMarker key={location.id} location={location} />
      ))}

      <CurrentLocationMarker />
      <LocationButton />

      {/* Obstacle Markers */}
      {sampleObstacles.map((obstacle) => (
        <ObstacleMarker key={obstacle.id} obstacle={obstacle} />
      ))}
    </MapContainer>
  );
}
