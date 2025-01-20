// src/app/components/NavBar.tsx
'use client';

import { Map, MessageSquare, User, Plus, Car } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        <Link href="/map" 
          className={`flex flex-col items-center px-3 py-1 ${
            isActive('/map') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Map size={24} />
          <span className="text-xs mt-1">Map</span>
        </Link>

        <Link href="/carpool"
          className={`flex flex-col items-center px-3 py-1 ${
            isActive('/carpool') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Car size={24} />
          <span className="text-xs mt-1">Carpool</span>
        </Link>

        <div className="relative">
          <button className="bg-blue-600 text-white p-3 rounded-full -mt-8 shadow-lg relative z-10">
            <Plus size={24} />
          </button>
        </div>

        <Link href="/community"
          className={`flex flex-col items-center px-3 py-1 ${
            isActive('/community') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <MessageSquare size={24} />
          <span className="text-xs mt-1">Community</span>
        </Link>

        <Link href="/profile"
          className={`flex flex-col items-center px-3 py-1 ${
            isActive('/profile') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}