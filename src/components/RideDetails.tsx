// src/components/RideDetails.tsx
import { Car, Clock, MapPin, Calendar, X } from "lucide-react";
import type { Ride } from "../lib/types/ride";
import { useLanguage } from "../../contexts/LanguageContext";

interface RideDetailsProps {
  ride: Ride;
  onClose: () => void;
}

export function RideDetails({ ride, onClose }: RideDetailsProps) {
  const { t } = useLanguage();

  const handleChatClick = () => {
    window.location.href = `/carpool/${ride.id}/chat`;
  };

  const handleBookClick = () => {
    window.location.href = `/carpool/${ride.id}/booking`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t("carpool.ride.details")}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{ride.driver}</h3>
                <p className="text-sm text-gray-600">
                  Rating: {ride.rating} ⭐
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">
                    {t("carpool.from").replace(":", "")}
                  </p>
                  <p>{ride.from}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">
                    {t("carpool.to").replace(":", "")}
                  </p>
                  <p>{ride.to}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{ride.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{ride.time}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("carpool.vehicle.info")}</h4>
              <p className="text-gray-600">{ride.vehicleType}</p>
              <p className="text-gray-600 mt-1">{ride.description}</p>
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <div>
              <p className="text-sm text-gray-600">
                {t("carpool.price.per.seat")}
              </p>
              <p className="text-xl font-semibold">{ride.price}</p>
            </div>
            <div className="space-x-3">
              <button
                onClick={handleChatClick}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t("carpool.chat.with.driver")}
              </button>
              <button
                onClick={handleBookClick}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("carpool.book.now")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
