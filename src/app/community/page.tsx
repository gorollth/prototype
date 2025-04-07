// src/app/community/page.tsx
"use client";

import { useState } from "react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { PostCard } from "@/components/PostCard";
import { SearchBar } from "@/components/SearchBar";
import { samplePosts } from "@/data/community"; // นำเข้าข้อมูลจากไฟล์ใหม่
import { useLanguage } from "../../../contexts/LanguageContext";

export default function CommunityPage() {
  const { t } = useLanguage();
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredPosts(samplePosts);
      return;
    }

    const filtered = samplePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleCategorySelect = (category: string) => {
    if (category === "All") {
      setFilteredPosts(samplePosts);
    } else {
      const filtered = samplePosts.filter((post) => post.category === category);
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 text-gray-600">
      <SearchBar onSearch={handleSearch} />
      <CategoryTabs onSelect={handleCategorySelect} />
      <div className="grid grid-cols-2 gap-2 p-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">{t("community.no.posts")}</p>
        </div>
      )}
    </div>
  );
}
