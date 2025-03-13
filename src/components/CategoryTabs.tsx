// Path: src/app/community/components/CategoryTabs.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const categoryKeys = [
  "all",
  "guides",
  "equipment",
  "stories",
  "news",
  "services",
  "routes",
  "health",
  "career",
];

export type CategoryType =
  | "All"
  | "Guides & Tips"
  | "Equipment Reviews"
  | "Inspiring Stories"
  | "News & Events"
  | "Support Services"
  | "Suggested Routes"
  | "Health & Self Care"
  | "Career & Work";

export function CategoryTabs({
  onSelect,
  initialCategory = "All",
}: {
  onSelect: (category: CategoryType) => void;
  initialCategory?: CategoryType;
}) {
  const [selected, setSelected] = useState<CategoryType>(initialCategory);
  const { t } = useLanguage();

  const handleSelect = (category: CategoryType) => {
    setSelected(category);
    onSelect(category);
  };

  // Map translation keys to category types
  const getCategoryName = (key: string): CategoryType => {
    const mapping: Record<string, CategoryType> = {
      all: "All",
      guides: "Guides & Tips",
      equipment: "Equipment Reviews",
      stories: "Inspiring Stories",
      news: "News & Events",
      services: "Support Services",
      routes: "Suggested Routes",
      health: "Health & Self Care",
      career: "Career & Work",
    };
    return mapping[key];
  };

  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-4 bg-white sticky top-0 z-10 scrollbar-hide">
      {categoryKeys.map((key) => {
        const category = getCategoryName(key);
        return (
          <button
            key={key}
            onClick={() => handleSelect(category)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors
              ${
                selected === category
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {t(`community.categories.${key}`)}
          </button>
        );
      })}
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
