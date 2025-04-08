"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapSearchBar } from "@/components/MapSearchBar";
import { useLanguage } from "../../../contexts/LanguageContext";
import { Info } from "lucide-react";

const Map = dynamic(() => import("@/components/Map").then((mod) => mod.Map), {
  ssr: false,
});

export default function MapPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchNotification, setShowSearchNotification] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setShowSearchNotification(true);
      setTimeout(() => {
        setShowSearchNotification(false);
      }, 3000);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] relative">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000]">
        <MapSearchBar onSearch={handleSearch} />
      </div>

      {/* Notification เมื่อค้นหาสถานที่ */}
      {showSearchNotification && (
        <div className="absolute top-20 left-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 z-[1000] flex items-center shadow-md animate-fade-in">
          <Info className="text-blue-500 mr-2 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-700">
            {t("map.showing.accessible.locations.nearby")}
          </p>
        </div>
      )}

      {/* Map Component */}
      <div className="w-full h-full">
        <Map searchQuery={searchQuery} />
      </div>
    </div>
  );
}
