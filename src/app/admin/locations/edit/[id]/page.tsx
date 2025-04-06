// src/app/admin/locations/edit/[id]/page.tsx
"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { accessibleLocations } from "@/data/locations";
import { AccessibilityDetailsEditor } from "@/components/admin/AccessibilityDetailsEditor";
import { ReviewsManager } from "@/components/admin/ReviewsManager";
import type { Location, LocationFeature } from "@/lib/types/location";

// Define form data type
interface LocationFormData {
  name: string;
  category: "Shopping Mall" | "Public Transport" | "Park" | "Restaurant";
  accessibility: "high" | "medium" | "low";
  description: string;
  position: [number, number];
  features: string[];
  accessibilityScores: {
    [key: string]: LocationFeature;
  };
}

export default function EditLocation() {
  const router = useRouter();
  const params = useParams();
  const locationId = params.id as string;

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    category: "Shopping Mall",
    accessibility: "high",
    description: "",
    position: [13.7563, 100.5018], // Bangkok default
    features: ["", ""],
    accessibilityScores: {},
  });
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);

  // แท็บสำหรับฟอร์ม
  const tabs = [
    { name: "ข้อมูลทั่วไป", icon: <MapPin size={18} /> },
    { name: "คุณสมบัติการเข้าถึง", icon: <MapPin size={18} /> },
    { name: "คุณสมบัติการเข้าถึงโดยละเอียด", icon: <MapPin size={18} /> },
    { name: "รีวิวและความคิดเห็น", icon: <MessageCircle size={18} /> },
    { name: "รูปภาพ", icon: <Upload size={18} /> },
  ];

  // โหลดข้อมูลสถานที่ที่ต้องการแก้ไข
  useEffect(() => {
    const loadLocation = async () => {
      try {
        // จำลองการโหลดข้อมูลจาก API
        const locationData = accessibleLocations.find(
          (loc) => loc.id === Number(locationId)
        );

        if (!locationData) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // ตั้งค่าข้อมูลฟอร์ม
        setFormData({
          name: locationData.name,
          category: locationData.category,
          accessibility: locationData.accessibility,
          description: locationData.description,
          position: locationData.position,
          features: [...locationData.features, ""], // เพิ่มช่องว่างเพื่อให้เพิ่มได้
          accessibilityScores: locationData.accessibilityScores,
        });

        // ตั้งค่ารูปภาพจำลอง (ในระบบจริงควรใช้รูปภาพจริงของสถานที่)
        const mockImages = Object.values(locationData.accessibilityScores)
          .flatMap((score) => score.images)
          .map((img) => img.url)
          .slice(0, 5); // ใช้เพียง 5 รูปแรก

        setOriginalImages(mockImages);
        setPreviewImages(mockImages);

        setLoading(false);
      } catch (error) {
        console.error("Error loading location data:", error);
        setLoading(false);
      }
    };

    loadLocation();
  }, [locationId]);

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // จัดการการเปลี่ยนแปลงตำแหน่ง
  const handlePositionChange = (index: number, value: string) => {
    const newPosition: [number, number] = [...formData.position];
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
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // สร้าง URL สำหรับพรีวิวรูปภาพใหม่
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...originalImages, ...newPreviewImages]);

    // เก็บไฟล์รูปภาพใหม่
    setNewImages([...newImages, ...files]);
  };

  // ลบรูปภาพเดิม
  const removeOriginalImage = (index: number) => {
    const newOriginalImages = [...originalImages];
    newOriginalImages.splice(index, 1);
    setOriginalImages(newOriginalImages);

    // อัพเดทพรีวิว
    setPreviewImages([
      ...newOriginalImages,
      ...newImages.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // ลบรูปภาพใหม่
  const removeNewImage = (index: number) => {
    const newImageArray = [...newImages];
    newImageArray.splice(index, 1);
    setNewImages(newImageArray);

    // อัพเดทพรีวิว
    setPreviewImages([
      ...originalImages,
      ...newImageArray.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // อัพเดทข้อมูลคุณสมบัติการเข้าถึงโดยละเอียด
  const handleUpdateAccessibilityFeature = (
    key: string,
    feature: LocationFeature
  ) => {
    setFormData({
      ...formData,
      accessibilityScores: {
        ...formData.accessibilityScores,
        [key]: feature,
      },
    });
  };

  // บันทึกข้อมูล
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      // กรองคุณสมบัติที่ว่างออก
      const filteredFeatures = formData.features.filter(
        (feature) => feature.trim() !== ""
      );

      // จำลองการบันทึกข้อมูล
      console.log("Saving updated location:", {
        ...formData,
        features: filteredFeatures,
        originalImages,
        newImages: newImages.length,
      });

      // รอสักครู่เพื่อจำลองการส่งข้อมูล
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      // กลับไปยังหน้ารายการสถานที่
      router.push("/admin/locations");
    } catch (error) {
      console.error("Error saving location:", error);
      setSaving(false);
    }
  };

  // แสดงหน้า 404 ถ้าไม่พบข้อมูล
  if (notFound && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-6">
            ไม่พบข้อมูลสถานที่ที่ต้องการแก้ไข
          </p>
          <Link
            href="/admin/locations"
            className="bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
          >
            <ChevronLeft size={16} className="mr-2" />
            กลับไปหน้ารายการสถานที่
          </Link>
        </div>
      </div>
    );
  }

  // แสดงหน้า Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4 mx-auto"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/locations" className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            แก้ไขสถานที่: {formData.name}
          </h1>
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
                  เพิ่มหรือแก้ไขคุณสมบัติการเข้าถึงของสถานที่ เช่น
                  &quot;ลิฟท์กว้าง&quot;, &quot;ทางลาดทางเข้า&quot;,
                  &quot;ห้องน้ำสำหรับผู้พิการ&quot;
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

          {/* คุณสมบัติการเข้าถึงโดยละเอียด */}
          <div className={tabIndex === 2 ? "block" : "hidden"}>
            <AccessibilityDetailsEditor
              features={formData.accessibilityScores}
              onUpdate={handleUpdateAccessibilityFeature}
            />
          </div>

          {/* รีวิวและความคิดเห็น */}
          <div className={tabIndex === 3 ? "block" : "hidden"}>
            <ReviewsManager locationId={Number(locationId)} />
          </div>

          {/* รูปภาพ */}
          <div className={tabIndex === 4 ? "block" : "hidden"}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปภาพสถานที่
              </label>

              {/* รูปภาพพรีวิว */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {originalImages.map((src, index) => (
                    <div
                      key={`original-${index}`}
                      className="relative aspect-square"
                    >
                      <img
                        src={src}
                        alt={`รูปที่ ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeOriginalImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {newImages.map((file, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative aspect-square"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`รูปใหม่ที่ ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs py-1 px-2 text-center">
                        รูปใหม่
                      </div>
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
                    คลิกเพื่ออัปโหลดรูปภาพใหม่ หรือลากและวางไฟล์ที่นี่
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
    </div>
  );
}
