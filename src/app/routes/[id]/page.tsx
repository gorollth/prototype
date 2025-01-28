'use client';

import { ArrowLeft, MapPin, Clock, Calendar, Star, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Sample routes data with accessibility levels
const sampleRoutes = [
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
  }
];

export default function RouteDetailsPage() {
  const [route, setRoute] = useState<(typeof sampleRoutes)[0] | null>(null);

  useEffect(() => {
    // Get the route ID from the URL
    const routeId = window.location.pathname.split('/').pop();
    // Find the route data
    const foundRoute = sampleRoutes.find(r => r.id === Number(routeId));
    if (foundRoute) {
      setRoute(foundRoute);
    }
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const handleShowRoute = () => {
    if (route) {
      const pathData = encodeURIComponent(JSON.stringify(route.path));
      window.location.href = `/map?route=${route.id}&path=${pathData}`;
    }
  };

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Rest of your JSX remains the same */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-medium">Route Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Route Preview Image */}
        <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
          <img
            src="/api/placeholder/800/400"
            alt="Route preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4 mb-4">
          <h2 className="text-xl font-semibold">{route.title}</h2>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{route.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{route.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{route.rating}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">From</span>
                <p>{route.from}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">To</span>
                <p>{route.to}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Recorded Date</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{route.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4 mb-6">
          <h3 className="font-medium">Accessibility Information</h3>
          <p className="text-sm text-gray-600">{route.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {route.features.map((feature, index) => (
              <span 
                key={index}
                className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleShowRoute}
          className="w-full bg-blue-600 text-white p-4 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <Navigation className="w-5 h-5" />
          Show Route
        </button>
      </div>
    </div>
  );
}