// src/app/components/ActionMenu.tsx
'use client';

import { useState } from 'react';
import { Plus, X, Navigation, AlertTriangle, PenSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (action: string) => {
    setIsOpen(false);
    switch(action) {
      case 'obstacle':
        router.push('/report-obstacle');
        break;
      case 'route':
        router.push('/record-route');
        break;
      case 'post':
        router.push('/add-post');
        break;
    }
  };

  return (
    <>
      {/* Main button */}
      <div className="relative pointer-events-auto">
        <button 
          onClick={toggleMenu}
          className={`bg-blue-600 text-white p-3 rounded-full shadow-lg transition-transform duration-200 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </button>

        {/* Menu items */}
        {isOpen && (
          <div 
            className="absolute bottom-16 -left-20 flex flex-col gap-2 items-center w-64 animate-fade-in"
            style={{ zIndex: 1002 }}
          >
            <button
              onClick={() => handleAction('post')}
              className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-purple-50 transition-colors"
            >
              <PenSquare size={20} />
              <span>Add Post</span>
            </button>

            <button
              onClick={() => handleAction('route')}
              className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <Navigation size={20} />
              <span>Record Route</span>
            </button>

            <button
              onClick={() => handleAction('obstacle')}
              className="w-full bg-white text-red-600 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-red-50 transition-colors"
            >
              <AlertTriangle size={20} />
              <span>Report Obstacle</span>
            </button>
          </div>
        )}

        {/* Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20"
            style={{ zIndex: 1001, marginBottom: '64px' }}
            onClick={toggleMenu}
          />
        )}
      </div>
    </>
  );
}