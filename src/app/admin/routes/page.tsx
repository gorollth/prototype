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
  Calendar,
  Star,
} from "lucide-react";
import Link from "next/link";
import { sampleRoutes, Route } from "@/data/routes";
import { useRouter } from "next/navigation";

type SortField = "title" | "distance" | "duration" | "rating" | "date";
type SortDirection = "asc" | "desc";

export default function AdminRoutesPage() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
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
    // ค้นหาตามชื่อหรือรายละเอียด
    const matchesSearch =
      route.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.to.toLowerCase().includes(searchTerm.toLowerCase());

    // กรองตามประเภท
    const matchesType = typeFilter === "all" || route.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // ฟังก์ชันเรียงลำดับ
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    let compareA: string | number, compareB: string | number;

    // กำหนดค่าสำหรับเปรียบเทียบตามฟิลด์ที่เลือก
    switch (sortField) {
      case "title":
        compareA = a.title.toLowerCase();
        compareB = b.title.toLowerCase();
        break;
      case "distance":
        compareA = parseFloat(a.distance);
        compareB = parseFloat(b.distance);
        break;
      case "duration":
        compareA = parseInt(a.duration);
        compareB = parseInt(b.duration);
        break;
      case "rating":
        compareA = a.rating;
        compareB = b.rating;
        break;
      case "date":
      default:
        compareA = new Date(a.date).getTime();
        compareB = new Date(b.date).getTime();
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
      setSortDirection("desc");
    }
  };

  // ฟังก์ชันแสดง modal ยืนยันการลบ
  const confirmDelete = (route: Route) => {
    setRouteToDelete(route);
    setShowDeleteModal(true);
  };

  // ฟังก์ชันลบเส้นทาง
  const deleteRoute = () => {
    if (routeToDelete) {
      setRoutes(routes.filter((route) => route.id !== routeToDelete.id));
      setShowDeleteModal(false);
      setRouteToDelete(null);
    }
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

      {/* ส่วนค้นหาและกรอง */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ค้นหาเส้นทาง..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* กรองตามประเภท */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pl-4 pr-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">ทุกประเภท</option>
              <option value="saved">บันทึก</option>
              <option value="recent">ล่าสุด</option>
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
                  onClick={() => handleSort("title")}
                  className="flex items-center"
                >
                  ชื่อเส้นทาง
                  {sortField === "title" &&
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
                จุดเริ่มต้น - ปลายทาง
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
                <button
                  onClick={() => handleSort("duration")}
                  className="flex items-center"
                >
                  เวลาเดินทาง
                  {sortField === "duration" &&
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
                  onClick={() => handleSort("rating")}
                  className="flex items-center"
                >
                  คะแนน
                  {sortField === "rating" &&
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
                  onClick={() => handleSort("date")}
                  className="flex items-center"
                >
                  วันที่
                  {sortField === "date" &&
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
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRoutes.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  ไม่พบข้อมูลเส้นทาง
                </td>
              </tr>
            ) : (
              sortedRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-900 line-clamp-1">
                        {route.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1 text-gray-400" />
                        <span className="line-clamp-1">
                          {route.from} - {route.to}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.distance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <Star
                        size={16}
                        className="mr-1 text-yellow-400 fill-yellow-400"
                      />
                      <span>{route.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      <span>{route.date}</span>
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
                      <button
                        onClick={() => confirmDelete(route)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100"
                        title="ลบเส้นทาง"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal ยืนยันการลบ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบเส้นทาง
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบเส้นทาง &quot;{routeToDelete?.title}&quot; ใช่หรือไม่?
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
                onClick={deleteRoute}
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
