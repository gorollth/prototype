"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Route as RouteIcon,
  Star,
  Calendar,
  CheckCircle,
  Trash2,
  User,
  List,
} from "lucide-react";
import Link from "next/link";
import { sampleRoutes, Route } from "@/data/routes";

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
          <h1 className="text-2xl font-bold text-gray-800">{route.title}</h1>
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
        {/* รายละเอียดเส้นทาง */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">ข้อมูลเส้นทาง</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">จุดเริ่มต้น - ปลายทาง</p>
                  <p className="font-medium">
                    {route.from} - {route.to}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <RouteIcon className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">ระยะทาง</p>
                    <p className="font-medium">{route.distance}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">เวลาเดินทาง</p>
                    <p className="font-medium">{route.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Star className="text-yellow-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">คะแนน</p>
                    <p className="font-medium">{route.rating}/5.0</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">วันที่บันทึก</p>
                  <p className="font-medium">{route.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">ระดับการเข้าถึง</p>
                  <p className="font-medium">{route.accessibility}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="text-purple-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">ผู้ใช้</p>
                  <p className="font-medium">ไม่ระบุ</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <List className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">ประเภท</p>
                  <p className="font-medium">
                    {route.type === "saved" ? "บันทึก" : "ล่าสุด"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">รายละเอียด</h2>
            <p className="text-gray-700">{route.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">คุณสมบัติเส้นทาง</h2>
            <div className="flex flex-wrap gap-2">
              {route.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* แผนที่ */}
        <div className="bg-white rounded-lg shadow p-6 h-96">
          <h2 className="text-lg font-semibold mb-4">แผนที่เส้นทาง</h2>
          <div className="bg-gray-200 rounded-md h-64 flex items-center justify-center text-gray-500">
            แผนที่จะแสดงตรงนี้
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              จุดเริ่มต้น: {route.path[0][0]}, {route.path[0][1]}
            </p>
            <p>
              จุดสิ้นสุด: {route.path[route.path.length - 1][0]},{" "}
              {route.path[route.path.length - 1][1]}
            </p>
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
              คุณต้องการลบเส้นทาง &quot;{route.title}&quot; ใช่หรือไม่?
              การกระทำนี้ไม่สามารถย้อนกลับได้
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
