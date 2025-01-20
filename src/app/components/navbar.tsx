// src/app/components/navbar.tsx
'use client';

import { Map, Navigation, MessageSquare, User, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        <Link href="/map" 
          className={`flex flex-col items-center px-3 py-1 ${
            isActive('/map') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Map size={24} />
          <span className="text-xs mt-1">Map</span>
        </Link>

        <Link href="/community"
          className={`flex flex-col items-center px-3 py-1 ${
            isActive('/community') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <MessageSquare size={24} />
          <span className="text-xs mt-1">Community</span>
        </Link>

        <button className="bg-blue-600 text-white p-3 rounded-full -mt-6 shadow-lg">
          <Plus size={24} />
        </button>

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