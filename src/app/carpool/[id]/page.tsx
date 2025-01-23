'use client';

import { useEffect, useState } from 'react';
import { Car, Clock, MapPin, Calendar, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Ride } from '@/app/lib/types/ride'

const mockRide: Ride = {
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
};

export default function RideDetailPage({ params }: { params: { id: string } }) {
  const [ride, setRide] = useState<Ride | null>(null);
  const router = useRouter();

  useEffect(() => {
    // In a real app, fetch ride data from API
    setRide(mockRide);
  }, [params.id]);

  if (!ride) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Ride Details</h1>
      </div>

      {/* Content */}
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{ride.driver}</h3>
              <p className="text-sm text-gray-600">Rating: {ride.rating} ⭐</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p>{ride.from}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p>{ride.to}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>{ride.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{ride.time}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Vehicle Information</h4>
            <p className="text-gray-600">{ride.vehicleType}</p>
            <p className="text-gray-600 mt-1">{ride.description}</p>
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <div>
              <p className="text-sm text-gray-600">Price per seat</p>
              <p className="text-xl font-semibold">{ride.price}</p>
            </div>
            <div className="space-x-3">
              <button 
                onClick={() => router.push(`/carpool/${ride.id}/chat`)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
              >
                Chat with Driver
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}