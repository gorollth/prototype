// src/app/carpool/[id]/booking/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { 
  ArrowLeft,
  Car, 
  MapPin, 
  Calendar,
  Clock,
  Accessibility,
  CreditCard
} from 'lucide-react';

const mockRide = {
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookingPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    wheelchairType: '',
    specialRequirements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/carpool/${unwrappedParams.id}/payment`);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-600">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button 
              onClick={() => router.back()} 
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-medium">Booking Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Ride Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="font-medium text-lg">{mockRide.driver}</h2>
              <p className="text-sm text-gray-600">Rating: {mockRide.rating} ⭐</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p>{mockRide.from}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p>{mockRide.to}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>{mockRide.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{mockRide.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              Wheelchair Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wheelchair Type
              </label>
              <select
                value={formData.wheelchairType}
                onChange={(e) => setFormData(prev => ({ ...prev, wheelchairType: e.target.value }))}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="manual">Manual Wheelchair</option>
                <option value="electric">Electric Wheelchair</option>
                <option value="scooter">Mobility Scooter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requirements
              </label>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any specific requirements or notes for the driver..."
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Summary
            </h3>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Ride fare</span>
              <span>{mockRide.price}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Service fee</span>
              <span>$2.00</span>
            </div>
            
            <div className="flex justify-between py-2 font-medium">
              <span>Total</span>
              <span>$17.00</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Continue to Payment'}
          </button>
        </form>
      </div>
    </div>
  );
}