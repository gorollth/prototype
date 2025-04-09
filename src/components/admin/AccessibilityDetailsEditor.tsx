// src/components/admin/AccessibilityDetailsEditor.tsx
import React from "react";
import { X, Camera } from "lucide-react";
import type { LocationFeature } from "@/lib/types/location";

interface AccessibilityFeatureEditorProps {
  features: {
    [key: string]: LocationFeature;
  };
  onUpdate: (key: string, feature: LocationFeature) => void;
}

export function AccessibilityDetailsEditor({
  features,
  onUpdate,
}: AccessibilityFeatureEditorProps) {
  // คำแปลชื่อคุณสมบัติจาก key เป็นภาษาไทย
  const featureTranslations: Record<string, string> = {
    parking: "ที่จอดรถ",
    entrance: "ทางเข้าหลัก",
    ramp: "ทางลาด",
    pathway: "ทางเดิน",
    elevator: "ลิฟต์",
    restroom: "ห้องน้ำ",
    seating: "พื้นที่นั่ง",
    staffAssistance: "พนักงานช่วยเหลือ",
    etc: "อื่นๆ",
  };

  // จัดการการแก้ไขข้อมูลคุณสมบัติ
  const handleUpdateFeature = (
    key: string,
    field: keyof LocationFeature,
    value: any
  ) => {
    const updatedFeature = { ...features[key], [field]: value };
    onUpdate(key, updatedFeature);
  };

  // จัดการการอัปโหลดรูปภาพ
  const handleAddImage = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // ในสถานการณ์จริงควรจะอัปโหลดไฟล์ไปยังเซิร์ฟเวอร์
    // แต่ในที่นี้เราจะจำลองโดยใช้ URL.createObjectURL
    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      caption: `รูปภาพใหม่ของ ${featureTranslations[key] || key}`,
    }));

    const updatedImages = [...features[key].images, ...newImages];
    handleUpdateFeature(key, "images", updatedImages);
  };

  // ลบรูปภาพ
  const handleRemoveImage = (key: string, index: number) => {
    const updatedImages = [...features[key].images];
    updatedImages.splice(index, 1);
    handleUpdateFeature(key, "images", updatedImages);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">คุณสมบัติการเข้าถึง</h3>

      {Object.entries(features).map(([key, feature]) => (
        <div key={key} className="border rounded-lg overflow-hidden bg-white">
          <div className="p-4 border-b bg-gray-50">
            <h4 className="font-medium">{featureTranslations[key] || key}</h4>
          </div>

          <div className="p-4 space-y-4">
            {/* ลบส่วนแสดงคำอธิบายแต่ไม่ให้แก้ไข */}
            {/* <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      คำอธิบาย
    </label>
    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600">
      {feature.description}
    </div>
  </div> */}

            {/* จำนวนโหวต */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                จำนวนโหวต
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    ถูกใจ
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={feature.votes.like}
                    onChange={(e) =>
                      handleUpdateFeature(key, "votes", {
                        ...feature.votes,
                        like: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    ไม่ถูกใจ
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={feature.votes.dislike}
                    onChange={(e) =>
                      handleUpdateFeature(key, "votes", {
                        ...feature.votes,
                        dislike: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    ไม่แน่ใจ
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={feature.votes.notSure}
                    onChange={(e) =>
                      handleUpdateFeature(key, "votes", {
                        ...feature.votes,
                        notSure: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* รูปภาพ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปภาพ
              </label>

              {/* แสดงรูปภาพที่มีอยู่ */}
              {feature.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {feature.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={image.caption || "รูปภาพคุณสมบัติ"}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(key, index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* อัปโหลดรูปภาพใหม่ */}
              <div className="mt-2">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleAddImage(key, e)}
                    className="hidden"
                    id={`imageUpload-${key}`}
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500">
                    <Camera className="mx-auto w-6 h-6 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">
                      คลิกเพื่ออัปโหลดรูปภาพของ{" "}
                      {featureTranslations[key] || key}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
