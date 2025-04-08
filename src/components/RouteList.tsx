// src/components/RoutesList.tsx
import { useState } from "react";
import { Route } from "@/data/routes";
import { MapPin, Clock, Star, ChevronRight } from "lucide-react";
import Link from "next/link";

interface RoutesListProps {
  routes: Route[];
  showEmptyMessage?: string;
}

export default function RoutesList({
  routes,
  showEmptyMessage = "ไม่พบเส้นทาง",
}: RoutesListProps) {
  const getAccessibilityColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (routes.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">{showEmptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {routes.map((route) => (
        <Link href={`/routes/${route.id}`} key={route.id}>
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-900">{route.title}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${getAccessibilityColor(
                  route.accessibility
                )}`}
              >
                {route.accessibility === "High"
                  ? "เข้าถึงง่าย"
                  : route.accessibility === "Medium"
                  ? "เข้าถึงปานกลาง"
                  : "เข้าถึงยาก"}
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

            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-wrap gap-1">
                {route.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {route.features.length > 2 && (
                  <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 rounded-full">
                    +{route.features.length - 2}
                  </span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
