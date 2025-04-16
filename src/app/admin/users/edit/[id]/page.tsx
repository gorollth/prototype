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
  ShieldAlert,
  ShieldOff,
} from "lucide-react";
import Link from "next/link";
import { User as UserType, sampleUsers, getRoleLabel } from "@/data/users";
import { WheelchairInfoAdmin } from "@/components/admin/WheelchairInfoAdmin";

// ปรับ interface WheelchairInfo ให้ตรงกับที่ใช้ใน WheelchairInfoAdmin component
interface WheelchairInfo {
  foldability: "foldable" | "non-foldable";
  regularDimensions: {
    width: number;
    length: number;
    weight: number;
  };
  foldedDimensions?: {
    width: number;
    length: number;
    height: number;
  };
  customizations: string[];
  additionalNotes: string;
}

// เพิ่ม interface สำหรับ UserWithWheelchair
interface UserWithWheelchair extends UserType {
  wheelchair_info: WheelchairInfo;
  suspended_at?: string; // เวลาที่ระงับบัญชี
  suspended_reason?: string; // เหตุผลในการระงับบัญชี
  suspended_by?: number; // ID ของผู้ดูแลระบบที่ระงับบัญชี
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState("");

  const [formData, setFormData] = useState<UserWithWheelchair>({
    id: 0,
    name: "",
    email: "",
    role: "user",
    status: "active",
    created_at: new Date().toISOString(),
    wheelchair_info: {
      foldability: "foldable",
      regularDimensions: {
        width: 65,
        length: 107,
        weight: 15,
      },
      foldedDimensions: {
        width: 30,
        length: 80,
        height: 75,
      },
      customizations: [],
      additionalNotes: "",
    },
  });

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลผู้ใช้
    const fetchUserTimeout = setTimeout(() => {
      const user = sampleUsers.find((u) => u.id === Number(userId));
      if (user) {
        // สมมติว่าเราได้รับข้อมูลรถเข็นมาด้วย
        const userWithWheelchair: UserWithWheelchair = {
          ...user,
          wheelchair_info: {
            foldability: "foldable",
            regularDimensions: {
              width: 65,
              length: 107,
              weight: 15,
            },
            foldedDimensions: {
              width: 30,
              length: 80,
              height: 75,
            },
            customizations:
              user.id % 2 === 0
                ? ["ที่วางแขนปรับระดับได้", "ล้อแบบพิเศษ"]
                : ["เบาะพิเศษ"],
            additionalNotes:
              "ต้องการความช่วยเหลือเล็กน้อยเวลาขึ้นทางลาดชัน และต้องการที่จอดรถใกล้ทางเข้า",
          },
        };
        setFormData(userWithWheelchair);
        setLoading(false);
      } else {
        setNotFound(true);
        setLoading(false);
      }
    }, 500);

    // Clean up effect
    return () => {
      clearTimeout(fetchUserTimeout);
    };
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ตรวจสอบให้แน่ใจว่า handleWheelchairInfoSave มีประกาศ parameter ที่ตรงกับ interface ที่ WheelchairInfoAdmin ต้องการ
  const handleWheelchairInfoSave = (data: WheelchairInfo) => {
    setFormData((prev) => ({ ...prev, wheelchair_info: data }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // จำลองการบันทึกข้อมูล
      console.log("Saving user data:", formData);

      // จำลองการเรียก API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // เสร็จสิ้นการบันทึก
      setSaving(false);
      router.push("/admin/users");
    } catch (error) {
      console.error("Error saving user data:", error);
      setSaving(false);
      // ในกรณีเกิดข้อผิดพลาด ควรแสดง error message แก่ผู้ใช้
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleDelete = async () => {
    try {
      // จำลองการลบผู้ใช้
      console.log("Deleting user:", formData.id);

      // จำลองการเรียก API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ปิด modal และ navigate กลับไปยังหน้ารายการผู้ใช้
      setShowDeleteModal(false);
      router.push("/admin/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      setShowDeleteModal(false);
      alert("เกิดข้อผิดพลาดในการลบผู้ใช้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleResetPassword = async () => {
    try {
      // จำลองการรีเซ็ตรหัสผ่าน
      console.log("Resetting password for user:", formData.id);

      // จำลองการเรียก API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowResetPasswordModal(false);
      alert(
        `ระบบได้ส่งอีเมลรีเซ็ตรหัสผ่านไปยัง ${formData.email} เรียบร้อยแล้ว`
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      setShowResetPasswordModal(false);
      alert("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน กรุณาลองใหม่อีกครั้ง");
    }
  };

  // ฟังก์ชันระงับการใช้งานบัญชี
  const handleSuspendUser = () => {
    setFormData((prev) => ({
      ...prev,
      status: "banned",
      suspended_at: new Date().toISOString(),
      suspended_reason: suspensionReason,
      suspended_by: 1, // ID ของผู้ดูแลระบบที่กำลังใช้งาน (ควรดึงจาก session)
    }));

    setSuspensionReason("");
    setShowStatusModal(false);

    // แสดงข้อความแจ้งเตือน
    alert(`ระงับการใช้งานบัญชี ${formData.name} เรียบร้อยแล้ว`);
  };

  // ฟังก์ชันเปิดใช้งานบัญชี
  const handleReactivateUser = () => {
    setFormData((prev) => ({
      ...prev,
      status: "active",
      suspended_at: undefined,
      suspended_reason: undefined,
      suspended_by: undefined,
    }));

    setShowStatusModal(false);

    // แสดงข้อความแจ้งเตือน
    alert(`เปิดใช้งานบัญชี ${formData.name} เรียบร้อยแล้ว`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">กำลังโหลดข้อมูล...</span>
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
          {/* ปุ่มระงับ/เปิดใช้งานบัญชี */}
          <button
            type="button"
            onClick={() => setShowStatusModal(true)}
            className={`px-4 py-2 ${
              formData.status === "banned"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white rounded-md flex items-center gap-2`}
          >
            {formData.status === "banned" ? (
              <>
                <Shield size={18} />
                <span>เปิดใช้งานบัญชี</span>
              </>
            ) : (
              <>
                <ShieldOff size={18} />
                <span>ระงับการใช้งานบัญชี</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowResetPasswordModal(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-2"
          >
            <Lock size={18} />
            <span>รีเซ็ตรหัสผ่าน</span>
          </button>
          <button
            type="button"
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

                {/* แสดงข้อมูลการระงับบัญชี */}
                {formData.status === "banned" && formData.suspended_at && (
                  <div className="flex items-center mt-2">
                    <ShieldAlert size={14} className="mr-2 text-red-500" />
                    <div>
                      <p className="text-red-500">ระงับการใช้งานเมื่อ</p>
                      <p className="font-medium text-red-600">
                        {new Date(formData.suspended_at).toLocaleDateString(
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

                {/* ปิดตัวเลือกบทบาท และใช้เพียงแสดงผล */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    บทบาท
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={getRoleLabel(formData.role)}
                      readOnly
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
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

              {/* แสดงข้อมูลเพิ่มเติมเกี่ยวกับการระงับบัญชี */}
              {formData.status === "banned" && (
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                  <h3 className="text-sm font-medium text-red-800 flex items-center gap-2 mb-2">
                    <ShieldOff size={16} />
                    สถานะบัญชี: ระงับการใช้งาน
                  </h3>
                  <div className="text-sm text-red-700">
                    <p>
                      บัญชีนี้ถูกระงับการใช้งาน ผู้ใช้จะไม่สามารถเข้าสู่ระบบได้
                    </p>
                    {formData.suspended_reason && (
                      <p className="mt-1">
                        <strong>เหตุผล:</strong> {formData.suspended_reason}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ข้อมูลรถเข็น */}
              <div className="border-t pt-6">
                <WheelchairInfoAdmin
                  initialData={formData.wheelchair_info}
                  onSave={handleWheelchairInfoSave}
                />
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
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
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
                type="button"
                onClick={() => setShowResetPasswordModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                ส่งลิงก์รีเซ็ตรหัสผ่าน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal ยืนยันการเปลี่ยนสถานะบัญชี */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {formData.status === "banned"
                ? "เปิดใช้งานบัญชี"
                : "ระงับการใช้งานบัญชี"}
            </h3>
            <p className="text-gray-600 mb-4">
              {formData.status === "banned"
                ? `คุณต้องการเปิดใช้งานบัญชีของ "${formData.name}" ใช่หรือไม่?`
                : `คุณต้องการระงับการใช้งานบัญชีของ "${formData.name}" ใช่หรือไม่?`}
            </p>
            {/* แสดงฟิลด์กรอกเหตุผลเฉพาะกรณีระงับบัญชี */}
            {formData.status !== "banned" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เหตุผลในการระงับบัญชี (ไม่บังคับ)
                </label>
                <textarea
                  value={suspensionReason}
                  onChange={(e) => setSuspensionReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="ระบุเหตุผลในการระงับบัญชี..."
                />
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={
                  formData.status === "banned"
                    ? handleReactivateUser
                    : handleSuspendUser
                }
                className={`px-4 py-2 text-white rounded-md ${
                  formData.status === "banned"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
