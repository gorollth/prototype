// src/app/admin/posts/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Download,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit2,
  Plus,
  Shield, // เพิ่ม import นี้
} from "lucide-react";
import Link from "next/link";
import { samplePosts } from "@/data/community"; // นำเข้าข้อมูลจาก data/community
import type { Post } from "@/data/community"; // import type Post จาก community

type SortField =
  | "title"
  | "username"
  | "createdAt"
  | "likes"
  | "comments"
  | "category";
type SortDirection = "asc" | "desc";
type CategoryFilter = "all" | "Routes" | "Places" | "Tips" | "Equipment";

export default function AdminPosts() {
  const [posts, setPosts] = useState(samplePosts);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  // ฟังก์ชันเรียงลำดับ (ย้ายมาไว้ตรงนี้)
  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  }

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
      (post.content &&
        post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.username.toLowerCase().includes(searchTerm.toLowerCase());

    // กรองตามหมวดหมู่
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;

    return matchesSearch && matchesCategory;
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
      case "username":
        compareA = a.username.toLowerCase();
        compareB = b.username.toLowerCase();
        break;
      case "likes":
        compareA = a.likes;
        compareB = b.likes;
        break;
      case "comments":
        compareA = a.comments;
        compareB = b.comments;
        break;
      case "category":
        compareA = a.category.toLowerCase();
        compareB = b.category.toLowerCase();
        break;
      case "createdAt":
      default:
        // ถ้ามี createdAt ให้ใช้ createdAt ถ้าไม่มีให้ใช้ค่าปัจจุบัน
        compareA = a.createdAt ? new Date(a.createdAt).getTime() : Date.now();
        compareB = b.createdAt ? new Date(b.createdAt).getTime() : Date.now();
        break;
    }

    // เรียงลำดับตามทิศทางที่เลือก
    if (sortDirection === "asc") {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">จัดการโพสต์ชุมชน</h1>
        <Link
          href="/admin/posts/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
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
              <option value="Routes">เส้นทาง</option>
              <option value="Places">สถานที่</option>
              <option value="Tips">เคล็ดลับ</option>
              <option value="Equipment">อุปกรณ์</option>
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
                  onClick={() => handleSort("username")}
                  className="flex items-center"
                >
                  ผู้เขียน
                  {sortField === "username" &&
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
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPosts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
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
                    <div className="flex items-center">
                      {post.isAdmin && (
                        <Shield
                          size={16}
                          className="mr-1 text-blue-500"
                          title="โพสต์โดยแอดมิน"
                        />
                      )}
                      {post.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("th-TH")
                      : "ไม่ระบุ"}
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/posts/view/${post.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100"
                        title="ดูรายละเอียด"
                      >
                        <Eye size={18} />
                      </Link>
                      {/* แสดงปุ่มแก้ไขเฉพาะโพสต์ที่สร้างโดย admin */}
                      {post.isAdmin && (
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-100"
                          title="แก้ไขโพสต์"
                        >
                          <Edit2 size={18} />
                        </Link>
                      )}
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
