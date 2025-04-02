"use client";

import { useState, useEffect } from "react";
import {
  Users,
  MapPin,
  AlertTriangle,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import { accessibleLocations } from "@/data/locations";
import { sampleObstacles } from "@/data/obstacles";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    locations: 0,
    obstacles: 0,
    reviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // จำลองการเรียก API เพื่อดึงข้อมูลสถิติ
    setTimeout(() => {
      setStats({
        users: 1248,
        locations: accessibleLocations.length,
        obstacles: sampleObstacles.length,
        reviews: 356,
      });
      setLoading(false);
    }, 1000);
  }, []);

  interface Activity {
    type: ActivityType;
    title: string;
    user: string;
    time: string;
    location?: string;
    obstacle?: string;
    rating?: number;
    status?: string;
  }

  const recentActivities: Activity[] = [
    {
      type: "user",
      title: "ผู้ใช้ใหม่ลงทะเบียน",
      user: "สมชาย ใจดี",
      time: "2 นาทีที่แล้ว",
    },
    {
      type: "location",
      title: "เพิ่มสถานที่ใหม่",
      user: "มานี รักสะอาด",
      time: "15 นาทีที่แล้ว",
      location: "Mega Bangna",
    },
    {
      type: "obstacle",
      title: "รายงานอุปสรรค",
      user: "สมศรี ดีต่อใจ",
      time: "45 นาทีที่แล้ว",
      obstacle: "ทางเท้าชำรุด",
    },
    {
      type: "review",
      title: "รีวิวสถานที่",
      user: "วิชัย พร้อมพรัก",
      time: "1 ชั่วโมงที่แล้ว",
      location: "Terminal 21",
      rating: 4.5,
    },
    {
      type: "obstacle",
      title: "อัปเดตสถานะอุปสรรค",
      user: "สมหมาย ใจเกินร้อย",
      time: "2 ชั่วโมงที่แล้ว",
      obstacle: "เสาไฟฟ้ากีดขวาง",
      status: "ได้รับการแก้ไขแล้ว",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">แดชบอร์ด</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="จำนวนผู้ใช้งาน"
          value={stats.users}
          icon={<Users className="text-blue-500" size={24} />}
          change={5.2}
          positive={true}
        />
        <StatsCard
          title="สถานที่ทั้งหมด"
          value={stats.locations}
          icon={<MapPin className="text-green-500" size={24} />}
          change={2.1}
          positive={true}
        />
        <StatsCard
          title="อุปสรรคที่รายงาน"
          value={stats.obstacles}
          icon={<AlertTriangle className="text-orange-500" size={24} />}
          change={1.5}
          positive={false}
        />
        <StatsCard
          title="รีวิวและความคิดเห็น"
          value={stats.reviews}
          icon={<MessageSquare className="text-purple-500" size={24} />}
          change={8.3}
          positive={true}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">กิจกรรมล่าสุด</h2>
            <button className="text-blue-600 hover:text-blue-800 flex items-center">
              ดูทั้งหมด <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 border-b pb-3 last:border-0"
              >
                <div
                  className={`p-2 rounded-full ${getActivityIconColor(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{activity.title}</h3>
                    <span className="text-gray-500 text-sm">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {activity.user}
                    {activity.location && ` - ${activity.location}`}
                    {activity.obstacle && ` - ${activity.obstacle}`}
                    {activity.rating && ` - ให้คะแนน ${activity.rating}/5`}
                    {activity.status && ` - ${activity.status}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">สถิติสถานที่</h2>
            <div className="flex space-x-2">
              <span className="flex items-center text-sm text-gray-500">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                เข้าถึงได้ง่าย
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                เข้าถึงได้ปานกลาง
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                เข้าถึงได้ยาก
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">ห้างสรรพสินค้า</span>
                <span className="text-sm text-gray-500">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">ระบบขนส่งสาธารณะ</span>
                <span className="text-sm text-gray-500">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">สวนสาธารณะ</span>
                <span className="text-sm text-gray-500">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">ร้านอาหาร</span>
                <span className="text-sm text-gray-500">55%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: "55%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-medium mb-2">อุปสรรคที่รายงานบ่อย</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm">ทางเท้าไม่เรียบ/ชำรุด</span>
                <span className="text-sm font-semibold">32%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">ไม่มีทางลาด</span>
                <span className="text-sm font-semibold">28%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">เสาไฟฟ้า/ป้ายกีดขวาง</span>
                <span className="text-sm font-semibold">18%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">ยานพาหนะบนทางเท้า</span>
                <span className="text-sm font-semibold">14%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// กำหนดประเภทข้อมูลสำหรับ Props ของ StatsCard
interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change: number;
  positive: boolean;
}

// Stats Card Component
function StatsCard({ title, value, icon, change, positive }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between">
        <span className="text-gray-500">{title}</span>
        {icon}
      </div>
      <p className="text-3xl font-bold mt-4 mb-2">{value.toLocaleString()}</p>
      <div className="flex items-center">
        <span
          className={`inline-flex items-center ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {positive ? (
            <ArrowUp size={16} className="mr-1" />
          ) : (
            <ArrowDown size={16} className="mr-1" />
          )}
          {change}%
        </span>
        <span className="ml-2 text-gray-500 text-sm">จากเดือนที่แล้ว</span>
      </div>
    </div>
  );
}

// กำหนดประเภทสำหรับประเภทกิจกรรม
type ActivityType = "user" | "location" | "obstacle" | "review";

// Helper functions for activity feed
function getActivityIcon(type: ActivityType): React.ReactNode {
  switch (type) {
    case "user":
      return <Users size={18} className="text-white" />;
    case "location":
      return <MapPin size={18} className="text-white" />;
    case "obstacle":
      return <AlertTriangle size={18} className="text-white" />;
    case "review":
      return <MessageSquare size={18} className="text-white" />;
    default:
      return <ArrowRight size={18} className="text-white" />;
  }
}

function getActivityIconColor(type: ActivityType): string {
  switch (type) {
    case "user":
      return "bg-blue-500";
    case "location":
      return "bg-green-500";
    case "obstacle":
      return "bg-orange-500";
    case "review":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
}
