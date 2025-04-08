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
    description:
      "Wheelchair-friendly route with smooth pavements and ramps throughout the entire path. Good shade coverage during daytime.",
    accessibility: "High",
    features: [
      "Ramps available",
      "Smooth pavement",
      "No stairs",
      "Well-lit path",
      "Regular rest areas",
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
    description:
      "Indoor route via skywalk system with elevators at all points and wide pathways. Fully sheltered from rain and sun.",
    accessibility: "High",
    features: [
      "Covered walkway",
      "Elevators",
      "Air-conditioned",
      "Security guards",
      "Accessible restrooms",
    ],
    path: [
      [13.7466, 100.5347],
      [13.747, 100.5385],
      [13.7466, 100.5393],
    ],
  },
  {
    id: 3,
    title: "MBK to National Stadium",
    distance: "0.7 km",
    duration: "10 min",
    rating: 4.6,
    date: "2024-02-05",
    type: "saved",
    from: "MBK Center",
    to: "National Stadium",
    description:
      "Short, convenient route with skywalk connection directly to BTS station. Elevator access at both ends.",
    accessibility: "High",
    features: [
      "Skywalk connection",
      "Elevator access",
      "Security personnel",
      "No traffic crossing",
    ],
    path: [
      [13.7445, 100.5302],
      [13.7455, 100.5292],
      [13.7459, 100.5283],
    ],
  },
  {
    id: 4,
    title: "Terminal 21 to Asok BTS",
    distance: "0.3 km",
    duration: "5 min",
    rating: 5.0,
    date: "2024-01-28",
    type: "saved",
    from: "Terminal 21",
    to: "BTS Asok",
    description:
      "Perfectly accessible direct connection from mall to BTS station with dedicated elevator for wheelchair users.",
    accessibility: "High",
    features: [
      "Direct connection",
      "Priority elevator",
      "Staff assistance",
      "No level changes",
    ],
    path: [
      [13.7373, 100.5602],
      [13.7376, 100.5609],
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
    description:
      "Very accessible short route with excellent facilities and wide pavements. Park entrance has accessible ramps.",
    accessibility: "High",
    features: [
      "Wide sidewalks",
      "No traffic crossings",
      "Gentle slopes",
      "Guard assistance",
    ],
    path: [
      [13.7305, 100.5697],
      [13.7325, 100.569],
    ],
  },
  {
    id: 6,
    title: "CentralWorld to Pratunam",
    distance: "1.2 km",
    duration: "15 min",
    rating: 4.3,
    date: "2024-03-05",
    type: "recent",
    from: "CentralWorld",
    to: "Pratunam Market",
    description:
      "Accessible route with some busy sections but generally good for wheelchairs. One section requires assistance at a slight slope.",
    accessibility: "High",
    features: [
      "Partial covered path",
      "Traffic light crossings",
      "Some helper points",
      "Accessible street food areas",
    ],
    path: [
      [13.7466, 100.5393],
      [13.7486, 100.5389],
      [13.7508, 100.5379],
    ],
  },
  {
    id: 7,
    title: "Siam Paragon to Erawan Shrine",
    distance: "0.6 km",
    duration: "8 min",
    rating: 4.7,
    date: "2024-01-20",
    type: "saved",
    from: "Siam Paragon",
    to: "Erawan Shrine",
    description:
      "Convenient route along Ratchadamri Road with wide sidewalks and good lighting at night. Several resting spots available.",
    accessibility: "High",
    features: [
      "Wide sidewalks",
      "Evening lighting",
      "Multiple rest areas",
      "Quick route",
    ],
    path: [
      [13.7464, 100.5321],
      [13.7444, 100.5402],
    ],
  },
  {
    id: 8,
    title: "IconSiam to River Ferry",
    distance: "0.4 km",
    duration: "6 min",
    rating: 4.6,
    date: "2024-02-20",
    type: "recent",
    from: "IconSiam",
    to: "Charoen Nakhon Ferry Pier",
    description:
      "Fully accessible riverside path with wheelchair-friendly ferry connection. Staff always available to assist at the pier.",
    accessibility: "High",
    features: [
      "Riverside views",
      "Staff assistance",
      "Accessible ferry",
      "Smooth surfaces",
    ],
    path: [
      [13.726, 100.5106],
      [13.7266, 100.5127],
    ],
  },
  {
    id: 9,
    title: "Central Embassy to Ploenchit BTS",
    distance: "0.4 km",
    duration: "5 min",
    rating: 4.9,
    date: "2024-03-15",
    type: "recent",
    from: "Central Embassy",
    to: "BTS Ploenchit",
    description:
      "Premium route with excellent accessibility features and staff ready to assist. Direct elevator connection to BTS station.",
    accessibility: "High",
    features: [
      "Premium environment",
      "Staff assistance",
      "Direct BTS access",
      "Air-conditioned path",
    ],
    path: [
      [13.7446, 100.547],
      [13.7443, 100.5492],
    ],
  },
  {
    id: 10,
    title: "Platinum Mall to Ratchathewi BTS",
    distance: "0.8 km",
    duration: "12 min",
    rating: 4.2,
    date: "2024-02-18",
    type: "saved",
    from: "Platinum Fashion Mall",
    to: "BTS Ratchathewi",
    description:
      "Accessible route through busy shopping area. Contains one carefully designed ramp section for wheelchair users.",
    accessibility: "High",
    features: [
      "Shopping district",
      "Modified ramps",
      "Security presence",
      "Street food access points",
    ],
    path: [
      [13.7518, 100.5367],
      [13.7511, 100.5317],
      [13.7508, 100.531],
    ],
  },
  {
    id: 11,
    title: "Siam Discovery to Jim Thompson House",
    distance: "1.0 km",
    duration: "15 min",
    rating: 4.4,
    date: "2024-03-10",
    type: "recent",
    from: "Siam Discovery",
    to: "Jim Thompson House",
    description:
      "Cultural route with accessible pathways leading to a heritage site. The museum itself has wheelchair access and facilities.",
    accessibility: "High",
    features: [
      "Cultural interest",
      "Heritage access",
      "Guided assistance",
      "Smooth pavements",
    ],
    path: [
      [13.7456, 100.5331],
      [13.7512, 100.5272],
    ],
  },
  {
    id: 12,
    title: "Gaysorn Village to Central Embassy",
    distance: "0.7 km",
    duration: "10 min",
    rating: 4.8,
    date: "2024-01-22",
    type: "saved",
    from: "Gaysorn Village",
    to: "Central Embassy",
    description:
      "Luxury shopping route with premium accessibility features and staff assistance available throughout the connected buildings.",
    accessibility: "High",
    features: [
      "Premium facilities",
      "Indoor connection",
      "Shopping access",
      "Dedicated elevators",
    ],
    path: [
      [13.7445, 100.5408],
      [13.7446, 100.547],
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
