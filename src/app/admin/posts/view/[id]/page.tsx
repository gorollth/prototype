// src/app/admin/posts/view/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Heart, MessageCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

// ตัวอย่างข้อมูลโพสต์
const samplePosts = [
  {
    id: 1,
    title:
      "พบเส้นทางที่เข้าถึงได้ในสวนลุมพินี ทางเดินกว้างและเรียบ เหมาะสำหรับรถเข็น!",
    content:
      "เส้นทางมีทางลาดตลอดทาง มีจุดพักที่ร่มรื่น พนักงานในสวนให้ความช่วยเหลือดีมาก แนะนำให้มาในช่วงเช้าเพราะคนไม่เยอะและอากาศไม่ร้อนมาก เส้นทางรอบสวนมีความยาวประมาณ 2.5 กิโลเมตร มีทางออกหลายทางให้เลือกตามความสะดวก ห้องน้ำสำหรับผู้พิการมีให้บริการทุกโซน",
    category: "routes",
    author: "sarah_wheels",
    authorAvatar: "/api/placeholder/64/64",
    likes: 124,
    comments: [
      {
        id: 1,
        author: "wheelie_explorer",
        content: "ขอบคุณสำหรับข้อมูลดีๆ ค่ะ เป็นประโยชน์มาก",
        createdAt: "2024-04-01T09:15:00Z",
      },
      {
        id: 2,
        author: "access_for_all",
        content:
          "ฉันเคยไปที่นั่นเมื่อสัปดาห์ที่แล้ว เห็นด้วยว่าเป็นสถานที่ที่เข้าถึงได้ดีมาก",
        createdAt: "2024-04-01T11:30:00Z",
      },
    ],
    createdAt: "2024-04-01T08:00:00Z",
    status: "published",
    tags: ["สวนสาธารณะ", "เส้นทางสำหรับรถเข็น", "กรุงเทพ", "กิจกรรมกลางแจ้ง"],
    images: [
      "/api/placeholder/600/400?text=สวนลุมพินี+1",
      "/api/placeholder/600/400?text=สวนลุมพินี+2",
    ],
  },
  {
    id: 2,
    title:
      "คาเฟ่ใหม่ย่านทองหล่อที่เข้าถึงได้ง่ายสำหรับผู้ใช้รถเข็น - มีประตูอัตโนมัติและพื้นที่กว้างขวาง!",
    content:
      "คาเฟ่เปิดใหม่นี้ออกแบบให้ทุกคนเข้าถึงได้ ประตูกว้างพอสำหรับรถเข็น มีห้องน้ำสำหรับผู้พิการด้วย ที่จอดรถสำหรับผู้พิการอยู่ด้านหน้าร้าน เมนูมีหลากหลายและมีตัวเลือกสำหรับผู้ที่มีข้อจำกัดด้านอาหาร พนักงานได้รับการฝึกอบรมเพื่อให้บริการลูกค้าที่มีความต้องการพิเศษ",
    category: "places",
    author: "mike_explorer",
    authorAvatar: "/api/placeholder/64/64",
    likes: 89,
    comments: [
      {
        id: 1,
        author: "coffee_lover",
        content: "ขอบคุณสำหรับคำแนะนำ จะลองไปดูเร็วๆ นี้",
        createdAt: "2024-04-02T12:15:00Z",
      },
    ],
    createdAt: "2024-04-02T10:15:00Z",
    status: "published",
    tags: ["คาเฟ่", "ร้านกาแฟ", "ทองหล่อ", "กรุงเทพ", "อาหารและเครื่องดื่ม"],
    images: ["/api/placeholder/600/400?text=คาเฟ่ทองหล่อ"],
  },
];

export default function ViewPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลโพสต์
    const loadPost = () => {
      setTimeout(() => {
        const foundPost = samplePosts.find((p) => p.id === Number(postId));
        if (foundPost) {
          setPost(foundPost);
        }
        setLoading(false);
      }, 500);
    };

    loadPost();
  }, [postId]);

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    // จำลองการลบโพสต์
    console.log("Deleting post:", post?.id);
    router.push("/admin/posts");
  };

  // แสดงหน้า Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // แสดงหน้า 404 ถ้าไม่พบโพสต์
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบโพสต์</h1>
        <p className="text-gray-600 mb-6">ไม่พบโพสต์ที่คุณต้องการดู</p>
        <Link
          href="/admin/posts"
          className="bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
        >
          <ChevronLeft size={18} className="mr-2" />
          กลับไปหน้ารายการโพสต์
        </Link>
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">รายละเอียดโพสต์</h1>
        </div>
        <div className="flex gap-2">
          {/* ลบลิงก์แก้ไขออก (ไม่ต้องมีส่วนนี้แล้ว)
            <Link
              href={`/admin/posts/edit/${post.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Edit size={18} />
              <span>แก้ไข</span>
            </Link>
            */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={18} />
            <span>ลบ</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* โพสต์ */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={post.authorAvatar || "/api/placeholder/64/64"}
                  alt={`รูปโปรไฟล์ของ ${post.author}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-lg">{post.author}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span>•</span>
                  {getStatusBadge(post.status)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart size={18} className="text-red-500" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={18} className="text-blue-500" />
                <span>{post.comments.length}</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>

          {/* รูปภาพ */}
          {post.images && post.images.length > 0 && (
            <div className="mb-6 relative">
              <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={post.images[currentImageIndex]}
                  alt={`รูปภาพประกอบโพสต์ ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {post.images.length > 1 && (
                <div className="flex mt-2 gap-2 overflow-x-auto">
                  {post.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 ${
                        currentImageIndex === index
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`รูปภาพประกอบโพสต์ ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="prose max-w-none mb-6">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>

          {/* แท็ก */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-2">แท็ก:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* หมวดหมู่ */}
          <div className="mb-6">
            <p className="font-medium mb-2">หมวดหมู่:</p>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {getCategoryName(post.category)}
            </span>
          </div>

          {/* ความคิดเห็น */}
          <div>
            <h3 className="font-medium text-lg mb-4">
              ความคิดเห็น ({post.comments.length})
            </h3>
            {post.comments.length > 0 ? (
              <div className="space-y-4">
                {post.comments.map((comment: any) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{comment.author}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">ยังไม่มีความคิดเห็น</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal ยืนยันการลบ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบโพสต์
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบโพสต์ &quot;{post.title}&quot; ใช่หรือไม่?
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
    </div>
  );
}
