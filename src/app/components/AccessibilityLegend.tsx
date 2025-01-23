// src/app/map/components/AccessibilityLegend.tsx
'use client';

export function AccessibilityLegend() {
  return (
    // Updated bottom position to account for navigation bar
    <div className="absolute left-4 bottom-24 bg-white rounded-lg shadow-lg p-3 text-sm z-[1000] text-gray-600">
      <h3 className="font-medium mb-2">Accessibility</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span>Fully Accessible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <span>Partially Accessible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span>Limited Access</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-400" />
          <span>Not Verified</span>
        </div>
      </div>
    </div>
  );
}