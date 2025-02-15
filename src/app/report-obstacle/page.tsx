// Path: src/app/report-obstacle/page.tsx
"use client";

import { useState } from "react";
import { Camera, ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ObstacleCategory } from "@/lib/types/obstacle";

const OBSTACLE_CATEGORIES = {
  sidewalk_issues: {
    label: "Sidewalk Issues",
    types: [
      { value: "rough_surface", label: "Rough/Damaged Surface" },
      { value: "broken_drain", label: "Broken Drain/Missing Cover" },
      { value: "flooding", label: "Water Logging" },
      { value: "steep_slope", label: "Too Steep Slope" },
      { value: "narrow_path", label: "Too Narrow Path" },
      { value: "no_ramp", label: "No Ramp Access" },
      { value: "other_sidewalk", label: "Other Sidewalk Issue" },
    ],
  },
  permanent_obstacles: {
    label: "Permanent Obstacles",
    types: [
      { value: "utility_pole", label: "Utility Pole/Sign Post" },
      { value: "tree", label: "Tree/Plant Container" },
      { value: "bus_stop", label: "Bus Stop/Shelter" },
      { value: "permanent_stall", label: "Permanent Vendor Stall" },
      { value: "footbridge_no_lift", label: "Footbridge without Lift/Ramp" },
      { value: "construction", label: "Permanent Construction" },
      { value: "other_permanent", label: "Other Permanent Obstacle" },
    ],
  },
  temporary_obstacles: {
    label: "Temporary Obstacles",
    types: [
      { value: "parked_car", label: "Car Parked on Sidewalk" },
      { value: "parked_motorcycle", label: "Motorcycle on Sidewalk" },
      { value: "mobile_vendor", label: "Mobile Vendor (Cart/Tent)" },
      { value: "construction_material", label: "Construction Materials" },
      { value: "garbage_bin", label: "Garbage Bin" },
      { value: "mobile_sign", label: "Mobile Advertisement" },
      { value: "fallen_wire", label: "Fallen Electric Wire" },
      { value: "other_temporary", label: "Other Temporary Obstacle" },
    ],
  },
  connection_issues: {
    label: "Connection Point Issues",
    types: [
      { value: "no_crossing_ramp", label: "No Crossing Ramp" },
      { value: "no_transit_ramp", label: "No Transit Access Ramp" },
      {
        value: "difficult_transit_access",
        label: "Difficult Transit Door Access",
      },
      { value: "broken_elevator", label: "Broken/No Elevator" },
      { value: "broken_escalator", label: "Broken/No Escalator" },
      { value: "other_connection", label: "Other Connection Issue" },
    ],
  },
  safety_issues: {
    label: "Safety Issues",
    types: [
      { value: "poor_lighting", label: "Poor Lighting" },
      { value: "unsafe_area", label: "Unsafe/Isolated Area" },
      { value: "broken_cctv", label: "Broken/No CCTV" },
      { value: "missing_warning", label: "Missing/Broken Warning Sign" },
      { value: "other_safety", label: "Other Safety Issue" },
    ],
  },
};

export default function ReportObstaclePage() {
  const router = useRouter();
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
        <h1 className="text-lg font-semibold">Report Obstacle</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Photos Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium flex items-center gap-2">
              <Camera size={20} />
              Add Photos
            </h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`Selected ${index + 1}`}
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
                  Click to add photos
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Obstacle Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium">Obstacle Details</h2>
          </div>
          <div className="p-4 space-y-4">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
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
                <option value="">Select category</option>
                {Object.entries(OBSTACLE_CATEGORIES).map(
                  ([value, { label }]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Type Selection */}
            {formData.category && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Obstacle
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select type</option>
                  {OBSTACLE_CATEGORIES[
                    formData.category as ObstacleCategory
                  ].types.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                rows={4}
                placeholder="Describe the obstacle and how it affects accessibility..."
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
          Submit Report
        </button>
      </form>
    </div>
  );
}
