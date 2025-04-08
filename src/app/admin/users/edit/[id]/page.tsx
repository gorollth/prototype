// src/app/admin/users/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Lock,
  AlertCircle,
  Save,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  User as UserType,
  sampleUsers,
  getRoleLabel,
  getStatusLabel,
} from "@/data/users";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const [formData, setFormData] = useState<UserType>({
    id: 0,
    name: "",
    email: "",
    role: "user",
    status: "active",
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลผู้ใช้
    setTimeout(() => {
      const user = sampleUsers.find((u) => u.id === Number(userId));
      if (user) {
        setFormData(user);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 500);
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // จำลองการบันทึกข้อมูล
    console.log("Saving user data:", formData);

    // จำลองการเรียก API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // เสร็จสิ้นการบันทึก
    setSaving(false);
    router.push("/admin/users");
  };

  const handleDelete = () => {
    // จำลองการลบผู้ใช้
    console.log("Deleting user:", formData.id);

    // ในโปรเจคจริงจะเรียก API ลบผู้ใช้
    router.push("/admin/users");
  };

  const handleResetPassword = () => {
    // จำลองการรีเซ็ตรหัสผ่าน
    console.log("Resetting password for user:", formData.id);
    setShowResetPasswordModal(false);

    // ในโปรเจคจริงจะเรียก API รีเซ็ตรหัสผ่าน
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ไม่พบข้อมูลผู้ใช้
        </h2>
        <p className="text-gray-600 mb-6">ไม่พบผู้ใช้ ID: {userId}</p>
        <Link
          href="/admin/users"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          กลับไปยังรายการผู้ใช้
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/users" className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            แก้ไขข้อมูลผู้ใช้: {formData.name}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowResetPasswordModal(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-2"
          >
            <Lock size={18} />
            <span>รีเซ็ตรหัสผ่าน</span>
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={18} />
            <span>ลบผู้ใช้</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* ข้อมูลทั่วไป */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col items-center justify-start">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 mb-4">
                <img
                  src={formData.profile_image || "/api/placeholder/160/160"}
                  alt={`รูปโปรไฟล์ของ ${formData.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                เปลี่ยนรูปโปรไฟล์
              </button>

              {/* ข้อมูลเพิ่มเติม */}
              <div className="mt-6 w-full text-sm text-gray-500 space-y-2">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  <div>
                    <p>สมัครสมาชิกเมื่อ</p>
                    <p className="font-medium text-gray-700">
                      {new Date(formData.created_at).toLocaleDateString(
                        "th-TH",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                {formData.last_login && (
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    <div>
                      <p>เข้าสู่ระบบล่าสุด</p>
                      <p className="font-medium text-gray-700">
                        {new Date(formData.last_login).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ชื่อผู้ใช้ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ชื่อผู้ใช้"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0xx-xxx-xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    บทบาท <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield size={16} className="text-gray-400" />
                    </div>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="admin">ผู้ดูแลระบบ</option>
                      <option value="moderator">ผู้ดูแล</option>
                      <option value="user">ผู้ใช้ทั่วไป</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    สถานะ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AlertCircle size={16} className="text-gray-400" />
                    </div>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="active">กำลังใช้งาน</option>
                      <option value="inactive">ไม่ได้ใช้งาน</option>
                      <option value="banned">ระงับการใช้งาน</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ส่วนเพิ่มเติม - สามารถเพิ่มฟิลด์ที่ต้องการได้ */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  บันทึกเพิ่มเติม
                </h3>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="บันทึกเพิ่มเติมเกี่ยวกับผู้ใช้งานนี้..."
                ></textarea>
              </div>

              {/* ปุ่มบันทึก */}
              <div className="border-t pt-6 flex justify-end">
                <div className="flex gap-2">
                  <Link
                    href="/admin/users"
                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    ยกเลิก
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className={`px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 ${
                      saving
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    <Save size={18} />
                    {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Modal ยืนยันการลบผู้ใช้ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบผู้ใช้
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบผู้ใช้ &quot;{formData.name}&quot; ใช่หรือไม่?
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

      {/* Modal รีเซ็ตรหัสผ่าน */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              รีเซ็ตรหัสผ่าน
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการรีเซ็ตรหัสผ่านของผู้ใช้ &quot;{formData.name}&quot;
              ใช่หรือไม่?
              <br />
              <br />
              ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมล:{" "}
              <strong>{formData.email}</strong>
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                ส่งลิงก์รีเซ็ตรหัสผ่าน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
