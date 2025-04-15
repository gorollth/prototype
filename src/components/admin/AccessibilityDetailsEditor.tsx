// src/components/admin/AccessibilityDetailsEditor.tsx
import React from "react";
import { X, Camera, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";
import type { LocationFeature } from "@/lib/types/location";

interface AccessibilityFeatureEditorProps {
  features: {
    [key: string]: LocationFeature;
  };
  onUpdate: (key: string, feature: LocationFeature) => void;
  // เพิ่มพารามิเตอร์ editable สำหรับควบคุมการแสดงปุ่ม like/dislike
  editable?: boolean;
}

export function AccessibilityDetailsEditor({
  features,
  onUpdate,
  editable = false, // ค่าเริ่มต้นคือ false (แสดงแบบดูได้อย่างเดียว)
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
    value: LocationFeature[keyof LocationFeature]
  ) => {
    const updatedFeature = { ...features[key], [field]: value };
    onUpdate(key, updatedFeature);
  };

  // ฟังก์ชันสำหรับการโหวต
  const handleVote = (
    key: string,
    voteType: "like" | "dislike" | "notSure"
  ) => {
    if (!editable) return; // ถ้าไม่อยู่ในโหมดแก้ไข ให้ไม่ทำอะไร

    const currentFeature = features[key];
    const currentVotes = { ...currentFeature.votes };

    // เพิ่มจำนวนโหวตตามประเภท
    currentVotes[voteType] += 1;

    // อัพเดทข้อมูล isLiked
    let isLiked = null;
    if (voteType === "like") isLiked = true;
    else if (voteType === "dislike") isLiked = false;

    handleUpdateFeature(key, "votes", currentVotes);
    handleUpdateFeature(key, "isLiked", isLiked);
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

  // เพิ่มฟังก์ชันสำหรับการอัพเดทคำอธิบาย
  const handleDescriptionChange = (key: string, value: string) => {
    handleUpdateFeature(key, "description", value);
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
            {/* แสดงส่วนการโหวตตามโหมด */}
            {editable ? (
              // โหมดแก้ไข - แสดงปุ่มสำหรับโหวต
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  การประเมินการเข้าถึง
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleVote(key, "like")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      feature.isLiked === true
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-gray-100 text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    <ThumbsUp size={16} />
                    <span>ดี</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVote(key, "dislike")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      feature.isLiked === false
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-gray-100 text-gray-700 hover:bg-red-50"
                    }`}
                  >
                    <ThumbsDown size={16} />
                    <span>ไม่ดี</span>
                  </button>
                </div>

                {/* ฟิลด์สำหรับอัพเดทคำอธิบาย */}
              </div>
            ) : (
              // โหมดดูข้อมูล - แสดงแค่ตัวเลขโหวต
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  จำนวนโหวต
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 px-4 py-3 rounded-md border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">ถูกใจ</p>
                    <p className="font-medium text-gray-800">
                      {feature.votes.like}
                    </p>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">ไม่ถูกใจ</p>
                    <p className="font-medium text-gray-800">
                      {feature.votes.dislike}
                    </p>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">ไม่แน่ใจ</p>
                    <p className="font-medium text-gray-800">
                      {feature.votes.notSure}
                    </p>
                  </div>
                </div>

                {/* แสดงคำอธิบาย (ถ้ามี) */}
                {feature.description && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      รายละเอียด
                    </label>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
                      {feature.description}
                    </p>
                  </div>
                )}
              </div>
            )}

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
