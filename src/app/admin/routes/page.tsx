"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Download,
  ArrowUp,
  ArrowDown,
  Eye,
  Trash2,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import { sampleRoutes, Route } from "@/data/routes";
import { useRouter } from "next/navigation";

type SortField = "from" | "to" | "distance";
type SortDirection = "asc" | "desc";

export default function AdminRoutesPage() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("from");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [routeToDelete, setRouteToDelete] = useState<Route | null>(null);

  // โหลดข้อมูลเส้นทาง
  useEffect(() => {
    // จำลองการเรียก API
    setTimeout(() => {
      setRoutes(sampleRoutes);
      setLoading(false);
    }, 1000);
  }, []);

  // ฟังก์ชันค้นหาและกรองข้อมูล
  const filteredRoutes = routes.filter((route) => {
    // ค้นหาตามจุดเริ่มต้นหรือปลายทาง
    const matchesSearch =
      route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.to.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // ฟังก์ชันเรียงลำดับ
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    let compareA: string | number, compareB: string | number;

    // กำหนดค่าสำหรับเปรียบเทียบตามฟิลด์ที่เลือก
    switch (sortField) {
      case "from":
        compareA = a.from.toLowerCase();
        compareB = b.from.toLowerCase();
        break;
      case "to":
        compareA = a.to.toLowerCase();
        compareB = b.to.toLowerCase();
        break;
      case "distance":
        compareA = parseFloat(a.distance);
        compareB = parseFloat(b.distance);
        break;
      default:
        compareA = a.from.toLowerCase();
        compareB = b.from.toLowerCase();
        break;
    }

    // เรียงลำดับตามทิศทางที่เลือก
    if (sortDirection === "asc") {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

  // ฟังก์ชันเปลี่ยนการเรียงลำดับ
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // ถ้าคลิกฟิลด์เดิม เปลี่ยนทิศทางการเรียง
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // ถ้าคลิกฟิลด์ใหม่ ตั้งค่าฟิลด์และทิศทางเริ่มต้น
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // ฟังก์ชันแสดง modal ยืนยันการลบ
  const confirmDelete = (route: Route) => {
    setRouteToDelete(route);
    setShowDeleteModal(true);
  };

  // ฟังก์ชันดูรายละเอียดเส้นทาง
  const viewRouteDetails = (route: Route) => {
    router.push(`/admin/routes/${route.id}`);
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
        <h1 className="text-2xl font-bold text-gray-800">จัดการเส้นทาง</h1>
      </div>

      {/* ส่วนค้นหา */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ค้นหาจุดเริ่มต้นหรือปลายทาง..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2">
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
                  onClick={() => handleSort("from")}
                  className="flex items-center"
                >
                  จุดเริ่มต้น
                  {sortField === "from" &&
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
                  onClick={() => handleSort("to")}
                  className="flex items-center"
                >
                  ปลายทาง
                  {sortField === "to" &&
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
                  onClick={() => handleSort("distance")}
                  className="flex items-center"
                >
                  ระยะทาง
                  {sortField === "distance" &&
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
                ผู้ใช้งาน
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRoutes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  ไม่พบข้อมูลเส้นทาง
                </td>
              </tr>
            ) : (
              sortedRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {route.from}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {route.to}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.distance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      <span className="text-gray-900">ไม่ระบุผู้ใช้</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => viewRouteDetails(route)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100"
                        title="ดูรายละเอียด"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
