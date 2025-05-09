// src/app/save-route/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Save, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import dynamic from "next/dynamic";

// ใช้ dynamic import เพื่อให้ Map ทำงานฝั่ง client
const RoutePreviewMap = dynamic(
  () =>
    import("@/components/RoutePreviewMap").then((mod) => mod.RoutePreviewMap),
  { ssr: false }
);

export default function SaveRoutePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [routeData, setRouteData] = useState<{
    path: [number, number][];
    startTime: number;
    endTime: number;
    distance: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    from: "",
    to: "",
    description: "",
    accessibility: "high" as "high" | "medium" | "low", // ระดับการเข้าถึง
    tags: [] as string[],
  });

  // ระบุ tag ที่มีให้เลือก
  const availableTags = [
    { id: "ramp", label: t("route.tags.ramp") || "ทางลาด" },
    { id: "elevator", label: t("route.tags.elevator") || "ลิฟต์" },
    { id: "wide_path", label: t("route.tags.wide_path") || "ทางเดินกว้าง" },
    {
      id: "smooth_surface",
      label: t("route.tags.smooth_surface") || "พื้นผิวเรียบ",
    },
    { id: "assistance", label: t("route.tags.assistance") || "มีผู้ช่วยเหลือ" },
  ];

  useEffect(() => {
    // ดึงข้อมูลเส้นทางจาก localStorage ที่บันทึกไว้จากหน้า Map
    const savedRouteData = localStorage.getItem("recordedRouteData");
    if (savedRouteData) {
      const parsedData = JSON.parse(savedRouteData);
      setRouteData(parsedData);
    } else {
      // ถ้าไม่มีข้อมูล ให้กลับไปหน้า Map
      router.push("/map");
    }
  }, [router]);

  const handleBack = () => {
    // แสดง confirm dialog ถ้ามีการกรอกข้อมูลแล้ว
    if (
      formData.title ||
      formData.from ||
      formData.to ||
      formData.description
    ) {
      if (
        confirm(
          t("route.save.confirm.discard") ||
            "คุณแน่ใจหรือไม่ว่าต้องการยกเลิก? ข้อมูลที่กรอกจะหายไป"
        )
      ) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  const handleTagToggle = (tagId: string) => {
    setFormData((prev) => {
      if (prev.tags.includes(tagId)) {
        return { ...prev, tags: prev.tags.filter((id) => id !== tagId) };
      } else {
        return { ...prev, tags: [...prev.tags, tagId] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // จำลองการบันทึกข้อมูลเส้นทาง
    console.log("Saving route:", {
      ...formData,
      path: routeData?.path,
      distance: routeData?.distance,
      duration: routeData
        ? (routeData.endTime - routeData.startTime) / 1000
        : 0,
    });

    // ในระบบจริงควรส่งข้อมูลไปบันทึกที่ API

    // ลบข้อมูลชั่วคราวออกจาก localStorage
    localStorage.removeItem("recordedRouteData");

    // กลับไปหน้า Routes หรือหน้า Map
    router.push("/routes");
  };

  // สร้างตัวเลือกสำหรับความสามารถในการเข้าถึง
  const accessibilityOptions = [
    { value: "high", label: t("accessibility.high") || "เข้าถึงง่าย" },
    { value: "medium", label: t("accessibility.medium") || "เข้าถึงปานกลาง" },
    { value: "low", label: t("accessibility.low") || "เข้าถึงยาก" },
  ];

  // ถ้าไม่มีข้อมูลเส้นทาง
  if (!routeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-1 rounded hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">
            {t("route.save.title") || "บันทึกเส้นทาง"}
          </h1>
          <div className="w-8"></div> {/* Placeholder for balance */}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* แสดงเส้นทางบนแผนที่ */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video relative">
            <RoutePreviewMap path={routeData.path} />
          </div>
          <div className="p-4 flex justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {t("route.info.distance") || "ระยะทาง"}
              </p>
              <p className="font-medium">
                {(routeData.distance / 1000).toFixed(2)} {t("common.km")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {t("route.info.duration") || "ระยะเวลา"}
              </p>
              <p className="font-medium">
                {Math.floor((routeData.endTime - routeData.startTime) / 60000)}{" "}
                {t("common.minutes")}
              </p>
            </div>
          </div>
        </div>

        {/* ฟอร์มบันทึกข้อมูลเส้นทาง */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* รายละเอียดเส้นทาง */}
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <h2 className="font-medium">
              {t("route.details") || "รายละเอียดเส้นทาง"}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("route.title") || "ชื่อเส้นทาง"}*
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full p-2 border rounded-lg"
                placeholder={
                  t("route.title.placeholder") ||
                  "ใส่ชื่อเส้นทาง เช่น ทางไปตลาด..."
                }
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {t("route.from") || "จุดเริ่มต้น"}*
                </label>
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, from: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder={t("route.from.placeholder") || "จุดเริ่มต้น"}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {t("route.to") || "จุดหมาย"}*
                </label>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, to: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder={t("route.to.placeholder") || "จุดหมาย"}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("route.description") || "คำอธิบาย"}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded-lg"
                placeholder={
                  t("route.description.placeholder") ||
                  "รายละเอียดเพิ่มเติมเกี่ยวกับเส้นทาง"
                }
                rows={3}
              />
            </div>
          </div>

          {/* การเข้าถึง */}
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <h2 className="font-medium">
              {t("route.accessibility") || "การเข้าถึง"}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("route.accessibility.level") || "ระดับการเข้าถึง"}*
              </label>
              <div className="grid grid-cols-3 gap-2">
                {accessibilityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        accessibility: option.value as
                          | "high"
                          | "medium"
                          | "low",
                      }))
                    }
                    className={`py-2 px-3 rounded-lg border text-center text-sm ${
                      formData.accessibility === option.value
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("route.features") || "คุณสมบัติของเส้นทาง"}
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className={`py-1 px-3 rounded-full text-sm ${
                      formData.tags.includes(tag.id)
                        ? "bg-blue-50 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t("route.features.helper") ||
                  "เลือกคุณสมบัติที่มีในเส้นทางนี้"}
              </p>
            </div>
          </div>

          {/* ปุ่มบันทึก */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>{t("route.save.button") || "บันทึกเส้นทาง"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
