// src/app/routes/[id]/page.tsx
"use client";

import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Star,
  Navigation,
  Globe,
  Lock,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Route, getRouteById } from "@/data/routes";
import { use } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";

interface RoutePageProps {
  params: Promise<{ id: string }>;
}

export default function RouteDetailsPage({ params }: RoutePageProps) {
  const unwrappedParams = use(params);
  const [route, setRoute] = useState<Route | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const routeId = parseInt(unwrappedParams.id);
    const foundRoute = getRouteById(routeId);
    if (foundRoute) {
      setRoute(foundRoute);
      // สมมติว่าเส้นทางมี property isPublic
      setIsPublic(foundRoute.isPublic !== false);
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

  const toggleVisibility = () => {
    setIsPublic(!isPublic);
  };

  const handleSaveVisibility = async () => {
    if (!route) return;

    setIsSaving(true);

    try {
      // จำลองการบันทึกข้อมูล (ในระบบจริงควรเรียก API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(
        `เปลี่ยนสถานะเส้นทาง #${route.id} เป็น ${
          isPublic ? "สาธารณะ" : "ส่วนตัว"
        }`
      );

      // อัปเดตข้อมูลเส้นทางในระบบ
      setRoute((prev) => (prev ? { ...prev, isPublic } : null));
      setIsEditing(false);

      // แสดงข้อความแจ้งเตือน
      alert(
        t("route.visibility.updated") ||
          "อัปเดตการตั้งค่าความเป็นส่วนตัวเรียบร้อยแล้ว"
      );
    } catch (error) {
      console.error("Error saving visibility setting:", error);
      alert(
        t("route.visibility.error") ||
          "เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setIsSaving(false);
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

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">
              {t("route.visibility") || "การมองเห็น"}
            </h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 text-sm"
              >
                {t("common.edit") || "แก้ไข"}
              </button>
            ) : (
              <button
                onClick={handleSaveVisibility}
                disabled={isSaving}
                className={`text-blue-600 text-sm flex items-center gap-1 ${
                  isSaving ? "opacity-50" : ""
                }`}
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-blue-600 border-opacity-50 border-t-blue-600 rounded-full mr-1"></span>
                    {t("common.saving") || "กำลังบันทึก..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {t("common.save") || "บันทึก"}
                  </>
                )}
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={toggleVisibility}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border ${
                  isPublic
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                <Globe
                  className={`w-5 h-5 ${
                    isPublic ? "text-blue-700" : "text-gray-600"
                  }`}
                />
                <span>{t("route.visibility.public") || "สาธารณะ"}</span>
              </button>
              <button
                type="button"
                onClick={toggleVisibility}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border ${
                  !isPublic
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                <Lock
                  className={`w-5 h-5 ${
                    !isPublic ? "text-blue-700" : "text-gray-600"
                  }`}
                />
                <span>{t("route.visibility.private") || "ส่วนตัว"}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {isPublic ? (
                <>
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>{t("route.visibility.public") || "สาธารณะ"}</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-blue-600" />
                  <span>{t("route.visibility.private") || "ส่วนตัว"}</span>
                </>
              )}
            </div>
          )}
          <p className="text-xs text-gray-500">
            {isPublic
              ? t("route.visibility.public.description") ||
                "เส้นทางนี้จะปรากฏในรายการเส้นทางสาธารณะและผู้ใช้คนอื่นสามารถมองเห็นได้"
              : t("route.visibility.private.description") ||
                "เฉพาะคุณเท่านั้นที่สามารถมองเห็นเส้นทางนี้"}
          </p>
        </div>

        {/* Accessibility Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4 mb-6 text-gray-600">
          <h3 className="font-medium">Note</h3>
          <p className="text-sm text-gray-600">{route.description}</p>
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
