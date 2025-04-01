// src/app/admin/obstacles/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  AlertTriangle,
  Check,
  Clock,
  MapPin,
  ChevronDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { sampleObstacles } from "@/data/obstacles";
import { Obstacle, ObstacleCategory, ObstacleType } from "@/lib/types/obstacle";
import Link from "next/link";

export default function AdminObstacles() {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("reportedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showResolveModal, setShowResolveModal] = useState<boolean>(false);
  const [selectedObstacle, setSelectedObstacle] = useState<Obstacle | null>(
    null
  );

  // โหลดข้อมูลอุปสรรค
  useEffect(() => {
    setTimeout(() => {
      setObstacles(sampleObstacles);
      setLoading(false);
    }, 1000);
  }, []);

  // ฟังก์ชันค้นหาและกรองข้อมูล
  const filteredObstacles = obstacles.filter((obstacle) => {
    // ค้นหาตามชื่อหรือคำอธิบาย
    const matchesSearch =
      obstacle.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obstacle.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obstacle.type?.toLowerCase().includes(searchTerm.toLowerCase());

    // กรองตามหมวดหมู่
    const matchesCategory =
      categoryFilter === "all" || obstacle.category === categoryFilter;

    // กรองตามสถานะ
    const matchesStatus =
      statusFilter === "all" || obstacle.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ฟังก์ชันเรียงลำดับ
  const sortedObstacles = [...filteredObstacles].sort((a, b) => {
    let compareA: any, compareB: any;

    // กำหนดค่าสำหรับเปรียบเทียบตามฟิลด์ที่เลือก
    switch (sortField) {
      case "reportedAt":
        compareA = new Date(a.reportedAt).getTime();
        compareB = new Date(b.reportedAt).getTime();
        break;
      case "category":
        compareA = a.category.toLowerCase();
        compareB = b.category.toLowerCase();
        break;
      case "type":
        compareA = a.type.toLowerCase();
        compareB = b.type.toLowerCase();
        break;
      case "status":
        compareA = a.status.toLowerCase();
        compareB = b.status.toLowerCase();
        break;
      default:
        compareA = new Date(a.reportedAt).getTime();
        compareB = new Date(b.reportedAt).getTime();
    }

    // เรียงลำดับตามทิศทางที่เลือก
    if (sortDirection === "asc") {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

  // ฟังก์ชันเปลี่ยนการเรียงลำดับ
  const handleSort = (field: string) => {
    if (field === sortField) {
      // ถ้าคลิกฟิลด์เดิม เปลี่ยนทิศทางการเรียง
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // ถ้าคลิกฟิลด์ใหม่ ตั้งค่าฟิลด์และทิศทางเริ่มต้น
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // เปิด Modal ยืนยันการเปลี่ยนสถานะ
  const openResolveModal = (obstacle: Obstacle) => {
    setSelectedObstacle(obstacle);
    setShowResolveModal(true);
  };

  // ฟังก์ชันเปลี่ยนสถานะอุปสรรค
  const resolveObstacle = () => {
    if (selectedObstacle) {
      // อัพเดทสถานะเป็น "resolved"
      const updatedObstacles = obstacles.map((o) =>
        o.id === selectedObstacle.id ? { ...o, status: "resolved" as const } : o
      );
      setObstacles(updatedObstacles);
      setShowResolveModal(false);
      setSelectedObstacle(null);
    }
  };

  // ฟังก์ชันแสดงสถานะด้วยสี
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle size={12} className="mr-1" />
            ยังมีอยู่
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check size={12} className="mr-1" />
            แก้ไขแล้ว
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock size={12} className="mr-1" />
            ไม่ทราบสถานะ
          </span>
        );
    }
  };

  // แสดง Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">จัดการอุปสรรค</h1>
      </div>

      {/* ส่วนค้นหาและกรอง */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ค้นหาอุปสรรค..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* กรองตามหมวดหมู่ */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-4 pr-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">ทุกหมวดหมู่</option>
              <option value="sidewalk_issues">ปัญหาทางเท้า</option>
              <option value="permanent_obstacles">อุปสรรคถาวร</option>
              <option value="temporary_obstacles">อุปสรรคชั่วคราว</option>
              <option value="other_obstacles">อื่นๆ</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          {/* กรองตามสถานะ */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="active">ยังมีอยู่</option>
              <option value="resolved">แก้ไขแล้ว</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          {/* ปุ่มดาวน์โหลด */}
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
            <Download size={18} />
            <span>ส่งออก</span>
          </button>
        </div>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort("reportedAt")}
                  className="flex items-center"
                >
                  วันที่รายงาน
                  {sortField === "reportedAt" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} className="ml-1" />
                    ) : (
                      <ArrowDown size={14} className="ml-1" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                รายละเอียด
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center"
                >
                  หมวดหมู่
                  {sortField === "category" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} className="ml-1" />
                    ) : (
                      <ArrowDown size={14} className="ml-1" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort("type")}
                  className="flex items-center"
                >
                  ประเภท
                  {sortField === "type" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} className="ml-1" />
                    ) : (
                      <ArrowDown size={14} className="ml-1" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ตำแหน่ง
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center"
                >
                  สถานะ
                  {sortField === "status" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} className="ml-1" />
                    ) : (
                      <ArrowDown size={14} className="ml-1" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedObstacles.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  ไม่พบข้อมูลอุปสรรค
                </td>
              </tr>
            ) : (
              sortedObstacles.map((obstacle) => (
                <tr key={obstacle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(obstacle.reportedAt).toLocaleDateString("th-TH")}
                    <div className="text-xs text-gray-400">
                      โดย: {obstacle.reportedBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="font-medium">
                      {obstacle.title || getTypeLabel(obstacle.type)}
                    </div>
                    <div className="text-gray-500 line-clamp-2">
                      {obstacle.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryLabel(obstacle.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getTypeLabel(obstacle.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1 text-red-500" />
                      {`${obstacle.position[0].toFixed(
                        4
                      )}, ${obstacle.position[1].toFixed(4)}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(obstacle.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end">
                      {obstacle.status === "active" && (
                        <button
                          onClick={() => openResolveModal(obstacle)}
                          className="text-green-600 hover:text-green-900 p-1 ml-2 rounded hover:bg-green-100"
                          title="ทำเครื่องหมายว่าแก้ไขแล้ว"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <Link
                        href={`/admin/obstacles/${obstacle.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 ml-2 rounded hover:bg-blue-100"
                        title="ดูรายละเอียด"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal ยืนยันการเปลี่ยนสถานะ */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการแก้ไขอุปสรรค
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการทำเครื่องหมายอุปสรรคนี้เป็น "แก้ไขแล้ว" ใช่หรือไม่?
              <br />
              หมายเหตุ: ผู้ใช้จะไม่สามารถระบุอุปสรรคนี้เป็น "ยังมีอยู่"
              ได้อีกหลังจากเจ้าหน้าที่ยืนยันการแก้ไขแล้ว
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowResolveModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={resolveObstacle}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                ยืนยันการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions
function getCategoryLabel(category: ObstacleCategory): string {
  const categoryLabels: Record<ObstacleCategory, string> = {
    sidewalk_issues: "ปัญหาทางเท้า",
    permanent_obstacles: "อุปสรรคถาวร",
    temporary_obstacles: "อุปสรรคชั่วคราว",
    other_obstacles: "อื่นๆ",
  };
  return categoryLabels[category] || category;
}

function getTypeLabel(type: ObstacleType): string {
  const typeLabels: Record<ObstacleType, string> = {
    rough_surface: "พื้นผิวขรุขระ/ชำรุด",
    broken_drain: "ท่อระบายน้ำชำรุด/ฝาท่อหาย",
    narrow_path: "ทางเท้าแคบเกินไป",
    no_ramp: "ไม่มีทางลาดขึ้น-ลง",
    utility_pole: "เสาไฟฟ้า/เสาป้าย",
    footbridge_no_lift: "สะพานลอยที่ไม่มีลิฟต์/ทางลาด",
    construction: "จุดก่อสร้างถาวร",
    vehicles_on_sidewalk: "ยานพาหนะบนทางเท้า",
    construction_material: "วัสดุก่อสร้าง",
    garbage_bin: "ถังขยะ",
    other: "อื่นๆ",
  };
  return typeLabels[type] || type;
}
