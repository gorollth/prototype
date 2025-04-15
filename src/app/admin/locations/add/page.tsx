// src/app/admin/locations/add/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Upload,
  X,
  Plus,
  Trash,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import type { LocationFeature } from "@/lib/types/location";
import { AccessibilityDetailsEditor } from "@/components/admin/AccessibilityDetailsEditor";

// กำหนด interface สำหรับข้อมูลฟอร์ม
interface LocationFormData {
  name: string;
  category: "Shopping Mall" | "Public Transport" | "Park" | "Restaurant";
  accessibility: "high" | "medium" | "low";
  description: string;
  position: [number, number]; // [latitude, longitude]
  features: string[];
  accessibilityScores: {
    [key: string]: LocationFeature;
  };
}

// กำหนด interface สำหรับแท็บ
interface TabItem {
  name: string;
  icon: React.ReactElement;
}

export default function AddLocation() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // สร้างข้อมูลเริ่มต้นสำหรับ accessibility scores
  const initialAccessibilityScores = {
    parking: createDefaultFeature("ที่จอดรถ"),
    entrance: createDefaultFeature("ทางเข้าหลัก"),
    ramp: createDefaultFeature("ทางลาด"),
    pathway: createDefaultFeature("ทางเดิน"),
    elevator: createDefaultFeature("ลิฟต์"),
    restroom: createDefaultFeature("ห้องน้ำ"),
    seating: createDefaultFeature("พื้นที่นั่ง"),
    staffAssistance: createDefaultFeature("พนักงานช่วยเหลือ"),
    etc: createDefaultFeature("อื่นๆ"),
  };

  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    category: "Shopping Mall",
    accessibility: "high",
    description: "",
    position: [13.7563, 100.5018], // Bangkok default
    features: ["", ""],
    accessibilityScores: initialAccessibilityScores,
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  // แท็บสำหรับฟอร์ม
  const tabs: TabItem[] = [
    { name: "ข้อมูลทั่วไป", icon: <MapPin size={18} /> },
    { name: "การเข้าถึงโดยละเอียด", icon: <MapPin size={18} /> },
    { name: "รีวิวและความคิดเห็น", icon: <MessageCircle size={18} /> },
    { name: "รูปภาพ", icon: <Upload size={18} /> },
  ];

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม - แก้ไขประเภทของอีเวนต์
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // จัดการการเปลี่ยนแปลงตำแหน่ง
  const handlePositionChange = (index: number, value: string) => {
    const newPosition = [...formData.position] as [number, number];
    newPosition[index] = parseFloat(value);
    setFormData((prevState) => ({ ...prevState, position: newPosition }));
  };

  // จัดการการเปลี่ยนแปลงคุณสมบัติ
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prevState) => ({ ...prevState, features: newFeatures }));
  };

  // เพิ่มช่องใส่คุณสมบัติ
  const addFeatureField = () => {
    setFormData((prevState) => ({
      ...prevState,
      features: [...prevState.features, ""],
    }));
  };

  // ลบช่องใส่คุณสมบัติ
  const removeFeatureField = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, features: newFeatures }));
  };

  // ฟังก์ชันอัพเดทข้อมูลการเข้าถึงโดยละเอียด
  const handleUpdateAccessibilityFeature = (
    key: string,
    feature: LocationFeature
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      accessibilityScores: {
        ...prevState.accessibilityScores,
        [key]: feature,
      },
    }));
  };

  // ฟังก์ชันสร้าง default feature
  function createDefaultFeature(name: string): LocationFeature {
    return {
      name,
      isLiked: null,
      votes: {
        like: 0,
        dislike: 0,
        notSure: 0,
      },
      description: "",
      images: [],
    };
  }

  // จัดการการอัปโหลดรูปภาพ - แก้ไขประเภทของอีเวนต์
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // สร้าง URL สำหรับพรีวิวรูปภาพ
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages]);

    // เก็บไฟล์รูปภาพ
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // ลบรูปภาพ
  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviewImages = [...previewImages];

    // ลบออกจากอาร์เรย์
    newImages.splice(index, 1);
    newPreviewImages.splice(index, 1);

    setImages(newImages);
    setPreviewImages(newPreviewImages);
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

  // บันทึกข้อมูล
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // กรองคุณสมบัติที่ว่างออก
      const filteredFeatures = formData.features.filter(
        (feature) => feature.trim() !== ""
      );

      // จำลองการบันทึกข้อมูล
      console.log("Saving location:", {
        ...formData,
        features: filteredFeatures,
      });

      // รอสักครู่เพื่อจำลองการส่งข้อมูล
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // กลับไปยังหน้ารายการสถานที่
      router.push("/admin/locations");
    } catch (error) {
      console.error("Error saving location:", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/locations" className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">เพิ่มสถานที่ใหม่</h1>
        </div>

        <button
          type="button"
          onClick={openLocationOnMap}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <MapPin size={16} className="mr-2" />
          ดูบนแผนที่
        </button>
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ชื่อสถานที่ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ป้อนชื่อสถานที่"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    หมวดหมู่ <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Shopping Mall">ห้างสรรพสินค้า</option>
                    <option value="Public Transport">ระบบขนส่งสาธารณะ</option>
                    <option value="Park">สวนสาธารณะ</option>
                    <option value="Restaurant">ร้านอาหาร</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="accessibility"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ระดับการเข้าถึง <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accessibility"
                      value="high"
                      checked={formData.accessibility === "high"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      เข้าถึงได้ง่าย
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accessibility"
                      value="medium"
                      checked={formData.accessibility === "medium"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                      เข้าถึงได้ปานกลาง
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accessibility"
                      value="low"
                      checked={formData.accessibility === "low"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      เข้าถึงได้ยาก
                    </span>
                  </label>
                </div>
              </div>

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
                  placeholder="ข้อมูลเกี่ยวกับสถานที่นี้"
                />
              </div>

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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* การเข้าถึงโดยละเอียด */}
          <div className={tabIndex === 1 ? "block" : "hidden"}>
            <AccessibilityDetailsEditor
              features={formData.accessibilityScores}
              onUpdate={handleUpdateAccessibilityFeature}
              editable={true} // กำหนดให้สามารถกด like/dislike ได้
            />
          </div>

          {/* รีวิวและความคิดเห็น */}
          <div className={tabIndex === 2 ? "block" : "hidden"}>
            <div className="space-y-6">
              <h3 className="text-lg font-medium">รีวิวและความคิดเห็น</h3>
              <div className="p-6 text-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">ยังไม่มีรีวิวสำหรับสถานที่ใหม่</p>
              </div>
            </div>
          </div>

          {/* รูปภาพ */}
          <div className={tabIndex === 3 ? "block" : "hidden"}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปภาพสถานที่
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
                    </div>
                  ))}
                </div>
              )}

              {/* ฟอร์มอัปโหลดรูปภาพ */}
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
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
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

          {/* ปุ่มดำเนินการ */}
          <div className="mt-8 flex justify-end gap-4 border-t pt-6">
            <Link
              href="/admin/locations"
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ยกเลิก
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
