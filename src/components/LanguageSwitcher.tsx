// src/components/LanguageSwitcher.tsx
"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "icon" | "text" | "full";
  className?: string;
}

export function LanguageSwitcher({
  variant = "full",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "th" : "en");
  };

  // Language names for display
  const languageNames: Record<typeof language, string> = {
    en: "ไทย",
    th: "English",
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 transition-colors ${className}`}
      aria-label="Switch language"
    >
      {variant !== "text" && <Globe className="w-4 h-4" />}

      {(variant === "full" || variant === "text") && (
        <span>{languageNames[language]}</span>
      )}
    </button>
  );
}
