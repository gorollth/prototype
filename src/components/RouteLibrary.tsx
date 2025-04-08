// src/components/RouteLibrary.tsx
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { sampleRoutes } from "@/data/routes";
import Link from "next/link";
import RouteCard from "./RouteCard";
import { useLanguage } from "../../contexts/LanguageContext";

export function RouteLibrary() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"saved" | "recent">("saved");

  // กรองเส้นทางตามแท็บที่เลือก
  const filteredRoutes = sampleRoutes.filter(
    (route) => route.type === activeTab
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">
          {t("profile.routes.library") || "ไลบรารีเส้นทาง"}
        </h3>
        <Link
          href="/routes"
          className="text-blue-600 text-sm flex items-center"
        >
          {t("common.view.all") || "ดูทั้งหมด"}{" "}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === "saved"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {t("profile.routes.saved") || "เส้นทางที่บันทึก"}
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === "recent"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {t("profile.routes.recent") || "เส้นทางล่าสุด"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredRoutes.slice(0, 4).map((route) => (
          <RouteCard key={route.id} route={route} compact />
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          {activeTab === "saved"
            ? t("profile.routes.no.saved") || "ยังไม่มีเส้นทางที่บันทึกไว้"
            : t("profile.routes.no.recent") || "ยังไม่มีเส้นทางที่ใช้ล่าสุด"}
        </div>
      )}
    </div>
  );
}
