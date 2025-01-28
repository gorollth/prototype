'use client';

import { useState } from 'react';
import { RouteCard } from './RouteCard';

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
  thumbnailUrl?: string;
  path: [number, number][];
  from: string;
  to: string;
  description: string;
  accessibility: string;
  features: string[];
}

const sampleRoutes: Route[] = [
  {
    id: 1,
    title: 'City Center to Park',
    distance: '2.5 km',
    duration: '30 min',
    rating: 4.5,
    date: '2024-01-15',
    type: 'saved',
    from: 'Central Station',
    to: 'Lumphini Park',
    description: 'Wheelchair-friendly route with smooth pavements and ramps',
    accessibility: 'High',
    features: ['Ramps available', 'Smooth pavement', 'No stairs', 'Well-lit path'],
    path: [
      [13.7563, 100.5018], 
      [13.7584, 100.5097],
      [13.7599, 100.5142]
    ]
  },
  {
    id: 2,
    title: 'Siam to Central World',
    distance: '1.8 km',
    duration: '20 min',
    rating: 4.8,
    date: '2024-01-10',
    type: 'saved',
    from: 'BTS Siam',
    to: 'Central World',
    description: 'Indoor route via skywalk system with elevators at all points',
    accessibility: 'High',
    features: ['Covered walkway', 'Elevators', 'Air-conditioned', 'Security guards'],
    path: [
      [13.7466, 100.5347],
      [13.7470, 100.5385],
      [13.7466, 100.5393]
    ]
  },
  {
    id: 3,
    title: 'MBK to National Stadium',
    distance: '1.2 km',
    duration: '15 min',
    rating: 4.6,
    date: '2024-01-08',
    type: 'saved',
    from: 'MBK Center',
    to: 'National Stadium',
    description: 'Convenient route through covered walkways with ramps',
    accessibility: 'High',
    features: ['Covered walkway', 'Ramps', 'Smooth surface', 'Rest areas'],
    path: [
      [13.7457, 100.5331],
      [13.7442, 100.5314],
      [13.7431, 100.5302]
    ]
  },
  {
    id: 4,
    title: 'Platinum to Pratunam',
    distance: '0.8 km',
    duration: '10 min',
    rating: 4.3,
    date: '2024-01-05',
    type: 'saved',
    from: 'Platinum Fashion Mall',
    to: 'Pratunam Market',
    description: 'Short route with accessible pathways',
    accessibility: 'Medium',
    features: ['Partial cover', 'Some ramps', 'Shopping areas', 'Food courts'],
    path: [
      [13.7525, 100.5398],
      [13.7531, 100.5402],
      [13.7537, 100.5407]
    ]
  },
  {
    id: 5,
    title: 'Central Embassy Route',
    distance: '1.5 km',
    duration: '18 min',
    rating: 4.7,
    date: '2024-01-03',
    type: 'saved',
    from: 'BTS Phloen Chit',
    to: 'Central Embassy',
    description: 'Premium shopping route with full accessibility',
    accessibility: 'High',
    features: ['Full elevator access', 'Wide paths', 'Air-conditioned', 'Premium facilities'],
    path: [
      [13.7443, 100.5466],
      [13.7448, 100.5470],
      [13.7453, 100.5475]
    ]
  },
  {
    id: 6,
    title: 'Terminal 21 to Asok',
    distance: '0.6 km',
    duration: '8 min',
    rating: 4.9,
    date: '2024-01-01',
    type: 'saved',
    from: 'Terminal 21',
    to: 'BTS Asok',
    description: 'Short, fully accessible route with modern facilities',
    accessibility: 'High',
    features: ['Modern elevators', 'Direct access', 'Security', 'Shopping access'],
    path: [
      [13.7373, 100.5602],
      [13.7378, 100.5605],
      [13.7382, 100.5608]
    ]
  }
];

export function RouteLibrary() {
  const [selectedTab, setSelectedTab] = useState<TabType>('All Routes');

  const handleRouteClick = (route: Route) => {
    // Navigate to route details page
    window.location.href = `/routes/${route.id}`;
  };

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
            thumbnailUrl={route.thumbnailUrl}
            onClick={() => handleRouteClick(route)}
          />
        ))}
      </div>
    </div>
  );
}