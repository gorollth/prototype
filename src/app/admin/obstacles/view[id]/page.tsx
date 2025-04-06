// src/app/admin/obstacles/view/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  AlertTriangle,
  Edit,
  Trash2,
  MapIcon,
  User,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { sampleObstacles } from "@/data/obstacles";
import {
  getTypeLabel,
  getCategoryLabel,
} from "./../../../../../utils/obstacleUtils";

export default function ViewObstaclePage() {
  const router = useRouter();
  const params = useParams();
  const obstacleId = params.id as string;

  const [obstacle, setObstacle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchObstacle = async () => {
      try {
        // จำลองการดึงข้อมูลจาก API
        const foundObstacle = sampleObstacles.find(
          (obs) => obs.id === obstacleId
        );

        if (foundObstacle) {
          setObstacle(foundObstacle);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching obstacle:", error);
        setLoading(false);
      }
    };

    fetchObstacle();
  }, [obstacleId]);

  const handleBack = () => {
    router.back();
  };

  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // จำลองการลบข้อมูล
    console.log("Deleting obstacle ID:", obstacleId);
    setShowDeleteModal(false);
    router.push("/admin/obstacles");
  };

  const openLocationOnMap = () => {
    if (obstacle && obstacle.position) {
      const [latitude, longitude] = obstacle.position;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
    }
  };

  // แสดงหน้า Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // แสดงหน้า 404 ถ้าไม่พบข้อมูล
  if (!obstacle) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ไม่พบข้อมูลอุปสรรค
        </h2>
        <p className="text-gray-600 mb-6">ไม่พบอุปสรรค ID: {obstacleId}</p>
        <Link
          href="/admin/obstacles"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          กลับไปยังรายการอุปสรรค
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">ข้อมูลอุปสรรค</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/obstacles/edit/${obstacleId}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Edit size={18} />
            <span>แก้ไข</span>
          </Link>
          <button
            onClick={confirmDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Trash2 size={18} />
            <span>ลบ</span>
          </button>
        </div>
      </div>

      {/* รายละเอียดอุปสรรค */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {obstacle.title || getTypeLabel(obstacle.type)}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <AlertTriangle size={16} className="text-orange-500" />
                <span>{getCategoryLabel(obstacle.category)}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>ผู้รายงาน: {obstacle.reportedBy}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>วันที่รายงาน: {formatDate(obstacle.reportedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-red-500" />
                <span>
                  พิกัด: {obstacle.position[0].toFixed(4)},{" "}
                  {obstacle.position[1].toFixed(4)}
                </span>
                <button
                  onClick={openLocationOnMap}
                  className="text-blue-600 hover:text-blue-800 underline ml-1 text-xs"
                >
                  ดูบนแผนที่
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">รายละเอียด</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {obstacle.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">สถานะ</h3>
                <div className="flex items-center gap-2">
                  {obstacle.status === "active" ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      <AlertTriangle size={16} className="mr-2" />
                      ยังมีอยู่
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle size={16} className="mr-2" />
                      แก้ไขแล้ว
                    </span>
                  )}
                </div>
              </div>

              {obstacle.lastVerified && (
                <div>
                  <h3 className="text-lg font-medium mb-2">การตรวจสอบล่าสุด</h3>
                  <p className="text-gray-700">
                    {formatDate(obstacle.lastVerified)}
                  </p>
                </div>
              )}

              {obstacle.verifyCount && (
                <div>
                  <h3 className="text-lg font-medium mb-2">สถิติการยืนยัน</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mr-2">
                        {obstacle.verifyCount.stillPresent}
                      </span>
                      <span>ยังมีอยู่</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-2">
                        {obstacle.verifyCount.resolved}
                      </span>
                      <span>แก้ไขแล้ว</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {obstacle.imageUrl && (
                <div>
                  <h3 className="text-lg font-medium mb-2">รูปภาพ</h3>
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={obstacle.imageUrl}
                      alt={obstacle.title || getTypeLabel(obstacle.type)}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal ยืนยันการลบ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบอุปสรรค
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบอุปสรรค &quot;
              {obstacle.title || getTypeLabel(obstacle.type)}&quot; ใช่หรือไม่?
              การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
