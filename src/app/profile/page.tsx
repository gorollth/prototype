// src/app/profile/page.tsx
import { WheelchairInfo } from '../components/WheelchairInfo';
import { Settings, Edit2 } from 'lucide-react';
import { RouteLibrary } from '../components/RouteLibrary';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
            <img
              src="/api/placeholder/200/200"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Sarah Wheeler</h2>
            <p className="text-gray-600 text-sm">Active Explorer</p>
            <div className="flex gap-4 mt-2">
              <div>
                <span className="text-sm font-semibold">15</span>
                <span className="text-xs text-gray-600 ml-1">Routes</span>
              </div>
              <div>
                <span className="text-sm font-semibold">243</span>
                <span className="text-xs text-gray-600 ml-1">Following</span>
              </div>
              <div>
                <span className="text-sm font-semibold">512</span>
                <span className="text-xs text-gray-600 ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-full">
            <Edit2 size={16} />
            Edit Profile
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Wheelchair Information */}
        <WheelchairInfo />

        {/* Route Library */}
        <RouteLibrary />
      </div>
    </div>
  );
}