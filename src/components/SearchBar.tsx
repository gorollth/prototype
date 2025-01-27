//src/app/community/components/SearchBar.tsx
'use client';

import { Search, X, Filter } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="bg-white p-4 sticky top-0 z-20 shadow-sm">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search routes, places, or users..."
            className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-lg border ${
            showFilters 
              ? 'border-blue-500 text-blue-500' 
              : 'border-gray-300 text-gray-600'
          }`}
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-sm mb-2">Sort by</h3>
            <div className="flex gap-2 flex-wrap">
              {['Most Recent', 'Most Liked', 'Most Comments'].map((option) => (
                <button
                  key={option}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-2">Accessibility Features</h3>
            <div className="flex gap-2 flex-wrap">
              {[
                'Ramps',
                'Elevators',
                'Wide Paths',
                'Even Surfaces',
                'Parking'
              ].map((feature) => (
                <button
                  key={feature}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Suggestions - Show when typing */}
      {query && !showFilters && (
        <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {['Recent Searches', 'Popular'].map((section, index) => (
            <div key={section} className={index > 0 ? 'border-t' : ''}>
              <div className="p-2 bg-gray-50">
                <span className="text-xs font-medium text-gray-500">{section}</span>
              </div>
              <div className="p-2 space-y-1">
                {[1, 2, 3].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 text-sm"
                    onClick={() => setQuery(`${section} Item ${item}`)}
                  >
                    {`${section} Item ${item}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}