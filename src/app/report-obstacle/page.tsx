// Path: src/app/report-obstacle/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Camera, ChevronLeft, X, MapPin, Crosshair, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ObstacleCategory, ObstacleType } from "@/lib/types/obstacle";
import { OBSTACLE_CATEGORIES } from "@/lib/types/obstacle";
import { useLanguage } from "../../../contexts/LanguageContext";
import dynamic from "next/dynamic";

// ใช้ dynamic import เพื่อให้ MapPicker ทำงานเฉพาะฝั่ง client
const MapPicker = dynamic(() => import("../../components/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
});

// ใช้ dynamic import สำหรับ SimpleLocationMap component
const SimpleLocationMap = dynamic(
  () => import("../../components/SimpleLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  }
);

export default function ReportObstaclePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    category: "" as ObstacleCategory | "",
    type: "" as ObstacleType | "",
    description: "",
    location: [0, 0] as [number, number],
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ฟังก์ชันตรวจสอบว่าฟอร์มสามารถส่งได้หรือไม่
  const isFormValid = useMemo(() => {
    return (
      formData.category !== "" &&
      formData.type !== "" &&
      formData.description.trim() !== "" &&
      formData.location[0] !== 0 &&
      formData.location[1] !== 0
    );
  }, [formData]);

  // Effect to auto-set type to 'other' when category is 'other_obstacles'
  useEffect(() => {
    if (formData.category === "other_obstacles") {
      setFormData((prev) => ({ ...prev, type: "other" as ObstacleType }));
    }
  }, [formData.category]);

  // Get current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: [position.coords.latitude, position.coords.longitude],
          }));
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            t("location.error.message") ||
              "ไม่สามารถรับตำแหน่งปัจจุบันได้ กรุณาลองใหม่อีกครั้ง"
          );
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      setLocationError(
        t("location.not.supported") || "เบราว์เซอร์ของคุณไม่รองรับการรับตำแหน่ง"
      );
      setIsGettingLocation(false);
    }
  };

  const handleLocationSelect = (position: [number, number]) => {
    setFormData((prev) => ({ ...prev, location: position }));
    setShowMapPicker(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setSubmitting(true);

    try {
      console.log("Form submitted:", { ...formData, images: selectedImages });
      // จำลองการรอเวลาเพื่อส่งข้อมูล
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.back();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ฟังก์ชันสำหรับการแสดงผลหมวดหมู่พร้อมไอคอนใน select
  const renderCategoryOption = (
    value: string,
    data: { icon: string; label: string }
  ) => {
    return language === "th"
      ? `${data.icon} ${data.label}`
      : `${data.icon} ${value
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 text-gray-600">
      {/* Header - ปรับให้มีปุ่ม Submit อยู่มุมขวา */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="font-medium">{t("obstacle.report.title")}</h1>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting || !isFormValid}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 ${
                submitting || !isFormValid ? "opacity-50" : ""
              }`}
            >
              {submitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></span>
                  {t("common.saving") || "กำลังส่ง..."}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t("obstacle.report.submit") || "ส่งรายงาน"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form className="space-y-6">
          {/* Location Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-medium flex items-center gap-2">
                <MapPin size={20} />
                {t("obstacle.location") || "ตำแหน่งอุปสรรค"}
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {formData.location[0] !== 0 &&
                formData.location[1] !== 0 &&
                !showMapPicker && (
                  <div
                    id="location-map"
                    className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative"
                  >
                    <SimpleLocationMap
                      position={formData.location}
                      onPositionChange={(newPosition) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: newPosition,
                        }))
                      }
                    />
                    <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-lg shadow-md z-[400]">
                      {formData.location[0].toFixed(5)},{" "}
                      {formData.location[1].toFixed(5)}
                    </div>
                  </div>
                )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className={`flex-1 px-4 py-2 flex items-center justify-center gap-2 border rounded-lg ${
                    isGettingLocation ? "opacity-70" : "hover:bg-gray-50"
                  }`}
                  disabled={isGettingLocation}
                >
                  <Crosshair size={18} className="text-blue-600" />
                  <span>
                    {isGettingLocation
                      ? t("location.getting") || "กำลังรับตำแหน่ง..."
                      : t("location.use.current") || "ใช้ตำแหน่งปัจจุบัน"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowMapPicker(true)}
                  className="flex-1 px-4 py-2 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <MapPin size={18} />
                  <span>{t("location.select.on.map") || "เลือกบนแผนที่"}</span>
                </button>
              </div>

              {locationError && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                  {locationError}
                </div>
              )}
            </div>
          </div>

          {/* Photos Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-medium flex items-center gap-2">
                <Camera size={20} />
                {t("obstacle.photos.add")}
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={t("obstacle.photo.selected") + ` ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500">
                  <Camera className="mx-auto w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {t("obstacle.photos.click.to.add")}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Obstacle Details */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-medium">{t("obstacle.report.details")}</h2>
            </div>
            <div className="p-4 space-y-4">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("obstacle.report.category")}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      category: e.target.value as ObstacleCategory,
                      type:
                        e.target.value === "other_obstacles"
                          ? ("other" as ObstacleType)
                          : "", // Reset type when category changes, or set to "other" for other_obstacles
                    });
                  }}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">{t("ui.select.category")}</option>
                  {Object.entries(OBSTACLE_CATEGORIES).map(([value, data]) => (
                    <option key={value} value={value}>
                      {renderCategoryOption(value, data)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Selection - show only if category is not other_obstacles */}
              {formData.category && formData.category !== "other_obstacles" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("obstacle.report.type")}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as ObstacleType,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="">{t("ui.select.type")}</option>
                    {OBSTACLE_CATEGORIES[
                      formData.category as ObstacleCategory
                    ].types.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {language === "th"
                          ? label
                          : value
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("common.description")}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  rows={formData.category === "other_obstacles" ? 6 : 4} // เพิ่มขนาดช่องกรอกถ้าเลือกหมวด "อื่นๆ"
                  placeholder={t("obstacle.description.placeholder")}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Map Picker Modal */}
      {showMapPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">
                {t("location.select.on.map") || "เลือกตำแหน่งบนแผนที่"}
              </h3>
              <button
                onClick={() => setShowMapPicker(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-96 w-full">
              <MapPicker
                initialPosition={formData.location}
                onSelectPosition={handleLocationSelect}
              />
            </div>
            <div className="p-4 bg-gray-50 flex justify-between">
              <button
                type="button"
                onClick={() => setShowMapPicker(false)}
                className="px-4 py-2 border rounded-lg"
              >
                {t("common.cancel") || "ยกเลิก"}
              </button>
              <button
                type="button"
                onClick={() => setShowMapPicker(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {t("common.confirm") || "ยืนยัน"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
