// src/app/review/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { accessibleLocations } from '@/data/locations';

interface ReviewFormData {
  rating: number;
  comment: string;
  accessibility: {
    parking?: number;
    elevator?: number;
    restroom?: number;
    entrance?: number;
    pathway?: number;
    assistance?: number;
  };
}

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const [location, setLocation] = useState(accessibleLocations[0]);
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    comment: '',
    accessibility: {}
  });

  useEffect(() => {
    const found = accessibleLocations.find(loc => loc.id === Number(unwrappedParams.id));
    if (found) setLocation(found);
  }, [unwrappedParams.id]);

  // Rest of the component remains the same
  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', formData);
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-600">
      {/* Rest of your JSX remains exactly the same */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-medium">Write a Review</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Location Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h2 className="text-xl font-semibold">{location.name}</h2>
          <p className="text-gray-600">{location.category}</p>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-4">Overall Rating</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className={`p-1 ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Ratings */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-4">Accessibility Ratings</h3>
            <div className="space-y-4">
              {Object.entries(location.accessibilityScores).map(([key, score]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {score.name}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.accessibility[key as keyof typeof formData.accessibility] || 5}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      accessibility: {
                        ...prev.accessibility,
                        [key]: Number(e.target.value)
                      }
                    }))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-4">Your Review</h3>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              rows={4}
              placeholder="Share your experience..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}