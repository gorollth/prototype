// src/app/profile/edit/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Camera, Trash2 } from "lucide-react";
import { useLanguage } from "../../../../contexts/LanguageContext";

// ข้อมูลผู้ใช้จำลอง
const mockUserData = {
  fullName: "Tendou Souji",
  email: "tendou@example.com",
  phone: "099-999-9999",
  profileImage: "/image/profile/profile.jpg",
};

// รูปโปรไฟล์เริ่มต้น (ใช้เมื่อผู้ใช้ลบรูปโปรไฟล์)
const DEFAULT_PROFILE_IMAGE = "/api/placeholder/96/96";

export default function EditProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState(mockUserData);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    mockUserData.profileImage
  );
  const [showDeleteImageConfirm, setShowDeleteImageConfirm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ฟังก์ชันลบรูปโปรไฟล์
  const handleDeleteImage = () => {
    setProfileImage(DEFAULT_PROFILE_IMAGE);
    setShowDeleteImageConfirm(false);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // จำลองการบันทึกข้อมูล
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Saving profile data:", {
        ...formData,
        profileImage:
          profileImage === DEFAULT_PROFILE_IMAGE
            ? "Profile image removed"
            : profileImage !== mockUserData.profileImage
            ? "New profile image"
            : "Same image",
      });

      // กลับไปยังหน้าโปรไฟล์
      router.push("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold">
              {t("profile.edit") || "แก้ไขโปรไฟล์"}
            </h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 ${
              saving ? "opacity-70" : ""
            }`}
          >
            <Save size={18} />
            {saving
              ? t("common.saving") || "กำลังบันทึก..."
              : t("common.save") || "บันทึก"}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Profile Image */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* รูปโปรไฟล์ */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={profileImage || DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ปุ่มแก้ไขรูปโปรไฟล์ */}
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md"
                title={t("profile.change.photo") || "เปลี่ยนรูปโปรไฟล์"}
              >
                <Camera size={16} />
              </label>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* แยกออกมาเป็นปุ่มลบรูปด้านล่าง */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowDeleteImageConfirm(true)}
                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
              >
                <Trash2 size={14} />
                <span>{t("profile.remove.photo") || "ลบรูปโปรไฟล์"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          <h2 className="font-medium text-lg">
            {t("profile.basic.info") || "ข้อมูลพื้นฐาน"}
          </h2>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("profile.full.name") || "ชื่อ-นามสกุล"}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("profile.email") || "อีเมล"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("profile.phone") || "เบอร์โทรศัพท์"}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </form>

      {/* Modal ยืนยันการลบรูปโปรไฟล์ */}
      {showDeleteImageConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t("profile.confirm.remove.photo") || "ยืนยันการลบรูปโปรไฟล์"}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("profile.confirm.remove.photo.message") ||
                "คุณแน่ใจหรือไม่ว่าต้องการลบรูปโปรไฟล์นี้?"}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteImageConfirm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                {t("common.cancel") || "ยกเลิก"}
              </button>
              <button
                onClick={handleDeleteImage}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {t("common.remove") || "ลบ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
