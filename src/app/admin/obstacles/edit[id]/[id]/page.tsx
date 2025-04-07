// src/app/admin/obstacles/edit/[id]/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Camera, X, MapPin } from "lucide-react";
import Link from "next/link";
import { sampleObstacles } from "@/data/obstacles";
import type { ObstacleCategory, ObstacleType } from "@/lib/types/obstacle";
import { OBSTACLE_CATEGORIES } from "@/lib/types/obstacle";

export default function EditObstaclePage() {
  const router = useRouter();
  const params = useParams();
  const obstacleId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "" as ObstacleCategory,
    type: "" as ObstacleType,
    description: "",
    position: [0, 0] as [number, number],
    reportedBy: "",
    status: "active" as "active" | "resolved",
  });

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // โหลดข้อมูลอุปสรรค
  useEffect(() => {
    const fetchObstacle = async () => {
      try {
        // จำลองการดึงข้อมูลจาก API
        console.log("Looking for obstacle ID:", obstacleId);
        console.log(
          "Available obstacles:",
          sampleObstacles.map((o) => o.id)
        );
        const obstacle = sampleObstacles.find((obs) => obs.id === obstacleId);

        if (!obstacle) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // ตั้งค่าข้อมูลฟอร์ม
        setFormData({
          title: obstacle.title || "",
          category: obstacle.category,
          type: obstacle.type,
          description: obstacle.description,
          position: obstacle.position,
          reportedBy: obstacle.reportedBy,
          status: obstacle.status,
        });

        // ตั้งค่ารูปภาพ (ถ้ามี)
        if (obstacle.imageUrl) {
          setOriginalImage(obstacle.imageUrl);
          setPreviewImages([obstacle.imageUrl]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching obstacle:", error);
        setLoading(false);
      }
    };

    fetchObstacle();
  }, [obstacleId]);

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // จัดการการเปลี่ยนแปลงตำแหน่ง
  const handlePositionChange = (index: number, value: string) => {
    const newPosition = [...formData.position] as [number, number];
    newPosition[index] = parseFloat(value);
    setFormData({ ...formData, position: newPosition });
  };

  // จัดการการอัปโหลดรูปภาพ
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    const newPreviewImages = newImages.map((file) => URL.createObjectURL(file));

    setSelectedImages([...selectedImages, ...newImages]);

    // ถ้ามีรูปดั้งเดิม ให้แทนที่ด้วยรูปใหม่
    if (originalImage) {
      setPreviewImages([...newPreviewImages]);
      setOriginalImage(null);
    } else {
      setPreviewImages([...previewImages, ...newPreviewImages]);
    }
  };

  const removeImage = (index: number) => {
    // ถ้าเป็นรูปดั้งเดิม
    if (originalImage && index === 0 && previewImages[0] === originalImage) {
      setOriginalImage(null);
      setPreviewImages(previewImages.slice(1));
      return;
    }

    // ปรับ index สำหรับรูปใหม่
    const adjustedIndex = originalImage ? index - 1 : index;

    const newImages = [...selectedImages];
    newImages.splice(adjustedIndex, 1);
    setSelectedImages(newImages);

    // อัพเดทรูปพรีวิว
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // จำลองการส่งข้อมูลไปยัง API
      console.log("Updating obstacle:", {
        id: obstacleId,
        ...formData,
        newImages: selectedImages.length,
        keepOriginalImage: !!originalImage,
      });

      // รอสักครู่เพื่อจำลองการส่งข้อมูล
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // กลับไปยังหน้ารายการอุปสรรค
      router.push("/admin/obstacles");
    } catch (error) {
      console.error("Error updating obstacle:", error);
      setSaving(false);
    }
  };

  // แสดงหน้า Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // แสดงหน้า 404 ถ้าไม่พบข้อมูล
  if (notFound) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ไม่พบข้อมูลอุปสรรค
        </h2>
        <p className="text-gray-600 mb-6">ไม่พบอุปสรรค ID: {obstacleId}</p>
        <Link
          href="/admin/obstacles"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          กลับไปยังรายการอุปสรรค
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/obstacles" className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">แก้ไขอุปสรรค</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            {/* ประเภทอุปสรรค */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                หมวดหมู่อุปสรรค <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => {
                  const newCategory = e.target.value as ObstacleCategory;
                  setFormData({
                    ...formData,
                    category: newCategory,
                    // รีเซ็ตประเภทเมื่อเปลี่ยนหมวดหมู่
                    type:
                      newCategory === "other_obstacles"
                        ? ("other" as ObstacleType)
                        : formData.type,
                  });
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">เลือกหมวดหมู่</option>
                {Object.entries(OBSTACLE_CATEGORIES).map(([value, data]) => (
                  <option key={value} value={value}>
                    {data.icon} {data.label}
                  </option>
                ))}
              </select>
            </div>

            {/* ประเภทย่อย */}
            {formData.category && formData.category !== "other_obstacles" && (
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ประเภทอุปสรรค <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">เลือกประเภท</option>
                  {formData.category &&
                    OBSTACLE_CATEGORIES[formData.category].types.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* ชื่ออุปสรรค */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ชื่ออุปสรรค <span className="text-gray-400">(ถ้ามี)</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุชื่ออุปสรรค (ถ้าไม่ระบุจะใช้ชื่อประเภท)"
              />
            </div>

            {/* คำอธิบาย */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                รายละเอียด <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="อธิบายรายละเอียดของอุปสรรค"
              />
            </div>

            {/* ตำแหน่ง */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ตำแหน่ง (ละติจูด, ลองจิจูด){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    value={formData.position[0]}
                    onChange={(e) => handlePositionChange(0, e.target.value)}
                    step="0.0001"
                    placeholder="ละติจูด (เช่น 13.7563)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={formData.position[1]}
                    onChange={(e) => handlePositionChange(1, e.target.value)}
                    step="0.0001"
                    placeholder="ลองจิจูด (เช่น 100.5018)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                <MapPin size={16} />
                <button type="button" className="hover:underline">
                  เลือกตำแหน่งบนแผนที่
                </button>
              </div>
            </div>

            {/* ผู้รายงาน */}
            <div>
              <label
                htmlFor="reportedBy"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ผู้รายงาน <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="reportedBy"
                name="reportedBy"
                value={formData.reportedBy}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุชื่อผู้รายงาน"
              />
            </div>

            {/* สถานะ */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                สถานะ <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    ยังมีอยู่
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="resolved"
                    checked={formData.status === "resolved"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    แก้ไขแล้ว
                  </span>
                </label>
              </div>
            </div>

            {/* รูปภาพ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปภาพ
              </label>

              {/* รูปภาพพรีวิว */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={src}
                        alt={`รูปที่ ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                      {originalImage && index === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs py-1 px-2 text-center">
                          รูปเดิม
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* อัพโหลดรูปภาพ */}
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    คลิกเพื่ออัปโหลดรูปภาพ หรือลากและวางไฟล์ที่นี่
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF สูงสุด 5 MB
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ปุ่มดำเนินการ */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/obstacles"
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
              saving ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </button>
        </div>
      </form>
    </div>
  );
}
