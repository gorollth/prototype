// src/app/admin/posts/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  ChevronDown,
  Download,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Eye,
} from "lucide-react";
import Link from "next/link";

// ตัวอย่างข้อมูลโพสต์
const samplePosts = [
  {
    id: 1,
    title:
      "พบเส้นทางที่เข้าถึงได้ในสวนลุมพินี ทางเดินกว้างและเรียบ เหมาะสำหรับรถเข็น!",
    content:
      "เส้นทางมีทางลาดตลอดทาง มีจุดพักที่ร่มรื่น พนักงานในสวนให้ความช่วยเหลือดีมาก",
    category: "routes",
    author: "sarah_wheels",
    likes: 124,
    comments: 18,
    createdAt: "2024-04-01T08:00:00Z",
    status: "published",
  },
  {
    id: 2,
    title:
      "คาเฟ่ใหม่ย่านทองหล่อที่เข้าถึงได้ง่ายสำหรับผู้ใช้รถเข็น - มีประตูอัตโนมัติและพื้นที่กว้างขวาง!",
    content:
      "คาเฟ่เปิดใหม่นี้ออกแบบให้ทุกคนเข้าถึงได้ ประตูกว้างพอสำหรับรถเข็น มีห้องน้ำสำหรับผู้พิการด้วย",
    category: "places",
    author: "mike_explorer",
    likes: 89,
    comments: 12,
    createdAt: "2024-04-02T10:15:00Z",
    status: "published",
  },
  {
    id: 3,
    title:
      "เคล็ดลับ: ห้างสรรพสินค้านี้เพิ่งปรับปรุงลิฟต์ทั้งหมดให้ใหม่ เชื่อถือได้มากขึ้น!",
    content:
      "ปรับปรุงใหม่หมด ไม่ต้องรอนาน ปุ่มกดอยู่ในระดับที่เอื้อมถึงได้จากรถเข็น",
    category: "tips",
    author: "accessibility_guide",
    likes: 156,
    comments: 24,
    createdAt: "2024-04-03T14:30:00Z",
    status: "published",
  },
  {
    id: 4,
    title:
      "เส้นทางชมวิวริมแม่น้ำเจ้าพระยาที่สวยงามและเข้าถึงได้ - มีทางลาดและวิวสวย!",
    content:
      "เส้นทางราบเรียบตลอดทาง มีทางลาดทุกจุดที่มีขั้นบันได มีจุดพักทุก 100 เมตร ส่วนใหญ่มีที่กำบัง",
    category: "routes",
    author: "travel_with_wheels",
    likes: 210,
    comments: 32,
    createdAt: "2024-04-04T16:45:00Z",
    status: "under_review",
  },
  {
    id: 5,
    title: "การแนะนำอุปกรณ์เสริมใหม่สำหรับรถเข็นที่ช่วยในการเดินทางบนทางขรุขระ",
    content:
      "อุปกรณ์นี้ช่วยให้ล้อรถเข็นมีความยืดหยุ่นมากขึ้นบนพื้นผิวที่ไม่เรียบ",
    category: "equipment",
    author: "tech_accessibility",
    likes: 78,
    comments: 15,
    createdAt: "2024-04-05T09:20:00Z",
    status: "draft",
  },
];

type SortField =
  | "title"
  | "author"
  | "createdAt"
  | "likes"
  | "comments"
  | "status";
type SortDirection = "asc" | "desc";
type StatusFilter = "all" | "published" | "under_review" | "draft";
type CategoryFilter = "all" | "routes" | "places" | "tips" | "equipment";

export default function AdminPosts() {
  const [posts, setPosts] = useState(samplePosts);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<any | null>(null);

  // โหลดข้อมูลโพสต์
  useEffect(() => {
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  // ฟังก์ชันค้นหาและกรองข้อมูล
  const filteredPosts = posts.filter((post) => {
    // ค้นหาตามชื่อหรือเนื้อหา
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());

    // กรองตามสถานะ
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;

    // กรองตามหมวดหมู่
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // ฟังก์ชันเรียงลำดับ
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let compareA: string | number, compareB: string | number;

    // กำหนดค่าสำหรับเปรียบเทียบตามฟิลด์ที่เลือก
    switch (sortField) {
      case "title":
        compareA = a.title.toLowerCase();
        compareB = b.title.toLowerCase();
        break;
      case "author":
        compareA = a.author.toLowerCase();
        compareB = b.author.toLowerCase();
        break;
      case "likes":
        compareA = a.likes;
        compareB = b.likes;
        break;
      case "comments":
        compareA = a.comments;
        compareB = b.comments;
        break;
      case "status":
        compareA = a.status.toLowerCase();
        compareB = b.status.toLowerCase();
        break;
      case "createdAt":
      default:
        compareA = new Date(a.createdAt).getTime();
        compareB = new Date(b.createdAt).getTime();
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

  // ฟังก์ชันยืนยันการลบ
  const confirmDelete = (post: any) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  // ฟังก์ชันลบโพสต์
  const deletePost = () => {
    if (postToDelete) {
      setPosts(posts.filter((post) => post.id !== postToDelete.id));
      setShowDeleteModal(false);
      setPostToDelete(null);
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

  // ฟังก์ชันแสดงแบดจ์สถานะ
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            เผยแพร่แล้ว
          </span>
        );
      case "under_review":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            กำลังตรวจสอบ
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            แบบร่าง
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            ไม่ทราบสถานะ
          </span>
        );
    }
  };

  // ฟังก์ชันแสดงชื่อหมวดหมู่
  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      routes: "เส้นทาง",
      places: "สถานที่",
      tips: "เคล็ดลับ",
      equipment: "อุปกรณ์",
    };
    return categories[category] || category;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">จัดการโพสต์ชุมชน</h1>
        <Link
          href="/admin/posts/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <span>เพิ่มโพสต์ใหม่</span>
        </Link>
      </div>

      {/* ส่วนค้นหาและกรอง */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ค้นหาโพสต์..."
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
              onChange={(e) =>
                setCategoryFilter(e.target.value as CategoryFilter)
              }
              className="pl-4 pr-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">ทุกหมวดหมู่</option>
              <option value="routes">เส้นทาง</option>
              <option value="places">สถานที่</option>
              <option value="tips">เคล็ดลับ</option>
              <option value="equipment">อุปกรณ์</option>
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
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="pl-4 pr-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="published">เผยแพร่แล้ว</option>
              <option value="under_review">กำลังตรวจสอบ</option>
              <option value="draft">แบบร่าง</option>
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
                  หัวข้อ
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
                <button
                  onClick={() => handleSort("author")}
                  className="flex items-center"
                >
                  ผู้เขียน
                  {sortField === "author" &&
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
                หมวดหมู่
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center"
                >
                  วันที่โพสต์
                  {sortField === "createdAt" &&
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
                  onClick={() => handleSort("likes")}
                  className="flex items-center"
                >
                  ถูกใจ
                  {sortField === "likes" &&
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
                  onClick={() => handleSort("comments")}
                  className="flex items-center"
                >
                  ความคิดเห็น
                  {sortField === "comments" &&
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
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPosts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  ไม่พบข้อมูลโพสต์
                </td>
              </tr>
            ) : (
              sortedPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryName(post.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.likes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MessageCircle size={16} className="mr-1 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {post.comments}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/posts/view/${post.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100"
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
                      {/* ลบปุ่มแก้ไขออก (ไม่ต้องมีส่วนนี้แล้ว)
    <Link
      href={`/admin/posts/edit/${post.id}`}
      className="text-green-600 hover:text-green-900 p-1 ml-2 rounded hover:bg-green-100"
      title="แก้ไข"
    >
      <Edit size={18} />
    </Link>
    */}
                      <button
                        onClick={() => confirmDelete(post)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100"
                        title="ลบ"
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
              ยืนยันการลบโพสต์
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบโพสต์ &quot;{postToDelete?.title}&quot; ใช่หรือไม่?
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
                onClick={deletePost}
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
