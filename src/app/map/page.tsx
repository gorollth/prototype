// src/app/map/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SearchBar } from '@/components/SearchBar';
import { AccessibilityLegend } from '@/components/AccessibilityLegend';

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(
  () => import('@/components/Map').then((mod) => mod.Map),
  { ssr: false }
);

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Handle search functionality
    console.log('Searching for:', query);
  };

  return (
    <div className="h-[calc(100vh-64px)] relative">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000]">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Map Component */}
      <div className="w-full h-full">
        <Map searchQuery={searchQuery} />
      </div>

      {/* Accessibility Legend */}
      <AccessibilityLegend />

      {/* Emergency SOS Button */}
      <button 
        className="fixed bottom-24 right-4 bg-red-600 text-white px-6 py-2 rounded-full shadow-lg z-[1000] hover:bg-red-700 transition-colors"
      >
        SOS
      </button>
    </div>
  );
}