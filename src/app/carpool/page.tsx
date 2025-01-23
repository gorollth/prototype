'use client';

import { RideCard } from '../components/RideCard';
import { RideDetails } from '../components/RideDetails';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import type { Ride } from '../lib/types/ride';

const sampleRides: Ride[] = [
  {
    id: 1,
    driver: 'John Doe',
    from: 'Central Station',
    to: 'Shopping Mall',
    date: '2024-01-22',
    time: '14:00',
    price: '$15',
    seats: 2,
    vehicleType: 'SUV with wheelchair ramp',
    description: 'Regular route, experienced with wheelchair assistance',
    rating: 4.8,
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
    vehicleType: 'Van with hydraulic lift',
    description: 'Certified in passenger assistance',
    rating: 4.9,
  }
];

export default function CarpoolPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'my-rides'>('available');
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-600">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-600">Carpool</h1>
          <button 
            onClick={() => router.push('/chats')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MessageSquare className="w-6 h-6 text-gray-600" />
          </button>
        </div>
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

      <div className="p-4 space-y-4">
        {sampleRides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            onClick={() => setSelectedRide(ride)}
          />
        ))}
      </div>

      {selectedRide && (
        <RideDetails
          ride={selectedRide}
          onClose={() => setSelectedRide(null)}
        />
      )}
    </div>
  );
}