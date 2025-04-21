"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Route as RouteIcon,
  User,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { sampleRoutes, Route } from "@/data/routes";
import dynamic from "next/dynamic";

// ทำการ dynamic import ของ MapComponent เพื่อหลีกเลี่ยงปัญหา SSR
const RouteMapComponent = dynamic(
  () => import("@/components/admin/RouteOnMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] bg-gray-100 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">กำลังโหลดแผนที่...</p>
      </div>
    ),
  }
);

export default function RouteDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const routeId = params.id as string;

  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลเส้นทาง
    const fetchRoute = () => {
      setTimeout(() => {
        const foundRoute = sampleRoutes.find((r) => r.id === Number(routeId));
        setRoute(foundRoute || null);
        setLoading(false);
      }, 500);
    };

    fetchRoute();
  }, [routeId]);

  const handleDelete = () => {
    // จำลองการส่ง API request เพื่อลบเส้นทาง
    console.log("Deleting route:", routeId);

    // Redirect กลับไปยังหน้ารายการเส้นทาง
    router.push("/admin/routes");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ไม่พบข้อมูลเส้นทาง
        </h2>
        <p className="text-gray-600 mb-6">ไม่พบเส้นทาง ID: {routeId}</p>
        <Link
          href="/admin/routes"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          กลับไปยังรายการเส้นทาง
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/routes" className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            รายละเอียดเส้นทาง
          </h1>
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
        >
          <Trash2 size={18} />
          <span>ลบเส้นทาง</span>
        </button>
      </div>

      {/* เนื้อหาหลัก */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ข้อมูลเส้นทาง */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">จุดเริ่มต้น</p>
                  <p className="font-medium text-xl">{route.from}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">ปลายทาง</p>
                  <p className="font-medium text-xl">{route.to}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <RouteIcon className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">ระยะทาง</p>
                  <p className="font-medium text-lg">{route.distance}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="text-purple-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">ผู้ใช้</p>
                  <p className="font-medium text-lg">ไม่ระบุผู้ใช้</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* แผนที่ */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">แผนที่เส้นทาง</h2>
          <div className="h-[400px] w-full">
            {route && (
              <RouteMapComponent
                path={route.path}
                from={route.from}
                to={route.to}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal ยืนยันการลบ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบเส้นทาง
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบเส้นทางจาก &quot;{route.from}&quot; ไป &quot;
              {route.to}&quot; ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
