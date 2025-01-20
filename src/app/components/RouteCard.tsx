// src/app/profile/components/RouteCard.tsx
import { Clock, MapPin, Star } from 'lucide-react';

interface RouteCardProps {
  title: string;
  distance: string;
  duration: string;
  rating: number;
  date: string;
  thumbnailUrl?: string;
}

export function RouteCard({ title, distance, duration, rating, date, thumbnailUrl }: RouteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-gray-100 relative">
        <img
          src={thumbnailUrl || "/api/placeholder/400/300"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Recorded: {date}
        </div>
      </div>
    </div>
  );
}