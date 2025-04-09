// src/app/admin/posts/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, X, Plus, Upload } from "lucide-react";
import Link from "next/link";

export default function AddPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    status: "draft",
    tags: [""] as string[],
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const addTagField = () => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  };

  const removeTagField = (index: number) => {
    const newTags = [...formData.tags];
    newTags.splice(index, 1);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImageURLs = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...newImageURLs]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // กรองแท็กที่ว่างออก
      const filteredTags = formData.tags.filter((tag) => tag.trim() !== "");

      // จำลองการบันทึกข้อมูล
      console.log("Saving new post:", {
        ...formData,
        tags: filteredTags,
        images: images.length,
      });

      // รอสักครู่เพื่อจำลองการส่งข้อมูล
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // กลับไปยังหน้ารายการโพสต์
      router.push("/admin/posts");
    } catch (error) {
      console.error("Error saving post:", error);
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/posts" className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">เพิ่มโพสต์ใหม่</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                หัวข้อ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรอกหัวข้อโพสต์"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                เนื้อหา <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรอกเนื้อหาโพสต์"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="">เลือกหมวดหมู่</option>
                  <option value="routes">เส้นทาง</option>
                  <option value="places">สถานที่</option>
                  <option value="tips">เคล็ดลับ</option>
                  <option value="equipment">อุปกรณ์</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  สถานะ <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">แบบร่าง</option>
                  <option value="under_review">กำลังตรวจสอบ</option>
                  <option value="published">เผยแพร่</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                แท็ก
              </label>
              <div className="space-y-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleTagChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`แท็ก ${index + 1}`}
                    />
                    {formData.tags.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTagField(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTagField}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2"
                >
                  <Plus size={16} />
                  <span>เพิ่มแท็ก</span>
                </button>
              </div>
            </div>

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
        </div>

        {/* ปุ่มดำเนินการ */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/posts"
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
            {saving ? "กำลังบันทึก..." : "บันทึกโพสต์"}
          </button>
        </div>
      </form>
    </div>
  );
}
