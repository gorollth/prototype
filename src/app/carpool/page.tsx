// src/app/carpool/page.tsx
'use client';

import { useState } from 'react';
import { Car, Clock, MapPin, Calendar } from 'lucide-react';

const sampleRides = [
  {
    id: 1,
    driver: 'John Doe',
    from: 'Central Station',
    to: 'Shopping Mall',
    date: '2024-01-22',
    time: '14:00',
    price: '$15',
    seats: 2,
  },
  {
    id: 2,
    driver: 'Sarah Wheeler',
    from: 'City Park',
    to: 'Hospital',
    date: '2024-01-22',
    time: '15:30',
    price: '$12',
    seats: 1,
  },
  // Add more sample rides as needed
];

export default function CarpoolPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'my-rides'>('available');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold">Carpool</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'available'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Available Rides
          </button>
          <button
            onClick={() => setActiveTab('my-rides')}
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'my-rides'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            My Rides
          </button>
        </div>
      </div>

      {/* Rides List */}
      <div className="p-4 space-y-4">
        {sampleRides.map((ride) => (
          <div key={ride.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">{ride.driver}</h3>
                <p className="text-sm text-gray-600">{ride.seats} seats available</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>From: {ride.from}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>To: {ride.to}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{ride.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{ride.time}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="font-medium text-lg">{ride.price}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                Book Ride
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}