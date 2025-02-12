// src/data/locations.ts
import { Location } from "@/components/LocationMarker";

export const accessibleLocations: Location[] = [
  {
    id: 1,
    name: "EmQuartier",
    position: [13.7305, 100.5697] as [number, number],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Multiple Elevators",
      "Accessible Restrooms",
      "Wide Walkways",
      "Wheelchair Service",
      "Disabled Parking",
      "Direct BTS Access",
    ],
    description:
      "Modern mall with complete accessibility features and skywalk connections",
    accessibilityScores: {
      parking: {
        name: "Parking",
        score: 9,
        description: "Multiple disabled parking spots near elevators",
      },
      elevator: {
        name: "Elevators",
        score: 10,
        description: "Multiple large elevators with clear signage",
      },
      restroom: {
        name: "Restrooms",
        score: 9,
        description: "Accessible restrooms on every floor",
      },
      entrance: {
        name: "Entrances",
        score: 9,
        description: "Level entrances with automatic doors",
      },
      pathway: {
        name: "Pathways",
        score: 10,
        description: "Wide corridors and ramps throughout",
      },
      assistance: {
        name: "Staff Assistance",
        score: 8,
        description: "Trained staff available on request",
      },
    },
  },
  {
    id: 2,
    name: "Terminal 21",
    position: [13.7373, 100.5602] as [number, number],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Glass Elevators",
      "Accessible Toilets",
      "Wide Corridors",
      "Wheelchair Available",
      "Close to BTS",
    ],
    description: "Airport-themed mall with excellent accessibility features",
    accessibilityScores: {
      parking: {
        name: "Parking",
        score: 8,
        description: "Designated parking near elevators",
      },
      elevator: {
        name: "Elevators",
        score: 9,
        description: "Multiple glass elevators throughout",
      },
      restroom: {
        name: "Restrooms",
        score: 9,
        description: "Accessible facilities on all floors",
      },
      entrance: {
        name: "Entrances",
        score: 9,
        description: "Direct skywalk access",
      },
      pathway: {
        name: "Pathways",
        score: 9,
        description: "Wide paths with smooth surfaces",
      },
    },
  },
  {
    id: 3,
    name: "Siam Paragon",
    position: [13.7466, 100.5347] as [number, number],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Large Elevators",
      "Multiple Ramps",
      "Accessible Facilities",
      "Wheelchair Service",
      "BTS Connection",
    ],
    description: "Luxury mall with comprehensive accessibility",
    accessibilityScores: {
      parking: {
        name: "Parking",
        score: 9,
        description: "Spacious disabled parking area",
      },
      elevator: {
        name: "Elevators",
        score: 10,
        description: "Large, accessible elevators",
      },
      restroom: {
        name: "Restrooms",
        score: 8,
        description: "Well-maintained accessible facilities",
      },
      entrance: {
        name: "Entrances",
        score: 9,
        description: "Multiple accessible entrances",
      },
    },
  },
  {
    id: 4,
    name: "Central World",
    position: [13.7466, 100.5393] as [number, number],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Multiple Elevators",
      "Wide Pathways",
      "Accessible Toilets",
      "Ramp Access",
      "Skywalk Connection",
    ],
    description: "Large shopping complex with good accessibility",
    accessibilityScores: {
      parking: {
        name: "Parking",
        score: 8,
        description: "Multiple parking spots",
      },
      elevator: {
        name: "Elevators",
        score: 9,
        description: "Well-distributed elevators",
      },
      restroom: {
        name: "Restrooms",
        score: 8,
        description: "Accessible restrooms available",
      },
    },
  },
  {
    id: 5,
    name: "BTS Siam",
    position: [13.7455, 100.5331] as [number, number],
    category: "Public Transport",
    accessibility: "high",
    features: [
      "Elevator Access",
      "Staff Support",
      "Wide Gates",
      "Connected to Malls",
    ],
    description: "Major transit hub with good accessibility",
    accessibilityScores: {
      elevator: {
        name: "Elevators",
        score: 8,
        description: "Multiple elevators to platform",
      },
      entrance: {
        name: "Entrances",
        score: 9,
        description: "Wide gates and clear paths",
      },
      assistance: {
        name: "Staff Assistance",
        score: 8,
        description: "Helpful staff available",
      },
    },
  },
  {
    id: 6,
    name: "Lumpini Park",
    position: [13.7322, 100.5418] as [number, number],
    category: "Park",
    accessibility: "high",
    features: [
      "Paved Paths",
      "Accessible Restrooms",
      "Rest Areas",
      "Level Ground",
    ],
    description: "Large public park with accessible paths",
    accessibilityScores: {
      pathway: {
        name: "Pathways",
        score: 9,
        description: "Well-maintained paths",
      },
      restroom: {
        name: "Restrooms",
        score: 7,
        description: "Basic accessible facilities",
      },
    },
  },
  {
    id: 7,
    name: "MBK Center",
    position: [13.7444, 100.5296] as [number, number],
    category: "Shopping Mall",
    accessibility: "medium",
    features: ["Elevators", "Basic Facilities", "Close to BTS", "Some Ramps"],
    description: "Popular shopping center with basic accessibility",
    accessibilityScores: {
      elevator: {
        name: "Elevators",
        score: 7,
        description: "Several elevators available",
      },
      pathway: {
        name: "Pathways",
        score: 6,
        description: "Some narrow sections",
      },
    },
  },
  {
    id: 8,
    name: "Platinum Fashion Mall",
    position: [13.7504, 100.5397] as [number, number],
    category: "Shopping Mall",
    accessibility: "medium",
    features: ["Multiple Floors", "Basic Facilities", "Some Ramps"],
    description: "Wholesale mall with moderate accessibility",
    accessibilityScores: {
      elevator: {
        name: "Elevators",
        score: 6,
        description: "Limited elevators",
      },
      pathway: { name: "Pathways", score: 5, description: "Can be crowded" },
    },
  },
  {
    id: 9,
    name: "Benjakitti Park",
    position: [13.7224, 100.559] as [number, number],
    category: "Park",
    accessibility: "high",
    features: [
      "Modern Facilities",
      "Wide Paths",
      "Rest Areas",
      "Accessible Restrooms",
    ],
    description: "Modern park with excellent accessibility",
    accessibilityScores: {
      pathway: {
        name: "Pathways",
        score: 9,
        description: "Wide, smooth paths",
      },
      restroom: {
        name: "Restrooms",
        score: 8,
        description: "Modern accessible facilities",
      },
    },
  },
  {
    id: 10,
    name: "Icon Siam",
    position: [13.7267, 100.5097] as [number, number],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Modern Elevators",
      "River Access",
      "Wide Pathways",
      "Full Facilities",
    ],
    description: "Riverside mall with modern accessibility features",
    accessibilityScores: {
      elevator: {
        name: "Elevators",
        score: 9,
        description: "Modern elevator system",
      },
      pathway: {
        name: "Pathways",
        score: 9,
        description: "Spacious corridors",
      },
    },
  },
];
