// utils/obstacleUtils.tsx
import { ObstacleCategory, ObstacleType } from "@/lib/types/obstacle";

// แปลงชื่อหมวดหมู่ให้เป็นภาษาไทย
export function getCategoryLabel(category: ObstacleCategory): string {
  const categoryLabels: Record<ObstacleCategory, string> = {
    sidewalk_issues: "ปัญหาทางเท้า",
    permanent_obstacles: "อุปสรรคถาวร",
    temporary_obstacles: "อุปสรรคชั่วคราว",
    other_obstacles: "อื่นๆ",
  };
  return categoryLabels[category] || category;
}

// แปลงชื่อประเภทย่อยให้เป็นภาษาไทย
export function getTypeLabel(type: ObstacleType): string {
  const typeLabels: Record<ObstacleType, string> = {
    rough_surface: "พื้นผิวขรุขระ/ชำรุด",
    broken_drain: "ท่อระบายน้ำชำรุด/ฝาท่อหาย",
    narrow_path: "ทางเท้าแคบเกินไป",
    no_ramp: "ไม่มีทางลาดขึ้น-ลง",
    utility_pole: "เสาไฟฟ้า/เสาป้าย",
    footbridge_no_lift: "สะพานลอยที่ไม่มีลิฟต์/ทางลาด",
    construction: "จุดก่อสร้างถาวร",
    vehicles_on_sidewalk: "ยานพาหนะบนทางเท้า",
    construction_material: "วัสดุก่อสร้าง",
    garbage_bin: "ถังขยะ",
    other: "อื่นๆ",
  };
  return typeLabels[type] || type;
}
