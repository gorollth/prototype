// src/app/admin/users/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  Download,
  Mail,
  Phone,
  Calendar,
  User,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  User as UserType,
  UserRole,
  UserStatus,
  sampleUsers,
  getRoleLabel,
  getStatusLabel,
} from "@/data/users";

type SortField = "name" | "email" | "created_at" | "role" | "status";
type SortDirection = "asc" | "desc";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  // โหลดข้อมูลผู้ใช้งาน
  useEffect(() => {
    // จำลองการเรียก API
    setTimeout(() => {
      setUsers(sampleUsers);
      setLoading(false);
    }, 1000);
  }, []);

  // ฟังก์ชันค้นหาและกรองข้อมูล
  const filteredUsers = users.filter((user) => {
    // ค้นหาตามชื่อหรืออีเมล
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm));

    // กรองตามบทบาท
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    // กรองตามสถานะ
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // ฟังก์ชันเรียงลำดับ
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let compareA: string | number, compareB: string | number;

    // กำหนดค่าสำหรับเปรียบเทียบตามฟิลด์ที่เลือก
    switch (sortField) {
      case "name":
        compareA = a.name.toLowerCase();
        compareB = b.name.toLowerCase();
        break;
      case "email":
        compareA = a.email.toLowerCase();
        compareB = b.email.toLowerCase();
        break;
      case "role":
        compareA = a.role.toLowerCase();
        compareB = b.role.toLowerCase();
        break;
      case "status":
        compareA = a.status.toLowerCase();
        compareB = b.status.toLowerCase();
        break;
      case "created_at":
      default:
        compareA = new Date(a.created_at).getTime();
        compareB = new Date(b.created_at).getTime();
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
  const confirmDelete = (user: UserType) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // ฟังก์ชันลบผู้ใช้
  const deleteUser = () => {
    if (userToDelete) {
      // ทำการลบผู้ใช้จากข้อมูล (ในโปรเจคจริงควรเรียก API)
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  // ฟังก์ชันแสดงสถานะด้วยสี
  const getUserStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {getStatusLabel(status)}
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {getStatusLabel(status)}
          </span>
        );
      case "banned":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {getStatusLabel(status)}
          </span>
        );
      default:
        return null;
    }
  };

  // ฟังก์ชันแสดงบทบาทด้วยสี
  const getUserRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <ShieldCheck size={12} className="mr-1" />
            {getRoleLabel(role)}
          </span>
        );
      case "moderator":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <ShieldCheck size={12} className="mr-1" />
            {getRoleLabel(role)}
          </span>
        );
      case "user":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <User size={12} className="mr-1" />
            {getRoleLabel(role)}
          </span>
        );
      default:
        return null;
    }
  };
}

// (ส่วนที่เหลือของไฟล์เหมือนเดิม)
