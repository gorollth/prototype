// src/components/admin/ReviewsEditor.tsx
import React, { useState } from "react";
import { Trash2, Star, User, Plus } from "lucide-react";

// กำหนดโครงสร้างข้อมูลรีวิว
export interface ReviewFormData {
  id: number;
  username: string;
  date: string;
  rating: number;
  comment: string;
}

interface ReviewsEditorProps {
  reviews: ReviewFormData[];
  onChange: (reviews: ReviewFormData[]) => void;
}

export function ReviewsEditor({ reviews, onChange }: ReviewsEditorProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState<ReviewFormData>({
    id: 0,
    username: "",
    date: new Date().toISOString().split("T")[0],
    rating: 5,
    comment: "",
  });

  // ลบรีวิว
  const handleDeleteReview = (reviewId: number) => {
    if (
      confirm("คุณต้องการลบรีวิวนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้")
    ) {
      const updatedReviews = reviews.filter((review) => review.id !== reviewId);
      onChange(updatedReviews);
    }
  };

  // เพิ่มรีวิวใหม่
  const handleAddReview = () => {
    // สร้าง ID ใหม่
    const newId =
      reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;

    const reviewToAdd = {
      ...newReview,
      id: newId,
    };

    // เพิ่มรีวิวใหม่และรีเซ็ตฟอร์ม
    onChange([...reviews, reviewToAdd]);
    setNewReview({
      id: 0,
      username: "",
      date: new Date().toISOString().split("T")[0],
      rating: 5,
      comment: "",
    });
    setShowAddForm(false);
  };

  // อัปเดตข้อมูลในฟอร์มเพิ่มรีวิว
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === "rating" ? parseFloat(value) : value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">รีวิวและความคิดเห็น</h3>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          <span>เพิ่มรีวิว</span>
        </button>
      </div>

      <p className="text-sm text-gray-600">
        จัดการรีวิวและความคิดเห็นจากผู้ใช้งานเกี่ยวกับสถานที่นี้
      </p>

      {/* ฟอร์มเพิ่มรีวิวใหม่ */}
      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <h4 className="font-medium mb-3">เพิ่มรีวิวใหม่</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อผู้ใช้ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={newReview.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ชื่อผู้ใช้"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  วันที่ <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={newReview.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คะแนน <span className="text-red-500">*</span>
              </label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5 ดาว - ยอดเยี่ยม</option>
                <option value="4.5">4.5 ดาว</option>
                <option value="4">4 ดาว - ดีมาก</option>
                <option value="3.5">3.5 ดาว</option>
                <option value="3">3 ดาว - ปานกลาง</option>
                <option value="2.5">2.5 ดาว</option>
                <option value="2">2 ดาว - แย่</option>
                <option value="1.5">1.5 ดาว</option>
                <option value="1">1 ดาว - แย่มาก</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ข้อความรีวิว <span className="text-red-500">*</span>
              </label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เขียนรีวิวเกี่ยวกับสถานที่นี้..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleAddReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!newReview.username || !newReview.comment}
              >
                บันทึกรีวิว
              </button>
            </div>
          </div>
        </div>
      )}

      {/* แสดงรายการรีวิว */}
      {reviews.length === 0 ? (
        <div className="p-6 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">ยังไม่มีรีวิวสำหรับสถานที่นี้</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg overflow-hidden bg-white border-gray-200"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <span className="font-medium">{review.username}</span>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{review.date}</span>
                        <div className="flex items-center">
                          <Star
                            size={14}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="ml-1">{review.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                      title="ลบรีวิว"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-md mt-2 text-gray-700">
                  {review.comment}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
