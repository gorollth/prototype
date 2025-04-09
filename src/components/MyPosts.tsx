// src/components/MyPosts.tsx
"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Heart, ChevronRight } from "lucide-react";
import { myPosts, UserPost } from "@/data/userPosts";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";

export function MyPosts() {
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // จำลองการดึงข้อมูลโพสต์ของผู้ใช้
    setTimeout(() => {
      // แสดงเพียง 3 โพสต์ล่าสุดในหน้าโปรไฟล์
      setUserPosts(myPosts.slice(0, 3));
      setLoading(false);
    }, 500);
  }, []);

  const handlePostClick = (postId: number) => {
    router.push(`/profile/posts/${postId}`);
  };

  const viewAllPosts = () => {
    // เปิดหน้ารวมโพสต์ทั้งหมดของผู้ใช้
    router.push("/profile/posts");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        {[1, 2].map((i) => (
          <div key={i} className="mb-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!userPosts.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4">โพสต์ของฉัน</h3>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">คุณยังไม่มีโพสต์</p>
          <button
            onClick={() => router.push("/add-post")}
            className="mt-2 text-blue-600 font-medium"
          >
            สร้างโพสต์แรกของคุณ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">โพสต์ของฉัน</h3>
        <button
          onClick={viewAllPosts}
          className="text-blue-600 flex items-center gap-1 text-sm"
        >
          ดูทั้งหมด
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {userPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="border-b pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <h4 className="font-medium line-clamp-1">{post.title}</h4>
            <p className="text-gray-600 text-sm line-clamp-2 mt-1">
              {post.content}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Heart size={14} />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={14} />
                <span>{post.comments}</span>
              </div>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
