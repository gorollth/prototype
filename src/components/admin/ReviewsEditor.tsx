// src/components/admin/ReviewsEditor.tsx
import React, { useState } from "react";

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
  // สร้างรีวิวใหม่
  const [newReview, setNewReview] = useState<string>("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">รีวิวของ Admin</h3>
      </div>

      {/* ช่องข้อความสำหรับเพิ่มรีวิวใหม่ */}
      <div className="space-y-4">
        <textarea
          className="w-full min-h-[200px] p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
        />
      </div>

      {/* แสดงรีวิวที่มีอยู่ */}
      {reviews.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium mb-3">
            รีวิวที่บันทึกไว้ ({reviews.length})
          </h4>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-md border">
                <div className="text-sm text-gray-500">
                  {review.date} · คะแนน: {review.rating}/5
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
