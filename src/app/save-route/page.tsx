// src/app/save-route/page.tsx
"use client";

import { ArrowLeft, Save, MapPin, Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import dynamic from "next/dynamic";

// ใช้ dynamic import เพื่อให้แผนที่ทำงานเฉพาะฝั่ง client
const RoutePreviewMap = dynamic(
  () => import("../../components/RoutePreviewMap"),
  { ssr: false }
);

// สร้าง interface สำหรับข้อมูลเส้นทางที่บันทึก
interface RecordedRouteData {
  path: [number, number][];
  startTime: number;
  endTime: number;
  distance: number;
}

// สร้าง interface สำหรับข้อมูลเส้นทางที่จะบันทึก
interface RouteFormData {
  title: string;
  description: string;
  from: string;
  to: string;
  isPublic: boolean;
}

export default function SaveRoutePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [routeData, setRouteData] = useState<RecordedRouteData | null>(null);
  const [formData, setFormData] = useState<RouteFormData>({
    title: "",
    description: "",
    from: "",
    to: "",
    isPublic: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // อ่านข้อมูลเส้นทางที่บันทึกไว้ใน localStorage
    if (typeof window !== "undefined") {
      const savedRouteData = localStorage.getItem("recordedRouteData");
      if (savedRouteData) {
        try {
          const parsedData = JSON.parse(savedRouteData) as RecordedRouteData;
          setRouteData(parsedData);
        } catch (error) {
          console.error("Error parsing route data:", error);
        }
      }
      setLoading(false);
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!routeData) return;

    setSaving(true);

    try {
      // จำลองการบันทึกข้อมูลไปยังเซิร์ฟเวอร์
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ในโปรเจ็กต์จริงควรส่งข้อมูลไปยัง API
      console.log("Saving route:", {
        ...formData,
        path: routeData.path,
        distance: routeData.distance,
        startTime: routeData.startTime,
        endTime: routeData.endTime,
      });

      // ลบข้อมูลเส้นทางที่บันทึกไว้ใน localStorage หลังจากบันทึกเรียบร้อย
      localStorage.removeItem("recordedRouteData");

      // แสดง alert หรือ toast แจ้งเตือน
      alert(t("route.save.success") || "บันทึกเส้นทางเรียบร้อยแล้ว");

      // กลับไปหน้าแผนที่
      router.push("/map");
    } catch (error) {
      console.error("Error saving route:", error);
      alert(t("route.save.error") || "เกิดข้อผิดพลาดในการบันทึกเส้นทาง");
    } finally {
      setSaving(false);
    }
  };

  // คำนวณระยะทางเป็นกิโลเมตร
  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${meters.toFixed(0)} ม.`;
    }
    return `${(meters / 1000).toFixed(2)} กม.`;
  };

  // คำนวณเวลาที่ใช้
  const formatDuration = (start: number, end: number) => {
    const durationMs = end - start;
    const seconds = Math.floor(durationMs / 1000);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours} ชม. ${minutes} นาที`;
    }
    if (minutes > 0) {
      return `${minutes} นาที ${remainingSeconds} วินาที`;
    }
    return `${remainingSeconds} วินาที`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="animate-pulse">กำลังโหลดข้อมูลเส้นทาง...</p>
      </div>
    );
  }

  if (!routeData || routeData.path.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold mb-4">ไม่พบข้อมูลเส้นทาง</h2>
        <p className="text-gray-600 mb-6 text-center">
          ไม่พบข้อมูลเส้นทางที่บันทึกไว้ หรือเส้นทางมีจุดน้อยเกินไป
        </p>
        <button
          onClick={() => router.push("/map")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          กลับไปยังแผนที่
        </button>
      </div>
    );
  }

  return (
    // แก้ใหม่เป็นโครงสร้างแบบ Fixed header ที่แยกออกจากเนื้อหาชัดเจน
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">
            {t("route.save.title") || "บันทึกเส้นทาง"}
          </h1>
          <button
            onClick={handleSubmit}
            disabled={saving || !formData.title}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 ${
              saving || !formData.title ? "opacity-50" : ""
            }`}
          >
            {saving ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></span>
                {t("common.saving") || "กำลังบันทึก..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {t("common.save") || "บันทึก"}
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content - ให้ margin-top เท่ากับความสูง header */}
      <main className="flex-1 mt-16 pb-16 overflow-auto">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Route Preview Map */}
          <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
            <RoutePreviewMap path={routeData.path} />
          </div>

          {/* Route Info */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  {t("route.distance") || "ระยะทาง"}
                </p>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">
                    {formatDistance(routeData.distance)}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  {t("route.duration") || "ระยะเวลา"}
                </p>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">
                    {formatDuration(routeData.startTime, routeData.endTime)}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1 mt-4">
              <p className="text-sm text-gray-500">
                {t("route.date") || "วันที่บันทึก"}
              </p>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  {new Date(routeData.startTime).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-4 mt-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("route.title") || "ชื่อเส้นทาง"} *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={
                  t("route.title.placeholder") ||
                  "ใส่ชื่อเส้นทาง เช่น ทางกลับบ้าน, เส้นทางไปตลาด"
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("route.from") || "ต้นทาง"}
              </label>
              <input
                type="text"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder={
                  t("route.from.placeholder") ||
                  "จุดเริ่มต้นของเส้นทาง เช่น บ้าน, ที่ทำงาน"
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("route.to") || "ปลายทาง"}
              </label>
              <input
                type="text"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder={
                  t("route.to.placeholder") ||
                  "จุดหมายปลายทาง เช่น ห้างสรรพสินค้า, โรงเรียน"
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("route.description") || "รายละเอียด"}
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={
                  t("route.description.placeholder") ||
                  "บันทึกรายละเอียดเกี่ยวกับเส้นทางนี้ เช่น สภาพถนน จุดที่ต้องระวัง"
                }
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
