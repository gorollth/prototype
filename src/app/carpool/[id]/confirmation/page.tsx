// src/app/carpool/[id]/confirmation/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { use } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ConfirmationPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-2xl font-semibold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your ride has been successfully booked. The driver will be notified of your booking.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => router.push(`/carpool/${unwrappedParams.id}/chat`)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              <MessageSquare className="w-5 h-5" />
              Chat with Driver
            </button>

            <button
              onClick={() => router.push('/carpool')}
              className="w-full py-3 text-blue-600 font-medium hover:bg-blue-50 rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}