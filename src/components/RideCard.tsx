// src/components/RideCard.tsx
import { Car, Clock, MapPin, Calendar } from "lucide-react";
import type { Ride } from "../lib/types/ride";
import { useLanguage } from "../../contexts/LanguageContext";

interface RideCardProps {
  ride: Ride;
  onClick: () => void;
}

export function RideCard({ ride, onClick }: RideCardProps) {
  const { t } = useLanguage();

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <Car className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium">{ride.driver}</h3>
          <p className="text-sm text-gray-600">{ride.seats} seats available</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>
            {t("carpool.from")} {ride.from}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>
            {t("carpool.to")} {ride.to}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{ride.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{ride.time}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="font-medium text-lg">{ride.price}</span>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {t("carpool.more.info")}
        </button>
      </div>
    </div>
  );
}
