// src/components/MyPosts.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { myPosts } from "@/data/userPosts";
import { Edit, ChevronRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export function MyPosts() {
  const { t } = useLanguage();
  const router = useRouter();
  const [posts] = useState(myPosts.slice(0, 2)); // แสดงเฉพาะ 2 โพสต์ล่าสุด

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{t("profile.my.posts")}</h2>
        <button
          onClick={() => router.push("/profile/posts")}
          className="text-sm text-blue-600 flex items-center"
        >
          {t("common.see.all")} <ChevronRight size={16} />
        </button>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between">
                <h3 className="font-medium mb-1">{post.title}</h3>
                <button
                  onClick={() => router.push(`/profile/posts/edit/${post.id}`)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Edit size={16} />
                </button>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {post.content}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500 mb-2">{t("profile.no.posts.yet")}</p>
          <button
            onClick={() => router.push("/add-post")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            {t("profile.create.post")}
          </button>
        </div>
      )}
    </div>
  );
}
