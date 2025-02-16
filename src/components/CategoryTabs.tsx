// Path: src/app/community/components/CategoryTabs.tsx
"use client";

import { useState } from "react";

const categories = [
  "All",
  "Guides & Tips", // คู่มือและเคล็ดลับ
  "Equipment Reviews", // รีวิวอุปกรณ์
  "Inspiring Stories", // เรื่องราวแรงบันดาลใจ
  "News & Events", // ข่าวสารและกิจกรรม
  "Support Services", // บริการให้ความช่วยเหลือ
  "Suggested Routes", // แผนเดินทางแนะนำ
  "Health & Self Care", // สุขภาพและการดูแลตัวเอง
  "Career & Work", // อาชีพและการทำงาน
];

export type CategoryType = (typeof categories)[number];

export function CategoryTabs({
  onSelect,
  initialCategory = "All",
}: {
  onSelect: (category: CategoryType) => void;
  initialCategory?: CategoryType;
}) {
  const [selected, setSelected] = useState<CategoryType>(initialCategory);

  const handleSelect = (category: CategoryType) => {
    setSelected(category);
    onSelect(category);
  };

  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-4 bg-white sticky top-0 z-10 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors
            ${
              selected === category
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

// Optional: Add helper for filtering content by category
export function getCategoryDescription(category: CategoryType): string {
  const descriptions: Record<CategoryType, string> = {
    All: "All community posts",
    "Guides & Tips": "Helpful guides and useful tips for accessibility",
    "Equipment Reviews":
      "Reviews and recommendations for accessibility equipment",
    "Inspiring Stories": "Stories and experiences from the community",
    "News & Events": "Latest news and upcoming accessibility events",
    "Support Services": "Information about support and assistance services",
    "Suggested Routes": "Recommended accessible routes and travel plans",
    "Health & Self Care": "Health tips and self-care guidance",
    "Career & Work": "Career opportunities and workplace accessibility",
  };

  return descriptions[category];
}
