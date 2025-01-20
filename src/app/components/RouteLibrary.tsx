// src/app/profile/components/RouteLibrary.tsx
'use client';

import { useState } from 'react';

import {RouteCard } from '../components/RouteCard'

const tabs = ['All Routes', 'Recorded', 'Saved'] as const;
type TabType = typeof tabs[number];

interface Route {
  id: number;
  title: string;
  distance: string;
  duration: string;
  rating: number;
  date: string;
  type: 'recorded' | 'saved';
}

const sampleRoutes: Route[] = [
  {
    id: 1,
    title: 'City Center to Park',
    distance: '2.5 km',
    duration: '30 min',
    rating: 4.5,
    date: '2024-01-15',
    type: 'recorded'
  },
  {
    id: 2,
    title: 'Shopping Mall Route',
    distance: '1.8 km',
    duration: '20 min',
    rating: 4.8,
    date: '2024-01-10',
    type: 'saved'
  },
  {
    id: 3,
    title: 'Waterfront Path',
    distance: '3.2 km',
    duration: '40 min',
    rating: 4.2,
    date: '2024-01-05',
    type: 'recorded'
  },
  {
    id: 4,
    title: 'Museum District Tour',
    distance: '2.1 km',
    duration: '25 min',
    rating: 4.6,
    date: '2024-01-01',
    type: 'saved'
  },
];

export function RouteLibrary() {
  const [selectedTab, setSelectedTab] = useState<TabType>('All Routes');

  const filteredRoutes = sampleRoutes.filter(route => {
    if (selectedTab === 'All Routes') return true;
    return route.type.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap
              ${selectedTab === tab 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filteredRoutes.map(route => (
          <RouteCard
            key={route.id}
            title={route.title}
            distance={route.distance}
            duration={route.duration}
            rating={route.rating}
            date={route.date}
          />
        ))}
      </div>
    </div>
  );
}