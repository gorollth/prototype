// src/services/locationService.ts
import { Location } from "@/lib/types/location";
import { accessibleLocations } from "@/data/locations";

/**
 * คำนวณระยะทาง Haversine ระหว่างสองจุดบนพื้นผิวโลก
 * @param lat1 ละติจูดของจุดที่ 1
 * @param lon1 ลองจิจูดของจุดที่ 1
 * @param lat2 ละติจูดของจุดที่ 2
 * @param lon2 ลองจิจูดของจุดที่ 2
 * @returns ระยะทางในหน่วยกิโลเมตร
 */
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // รัศมีของโลกในกิโลเมตร
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // ระยะทางในกิโลเมตร
  return distance;
};

/**
 * Service สำหรับจัดการข้อมูลสถานที่
 */
export const locationService = {
  /**
   * ค้นหาสถานที่ที่เข้าถึงได้ด้วยรถเข็นในรัศมีที่กำหนด
   * @param position ตำแหน่งอ้างอิง [ละติจูด, ลองจิจูด]
   * @param radius รัศมีในหน่วยกิโลเมตร
   * @returns สถานที่ที่อยู่ในรัศมีพร้อมระยะทาง
   */
  findNearbyAccessibleLocations: async (
    position: [number, number],
    radius: number
  ): Promise<(Location & { distance: number })[]> => {
    // จำลองการเรียก API โดยใช้ข้อมูลจำลอง
    return new Promise((resolve) => {
      setTimeout(() => {
        const nearbyLocations = accessibleLocations
          .map((location) => {
            const distance = calculateDistance(
              position[0],
              position[1],
              location.position[0],
              location.position[1]
            );
            return { ...location, distance };
          })
          .filter((location) => location.distance <= radius)
          .sort((a, b) => a.distance - b.distance);

        resolve(nearbyLocations);
      }, 500); // จำลองความล่าช้าของเครือข่าย
    });
  },

  /**
   * ค้นหาสถานที่ตามคำค้นหา
   * @param query คำค้นหา
   * @returns สถานที่ที่ตรงกับคำค้นหา
   */
  searchLocations: async (query: string): Promise<Location[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const normalizedQuery = query.toLowerCase().trim();
        if (!normalizedQuery) {
          resolve([]);
          return;
        }

        const results = accessibleLocations.filter(
          (location) =>
            location.name.toLowerCase().includes(normalizedQuery) ||
            location.category.toLowerCase().includes(normalizedQuery) ||
            location.description.toLowerCase().includes(normalizedQuery) ||
            // ค้นหาใน features ด้วย
            location.features.some((feature) =>
              feature.toLowerCase().includes(normalizedQuery)
            )
        );

        resolve(results);
      }, 300);
    });
  },

  /**
   * ดึงข้อมูลสถานที่ตาม ID
   * @param id ID ของสถานที่
   * @returns ข้อมูลสถานที่
   */
  getLocationById: async (id: number): Promise<Location | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const location =
          accessibleLocations.find((loc) => loc.id === id) || null;
        resolve(location);
      }, 200);
    });
  },
};
