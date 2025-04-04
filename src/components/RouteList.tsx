// src/app/profile/components/RouteList.tsx
import { Clock, MapPin, Star } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface RouteListItemProps {
  title: string;
  distance: string;
  duration: string;
  rating: number;
  date: string;
  thumbnailUrl?: string;
  onClick?: () => void;
}

export function RouteList({
  title,
  distance,
  duration,
  rating,
  date,
  thumbnailUrl,
  onClick,
}: RouteListItemProps) {
  const { t } = useLanguage();

  return (
    <div
      onClick={onClick}
      className="flex items-center p-4 bg-white border-b cursor-pointer hover:bg-gray-50 transition-colors"
      aria-label={t("route.list.item.aria", { title })}
    >
      {thumbnailUrl && (
        <div className="mr-4 flex-shrink-0">
          <img
            src={thumbnailUrl}
            alt={t("route.thumbnail.alt", { title })}
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <div>
          <h3 className="font-medium text-sm mb-2 text-gray-900 line-clamp-1">
            {title}
          </h3>
          <div className="flex flex-col text-xs text-gray-600 gap-1">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="truncate">{distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="truncate">{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>
          <div className="text-gray-500 text-xs mt-1">
            {t("route.recorded.date", { date })}
          </div>
        </div>
      </div>

      <div className="flex items-center text-gray-400 ml-4">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
