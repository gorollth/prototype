// src/data/users.ts

export type UserRole = "admin" | "moderator" | "user";
export type UserStatus = "active" | "inactive" | "banned";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  last_login?: string;
  profile_image?: string;
  suspended_at?: string; // เวลาที่ระงับบัญชี
  suspended_reason?: string; // เหตุผลในการระงับบัญชี
  suspended_by?: number;
}

// ข้อมูลผู้ใช้งานจำลอง - ปรับให้ทุกคนมี role เป็น "user"
export const sampleUsers: User[] = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    phone: "081-234-5678",
    role: "user", // เปลี่ยนจาก admin เป็น user
    status: "active",
    created_at: "2023-10-15T08:00:00Z",
    last_login: "2024-04-08T09:15:00Z",
    profile_image: "/api/placeholder/64/64",
  },
  {
    id: 2,
    name: "มานี รักสะอาด",
    email: "manee@example.com",
    phone: "089-765-4321",
    role: "user", // เปลี่ยนจาก moderator เป็น user
    status: "active",
    created_at: "2023-11-20T10:30:00Z",
    last_login: "2024-04-07T14:20:00Z",
    profile_image: "/api/placeholder/64/64",
  },
  {
    id: 3,
    name: "สมศรี มีสุข",
    email: "somsri@example.com",
    role: "user", // คงเดิม
    status: "active",
    created_at: "2023-12-05T09:45:00Z",
    last_login: "2024-04-05T16:30:00Z",
    profile_image: "/api/placeholder/64/64",
  },
  {
    id: 4,
    name: "วิชัย ใจร้อน",
    email: "wichai@example.com",
    phone: "062-345-6789",
    role: "user", // คงเดิม
    status: "banned",
    created_at: "2024-01-10T11:20:00Z",
    last_login: "2024-03-20T08:45:00Z",
    profile_image: "/api/placeholder/64/64",
  },
  {
    id: 5,
    name: "นิภา สมใจ",
    email: "nipa@example.com",
    role: "user", // คงเดิม
    status: "inactive",
    created_at: "2024-02-15T14:10:00Z",
    last_login: "2024-03-01T10:30:00Z",
    profile_image: "/api/placeholder/64/64",
  },
  {
    id: 6,
    name: "ประเสริฐ มากมี",
    email: "prasert@example.com",
    phone: "095-678-1234",
    role: "user", // เปลี่ยนจาก moderator เป็น user
    status: "active",
    created_at: "2024-03-01T09:00:00Z",
    last_login: "2024-04-08T11:45:00Z",
    profile_image: "/api/placeholder/64/64",
  },
  {
    id: 7,
    name: "จินตนา นามสกุล",
    email: "jintana@example.com",
    role: "user", // คงเดิม
    status: "active",
    created_at: "2024-03-15T13:25:00Z",
    last_login: "2024-04-06T09:20:00Z",
    profile_image: "/api/placeholder/64/64",
  },
];

// ฟังก์ชันสำหรับแปลงค่าบทบาทเป็นภาษาไทย
export const getRoleLabel = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "ผู้ดูแลระบบ";
    case "moderator":
      return "ผู้ดูแล";
    case "user":
      return "ผู้ใช้ทั่วไป";
    default:
      return role;
  }
};

// ฟังก์ชันสำหรับแปลงค่าสถานะเป็นภาษาไทย
export const getStatusLabel = (status: UserStatus): string => {
  switch (status) {
    case "active":
      return "กำลังใช้งาน";
    case "inactive":
      return "ไม่ได้ใช้งาน";
    case "banned":
      return "ระงับการใช้งาน";
    default:
      return status;
  }
};
