// src/app/admin/posts/view/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Heart,
  MessageCircle,
  Trash2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { samplePosts, sampleComments } from "@/data/community"; // นำเข้าข้อมูลจาก data/community

export default function ViewPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<any | null>(null);
  const [postComments, setPostComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลโพสต์
    const loadPost = () => {
      setTimeout(() => {
        const foundPost = samplePosts.find((p) => p.id === Number(postId));
        if (foundPost) {
          setPost(foundPost);

          // ดึงความคิดเห็นที่เกี่ยวข้องกับโพสต์นี้
          const relatedComments = sampleComments.filter(
            (c) => c.postId === Number(postId)
          );
          setPostComments(relatedComments);
        }
        setLoading(false);
      }, 500);
    };

    loadPost();
  }, [postId]);

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    // จำลองการลบโพสต์
    console.log("Deleting post:", post?.id);
    router.push("/admin/posts");
  };

  // ฟังก์ชันใหม่สำหรับการลบความคิดเห็น
  const confirmDeleteComment = (comment: any) => {
    setCommentToDelete(comment);
    setShowDeleteCommentModal(true);
  };

  const deleteComment = () => {
    if (commentToDelete) {
      // ลบความคิดเห็นออกจาก state
      const updatedComments = postComments.filter(
        (comment) => comment.id !== commentToDelete.id
      );
      setPostComments(updatedComments);

      // ปิด modal
      setShowDeleteCommentModal(false);
      setCommentToDelete(null);

      // ในโปรเจคจริงควรจะส่ง API request เพื่อลบความคิดเห็นด้วย
      console.log("Comment deleted:", commentToDelete.id);
    }
  };

  const nextImage = () => {
    if (post && post.images) {
      setCurrentImageIndex((prev) =>
        prev === post.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (post && post.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? post.images.length - 1 : prev - 1
      );
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
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบโพสต์</h1>
        <p className="text-gray-600 mb-6">ไม่พบโพสต์ที่คุณต้องการดู</p>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">รายละเอียดโพสต์</h1>
        </div>
        <div className="flex gap-2">
          {/* นำปุ่มแก้ไขออก */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={18} />
            <span>ลบโพสต์</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* โพสต์ */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={post.authorAvatar || "/api/placeholder/64/64"}
                  alt={`รูปโปรไฟล์ของ ${post.username}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-lg">{post.username}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "ไม่ระบุวันที่"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart size={18} className="text-red-500" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={18} className="text-blue-500" />
                <span>{postComments.length}</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>

          {/* รูปภาพ */}
          {post.images && post.images.length > 0 && (
            <div className="mb-6 relative">
              <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={post.images[currentImageIndex]}
                  alt={`รูปภาพประกอบโพสต์ ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {post.images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="flex mt-2 gap-2 overflow-x-auto">
                    {post.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 ${
                          currentImageIndex === index
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`รูปภาพประกอบโพสต์ ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="prose max-w-none mb-6">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>

          {/* หมวดหมู่ */}
          <div className="mb-6">
            <p className="font-medium mb-2">หมวดหมู่:</p>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {post.category}
            </span>
          </div>

          {/* ความคิดเห็น */}
          <div>
            <h3 className="font-medium text-lg mb-4">
              ความคิดเห็น ({postComments.length})
            </h3>
            {postComments.length > 0 ? (
              <div className="space-y-4">
                {postComments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 p-4 rounded-lg relative"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">
                        {comment.username || comment.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500">
                          {comment.timestamp ||
                            (comment.createdAt &&
                              new Date(comment.createdAt).toLocaleDateString(
                                "th-TH",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              ))}
                        </div>
                        {/* ปุ่มลบความคิดเห็น */}
                        <button
                          onClick={() => confirmDeleteComment(comment)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                          title="ลบความคิดเห็น"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">ยังไม่มีความคิดเห็น</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal ยืนยันการลบโพสต์ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบโพสต์
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบโพสต์ &quot;{post.title}&quot; ใช่หรือไม่?
              การกระทำนี้ไม่สามารถย้อนกลับได้
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
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal ยืนยันการลบความคิดเห็น */}
      {showDeleteCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบความคิดเห็น
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบความคิดเห็นนี้ใช่หรือไม่?
              การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteCommentModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={deleteComment}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
