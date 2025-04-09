// src/app/profile/posts/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Heart,
  MessageCircle,
  Edit,
  Trash2,
  Calendar,
  Share2,
} from "lucide-react";
import { myPosts, UserPost } from "@/data/userPosts";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<UserPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // จำลองการดึงข้อมูลโพสต์
    setTimeout(() => {
      const postId = Number(params.id);
      const foundPost = myPosts.find((p) => p.id === postId);

      if (foundPost) {
        setPost(foundPost);
      }

      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    // จำลองการนำทางไปหน้าแก้ไขโพสต์
    if (post) {
      router.push(`/profile/posts/edit/${post.id}`);
    }
  };

  const handleDelete = () => {
    // จำลองการลบโพสต์
    setShowDeleteModal(false);

    // แสดงข้อความยืนยันการลบเสร็จสิ้น
    alert("ลบโพสต์เรียบร้อยแล้ว");

    // กลับไปยังหน้าโพสต์ทั้งหมด
    router.push("/profile/posts");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button className="p-1">
              <ChevronLeft size={24} />
            </button>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="h-40 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold">ไม่พบโพสต์</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 mb-4">ไม่พบโพสต์ที่คุณต้องการ</p>
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
            <h1 className="text-lg font-semibold">รายละเอียดโพสต์</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="แก้ไข"
            >
              <Edit size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="ลบ"
            >
              <Trash2 size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <h1 className="text-xl font-semibold mb-2">{post.title}</h1>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar size={16} className="mr-1" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Post Image (if available) */}
            {post.imageUrl && (
              <div className="mb-4">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="mb-6 text-gray-700 whitespace-pre-line">
              {post.content}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Interaction Stats */}
            <div className="flex items-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-red-50 rounded">
                  <Heart size={20} className="text-red-500" />
                </button>
                <span>{post.likes} ถูกใจ</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={20} className="text-blue-500" />
                <span>{post.comments} ความคิดเห็น</span>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded ml-auto">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบโพสต์
            </h3>
            <p className="text-gray-600 mb-6">
              คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้
              การกระทำนี้ไม่สามารถเรียกคืนได้
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                ลบโพสต์
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
