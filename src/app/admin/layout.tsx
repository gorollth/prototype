// src/app/admin/layout.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import {
  LayoutDashboard,
  MapPin,
  AlertTriangle,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Route as RouteIcon, // เพิ่มไอคอนเส้นทาง
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ตรวจสอบการเข้าสู่ระบบเมื่อโหลดหน้า
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("adminAuth");
      setIsAuthenticated(auth === "true");
      setIsLoading(false);

      // ถ้าไม่ได้เข้าสู่ระบบและไม่ได้อยู่ที่หน้า login ให้เปลี่ยนเส้นทาง
      if (auth !== "true" && !pathname.includes("/admin/login")) {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ถ้าเป็นหน้า login ให้แสดงเฉพาะ children โดยไม่มี layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // ถ้าเข้าสู่ระบบสำเร็จ แสดง Layout สำหรับ Admin
  if (isAuthenticated) {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar ที่สามารถย่อและขยายได้ */}
        <aside
          className={`bg-gray-800 text-white ${
            isSidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300 fixed h-full z-10`}
        >
          <div className="p-4 flex items-center justify-between">
            {isSidebarOpen ? (
              <Link href="/admin/dashboard" className="flex items-center">
                <Logo showText={false} size="small" className="mr-2" />
                <span className="font-bold text-xl">GOROLL Admin</span>
              </Link>
            ) : (
              <Link href="/admin/dashboard" className="mx-auto">
                <Logo showText={false} size="small" />
              </Link>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="mt-6">
            <ul className="space-y-1">
              {[
                {
                  title: "แดชบอร์ด",
                  href: "/admin/dashboard",
                  icon: <LayoutDashboard size={20} />,
                },
                {
                  title: "จัดการสถานที่",
                  href: "/admin/locations",
                  icon: <MapPin size={20} />,
                },
                {
                  title: "จัดการอุปสรรค",
                  href: "/admin/obstacles",
                  icon: <AlertTriangle size={20} />,
                },
                {
                  title: "จัดการเส้นทาง", // เพิ่มเมนูเส้นทาง
                  href: "/admin/routes",
                  icon: <RouteIcon size={20} />,
                },
                {
                  title: "จัดการโพสต์",
                  href: "/admin/posts",
                  icon: <FileText size={20} />,
                },
                {
                  title: "จัดการผู้ใช้",
                  href: "/admin/users",
                  icon: <Users size={20} />,
                },
                {
                  title: "รีวิวและความคิดเห็น",
                  href: "/admin/reviews",
                  icon: <MessageSquare size={20} />,
                },
                {
                  title: "ตั้งค่าระบบ",
                  href: "/admin/settings",
                  icon: <Settings size={20} />,
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 ${
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                        ? "bg-blue-600"
                        : "hover:bg-gray-700"
                    } ${isSidebarOpen ? "justify-start" : "justify-center"}`}
                  >
                    <span>{item.icon}</span>
                    {isSidebarOpen && (
                      <span className="ml-3">{item.title}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0 w-full p-4">
            <button
              onClick={handleLogout}
              className={`flex items-center text-red-300 hover:text-red-400 ${
                isSidebarOpen ? "justify-start" : "justify-center"
              } w-full px-4 py-3 transition-colors`}
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="ml-3">ออกจากระบบ</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          {/* Header */}
          <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                ระบบผู้ดูแล GOROLL
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    A
                  </div>
                  <span className="ml-2 font-medium">Admin</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    );
  }

  // กรณีไม่ได้เข้าสู่ระบบ แต่ยัง loading อยู่
  return null;
}
