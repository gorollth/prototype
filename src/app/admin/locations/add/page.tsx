// src/app/admin/locations/add/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Upload, X, Plus, Trash } from "lucide-react";
import Link from "next/link";

// กำหนด interface สำหรับข้อมูลฟอร์ม
interface LocationFormData {
  name: string;
  category: "Shopping Mall" | "Public Transport" | "Park" | "Restaurant";
  accessibility: "high" | "medium" | "low";
  description: string;
  position: [number, number]; // [latitude, longitude]
  features: string[];
}

// กำหนด interface สำหรับแท็บ
interface TabItem {
  name: string;
  icon: React.ReactElement;
}

export default function AddLocation() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    category: "Shopping Mall",
    accessibility: "high",
    description: "",
    position: [13.7563, 100.5018], // Bangkok default
    features: ["", ""],
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  // แท็บสำหรับฟอร์ม
  const tabs: TabItem[] = [
    { name: "ข้อมูลทั่วไป", icon: <MapPin size={18} /> },
    { name: "คุณสมบัติการเข้าถึง", icon: <MapPin size={18} /> },
    { name: "รูปภาพ", icon: <Upload size={18} /> },
  ];

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
    const newPosition: [number, number] = [...formData.position] as [
      number,
      number
    ];
    newPosition[index] = parseFloat(value);
    setFormData({ ...formData, position: newPosition });
  };

  // จัดการการเปลี่ยนแปลงคุณสมบัติ
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  // เพิ่มช่องใส่คุณสมบัติ
  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  // ลบช่องใส่คุณสมบัติ
  const removeFeatureField = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  // จัดการการอัปโหลดรูปภาพ
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // สร้าง URL สำหรับพรีวิวรูปภาพ
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);

    // เก็บไฟล์รูปภาพ
    setImages([...images, ...files]);
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

  // บันทึกข้อมูล
  const handleSubmit = async (e: React.FormEvent) => {
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
      </div>

      {/* Form Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex">
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

          {/* คุณสมบัติการเข้าถึง */}
          <div className={tabIndex === 1 ? "block" : "hidden"}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คุณสมบัติการเข้าถึง <span className="text-red-500">*</span>
              </label>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  เพิ่มคุณสมบัติการเข้าถึงของสถานที่ เช่น "ลิฟท์กว้าง",
                  "ทางลาดทางเข้า", "ห้องน้ำสำหรับผู้พิการ"
                </p>

                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`คุณสมบัติที่ ${index + 1}`}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeatureField(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash size={18} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addFeatureField}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2"
                >
                  <Plus size={16} />
                  <span>เพิ่มคุณสมบัติ</span>
                </button>
              </div>
            </div>
          </div>

          {/* รูปภาพ */}
          <div className={tabIndex === 2 ? "block" : "hidden"}>
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
