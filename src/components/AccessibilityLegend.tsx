// Path: src/app/map/components/AccessibilityLegend.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

export function AccessibilityLegend() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute left-0 bottom-38 z-[1000]">
      {/* Vertical Label - visible when collapsed */}
      <div
        className={`
          bg-blue-600 text-white px-2 py-3
          transform transition-opacity duration-300 flex items-center gap-2
          cursor-pointer shadow-md
          ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
          rounded-r-md
        `}
        onClick={() => setIsExpanded(true)}
      >
        <span className="text-sm font-medium">Accessibility</span>
        <ChevronRight className="w-4 h-4" />
      </div>

      {/* Legend Content */}
      <div
        className={`
          absolute left-0 top-0
          bg-white shadow-lg overflow-hidden
          transition-all duration-300 ease-in-out
          ${
            isExpanded
              ? "w-auto opacity-100 translate-x-0 rounded-r-lg"
              : "w-0 opacity-0 -translate-x-full pointer-events-none"
          }
        `}
      >
        <div className="p-3 pr-8 text-sm text-gray-600 whitespace-nowrap">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <h3 className="font-medium">Accessibility</h3>
            </div>
            {/* Close button inside the legend box */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Hide accessibility legend"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
