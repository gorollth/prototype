// src/components/RecordingIndicator.tsx

"use client";

import React from "react";
import { Pause, Play, StopCircle, Timer, X } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface RecordingIndicatorProps {
  isRecording: boolean;
  isPaused: boolean; // เพิ่ม prop สำหรับสถานะหยุดชั่วคราว
  recordingTime: number;
  onPause: () => void;
  onResume: () => void; // เพิ่ม function สำหรับดำเนินการต่อ
  onStop: () => void;
  onClose: () => void;
}

export function RecordingIndicator({
  isRecording,
  isPaused,
  recordingTime,
  onPause,
  onResume,
  onStop,
  onClose,
}: RecordingIndicatorProps) {
  const { t } = useLanguage();

  // Format time to HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  if (!isRecording) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[1001]">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 bg-red-600 rounded-full ${
              isPaused ? "" : "animate-pulse"
            }`}
          ></div>
          <div className="flex items-center">
            <Timer className="w-5 h-5 text-gray-600 mr-2" />
            <span className="font-medium">{formatTime(recordingTime)}</span>
          </div>
          {isPaused && (
            <span className="text-xs text-red-600 font-medium rounded-full bg-red-50 px-2 py-0.5 ml-2">
              {t("route.recording.paused.status") || "หยุดชั่วคราว"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* ปุ่ม Pause/Resume สลับตามสถานะ */}
          {isPaused ? (
            <button
              onClick={onResume}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label={t("route.recording.resume") || "ดำเนินการบันทึกต่อ"}
            >
              <Play className="w-5 h-5 text-green-600" />
            </button>
          ) : (
            <button
              onClick={onPause}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label={t("route.recording.pause") || "หยุดบันทึกชั่วคราว"}
            >
              <Pause className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <button
            onClick={onStop}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label={t("route.recording.stop") || "หยุดบันทึก"}
          >
            <StopCircle className="w-5 h-5 text-red-600" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label={t("common.close") || "ปิด"}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
