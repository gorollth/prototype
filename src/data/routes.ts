// src/data/routes.ts
export interface Route {
  id: number;
  title: string;
  distance: string;
  duration: string;
  rating: number;
  date: string;
  type: "saved" | "recent";
  from: string;
  to: string;
  description: string;
  accessibility: "High"; // เหลือเฉพาะ High เท่านั้น
  features: string[];
  path: [number, number][];
}

export const sampleRoutes: Route[] = [
  {
    id: 1,
    title: "City Center to Park",
    distance: "2.5 km",
    duration: "30 min",
    rating: 4.5,
    date: "2024-01-15",
    type: "saved",
    from: "Central Station",
    to: "Lumphini Park",
    description: "Wheelchair-friendly route with smooth pavements and ramps",
    accessibility: "High",
    features: [
      "Ramps available",
      "Smooth pavement",
      "No stairs",
      "Well-lit path",
    ],
    path: [
      [13.7563, 100.5018],
      [13.7584, 100.5097],
      [13.7599, 100.5142],
    ],
  },
  {
    id: 2,
    title: "Siam to Central World",
    distance: "1.8 km",
    duration: "20 min",
    rating: 4.8,
    date: "2024-01-10",
    type: "saved",
    from: "BTS Siam",
    to: "Central World",
    description: "Indoor route via skywalk system with elevators at all points",
    accessibility: "High",
    features: [
      "Covered walkway",
      "Elevators",
      "Air-conditioned",
      "Security guards",
    ],
    path: [
      [13.7466, 100.5347],
      [13.747, 100.5385],
      [13.7466, 100.5393],
    ],
  },
  {
    id: 5,
    title: "EmQuartier to Benchasiri Park",
    distance: "0.5 km",
    duration: "7 min",
    rating: 4.9,
    date: "2024-02-10",
    type: "saved",
    from: "EmQuartier",
    to: "Benchasiri Park",
    description: "Very accessible short route with excellent facilities",
    accessibility: "High",
    features: ["Wide sidewalks", "No traffic crossings", "Gentle slopes"],
    path: [
      [13.7305, 100.5697],
      [13.7325, 100.569],
    ],
  },
];

// ฟังก์ชันสำหรับค้นหาเส้นทางตาม ID
export function getRouteById(id: number): Route | undefined {
  return sampleRoutes.find((route) => route.id === id);
}

// ฟังก์ชันสำหรับค้นหาเส้นทางตามคำค้นหา
export function searchRoutes(query: string): Route[] {
  if (!query.trim()) return sampleRoutes;

  const lowerQuery = query.toLowerCase();

  return sampleRoutes.filter(
    (route) =>
      route.title.toLowerCase().includes(lowerQuery) ||
      route.from.toLowerCase().includes(lowerQuery) ||
      route.to.toLowerCase().includes(lowerQuery) ||
      route.description.toLowerCase().includes(lowerQuery)
  );
}

// ลบฟังก์ชัน filterRoutesByAccessibility ออกเนื่องจากมีแต่ระดับ High เท่านั้น
