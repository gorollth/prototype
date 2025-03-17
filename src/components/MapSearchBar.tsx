// src/components/MapSearchBar.tsx
"use client";

import { Search, X, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { locationService } from "@/services/locationService";
import { Location } from "@/lib/types/location";

interface MapSearchBarProps {
  onSearch: (query: string) => void;
  onSelectLocation?: (location: Location) => void;
}

export function MapSearchBar({
  onSearch,
  onSelectLocation,
}: MapSearchBarProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // ค้นหาสถานที่แบบ realtime เมื่อพิมพ์คำค้นหา
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  // จัดการการคลิกภายนอกเพื่อซ่อนคำแนะนำ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await locationService.searchLocations(searchQuery);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (location: Location) => {
    setQuery(location.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(location.name);

    if (onSelectLocation) {
      onSelectLocation(location);
    }
  };

  return (
    <div className="w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(suggestions.length > 0)}
          placeholder={t("map.search.accessible.places")}
          className="w-full pl-10 pr-10 py-3 bg-white rounded-lg shadow-md border-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <X size={20} />
          </button>
        )}
      </form>

      {/* คำแนะนำการค้นหา */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          <ul className="py-1">
            {suggestions.map((location) => (
              <li
                key={location.id}
                onClick={() => handleSuggestionClick(location)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              >
                <MapPin size={16} className="text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">{location.name}</p>
                  <p className="text-xs text-gray-600">{location.category}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* กำลังโหลด */}
      {loading && (
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}
