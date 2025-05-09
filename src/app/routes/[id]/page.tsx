// src/app/routes/[id]/page.tsx
"use client";

import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Star,
  Navigation,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Route, getRouteById } from "@/data/routes";
import { use } from "react";

interface RoutePageProps {
  params: Promise<{ id: string }>;
}

export default function RouteDetailsPage({ params }: RoutePageProps) {
  const unwrappedParams = use(params);
  const [route, setRoute] = useState<Route | null>(null);
  const router = useRouter();

  useEffect(() => {
    const routeId = parseInt(unwrappedParams.id);
    const foundRoute = getRouteById(routeId);
    if (foundRoute) {
      setRoute(foundRoute);
    }
  }, [unwrappedParams.id]);

  const handleBack = () => {
    router.back();
  };

  const handleShowRoute = () => {
    if (route) {
      const pathData = encodeURIComponent(JSON.stringify(route.path));
      router.push(`/map?route=${route.id}&path=${pathData}`);
    }
  };

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-medium">รายละเอียดเส้นทาง</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Route Preview Image */}
        <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
          <img
            src="/api/placeholder/800/400"
            alt="Route preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4 mb-4">
          <h2 className="text-xl font-semibold">{route.title}</h2>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{route.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{route.duration}</span>
            </div>
            {/* <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{route.rating}</span>
            </div> */}
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">จากที่</span>
                <p>{route.from}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">ไปที่</span>
                <p>{route.to}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">วันที่บันทึก</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{route.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4 mb-6 text-gray-600">
          <h3 className="font-medium">Note</h3>

          {/* แสดงป้ายการเข้าถึงสีเขียว */}
          {/* <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              เข้าถึงง่าย
            </span>
          </div> */}

          <p className="text-sm text-gray-600">{route.description}</p>

          {/* <div className="flex flex-wrap gap-2">
            {route.features.map((feature, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div> */}
        </div>

        {/* Action Button */}
        <button
          onClick={handleShowRoute}
          className="w-full bg-blue-600 text-white p-4 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <Navigation className="w-5 h-5" />
          แสดงเส้นทางบนแผนที่
        </button>
      </div>
    </div>
  );
}
