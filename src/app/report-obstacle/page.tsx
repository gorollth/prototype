// src/app/report-obstacle/page.tsx
'use client';

import { useState } from 'react';
import { Camera, ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReportObstaclePage() {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    duration: 'temporary',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, images: selectedImages });
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 flex items-center gap-2 shadow-sm z-10">
        <button onClick={() => router.back()} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">Report Obstacle</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Photos Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium flex items-center gap-2">
              <Camera size={20} />
              Add Photos
            </h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <label className="block">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500">
                <Camera className="mx-auto w-8 h-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to add photos</p>
              </div>
            </label>
          </div>
        </div>

        {/* Obstacle Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium">Obstacle Details</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Obstacle
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select type</option>
                <option value="construction">Construction Work</option>
                <option value="broken_facility">Broken Facility</option>
                <option value="no_ramp">Missing Ramp</option>
                <option value="blocked_path">Blocked Path</option>
                <option value="elevator_issue">Elevator Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="duration"
                    value="temporary"
                    checked={formData.duration === 'temporary'}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="mr-2"
                  />
                  Temporary
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="duration"
                    value="permanent"
                    checked={formData.duration === 'permanent'}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="mr-2"
                  />
                  Permanent
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded-lg"
                rows={4}
                placeholder="Describe the obstacle and how it affects accessibility..."
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}