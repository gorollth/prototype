// src/components/RecordingControlModal.tsx

"use client";

import React from "react";
import { StopCircle, XCircle } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface RecordingControlModalProps {
  isOpen: boolean;
  onStop: () => void; // ใช้สำหรับหยุดและบันทึกเส้นทาง
  onCancel: () => void; // ใช้สำหรับปิด modal โดยไม่ทำอะไร
  onDiscard?: () => void; // เพิ่มสำหรับยกเลิกการบันทึกโดยไม่บันทึกข้อมูล
  mode?: "stop" | "cancel"; // กำหนดโหมดการแสดงผล
}

export function RecordingControlModal({
  isOpen,
  onStop,
  onCancel,
  onDiscard,
  mode = "stop", // ค่าเริ่มต้นเป็นโหมด "stop"
}: RecordingControlModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  // ข้อความต่างๆ ตามโหมดการแสดงผล
  const messages = {
    stop: {
      title: t("route.recording.stop.confirm") || "ยืนยันการหยุดบันทึกเส้นทาง",
      message:
        t("route.recording.stop.message") ||
        "คุณแน่ใจหรือไม่ว่าต้องการหยุดการบันทึกเส้นทางนี้?",
      confirmButton: t("route.recording.stop") || "หยุดบันทึกและบันทึกเส้นทาง",
      cancelButton: t("common.cancel") || "ยกเลิก",
    },
    cancel: {
      title:
        t("route.recording.cancel.confirm") ||
        "ยืนยันการยกเลิกการบันทึกเส้นทาง",
      message:
        t("route.recording.cancel.message") ||
        "คุณต้องการยกเลิกการบันทึกเส้นทางนี้หรือไม่? เส้นทางจะไม่ถูกบันทึกในระบบ",
      confirmButton: t("route.recording.cancel") || "ยกเลิกการบันทึก",
      cancelButton: t("common.continue.recording") || "ดำเนินการบันทึกต่อ",
    },
  };

  // เลือกชุดข้อความตามโหมด
  const currentMessages = messages[mode];

  // จัดการการคลิกปุ่มแยกตามโหมด
  const handlePrimaryAction = () => {
    if (mode === "stop") {
      // โหมด stop: ปุ่มหลักคือ "หยุดบันทึกและบันทึกเส้นทาง"
      onStop();
    } else {
      // โหมด cancel: ปุ่มหลักคือ "ยกเลิกการบันทึก"
      if (onDiscard) {
        onDiscard(); // ถ้ามี onDiscard ให้เรียกใช้
      } else {
        // ถ้าไม่มี onDiscard จะต้องไปแก้ใน map/page.tsx
        console.warn("onDiscard function is not provided for cancel mode");
        onCancel(); // ชั่วคราว เรียกใช้ onCancel
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-4">{currentMessages.title}</h3>

        <p className="text-gray-600 mb-6">{currentMessages.message}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handlePrimaryAction}
            className={`flex items-center justify-center gap-2 p-3 ${
              mode === "stop" ? "bg-red-600" : "bg-gray-600"
            } text-white rounded-lg hover:${
              mode === "stop" ? "bg-red-700" : "bg-gray-700"
            } transition-colors`}
          >
            {mode === "stop" ? (
              <StopCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span>{currentMessages.confirmButton}</span>
          </button>

          <button
            onClick={onCancel} // ทั้งสองโหมดใช้ onCancel สำหรับปุ่มยกเลิก/ดำเนินการต่อ
            className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span>{currentMessages.cancelButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
