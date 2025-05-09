// src/components/RecordingControlModal.tsx

"use client";

import React from "react";
import { StopCircle, XCircle } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface RecordingControlModalProps {
  isOpen: boolean;
  onStop: () => void;
  onCancel: () => void;
}

export function RecordingControlModal({
  isOpen,
  onStop,
  onCancel,
}: RecordingControlModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-4">
          {t("route.recording.stop.confirm") || "ยืนยันการหยุดบันทึกเส้นทาง"}
        </h3>

        <p className="text-gray-600 mb-6">
          {t("route.recording.stop.message") ||
            "คุณแน่ใจหรือไม่ว่าต้องการหยุดการบันทึกเส้นทางนี้?"}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onStop}
            className="flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <StopCircle className="w-5 h-5" />
            <span>
              {t("route.recording.stop") || "หยุดบันทึกและบันทึกเส้นทาง"}
            </span>
          </button>

          <button
            onClick={onCancel}
            className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <XCircle className="w-5 h-5" />
            <span>{t("common.cancel") || "ยกเลิก"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
