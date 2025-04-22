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

  {
    id: 13,
    title: "Bangkok Art and Culture Centre to MBK",
    distance: "0.6 km",
    duration: "8 min",
    rating: 4.6,
    date: "2024-03-25",
    type: "saved",
    from: "BACC",
    to: "MBK Center",
    description:
      "Accessible cultural walk with elevator access and wide, shaded sidewalks. Ideal for daytime stroll.",
    accessibility: "High",
    features: ["Cultural route", "Elevators", "Shaded path", "Seating areas"],
    path: [
      [13.7463, 100.5296],
      [13.7453, 100.5301],
    ],
  },
  {
    id: 14,
    title: "Silom Complex to Sala Daeng BTS",
    distance: "0.4 km",
    duration: "6 min",
    rating: 4.8,
    date: "2024-02-12",
    type: "saved",
    from: "Silom Complex",
    to: "Sala Daeng BTS",
    description:
      "Fully indoor route with direct lift access and no level changes. Very popular among wheelchair users.",
    accessibility: "High",
    features: [
      "Indoor connection",
      "Direct lift",
      "No stairs",
      "Close to MRT Silom",
    ],
    path: [
      [13.729, 100.5343],
      [13.7278, 100.5348],
    ],
  },
  {
    id: 15,
    title: "Victory Monument to Century Mall",
    distance: "0.9 km",
    duration: "13 min",
    rating: 4.3,
    date: "2024-03-12",
    type: "recent",
    from: "Victory Monument",
    to: "Century Mall",
    description:
      "Moderately busy area but has a clearly marked wheelchair path and helpful staff at crossings.",
    accessibility: "High",
    features: [
      "Traffic support",
      "Ramp crossings",
      "Helpful staff",
      "Shopping access",
    ],
    path: [
      [13.7648, 100.537],
      [13.7659, 100.5352],
    ],
  },
  {
    id: 16,
    title: "BTS Ari to La Villa",
    distance: "0.5 km",
    duration: "7 min",
    rating: 4.5,
    date: "2024-02-25",
    type: "saved",
    from: "BTS Ari",
    to: "La Villa Ari",
    description:
      "Trendy urban route with wide, flat pavements and ramped access to all shops.",
    accessibility: "High",
    features: ["Trendy area", "Ramped shops", "Flat pavement", "Good lighting"],
    path: [
      [13.772, 100.5411],
      [13.7727, 100.5435],
    ],
  },
  {
    id: 17,
    title: "Mo Chit to Chatuchak Park",
    distance: "0.7 km",
    duration: "10 min",
    rating: 4.7,
    date: "2024-03-02",
    type: "saved",
    from: "Mo Chit BTS",
    to: "Chatuchak Park",
    description:
      "Popular weekend route with complete ramps and wide green paths. Park has wheelchair-friendly toilets.",
    accessibility: "High",
    features: [
      "Park facilities",
      "Weekend crowd",
      "Wide path",
      "Toilets available",
    ],
    path: [
      [13.8038, 100.5531],
      [13.8033, 100.5514],
    ],
  },
  {
    id: 18,
    title: "BTS Nana to Sukhumvit Soi 11",
    distance: "0.6 km",
    duration: "9 min",
    rating: 4.4,
    date: "2024-03-18",
    type: "recent",
    from: "BTS Nana",
    to: "Sukhumvit Soi 11",
    description:
      "Evening route with vibrant street life and accessible paths. Recommended to go with company.",
    accessibility: "High",
    features: [
      "Vibrant area",
      "Street food access",
      "Evening safe zone",
      "LED lighting",
    ],
    path: [
      [13.7382, 100.5551],
      [13.7387, 100.5569],
    ],
  },
  {
    id: 19,
    title: "Emporium to Phrom Phong BTS",
    distance: "0.3 km",
    duration: "4 min",
    rating: 4.9,
    date: "2024-03-30",
    type: "saved",
    from: "Emporium Mall",
    to: "Phrom Phong BTS",
    description:
      "One of the shortest and smoothest transitions from a mall to a station. Fully indoor and cool.",
    accessibility: "High",
    features: [
      "Super short",
      "Fully air-conditioned",
      "Automatic doors",
      "Indoor elevators",
    ],
    path: [
      [13.7301, 100.5693],
      [13.7298, 100.5704],
    ],
  },
  {
    id: 20,
    title: "BTS Thonglor to J Avenue",
    distance: "1.1 km",
    duration: "14 min",
    rating: 4.5,
    date: "2024-04-01",
    type: "recent",
    from: "BTS Thonglor",
    to: "J Avenue",
    description:
      "Trendy walk with shaded trees, wide footpaths, and ample cafes to rest at. Some slopes, but manageable.",
    accessibility: "High",
    features: [
      "Cafes along path",
      "Tree shade",
      "Resting options",
      "Good signage",
    ],
    path: [
      [13.7243, 100.5761],
      [13.7269, 100.5738],
    ],
  },
  {
    id: 21,
    title: "Gateway Ekamai to BTS Ekamai",
    distance: "0.2 km",
    duration: "3 min",
    rating: 5.0,
    date: "2024-04-05",
    type: "saved",
    from: "Gateway Ekamai",
    to: "BTS Ekamai",
    description:
      "Very short and highly accessible path through covered bridge. Elevator and signage available throughout.",
    accessibility: "High",
    features: [
      "Bridge walkway",
      "Lift on both ends",
      "Clear signage",
      "Shopping nearby",
    ],
    path: [
      [13.7197, 100.5861],
      [13.7199, 100.5854],
    ],
  },
  {
    id: 22,
    title: "BTS Chidlom to Central Chidlom",
    distance: "0.4 km",
    duration: "6 min",
    rating: 4.8,
    date: "2024-04-10",
    type: "recent",
    from: "BTS Chidlom",
    to: "Central Chidlom",
    description:
      "Direct skywalk with escalator and lift access. Route is quiet and clean, suitable for solo travel.",
    accessibility: "High",
    features: [
      "Quiet area",
      "Skywalk access",
      "Lift + escalator",
      "Well-maintained",
    ],
    path: [
      [13.744, 100.5442],
      [13.7442, 100.542],
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
