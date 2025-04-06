// src/components/admin/ReviewsManager.tsx
import React, { useState } from "react";
import { Trash2, Star, User } from "lucide-react";

// กำหนดโครงสร้างข้อมูลรีวิว
interface Review {
  id: number;
  username: string;
  date: string;
  rating: number;
  comment: string;
  // status: "approved" | "pending" | "rejected";
}

interface ReviewsManagerProps {
  locationId: number;
}

export function ReviewsManager({ locationId }: ReviewsManagerProps) {
  // ข้อมูลรีวิวจำลอง (ในโปรเจคจริงควรดึงข้อมูลจาก API)
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      username: "สมชาย ใจดี",
      date: "2023-12-15",
      rating: 4.5,
      comment:
        "สถานที่สะดวกมาก มีทางลาดสำหรับรถเข็นเกือบทุกจุด พนักงานให้ความช่วยเหลือดี",
      // status: "approved", // ลบส่วนนี้ออก
    },
    {
      id: 2,
      username: "มานี รักดี",
      date: "2023-11-28",
      rating: 3.5,
      comment: "ทางเข้าหลักสะดวกดี แต่ห้องน้ำสำหรับคนพิการมีน้อยไปหน่อย",
      // status: "approved", // ลบส่วนนี้ออก
    },
    {
      id: 3,
      username: "วิชัย สะอาด",
      date: "2023-10-05",
      rating: 5.0,
      comment:
        "ประทับใจมากกับสิ่งอำนวยความสะดวกสำหรับผู้ใช้รถเข็น ลิฟต์กว้างขวาง ทางลาดได้มาตรฐาน",
      // status: "pending", // ลบส่วนนี้ออก
    },
  ]);

  // จัดการการอนุมัติ/ปฏิเสธรีวิว
  // const handleChangeStatus = (
  //   reviewId: number,
  //   newStatus: "approved" | "pending" | "rejected"
  // ) => {
  //   setReviews(
  //     reviews.map((review) =>
  //       review.id === reviewId ? { ...review, status: newStatus } : review
  //     )
  //   );
  // };

  // ลบรีวิว
  const handleDeleteReview = (reviewId: number) => {
    if (
      confirm("คุณต้องการลบรีวิวนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้")
    ) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  // จัดการการแก้ไขความคิดเห็น
  const handleEditComment = (reviewId: number, newComment: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, comment: newComment } : review
      )
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">รีวิวและความคิดเห็น</h3>
      <p className="text-sm text-gray-600">
        จัดการรีวิวและความคิดเห็นจากผู้ใช้งานเกี่ยวกับสถานที่นี้
      </p>

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
                    {/* ลบ dropdown สำหรับเลือก status */}
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                      title="ลบรีวิว"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <textarea
                  value={review.comment}
                  onChange={(e) => handleEditComment(review.id, e.target.value)}
                  className="w-full p-3 border rounded-md mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
