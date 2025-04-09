// src/app/profile/posts/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Heart, MessageCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { myPosts, UserPost } from "@/data/userPosts";
import { useLanguage } from "../../../../contexts/LanguageContext";

export default function MyPostsPage() {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<UserPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    // จำลองการดึงข้อมูลโพสต์ของผู้ใช้
    setTimeout(() => {
      setPosts(myPosts);
      setFilteredPosts(myPosts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handlePostClick = (postId: number) => {
    router.push(`/profile/posts/${postId}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">โพสต์ของฉัน</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาโพสต์ของคุณ"
            className="w-full p-3 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow-sm animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">
                {searchTerm ? "ไม่พบโพสต์ที่ตรงกับคำค้นหา" : "คุณยังไม่มีโพสต์"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push("/add-post")}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  สร้างโพสต์ใหม่
                </button>
              )}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <h2 className="font-medium text-lg mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.content}
                </p>

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

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart size={16} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
