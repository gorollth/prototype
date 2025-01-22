// src/app/components/NavBar.tsx
'use client';

import { Map, Car, MessageSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ActionMenu from './ActionMenu';

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    // Increased z-index to ensure it's above other content
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200" style={{ zIndex: 1000 }}>
      <div className="flex justify-around items-center py-2 relative">
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

        {/* Action Menu container with higher z-index */}
        <div className="relative -mt-8" style={{ zIndex: 1001 }}>
          <ActionMenu />
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