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
// Removed Switch import

export default function SettingsPage() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 py-4">
        {/* Account Settings */}
        <div>
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">
            Account
          </h2>
          <div className="bg-white rounded-lg">
            <SettingOption
              icon={<User size={20} />}
              title="Edit Profile"
              onClick={() => router.push("/profile")}
            />
            <SettingOption
              icon={<Lock size={20} />}
              title="Change Password"
              onClick={() => router.push("/change-password")}
            />
          </div>
        </div>

        {/* Accessibility Settings */}
        <div>
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">
            Accessibility
          </h2>
          <div className="bg-white rounded-lg">
            <SettingOption
              icon={<MapPin size={20} />}
              title="Location Preferences"
              description="Manage your location settings"
              onClick={() => router.push("/settings/location")}
            />
            <SettingOption
              icon={<Shield size={20} />}
              title="Wheelchair Info"
              description="Update your wheelchair details"
              onClick={() => router.push("/settings/wheelchair")}
            />
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">
            Notifications
          </h2>
          <div className="bg-white rounded-lg">
            <SettingOption
              icon={<Bell size={20} />}
              title="Notifications"
              rightContent={
                <div
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    notificationsEnabled ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                >
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                      notificationsEnabled
                        ? "translate-x-full right-1"
                        : "translate-x-0 left-1"
                    }`}
                  />
                </div>
              }
            />
          </div>
        </div>

        {/* Application Settings */}
        <div>
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">App</h2>
          <div className="bg-white rounded-lg">
            <SettingOption
              icon={<Globe size={20} />}
              title="Language"
              rightContent={<LanguageSwitcher variant="text" />}
            />
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">
            Support
          </h2>
          <div className="bg-white rounded-lg">
            <SettingOption
              icon={<MessageCircle size={20} />}
              title="Contact Support"
              onClick={() => router.push("/support")}
            />
            <SettingOption
              icon={<HelpCircle size={20} />}
              title="Help & FAQ"
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
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
