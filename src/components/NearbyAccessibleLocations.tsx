// src/components/NearbyAccessibleLocations.tsx
"use client";

import { useState, useEffect } from "react";
import { locationService } from "@/services/locationService";
import { Location } from "@/lib/types/location";
import {
  Accessibility,
  MapPin,
  AlertCircle,
  Navigation,
  X,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface NearbyAccessibleLocationsProps {
  searchPosition: [number, number];
  onSelect: (location: Location) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function NearbyAccessibleLocations({
  searchPosition,
  onSelect,
  onClose,
  isOpen,
}: NearbyAccessibleLocationsProps) {
  const { t } = useLanguage();
  const [locations, setLocations] = useState<
    (Location & { distance: number })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchNearbyLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        // ดึงสถานที่ที่เข้าถึงได้ภายในรัศมี 3 กิโลเมตร
        const nearby = await locationService.findNearbyAccessibleLocations(
          searchPosition,
          3 // รัศมี 3 กิโลเมตร
        );
        setLocations(nearby);
      } catch (err) {
        console.error("Failed to fetch nearby locations:", err);
        setError(t("map.error.fetch.locations"));
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyLocations();
  }, [searchPosition, isOpen, t]);

  if (!isOpen) return null;

  return (
    <div className="absolute left-4 right-4 top-20 bg-white rounded-lg shadow-lg z-[1001] max-h-[60vh] overflow-hidden flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-medium text-gray-900 flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-blue-600" />
          <span>{t("map.nearby.accessible.locations")}</span>
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={t("common.close")}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="overflow-y-auto flex-grow">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>{t("common.loading")}</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-500">{error}</p>
          </div>
        ) : locations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p>{t("map.no.accessible.locations.nearby")}</p>
          </div>
        ) : (
          <ul className="divide-y">
            {locations.map((location) => (
              <li key={location.id} className="hover:bg-gray-50">
                <button
                  onClick={() => onSelect(location)}
                  className="w-full p-4 text-left flex items-start gap-3"
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                      location.accessibility === "high"
                        ? "bg-green-500"
                        : location.accessibility === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(
                        `location.category.${location.category
                          .replace(/\s+/g, "")
                          .toLowerCase()}`
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {location.distance.toFixed(1)} {t("common.km")}{" "}
                      {t("common.away")}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {location.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {location.features.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-full text-xs">
                          +{location.features.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  <Navigation className="w-5 h-5 text-blue-600 flex-shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
