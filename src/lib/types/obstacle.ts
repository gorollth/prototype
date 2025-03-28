// Path: src/lib/types/obstacle.ts

export type ObstacleCategory =
  | "sidewalk_issues" // ปัญหาทางเท้าที่สำคัญ
  | "permanent_obstacles" // สิ่งกีดขวางถาวรที่สำคัญ
  | "temporary_obstacles" // สิ่งกีดขวางชั่วคราวที่สำคัญ
  | "other_obstacles"; // อื่นๆ

// ประเภทของอุปสรรคต่างๆ
export type ObstacleType =
  // 🛑 ปัญหาทางเท้าที่สำคัญ (sidewalk_issues)
  | "rough_surface" // พื้นผิวขรุขระ/ชำรุด
  | "broken_drain" // ท่อระบายน้ำชำรุด/ฝาท่อหาย
  | "narrow_path" // ทางเท้าแคบเกินไป
  | "no_ramp" // ไม่มีทางลาดขึ้น-ลง

  // 🚧 สิ่งกีดขวางถาวรที่สำคัญ (permanent_obstacles)
  | "utility_pole" // เสาไฟฟ้า/เสาป้าย
  | "footbridge_no_lift" // สะพานลอยที่ไม่มีลิฟต์/ทางลาด
  | "construction" // จุดก่อสร้างถาวร

  // ⚠️ สิ่งกีดขวางชั่วคราวที่สำคัญ (temporary_obstacles)
  | "vehicles_on_sidewalk" // ยานพาหนะบนทางเท้า
  | "construction_material" // วัสดุก่อสร้าง
  | "garbage_bin" // ถังขยะ

  // ❓ อื่นๆ (other_obstacles)
  | "other"; // อื่นๆ

// โครงสร้างข้อมูลของอุปสรรค
export interface Obstacle {
  id: string;
  category: ObstacleCategory;
  type: ObstacleType;
  position: [number, number]; // [latitude, longitude]
  title: string;
  description: string;
  reportedAt: string; // ISO date
  reportedBy: string;
  status: "active" | "resolved";
  lastVerified?: string; // ISO date, เวลาที่มีการตรวจสอบล่าสุด
  imageUrl?: string;
  verifyCount: {
    stillPresent: number; // จำนวนคนที่ยืนยันว่ายังมีอุปสรรคอยู่
    resolved: number; // จำนวนคนที่ยืนยันว่าอุปสรรคถูกแก้ไขแล้ว
  };
}

// ข้อมูล Category พร้อมไอคอนและคำอธิบาย
export const OBSTACLE_CATEGORIES = {
  sidewalk_issues: {
    label: "ปัญหาทางเท้า",
    icon: "🛑",
    types: [
      { value: "rough_surface", label: "พื้นผิวขรุขระ/ชำรุด" },
      { value: "broken_drain", label: "ท่อระบายน้ำชำรุด/ฝาท่อหาย" },
      { value: "narrow_path", label: "ทางเท้าแคบเกินไป" },
      { value: "no_ramp", label: "ไม่มีทางลาดขึ้น-ลง" },
    ],
  },
  permanent_obstacles: {
    label: "สิ่งกีดขวางถาวร",
    icon: "🚧",
    types: [
      { value: "utility_pole", label: "เสาไฟฟ้า/เสาป้าย" },
      { value: "footbridge_no_lift", label: "สะพานลอยที่ไม่มีลิฟต์/ทางลาด" },
      { value: "construction", label: "จุดก่อสร้างถาวร" },
    ],
  },
  temporary_obstacles: {
    label: "สิ่งกีดขวางชั่วคราว",
    icon: "⚠️",
    types: [
      { value: "vehicles_on_sidewalk", label: "ยานพาหนะบนทางเท้า" },
      { value: "construction_material", label: "วัสดุก่อสร้าง" },
      { value: "garbage_bin", label: "ถังขยะ" },
    ],
  },
  other_obstacles: {
    label: "อื่นๆ",
    icon: "❓",
    types: [{ value: "other", label: "อื่นๆ" }],
  },
};
