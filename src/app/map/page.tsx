// src/app/map/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapSearchBar } from "@/components/MapSearchBar";
import { useLanguage } from "../../../contexts/LanguageContext";
import { Info } from "lucide-react";
import { RecordingIndicator } from "@/components/RecordingIndicator";
import { RecordingControlModal } from "@/components/RecordingControlModal";
import { useRouter } from "next/navigation";
import L from "leaflet";

const Map = dynamic(() => import("@/components/Map").then((mod) => mod.Map), {
  ssr: false,
});

export default function MapPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchNotification, setShowSearchNotification] = useState(false);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [recordedPath, setRecordedPath] = useState<[number, number][]>([]);
  const [recordingInterval, setRecordingInterval] =
    useState<NodeJS.Timeout | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [recordingInterval]);

  // Timer logic for recording
  useEffect(() => {
    if (isRecording && !isPaused) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);

        // Simulate getting current location and adding to path
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setRecordedPath((prev) => [...prev, [latitude, longitude]]);
            },
            (error) => console.error("Error getting location:", error)
          );
        }
      }, 1000);

      setRecordingInterval(interval);
      return () => clearInterval(interval);
    } else if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
  }, [isRecording, isPaused]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setShowSearchNotification(true);
      setTimeout(() => {
        setShowSearchNotification(false);
      }, 3000);
    }
  };

  // คำนวณระยะทางของเส้นทาง
  const calculateDistance = (path: [number, number][]): number => {
    let distance = 0;
    for (let i = 1; i < path.length; i++) {
      const prev = L.latLng(path[i - 1][0], path[i - 1][1]);
      const curr = L.latLng(path[i][0], path[i][1]);
      distance += prev.distanceTo(curr);
    }
    return distance; // ระยะทางในหน่วยเมตร
  };

  // Record route controls
  const startRecording = useCallback(() => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
    setRecordedPath([]);
  }, []);

  const pauseRecording = useCallback(() => {
    // ไม่แสดง Modal สำหรับ Pause - ทำงานทันที
    setIsPaused(true);
  }, []);

  const resumeRecording = useCallback(() => {
    setIsPaused(false);
  }, []);

  // แสดง Modal ยืนยันการหยุดบันทึก
  const confirmStopRecording = useCallback(() => {
    setShowRecordingModal(true);
  }, []);

  const stopRecording = useCallback(() => {
    // บันทึกข้อมูลเส้นทางลง localStorage เพื่อส่งต่อไปหน้าถัดไป
    if (recordedPath.length > 0) {
      const routeData = {
        path: recordedPath,
        startTime: Date.now() - recordingTime * 1000, // คำนวณเวลาเริ่มต้นย้อนกลับ
        endTime: Date.now(),
        distance: calculateDistance(recordedPath),
      };

      localStorage.setItem("recordedRouteData", JSON.stringify(routeData));

      setIsRecording(false);
      setIsPaused(false);
      setShowRecordingModal(false);

      // ไปยังหน้าบันทึกข้อมูลเส้นทาง
      router.push("/save-route");
    } else {
      // ถ้าไม่มีข้อมูลเส้นทาง
      alert(t("route.recording.no.data") || "ไม่มีข้อมูลเส้นทางที่บันทึก");
      setIsRecording(false);
      setIsPaused(false);
      setShowRecordingModal(false);
    }
  }, [recordedPath, recordingTime, router, t]);

  // การจัดการกับการปิดไม่ว่าจะเป็นจากปุ่ม X หรือบริเวณอื่น
  const handleCloseRecording = useCallback(() => {
    // กรณีปิดการบันทึก ให้แสดง Modal ยืนยันเช่นกัน
    setShowRecordingModal(true);
  }, []);

  // กรณีกดยกเลิก Modal ยืนยันการหยุดบันทึก
  const handleCancelStopModal = useCallback(() => {
    setShowRecordingModal(false);
  }, []);

  // This function is called from the ActionMenu component
  useEffect(() => {
    // Listen for custom event from ActionMenu for recording
    const handleStartRecording = () => {
      startRecording();
    };

    window.addEventListener("start-route-recording", handleStartRecording);

    return () => {
      window.removeEventListener("start-route-recording", handleStartRecording);
    };
  }, [startRecording]);

  return (
    <div className="h-[calc(100vh-64px)] relative">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000]">
        <MapSearchBar onSearch={handleSearch} />
      </div>

      {/* Notification เมื่อค้นหาสถานที่ */}
      {showSearchNotification && (
        <div className="absolute top-20 left-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 z-[1000] flex items-center shadow-md animate-fade-in">
          <Info className="text-blue-500 mr-2 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-700">
            {t("map.showing.accessible.locations.nearby")}
          </p>
        </div>
      )}

      {/* Recording Indicator แบบปรับปรุงแล้ว */}
      <RecordingIndicator
        isRecording={isRecording}
        isPaused={isPaused}
        recordingTime={recordingTime}
        onPause={pauseRecording}
        onResume={resumeRecording}
        onStop={confirmStopRecording}
        onClose={handleCloseRecording}
      />

      {/* Recording Control Modal สำหรับยืนยันการหยุดบันทึกเท่านั้น */}
      <RecordingControlModal
        isOpen={showRecordingModal}
        onStop={stopRecording}
        onCancel={handleCancelStopModal}
      />

      {/* Map Component */}
      <div className="w-full h-full">
        <Map
          searchQuery={searchQuery}
          recordedPath={isRecording ? recordedPath : []}
          isRecording={isRecording}
        />
      </div>
    </div>
  );
}
