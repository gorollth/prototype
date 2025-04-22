// src/app/community/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  User,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { samplePosts, Post, sampleComments } from "@/data/community";
import { useLanguage } from "../../../../contexts/LanguageContext";

// เพิ่ม interface สำหรับ Comment
interface Comment {
  id: number;
  postId: number;
  username: string;
  content: string;
  createdAt: string;
}

export default function CommunityPostDetail() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]); // แก้ไขจาก any[] เป็น Comment[]
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // จำลองการดึงข้อมูลโพสต์
    const postId = Number(params.id);
    const foundPost = samplePosts.find((p) => p.id === postId);
    const postComments = sampleComments.filter(
      (comment) => comment.postId === postId
    );

    // Simulate API call
    setTimeout(() => {
      if (foundPost) {
        setPost(foundPost);
        setLikeCount(foundPost.likes);
        setComments(postComments);

        // รวมรูปภาพทั้งหมด (รูปหลักและรูปเพิ่มเติม)
        const images: string[] = [];
        if (foundPost.imageUrl) {
          images.push(foundPost.imageUrl);
        }
        if (foundPost.images && foundPost.images.length > 0) {
          images.push(...foundPost.images);
        }
        setAllImages(images);
      }
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    // Share implementation would go here
    alert(t("community.share.alert") || "คุณต้องการแชร์โพสต์นี้");
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // จำลองการเพิ่มคอมเม้นท์ใหม่
    const newComment: Comment = {
      id: Math.max(...comments.map((c) => c.id), 0) + 1,
      postId: post?.id || 0,
      username: "you", // สมมติว่าเป็นผู้ใช้ปัจจุบัน
      content: comment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  const goToNextImage = () => {
    if (currentImageIndex < allImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-1">
              <ArrowLeft size={24} />
            </div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="animate-pulse space-y-4 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold">
              {t("community.post.not.found") || "ไม่พบโพสต์"}
            </h1>
          </div>
        </div>

        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 mb-4 text-center">
            {t("community.post.not.exist") || "ไม่พบโพสต์ที่คุณต้องการ"}
          </p>
          <button
            onClick={() => router.push("/community")}
            className="px-4 py-2 bg-blue-600 text-white rounded-full"
          >
            {t("community.back.to.all") || "กลับไปยังชุมชน"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header - เหมือนในรูปตัวอย่าง */}
      <div className="bg-white px-4 py-3 sticky top-0 z-10 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="p-1">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-base font-medium">
            {t("community.post") || "โพสต์"}
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={handleShare} aria-label="Share post">
            <Share2 size={18} />
          </button>
          <button aria-label="More options">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="mb-16">
        {" "}
        {/* Extra bottom padding for comment box */}
        {/* User info - เหมือนในรูปตัวอย่าง */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {post.authorAvatar ? (
                <img
                  src={post.authorAvatar}
                  alt={post.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={18} className="text-gray-600" />
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">@{post.username}</p>
              <p className="text-xs text-gray-500">
                {post.createdAt
                  ? new Date(post.createdAt)
                      .toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                      .replace(/\//g, "/") // ใช้รูปแบบวันที่ 15/3/2567 เหมือนในรูปตัวอย่าง
                  : ""}
              </p>
            </div>
          </div>
          <button className="text-blue-600 font-medium text-sm px-3 py-1 rounded-full border border-blue-600">
            {t("community.follow") || "ติดตาม"}
          </button>
        </div>
        {/* Post title - เหมือนในรูปตัวอย่าง */}
        <div className="px-4 py-2 mb-1">
          <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
        </div>
        {/* Image Slider - แบบเต็มจอเหมือนในรูปตัวอย่าง */}
        {allImages.length > 0 && (
          <div className="relative mb-4 bg-gray-100">
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={allImages[currentImageIndex]}
                alt={`${post.title} image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* ตัวแสดงตำแหน่งรูปภาพด้านล่าง เหมือนในรูปตัวอย่าง */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {allImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* ปุ่มเลื่อนซ้าย */}
            {currentImageIndex > 0 && (
              <button
                onClick={goToPrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1"
                aria-label="Previous image"
              >
                <ChevronLeft size={30} className="text-white drop-shadow-md" />
              </button>
            )}

            {/* ปุ่มเลื่อนขวา */}
            {currentImageIndex < allImages.length - 1 && (
              <button
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                aria-label="Next image"
              >
                <ChevronRight size={30} className="text-white drop-shadow-md" />
              </button>
            )}
          </div>
        )}
        {/* Post content */}
        <div className="px-4 py-2">
          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          {/* Tags - Horizontal scrollable */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto py-2 no-scrollbar">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Engagement bar */}
        <div className="px-4 py-3 flex items-center justify-between mt-1 border-t border-gray-100">
          <div className="flex items-center gap-5">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5"
              aria-label={t("community.like.post") || "ถูกใจโพสต์"}
            >
              <Heart
                size={22}
                className={liked ? "fill-red-500 text-red-500" : ""}
              />
              <span className="text-sm">{likeCount}</span>
            </button>
            <button
              onClick={toggleComments}
              className="flex items-center gap-1.5"
              aria-label={t("community.comments") || "ความคิดเห็น"}
            >
              <MessageCircle size={22} />
              <span className="text-sm">{comments.length}</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5"
            aria-label={t("community.save.post") || "บันทึกโพสต์"}
          >
            <Bookmark
              size={22}
              className={saved ? "fill-blue-500 text-blue-500" : ""}
            />
          </button>
        </div>
        {/* Comments section - Toggle on click */}
        {showComments && (
          <div className="mt-1 border-t bg-gray-50">
            <div className="p-4">
              <h3 className="font-semibold text-base mb-4">
                {t("community.comments") || "ความคิดเห็น"} ({comments.length})
              </h3>

              {comments.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <MessageCircle
                    size={36}
                    className="mx-auto mb-2 text-gray-300"
                  />
                  <p>{t("community.no.comments") || "ยังไม่มีความคิดเห็น"}</p>
                  <p className="text-sm mt-1">
                    {t("community.be.first") || "เป็นคนแรกที่แสดงความคิดเห็น"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-3 pb-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        <User size={14} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">
                            {comment.username === "you"
                              ? t("community.you") || "คุณ"
                              : comment.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "th-TH"
                            )}
                          </p>
                        </div>
                        <p className="text-gray-800 text-sm">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Comment input - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3">
        <form
          onSubmit={handleSubmitComment}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("community.write.comment") || "เขียนความคิดเห็น..."}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              comment.trim()
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {t("community.post") || "โพสต์"}
          </button>
        </form>
      </div>
    </div>
  );
}
