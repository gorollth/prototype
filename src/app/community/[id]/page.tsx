// src/app/community/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  Send,
  ChevronRight,
  ChevronLeft as ArrowLeft,
} from "lucide-react";
import { use } from "react";
import { samplePosts, sampleComments, Post } from "@/data/community"; // นำเข้าข้อมูลจากไฟล์ใหม่
import { useLanguage } from "../../../../contexts/LanguageContext";

// สร้าง interface สำหรับ Comment
interface Comment {
  id: number;
  postId: number;
  username: string;
  content: string;
  createdAt: string;
  timestamp?: string;
}

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [post, setPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const { id } = use(params);

  useEffect(() => {
    // ค้นหาโพสต์ตาม ID
    const foundPost = samplePosts.find((p) => p.id === Number(id));
    if (foundPost) {
      setPost(foundPost);
    }

    // ค้นหาความคิดเห็นสำหรับโพสต์นี้
    const relatedComments = sampleComments.filter(
      (c) => c.postId === Number(id)
    );
    setPostComments(relatedComments);
  }, [id]);

  const handleComment = () => {
    if (comment.trim()) {
      // ในโปรเจคจริงจะส่ง API request เพื่อบันทึกความคิดเห็น
      // ที่นี่เราจะเพียงเพิ่มความคิดเห็นในหน้าจอ
      setPostComments([
        ...postComments,
        {
          id: Math.random(), // สำหรับการทดสอบเท่านั้น
          postId: Number(id),
          username: "current_user", // สมมติว่าเป็นผู้ใช้ปัจจุบัน
          content: comment,
          createdAt: new Date().toISOString(),
          timestamp: t("common.just.now"),
        },
      ]);
      setComment("");
    }
  };

  const nextImage = () => {
    if (post && post.images && post.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === (post.images ?? []).length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (post && post.images && post.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? (post.images ?? []).length - 1 : prev - 1
      );
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 text-gray-600">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={() => router.back()} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <h1 className="ml-2 text-lg font-semibold">{t("community.post")}</h1>
        </div>
      </div>

      {/* Post Content */}
      <div className="bg-white">
        {/* Author Info */}
        <div className="flex items-center p-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/api/placeholder/40/40"
              alt={post.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="font-medium">{post.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Image Carousel */}
        {post.images && post.images.length > 0 && (
          <div className="aspect-square bg-gray-100 relative">
            <img
              src={post.images[currentImageIndex]}
              alt={`${t("community.post.content")} ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {post.images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {post.images.map((_, index: number) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Actions and Content */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1"
            >
              <Heart
                size={24}
                className={
                  liked ? "fill-red-500 text-red-500" : "text-gray-600"
                }
              />
              <span className="text-sm text-gray-600">
                {liked ? post.likes + 1 : post.likes}
              </span>
            </button>
            <button className="flex items-center gap-1">
              <MessageCircle size={24} className="text-gray-600" />
              <span className="text-sm text-gray-600">
                {postComments.length}
              </span>
            </button>
            <button className="flex items-center gap-1">
              <Share2 size={24} className="text-gray-600" />
            </button>
          </div>
          <p className="font-medium mb-2">{post.title}</p>
          <p className="text-gray-600">{post.content}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="p-4 space-y-4">
          <h3 className="font-medium">{t("community.comments")}</h3>
          {postComments.length > 0 ? (
            postComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">{comment.username}</span>
                    <span className="text-xs text-gray-500">
                      {comment.timestamp ||
                        new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              {t("community.no.comments")}
            </p>
          )}
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("community.add.comment")}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleComment}
            disabled={!comment.trim()}
            className={`p-2 rounded-full ${
              comment.trim() ? "text-blue-500" : "text-gray-400"
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
