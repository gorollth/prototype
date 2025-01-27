// src/app/profile/components/WheelchairInfo.tsx
'use client';

import { useState } from 'react';
import { ChevronRight, Edit2 } from 'lucide-react';

interface WheelchairDetails {
  type: string;
  width: string;
  length: string;
  weight: string;
  additionalNeeds: string[];
}

export function WheelchairInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [wheelchairInfo, setWheelchairInfo] = useState<WheelchairDetails>({
    type: 'Manual Wheelchair',
    width: '65',
    length: '107',
    weight: '15',
    additionalNeeds: ['Ramp Access', 'Wide Doorways']
  });

  const wheelchairTypes = [
    'Manual Wheelchair',
    'Power Wheelchair',
    'Transport Wheelchair',
    'Sports Wheelchair',
    'Other'
  ];

  const additionalNeedOptions = [
    'Ramp Access',
    'Wide Doorways',
    'Elevator Access',
    'Even Surfaces',
    'Assistance Required',
    'Storage Space'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const toggleNeed = (need: string) => {
    setWheelchairInfo(prev => ({
      ...prev,
      additionalNeeds: prev.additionalNeeds.includes(need)
        ? prev.additionalNeeds.filter(n => n !== need)
        : [...prev.additionalNeeds, need]
    }));
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium">Wheelchair Information</h2>
          <button 
            onClick={() => setIsEditing(false)}
            className="text-blue-600 text-sm"
          >
            Cancel
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Wheelchair Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wheelchair Type
            </label>
            <select
              value={wheelchairInfo.type}
              onChange={(e) => setWheelchairInfo(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            >
              {wheelchairTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width (cm)
              </label>
              <input
                type="number"
                value={wheelchairInfo.width}
                onChange={(e) => setWheelchairInfo(prev => ({ ...prev, width: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Length (cm)
              </label>
              <input
                type="number"
                value={wheelchairInfo.length}
                onChange={(e) => setWheelchairInfo(prev => ({ ...prev, length: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={wheelchairInfo.weight}
                onChange={(e) => setWheelchairInfo(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Additional Needs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Needs
            </label>
            <div className="flex flex-wrap gap-2">
              {additionalNeedOptions.map(need => (
                <button
                  key={need}
                  type="button"
                  onClick={() => toggleNeed(need)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    wheelchairInfo.additionalNeeds.includes(need)
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {need}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-medium">Wheelchair Information</h2>
        <button 
          onClick={() => setIsEditing(true)}
          className="text-blue-600"
        >
          <Edit2 size={18} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm">Type</p>
            <p className="font-medium">{wheelchairInfo.type}</p>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Width</p>
            <p className="font-medium">{wheelchairInfo.width} cm</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Length</p>
            <p className="font-medium">{wheelchairInfo.length} cm</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Weight</p>
            <p className="font-medium">{wheelchairInfo.weight} kg</p>
          </div>
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-2">Additional Needs</p>
          <div className="flex flex-wrap gap-2">
            {wheelchairInfo.additionalNeeds.map(need => (
              <span
                key={need}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                {need}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}