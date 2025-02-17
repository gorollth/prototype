// src/components/SlideUpPanel.tsx

"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface SlideUpPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function SlideUpPanel({ isOpen, onClose, children }: SlideUpPanelProps) {
  // Prevent body scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0" style={{ zIndex: 9999 }}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />

      {/* Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-in-out max-h-[85vh] overflow-y-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="sticky top-0 bg-white rounded-t-2xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />
          <button
            onClick={onClose}
            className="absolute right-4 top-2 p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="px-4 pb-6">{children}</div>
      </div>
    </div>
  );
}
