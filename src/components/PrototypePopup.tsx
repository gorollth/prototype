// src/components/PrototypePopup.tsx
"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

interface PrototypePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrototypePopup({ isOpen, onClose }: PrototypePopupProps) {
  const { t, language } = useLanguage();
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAnimationClass("opacity-100 scale-100");
      // ป้องกันการเลื่อนพื้นหลัง
      document.body.style.overflow = "hidden";
    } else {
      setAnimationClass("opacity-0 scale-95");
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // ข้อความที่ต้องการแสดงตามภาษา
  const messages = {
    en: {
      title: "Prototype Version",
      message:
        "This is a prototype version of GOROLL application. Features may not be fully functional and are for demonstration purposes only.",
      button: "I understand",
    },
    th: {
      title: "เวอร์ชันต้นแบบ",
      message:
        "นี่เป็นเวอร์ชันต้นแบบของแอปพลิเคชัน GOROLL ฟีเจอร์บางอย่างอาจไม่ทำงานเต็มรูปแบบและมีไว้เพื่อการสาธิตเท่านั้น",
      button: "เข้าใจแล้ว",
    },
  };

  // ใช้ภาษาปัจจุบัน หรือถ้าไม่มีให้ใช้ภาษาอังกฤษ
  const currentLang = language as keyof typeof messages;
  const content = messages[currentLang] || messages.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div
        className={`relative bg-white rounded-xl max-w-md w-full p-6 shadow-lg transform transition-all duration-300 ${animationClass}`}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
            <svg
              className="h-10 w-10 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {content.title}
          </h3>
          <p className="text-gray-600 mb-6">{content.message}</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {content.button}
          </button>
        </div>
      </div>
    </div>
  );
}
