// src/app/admin/posts/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  X,
  Plus,
  Save,
  Upload,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { samplePosts } from "@/data/community";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [notAdmin, setNotAdmin] = useState(false); // เพิ่มสถานะนี้เพื่อตรวจสอบว่าเป็นโพสต์ของ admin หรือไม่

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [""] as string[],
  });

  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลโพสต์
    const fetchPost = () => {
      setTimeout(() => {
        const post = samplePosts.find((p) => p.id === Number(postId));
        if (!post) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // ตรวจสอบว่าเป็นโพสต์ของ admin หรือไม่
        if (!post.isAdmin) {
          setNotAdmin(true);
          setLoading(false);
          return;
        }

        setFormData({
          title: post.title,
          content: post.content || "",
          category: post.category,
          tags: post.tags || [""],
        });

        // ตั้งค่ารูปภาพ (ถ้ามี)
        if (post.images && post.images.length > 0) {
          setOriginalImages(post.images);
          setPreviewImages(post.images);
        }

        setLoading(false);
      }, 500);
    };

    fetchPost();
  }, [postId]);

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
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));

    setNewImages((prev) => [...prev, ...files]);
    setPreviewImages([...originalImages, ...newPreviewImages]);
  };

  const removeOriginalImage = (index: number) => {
    const newOriginalImages = [...originalImages];
    newOriginalImages.splice(index, 1);
    setOriginalImages(newOriginalImages);

    // อัพเดทพรีวิว
    const newPreviews = [...newOriginalImages];
    newImages.forEach((file) => {
      newPreviews.push(URL.createObjectURL(file));
    });
    setPreviewImages(newPreviews);
  };

  const removeNewImage = (index: number) => {
    const adjustedIndex = index - originalImages.length;
    const newImagesArray = [...newImages];
    newImagesArray.splice(adjustedIndex, 1);
    setNewImages(newImagesArray);

    // อัพเดทพรีวิว
    const newPreviews = [...originalImages];
    newImagesArray.forEach((file) => {
      newPreviews.push(URL.createObjectURL(file));
    });
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // กรองแท็กที่ว่างออก
      const filteredTags = formData.tags.filter((tag) => tag.trim() !== "");

      // จำลองการบันทึกข้อมูล
      console.log("Updating post:", {
        id: postId,
        ...formData,
        tags: filteredTags,
        originalImages,
        newImages: newImages.length,
      });

      // รอสักครู่เพื่อจำลองการส่งข้อมูล
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // กลับไปยังหน้ารายละเอียด post
      router.push(`/admin/posts/view/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
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

  // แสดงหน้า 404 ถ้าไม่พบโพสต์
  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบโพสต์</h1>
        <p className="text-gray-600 mb-6">ไม่พบโพสต์ที่คุณต้องการแก้ไข</p>
        <Link
          href="/admin/posts"
          className="bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
        >
          <ChevronLeft size={18} className="mr-2" />
          กลับไปหน้ารายการโพสต์
        </Link>
      </div>
    );
  }

  // แสดงหน้าแจ้งเตือนถ้าไม่ใช่โพสต์ของ admin
  if (notAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 text-yellow-700 max-w-md">
          <div className="flex items-center mb-2">
            <AlertTriangle size={24} className="mr-2" />
            <h2 className="text-lg font-bold">ไม่สามารถแก้ไขได้</h2>
          </div>
          <p>โพสต์นี้ไม่ได้สร้างโดยผู้ดูแลระบบ จึงไม่สามารถแก้ไขได้</p>
          <p className="mt-2">คุณสามารถลบโพสต์ได้จากหน้ารายละเอียดโพสต์</p>
        </div>
        <Link
          href={`/admin/posts/view/${postId}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
        >
          <ChevronLeft size={18} className="mr-2" />
          กลับไปหน้ารายละเอียดโพสต์
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href={`/admin/posts/view/${postId}`} className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">แก้ไขโพสต์</h1>
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
                  <option value="Routes">เส้นทาง</option>
                  <option value="Places">สถานที่</option>
                  <option value="Tips">เคล็ดลับ</option>
                  <option value="Equipment">อุปกรณ์</option>
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
                        onClick={() =>
                          index < originalImages.length
                            ? removeOriginalImage(index)
                            : removeNewImage(index)
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                      {index >= originalImages.length && (
                        <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs py-1 px-2 text-center">
                          รูปใหม่
                        </div>
                      )}
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
            href={`/admin/posts/view/${postId}`}
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
            <Save size={18} />
            {saving ? "กำลังบันทึก..." : "บันทึกโพสต์"}
          </button>
        </div>
      </form>
    </div>
  );
}
