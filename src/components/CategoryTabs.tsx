// src/app/community/components/CategoryTabs.tsx
'use client';

import { useState } from 'react';

const categories = [
  'All',
  'Routes',
  'Places',
  'Tips',
  'Stories',
];

export function CategoryTabs({ onSelect }: { onSelect: (category: string) => void }) {
  const [selected, setSelected] = useState('All');

  const handleSelect = (category: string) => {
    setSelected(category);
    onSelect(category);
  };

  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-4 bg-white sticky top-0 z-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap
            ${selected === category 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}