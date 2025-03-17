// Path: src/app/report-obstacle/page.tsx
"use client";

import { useState } from "react";
import { Camera, ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ObstacleCategory } from "@/lib/types/obstacle";
import { useLanguage } from "../../../contexts/LanguageContext";

// Translation keys for obstacle categories and types
const OBSTACLE_CATEGORIES = {
  sidewalk_issues: {
    translationKey: "obstacle.category.sidewalk_issues",
    types: [
      { value: "rough_surface", translationKey: "obstacle.type.rough_surface" },
      { value: "broken_drain", translationKey: "obstacle.type.broken_drain" },
      { value: "flooding", translationKey: "obstacle.type.flooding" },
      { value: "steep_slope", translationKey: "obstacle.type.steep_slope" },
      { value: "narrow_path", translationKey: "obstacle.type.narrow_path" },
      { value: "no_ramp", translationKey: "obstacle.type.no_ramp" },
      {
        value: "other_sidewalk",
        translationKey: "obstacle.type.other_sidewalk",
      },
    ],
  },
  permanent_obstacles: {
    translationKey: "obstacle.category.permanent_obstacles",
    types: [
      { value: "utility_pole", translationKey: "obstacle.type.utility_pole" },
      { value: "tree", translationKey: "obstacle.type.tree" },
      { value: "bus_stop", translationKey: "obstacle.type.bus_stop" },
      {
        value: "permanent_stall",
        translationKey: "obstacle.type.permanent_stall",
      },
      {
        value: "footbridge_no_lift",
        translationKey: "obstacle.type.footbridge_no_lift",
      },
      { value: "construction", translationKey: "obstacle.type.construction" },
      {
        value: "other_permanent",
        translationKey: "obstacle.type.other_permanent",
      },
    ],
  },
  temporary_obstacles: {
    translationKey: "obstacle.category.temporary_obstacles",
    types: [
      { value: "parked_car", translationKey: "obstacle.type.parked_car" },
      {
        value: "parked_motorcycle",
        translationKey: "obstacle.type.parked_motorcycle",
      },
      { value: "mobile_vendor", translationKey: "obstacle.type.mobile_vendor" },
      {
        value: "construction_material",
        translationKey: "obstacle.type.construction_material",
      },
      { value: "garbage_bin", translationKey: "obstacle.type.garbage_bin" },
      { value: "mobile_sign", translationKey: "obstacle.type.mobile_sign" },
      { value: "fallen_wire", translationKey: "obstacle.type.fallen_wire" },
      {
        value: "other_temporary",
        translationKey: "obstacle.type.other_temporary",
      },
    ],
  },
  connection_issues: {
    translationKey: "obstacle.category.connection_issues",
    types: [
      {
        value: "no_crossing_ramp",
        translationKey: "obstacle.type.no_crossing_ramp",
      },
      {
        value: "no_transit_ramp",
        translationKey: "obstacle.type.no_transit_ramp",
      },
      {
        value: "difficult_transit_access",
        translationKey: "obstacle.type.difficult_transit_access",
      },
      {
        value: "broken_elevator",
        translationKey: "obstacle.type.broken_elevator",
      },
      {
        value: "broken_escalator",
        translationKey: "obstacle.type.broken_escalator",
      },
      {
        value: "other_connection",
        translationKey: "obstacle.type.other_connection",
      },
    ],
  },
  safety_issues: {
    translationKey: "obstacle.category.safety_issues",
    types: [
      { value: "poor_lighting", translationKey: "obstacle.type.poor_lighting" },
      { value: "unsafe_area", translationKey: "obstacle.type.unsafe_area" },
      { value: "broken_cctv", translationKey: "obstacle.type.broken_cctv" },
      {
        value: "missing_warning",
        translationKey: "obstacle.type.missing_warning",
      },
      { value: "other_safety", translationKey: "obstacle.type.other_safety" },
    ],
  },
};

export default function ReportObstaclePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    category: "" as ObstacleCategory | "",
    type: "",
    description: "",
  });

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
                    alt={t("obstacle.photo.selected", { number: index + 1 })}
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
                    type: "", // Reset type when category changes
                  });
                }}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">{t("ui.select")}</option>
                {Object.entries(OBSTACLE_CATEGORIES).map(
                  ([value, { translationKey }]) => (
                    <option key={value} value={value}>
                      {t(translationKey)}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Type Selection */}
            {formData.category && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("obstacle.report.type")}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">{t("ui.select")}</option>
                  {OBSTACLE_CATEGORIES[
                    formData.category as ObstacleCategory
                  ].types.map(({ value, translationKey }) => (
                    <option key={value} value={value}>
                      {t(translationKey)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("obstacle.report.description")}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                rows={4}
                placeholder={t("common.description")}
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
