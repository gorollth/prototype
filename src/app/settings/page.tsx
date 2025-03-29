// src/app/settings/page.tsx
"use client";

import {
  ArrowLeft,
  Bell,
  Lock,
  MapPin,
  Shield,
  User,
  Globe,
  MessageCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SettingOption } from "../../components/SettingOption";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function SettingsPage() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { t } = useLanguage(); // เพิ่มบรรทัดนี้

  const handleLogout = () => {
    // Implement logout logic
    router.push("/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            {t("settings.title")}
          </h1>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 py-4">
        {/* Application Settings */}
        <div>
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">
            {t("settings.app")}
          </h2>
          <div className="bg-white rounded-lg">
            <SettingOption
              icon={<Globe size={20} />}
              title={t("settings.language")}
              rightContent={<LanguageSwitcher variant="text" />}
            />
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">
            {t("settings.support")}
          </h2>
          <div className="bg-white rounded-lg">
            <SettingOption
              icon={<MessageCircle size={20} />}
              title={t("settings.contact.support")}
              onClick={() => router.push("/support")}
            />
            <SettingOption
              icon={<HelpCircle size={20} />}
              title={t("settings.help.faq")}
              onClick={() => router.push("/help")}
            />
          </div>
        </div>

        {/* Logout */}
        <div className="px-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
          >
            <LogOut size={20} />
            {t("settings.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
