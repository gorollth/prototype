// src/components/Map.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Crosshair, Search, X, Eye, EyeOff } from "lucide-react"; // เพิ่ม Eye, EyeOff
import { useLanguage } from "../../contexts/LanguageContext";
import { LocationMarker } from "./LocationMarker";
import { ObstacleMarker } from "./ObstacleMarker";
import { sampleObstacles } from "@/data/obstacles";
import { accessibleLocations } from "@/data/locations";
import { NearbyAccessibleLocations } from "./NearbyAccessibleLocations";
import { locationService } from "@/services/locationService";
import { Location } from "@/lib/types/location";
import { sampleRoutes } from "@/data/routes";

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: "/image/gps.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// เมาร์เกอร์สำหรับผลการค้นหา
const searchResultIcon = L.icon({
  iconUrl: "/image/search-pin.svg", // ต้องเพิ่มไอคอนนี้ในโปรเจค
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

interface MapProps {
  routePath?: [number, number][];
  searchQuery?: string;
}

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

// คอมโพเนนต์ใหม่สำหรับการเริ่มต้นที่ตำแหน่งปัจจุบัน
function InitialLocationFinder() {
  const map = useMap();
  const [initialLocationSet, setInitialLocationSet] = useState(false);

  useEffect(() => {
    // ตรวจสอบ URL parameters ก่อน
    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get("lat");
    const lng = urlParams.get("lng");
    const name = urlParams.get("name");

    // ถ้ามีพิกัดจาก URL ให้ใช้พิกัดนั้น
    if (lat && lng) {
      const position = L.latLng(parseFloat(lat), parseFloat(lng));
      map.setView(position, 16);

      // สร้าง Marker พร้อม Popup ถ้ามีชื่อ
      if (name) {
        L.marker(position, { icon: searchResultIcon })
          .addTo(map)
          .bindPopup(name)
          .openPopup();
      }

      setInitialLocationSet(true);
      return;
    }

    // ถ้าไม่มีพิกัดจาก URL ให้หาตำแหน่งปัจจุบัน
    if (!initialLocationSet) {
      map
        .locate({ setView: true, maxZoom: 16 })
        .on("locationfound", function (e) {
          console.log("Current location found:", e.latlng);
          setInitialLocationSet(true);
        })
        .on("locationerror", function (e) {
          console.log("Location error:", e);
          setInitialLocationSet(true);
        });
    }
  }, [map, initialLocationSet]);

  return null;
}

// Current Location Marker Component
function CurrentLocationMarker() {
  const { t } = useLanguage();
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
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
  const [activeRoutes, setActiveRoutes] = useState(() =>
    sampleRoutes.map((route) => ({
      id: route.id,
      accessibility: "high",
      color: "#22c55e",
      path: route.path,
      name: route.title,
      description: route.description,
    }))
  );
  const [searchValue, setSearchValue] = useState("");
  const [showNearbyPanel, setShowNearbyPanel] = useState(false);
  const [searchPosition, setSearchPosition] = useState<[number, number] | null>(
    null
  );

  const [showRoutes, setShowRoutes] = useState(true);

  const toggleRoutesVisibility = useCallback(() => {
    setShowRoutes((prev) => !prev);
  }, []);

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

  // Handle search query from parent
  useEffect(() => {
    if (searchQuery) {
      setSearchValue(searchQuery);
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  // ฟังก์ชันสำหรับแสดงตำแหน่งที่ค้นหาบนแผนที่
  const MapController = ({
    searchPos,
  }: {
    searchPos: [number, number] | null;
  }) => {
    const map = useMap();

    useEffect(() => {
      if (searchPos) {
        map.flyTo(searchPos as L.LatLngExpression, 16);
      }
    }, [map, searchPos]);

    return null;
  };

  // ฟังก์ชันสำหรับค้นหาสถานที่
  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setSearchPosition(null);
      setShowNearbyPanel(false);
      return;
    }

    try {
      const results = await locationService.searchLocations(query);

      if (results.length > 0) {
        // ใช้ตำแหน่งของผลลัพธ์แรกเป็นตำแหน่งค้นหา
        setSearchPosition(results[0].position);
        // แสดงพาเนลสถานที่ใกล้เคียง
        setShowNearbyPanel(true);
      }
    } catch (error) {
      console.error("Error searching locations:", error);
    }
  }, []);

  // ฟังก์ชันสำหรับเลือกสถานที่จากรายการใกล้เคียง
  const handleSelectNearbyLocation = (location: Location) => {
    setShowNearbyPanel(false);

    // ย้ายแผนที่ไปยังตำแหน่งที่เลือก
    if (location.position) {
      setSearchPosition(location.position);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1001]">
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("map.search.placeholder")}
            className="w-full pl-10 pr-10 py-3 rounded-lg border-none shadow-lg"
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchValue)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchValue && (
            <button
              onClick={() => {
                setSearchValue("");
                setSearchPosition(null);
                setShowNearbyPanel(false);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Panel แสดงสถานที่ใกล้เคียงที่เข้าถึงได้ */}
      {searchPosition && (
        <NearbyAccessibleLocations
          searchPosition={searchPosition}
          onSelect={handleSelectNearbyLocation}
          onClose={() => setShowNearbyPanel(false)}
          isOpen={showNearbyPanel}
        />
      )}

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

        {/* เพิ่มคอมโพเนนต์ InitialLocationFinder เพื่อให้เริ่มที่ตำแหน่งปัจจุบัน */}
        <InitialLocationFinder />

        {/* Routes - เพิ่มเงื่อนไขการแสดงผล */}
        {showRoutes &&
          activeRoutes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.path as L.LatLngExpression[]}
              pathOptions={{
                color: "#15803d",
                weight: 6,
                opacity: 0.8,
              }}
            ></Polyline>
          ))}

        {/* ปุ่มสำหรับสลับการแสดงเส้นทาง */}
        {activeRoutes.length > 0 && (
          <div className="absolute top-28 right-4 z-[1000]">
            <button
              onClick={toggleRoutesVisibility}
              className="bg-white p-3 rounded-full shadow-lg"
              title={showRoutes ? "ซ่อนเส้นทาง" : "แสดงเส้นทาง"}
            >
              {showRoutes ? (
                <Eye className="h-6 w-6 text-blue-600" />
              ) : (
                <EyeOff className="h-6 w-6 text-blue-600" />
              )}
            </button>
          </div>
        )}

        {/* Location Markers */}
        {accessibleLocations.map((location) => (
          <LocationMarker key={location.id} location={location} />
        ))}

        {/* Search Result Marker */}
        {searchPosition && (
          <Marker
            position={searchPosition as L.LatLngExpression}
            icon={searchResultIcon}
          >
            <Popup>{t("map.search.result")}</Popup>
          </Marker>
        )}

        <CurrentLocationMarker />
        <LocationButton />

        {/* Obstacle Markers */}
        {sampleObstacles.map((obstacle) => (
          <ObstacleMarker key={obstacle.id} obstacle={obstacle} />
        ))}

        {/* ควบคุมการเลื่อนแผนที่ */}
        <MapController searchPos={searchPosition} />
      </MapContainer>
    </div>
  );
}
