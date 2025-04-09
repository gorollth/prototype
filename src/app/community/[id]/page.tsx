// src/app/profile/posts/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Save, X, Camera } from "lucide-react";
import { myPosts, UserPost } from "@/data/userPosts";
import Image from "next/image"; // เพิ่ม import Image จาก next/image

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    tags: string[];
    imageUrl?: string;
  }>({
    title: "",
    content: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [originalPost, setOriginalPost] = useState<UserPost | null>(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  useEffect(() => {
    // จำลองการดึงข้อมูลโพสต์เพื่อแก้ไข
    setTimeout(() => {
      const postId = Number(params.id);
      const foundPost = myPosts.find((p) => p.id === postId);

      if (foundPost) {
        setOriginalPost(foundPost);
        setFormData({
          title: foundPost.title,
          content: foundPost.content,
          tags: foundPost.tags || [],
          imageUrl: foundPost.imageUrl,
        });
      } else {
        setNotFound(true);
      }

      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleBack = () => {
    // ตรวจสอบว่ามีการเปลี่ยนแปลงข้อมูลหรือไม่
    if (
      formData.title !== originalPost?.title ||
      formData.content !== originalPost?.content ||
      JSON.stringify(formData.tags) !== JSON.stringify(originalPost?.tags || [])
    ) {
      setShowDiscardModal(true);
    } else {
      router.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // จำลองการบันทึกข้อมูล (ในโปรเจคจริงควรจะส่ง API request)
      console.log("Saving updated post:", {
        id: params.id,
        ...formData,
      });

      // จำลองการรอการบันทึก
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // แสดงข้อความยืนยันการบันทึก
      alert("บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว");

      // กลับไปยังหน้ารายละเอียดโพสต์
      router.push(`/profile/posts/${params.id}`);
    } catch (error) {
      console.error("Error saving post:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSaving(false);
    }
  };

  const handleImageClick = () => {
    // ในกรณีจริงควรจะมีการเปิด file dialog เพื่อให้ผู้ใช้เลือกรูปภาพ
    alert("ฟังก์ชันอัพโหลดรูปภาพจะถูกเพิ่มในอนาคต");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-1">
              <ChevronLeft size={24} />
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-1">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold">ไม่พบโพสต์</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 mb-4">ไม่พบโพสต์ที่ต้องการแก้ไข</p>
            <button
              onClick={() => router.push("/profile/posts")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              กลับไปยังโพสต์ทั้งหมด
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold">แก้ไขโพสต์</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 ${
              saving ? "opacity-70" : ""
            }`}
          >
            <Save size={18} />
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4">
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                หัวข้อ
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="หัวข้อโพสต์"
                required
              />
            </div>

            {/* Content */}
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                เนื้อหา
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เนื้อหาโพสต์"
                required
              />
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปภาพ
              </label>
              <div
                onClick={handleImageClick}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors"
              >
                {formData.imageUrl ? (
                  <div className="relative">
                    <Image
                      src={formData.imageUrl}
                      alt="โพสต์รูปภาพ"
                      width={640}
                      height={360}
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <div className="absolute top-0 right-0 p-1">
                      <button
                        type="button"
                        className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData((prev) => ({
                            ...prev,
                            imageUrl: undefined,
                          }));
                        }}
                      >
                        <X size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Camera size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      คลิกเพื่อเพิ่มรูปภาพ
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                แท็ก
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-400 hover:text-blue-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="เพิ่มแท็ก"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                >
                  เพิ่ม
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                กด Enter หรือคลิกที่ปุ่ม &quot;เพิ่ม&quot; เพื่อเพิ่มแท็ก
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* Discard Changes Modal */}
      {showDiscardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยกเลิกการแก้ไข?
            </h3>
            <p className="text-gray-600 mb-6">
              คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก
              คุณแน่ใจหรือไม่ว่าต้องการออกจากหน้านี้?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDiscardModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                ยืนยันการยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
