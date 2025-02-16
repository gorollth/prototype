// Path: src/data/locations.ts

import { Location } from "@/lib/types/location";

export const accessibleLocations: Location[] = [
  {
    id: 1,
    name: "EmQuartier",
    position: [13.7305, 100.5697],
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
        isLiked: false,
        totalVotes: 45,
        description: "Multiple disabled parking spots near elevators",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Accessible parking spots near entrance",
          },
          {
            url: "/api/placeholder/800/600",
            caption: "Clear signage for disabled parking",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: false,
        totalVotes: 52,
        description: "Level entrances with automatic doors",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Automatic sliding doors",
          },
          {
            url: "/api/placeholder/800/600",
            caption: "Level entrance from BTS",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: false,
        totalVotes: 49,
        description: "Gentle slopes with handrails at all level changes",
        images: [
          { url: "/api/placeholder/800/600", caption: "Main entrance ramp" },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: false,
        totalVotes: 73,
        description: "Wide corridors and ramps throughout",
        images: [
          { url: "/api/placeholder/800/600", caption: "Wide main corridor" },
          {
            url: "/api/placeholder/800/600",
            caption: "Clear pathway markings",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: false,
        totalVotes: 67,
        description: "Multiple large elevators with clear signage",
        images: [
          { url: "/api/placeholder/800/600", caption: "Main elevator hall" },
          {
            url: "/api/placeholder/800/600",
            caption: "Elevator control panel height",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: false,
        totalVotes: 38,
        description: "Accessible restrooms on every floor",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Accessible restroom entrance",
          },
          {
            url: "/api/placeholder/800/600",
            caption: "Support rails installation",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: false,
        totalVotes: 35,
        description: "Multiple rest areas with accessible seating throughout",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Rest area with adequate space",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: false,
        totalVotes: 41,
        description: "Trained staff available on request",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Information counter with lowered section",
          },
        ],
      },
    },
  },
  {
    id: 2,
    name: "Terminal 21",
    position: [13.7373, 100.5602],
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
        isLiked: false,
        totalVotes: 32,
        description: "Designated parking near elevators",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Dedicated wheelchair parking area",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: false,
        totalVotes: 47,
        description: "Direct skywalk access",
        images: [
          { url: "/api/placeholder/800/600", caption: "Skywalk entrance" },
          { url: "/api/placeholder/800/600", caption: "Ground level entrance" },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: false,
        totalVotes: 44,
        description: "Well-maintained ramps at all entrances",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Main ramp with handrails",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: false,
        totalVotes: 51,
        description: "Wide paths with smooth surfaces",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Main shopping corridor",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: false,
        totalVotes: 58,
        description: "Multiple glass elevators throughout",
        images: [
          { url: "/api/placeholder/800/600", caption: "Glass elevator" },
          { url: "/api/placeholder/800/600", caption: "Elevator interior" },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: false,
        totalVotes: 43,
        description: "Accessible facilities on all floors",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Accessible toilet facilities",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: false,
        totalVotes: 39,
        description: "Comfortable rest areas on each floor",
        images: [
          { url: "/api/placeholder/800/600", caption: "Public seating area" },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: false,
        totalVotes: 46,
        description: "Helpful staff with wheelchair assistance available",
        images: [
          {
            url: "/api/placeholder/800/600",
            caption: "Customer service counter",
          },
        ],
      },
    },
  },
];
