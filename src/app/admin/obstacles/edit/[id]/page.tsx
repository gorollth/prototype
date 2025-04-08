// src/app/admin/obstacles/edit/[id]/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Camera,
  X,
  MapPin,
  AlertTriangle,
  Clock,
  Check,
  Save,
  Map as MapIcon,
  Info,
  Calendar,
  User,
} from "lucide-react";
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
  const [tabIndex, setTabIndex] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    category: "" as ObstacleCategory,
    type: "" as ObstacleType,
    description: "",
    position: [0, 0] as [number, number],
    reportedBy: "",
    reportedAt: "",
    status: "active" as "active" | "resolved",
    verifyCount: {
      stillPresent: 0,
      resolved: 0,
    },
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
          reportedAt: obstacle.reportedAt,
          status: obstacle.status,
          verifyCount: obstacle.verifyCount || {
            stillPresent: 0,
            resolved: 0,
          },
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

  // เปิดดูบนแผนที่
  const openLocationOnMap = () => {
    const [latitude, longitude] = formData.position;

    // ตรวจสอบว่ามีค่าพิกัดหรือไม่
    if (latitude && longitude) {
      // สร้าง URL ของ Google Maps
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      // เปิดในแท็บใหม่
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
    } else {
      // แสดงข้อความเตือน
      console.error("ไม่สามารถเปิดแผนที่ได้ กรุณาตรวจสอบพิกัด");
    }
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

  // ฟังก์ชันแสดงชื่อประเภทอุปสรรค
  const getTypeLabel = (type: ObstacleType): string => {
    const typeLabels: Record<ObstacleType, string> = {
      rough_surface: "พื้นผิวขรุขระ/ชำรุด",
      broken_drain: "ท่อระบายน้ำชำรุด/ฝาท่อหาย",
      narrow_path: "ทางเท้าแคบเกินไป",
      no_ramp: "ไม่มีทางลาดขึ้น-ลง",
      utility_pole: "เสาไฟฟ้า/เสาป้าย",
      footbridge_no_lift: "สะพานลอยที่ไม่มีลิฟต์/ทางลาด",
      construction: "จุดก่อสร้างถาวร",
      vehicles_on_sidewalk: "ยานพาหนะบนทางเท้า",
      construction_material: "วัสดุก่อสร้าง",
      garbage_bin: "ถังขยะ",
      other: "อื่นๆ",
    };
    return typeLabels[type] || type;
  };

  // ฟังก์ชันแสดงชื่อหมวดหมู่
  const getCategoryLabel = (category: ObstacleCategory): string => {
    const categoryLabels: Record<ObstacleCategory, string> = {
      sidewalk_issues: "ปัญหาทางเท้า",
      permanent_obstacles: "อุปสรรคถาวร",
      temporary_obstacles: "อุปสรรคชั่วคราว",
      other_obstacles: "อื่นๆ",
    };
    return categoryLabels[category] || category;
  };

  // แท็บสำหรับฟอร์ม
  const tabs = [
    { name: "ข้อมูลทั่วไป", icon: <Info size={18} /> },
    { name: "รูปภาพ", icon: <Camera size={18} /> },
  ];

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

        <div className="flex gap-2">
          <button
            type="button"
            onClick={openLocationOnMap}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <MapIcon size={16} className="mr-2" />
            ดูบนแผนที่
          </button>
        </div>
      </div>

      {/* Form Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => setTabIndex(index)}
                className={`px-4 py-3 flex items-center space-x-2 ${
                  tabIndex === index
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* ข้อมูลทั่วไป */}
          <div className={tabIndex === 0 ? "block" : "hidden"}>
            <div className="space-y-6">
              {/* ข้อมูลการรายงาน */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-md font-medium text-blue-800 mb-3 flex items-center">
                  <Info size={16} className="mr-2" />
                  ข้อมูลการรายงาน
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-blue-500" />
                    <div>
                      <p className="text-xs text-blue-500">ผู้รายงาน</p>
                      <p className="font-medium text-blue-800">
                        {formData.reportedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-500" />
                    <div>
                      <p className="text-xs text-blue-500">วันที่รายงาน</p>
                      <p className="font-medium text-blue-800">
                        {new Date(formData.reportedAt).toLocaleDateString(
                          "th-TH"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-blue-500">
                      การยืนยันว่ายังมีอุปสรรคอยู่
                    </p>
                    <p className="font-medium text-blue-800">
                      {formData.verifyCount.stillPresent} คน
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-500">
                      การยืนยันว่าแก้ไขแล้ว
                    </p>
                    <p className="font-medium text-blue-800">
                      {formData.verifyCount.resolved} คน
                    </p>
                  </div>
                </div>
              </div>

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
                      OBSTACLE_CATEGORIES[formData.category].types.map(
                        (item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        )
                      )}
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
                    <div className="flex items-center mb-1">
                      <label htmlFor="lat" className="text-xs text-gray-500">
                        ละติจูด
                      </label>
                    </div>
                    <input
                      type="number"
                      id="lat"
                      value={formData.position[0]}
                      onChange={(e) => handlePositionChange(0, e.target.value)}
                      step="0.0001"
                      placeholder="ละติจูด (เช่น 13.7563)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <label htmlFor="lng" className="text-xs text-gray-500">
                        ลองจิจูด
                      </label>
                    </div>
                    <input
                      type="number"
                      id="lng"
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
                  <button
                    type="button"
                    onClick={openLocationOnMap}
                    className="hover:underline"
                  >
                    เลือกตำแหน่งบนแผนที่
                  </button>
                </div>
              </div>

              {/* สถานะ */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  สถานะ <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === "active"}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 text-red-600"
                    />
                    <span className="flex items-center gap-1">
                      <AlertTriangle size={18} className="text-red-500" />
                      <span>ยังมีอยู่</span>
                    </span>
                  </label>
                  <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="status"
                      value="resolved"
                      checked={formData.status === "resolved"}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 text-green-600"
                    />
                    <span className="flex items-center gap-1">
                      <Check size={18} className="text-green-500" />
                      <span>แก้ไขแล้ว</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* รูปภาพ */}
          <div className={tabIndex === 1 ? "block" : "hidden"}>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                รูปภาพอุปสรรค
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                อัพโหลดรูปภาพเพื่อแสดงอุปสรรคให้ชัดเจนขึ้น
                ทำให้เจ้าหน้าที่สามารถแก้ไขปัญหาได้ตรงจุด
              </p>

              {/* รูปภาพพรีวิว */}
              {previewImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {previewImages.map((src, index) => (
                    <div
                      key={index}
                      className="relative aspect-square border border-gray-200 rounded-md overflow-hidden group"
                    >
                      <img
                        src={src}
                        alt={`รูปที่ ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
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
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
                  <p className="text-gray-500">ยังไม่มีรูปภาพ</p>
                </div>
              )}

              {/* อัพโหลดรูปภาพ */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Camera size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    คลิกเพื่ออัปโหลดรูปภาพ หรือลากและวางไฟล์ที่นี่
                  </p>
                  <p className="text-xs text-gray-500">
                    รองรับไฟล์ PNG, JPG, GIF ขนาดสูงสุด 5 MB
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* ปุ่มดำเนินการ */}
          <div className="mt-8 flex justify-end gap-4 border-t pt-6">
            <Link
              href="/admin/obstacles"
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ยกเลิก
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 ${
                saving ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {saving ? (
                <>
                  <Clock className="animate-spin" size={18} />
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>บันทึกการเปลี่ยนแปลง</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
