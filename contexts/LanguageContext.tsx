// src/contexts/LanguageContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// Define supported languages
export type Language = "en" | "th";

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.map": "Map",
    "nav.carpool": "Carpool",
    "nav.community": "Community",
    "nav.profile": "Profile",

    // Map
    "map.search": "Search here...",
    "map.accessibility": "Accessibility",
    "map.accessibility.fully": "Fully Accessible",
    "map.accessibility.partially": "Partially Accessible",
    "map.accessibility.limited": "Limited Access",

    // Actions
    "action.record.route": "Record Route",
    "action.report.obstacle": "Report Obstacle",
    "action.add.post": "Add Post",

    // Carpool
    "carpool.title": "Carpool",
    "carpool.available.rides": "Available Rides",
    "carpool.my.rides": "My Rides",
    "carpool.from": "From:",
    "carpool.to": "To:",
    "carpool.more.info": "More info",
    "carpool.ride.details": "Ride Details",
    "carpool.vehicle.info": "Vehicle Information",
    "carpool.price.per.seat": "Price per seat",
    "carpool.chat.with.driver": "Chat with Driver",
    "carpool.book.now": "Book Now",

    // Community
    "community.search": "Search here...",
    "community.categories.all": "All",
    "community.categories.guides": "Guides & Tips",
    "community.categories.equipment": "Equipment Reviews",
    "community.categories.stories": "Inspiring Stories",
    "community.categories.news": "News & Events",
    "community.categories.services": "Support Services",
    "community.categories.routes": "Suggested Routes",
    "community.categories.health": "Health & Self Care",
    "community.categories.career": "Career & Work",
    "community.post": "Post",
    "community.create.post": "Create Post",
    "community.share": "Share",
    "community.add.location": "Add location",

    // Profile
    "profile.edit": "Edit Profile",
    "profile.routes": "Routes",
    "profile.following": "Following",
    "profile.followers": "Followers",
    "profile.wheelchair.info": "Wheelchair Information",
    "profile.tabs.all": "All Routes",
    "profile.tabs.recorded": "Recorded",
    "profile.tabs.saved": "Saved",

    // Auth
    "auth.login": "Sign in",
    "auth.signup": "Sign up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.forgot": "Forgot password?",
    "auth.continue.with": "Or continue with",
    "auth.google": "Continue with Google",
    "auth.no.account": "Do not have an account?",

    // Common
    "common.cancel": "Cancel",
    "common.save": "Save Changes",
    "common.submit": "Submit",
    "common.add.photos": "Add photos",
    "common.description": "Description",
  },
  th: {
    // Navigation
    "nav.map": "แผนที่",
    "nav.carpool": "รถร่วม",
    "nav.community": "ชุมชน",
    "nav.profile": "โปรไฟล์",

    // Map
    "map.search": "ค้นหาที่นี่...",
    "map.accessibility": "การเข้าถึง",
    "map.accessibility.fully": "เข้าถึงได้เต็มที่",
    "map.accessibility.partially": "เข้าถึงได้บางส่วน",
    "map.accessibility.limited": "เข้าถึงได้จำกัด",

    // Actions
    "action.record.route": "บันทึกเส้นทาง",
    "action.report.obstacle": "รายงานอุปสรรค",
    "action.add.post": "เพิ่มโพสต์",

    // Carpool
    "carpool.title": "รถร่วม",
    "carpool.available.rides": "รถที่ว่างอยู่",
    "carpool.my.rides": "การเดินทางของฉัน",
    "carpool.from": "จาก:",
    "carpool.to": "ถึง:",
    "carpool.more.info": "ข้อมูลเพิ่มเติม",
    "carpool.ride.details": "รายละเอียดการเดินทาง",
    "carpool.vehicle.info": "ข้อมูลยานพาหนะ",
    "carpool.price.per.seat": "ราคาต่อที่นั่ง",
    "carpool.chat.with.driver": "แชทกับคนขับ",
    "carpool.book.now": "จองตอนนี้",

    // Community
    "community.search": "ค้นหาที่นี่...",
    "community.categories.all": "ทั้งหมด",
    "community.categories.guides": "คู่มือและเคล็ดลับ",
    "community.categories.equipment": "รีวิวอุปกรณ์",
    "community.categories.stories": "เรื่องราวแรงบันดาลใจ",
    "community.categories.news": "ข่าวสารและกิจกรรม",
    "community.categories.services": "บริการให้ความช่วยเหลือ",
    "community.categories.routes": "แผนเดินทางแนะนำ",
    "community.categories.health": "สุขภาพและการดูแลตัวเอง",
    "community.categories.career": "อาชีพและการทำงาน",
    "community.post": "โพสต์",
    "community.create.post": "สร้างโพสต์",
    "community.share": "แชร์",
    "community.add.location": "เพิ่มตำแหน่งที่ตั้ง",

    // Profile
    "profile.edit": "แก้ไขโปรไฟล์",
    "profile.routes": "เส้นทาง",
    "profile.following": "กำลังติดตาม",
    "profile.followers": "ผู้ติดตาม",
    "profile.wheelchair.info": "ข้อมูลรถเข็น",
    "profile.tabs.all": "เส้นทางทั้งหมด",
    "profile.tabs.recorded": "ที่บันทึก",
    "profile.tabs.saved": "ที่บันทึกไว้",

    // Auth
    "auth.login": "เข้าสู่ระบบ",
    "auth.signup": "ลงทะเบียน",
    "auth.email": "อีเมล์",
    "auth.password": "รหัสผ่าน",
    "auth.forgot": "ลืมรหัสผ่าน?",
    "auth.continue.with": "หรือดำเนินการต่อด้วย",
    "auth.google": "ดำเนินการต่อด้วย Google",
    "auth.no.account": "ยังไม่มีบัญชี?",

    // Common
    "common.cancel": "ยกเลิก",
    "common.save": "บันทึกการเปลี่ยนแปลง",
    "common.submit": "ส่ง",
    "common.add.photos": "เพิ่มรูปภาพ",
    "common.description": "รายละเอียด",
  },
};

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Get initial language from local storage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      return savedLanguage && (savedLanguage === "en" || savedLanguage === "th")
        ? savedLanguage
        : "en";
    }
    return "en";
  });

  // Persist language selection to local storage
  useEffect(() => {
    localStorage.setItem("language", language);
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Function to set language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
