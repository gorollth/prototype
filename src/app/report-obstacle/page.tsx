// Path: src/app/report-obstacle/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Camera, ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ObstacleCategory, ObstacleType } from "@/lib/types/obstacle";
import { OBSTACLE_CATEGORIES } from "@/lib/types/obstacle";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function ReportObstaclePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    category: "" as ObstacleCategory | "",
    type: "" as ObstacleType | "",
    description: "",
  });

  // Effect to auto-set type to 'other' when category is 'other_obstacles'
  useEffect(() => {
    if (formData.category === "other_obstacles") {
      setFormData((prev) => ({ ...prev, type: "other" as ObstacleType }));
    }
  }, [formData.category]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, images: selectedImages });
    router.back();
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
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 flex items-center gap-2 shadow-sm z-10">
        <button onClick={() => router.back()} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">{t("obstacle.report.title")}</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t("obstacle.report.submit")}
        </button>
      </form>
    </div>
  );
}
