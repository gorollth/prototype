// src/components/RouteCard.tsx
import { MapPin, Star, Clock } from "lucide-react";
import { Route } from "@/data/routes";
import Link from "next/link";

interface RouteCardProps {
  route: Route;
  compact?: boolean;
}

export default function RouteCard({ route, compact = false }: RouteCardProps) {
  // เมื่อมีเฉพาะระดับการเข้าถึง 'High' เราจะแสดงสีเขียวเสมอ
  const accessibilityColor = "bg-green-100 text-green-800";

  if (compact) {
    return (
      <Link href={`/routes/${route.id}`}>
        <div className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 text-sm">{route.title}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${accessibilityColor}`}
            >
              เข้าถึงง่าย
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{route.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{route.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/routes/${route.id}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-900">{route.title}</h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${accessibilityColor}`}
          >
            เข้าถึงง่าย
          </span>
        </div>

        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{route.distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{route.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{route.rating}</span>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <p>
            จาก {route.from} ไปยัง {route.to}
          </p>
        </div>
      </div>
    </Link>
  );
}
