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
        isLiked: null,
        votes: {
          like: 30,
          dislike: 10,
          notSure: 5,
        },
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
        isLiked: null,
        votes: {
          like: 35,
          dislike: 12,
          notSure: 5,
        },
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
        isLiked: null,
        votes: {
          like: 32,
          dislike: 10,
          notSure: 7,
        },
        description: "Gentle slopes with handrails at all level changes",
        images: [
          { url: "/api/placeholder/800/600", caption: "Main entrance ramp" },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 45,
          dislike: 20,
          notSure: 8,
        },
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
        isLiked: null,
        votes: {
          like: 40,
          dislike: 15,
          notSure: 12,
        },
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
        isLiked: null,
        votes: {
          like: 25,
          dislike: 8,
          notSure: 5,
        },
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
        isLiked: null,
        votes: {
          like: 22,
          dislike: 8,
          notSure: 5,
        },
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
        isLiked: null,
        votes: {
          like: 28,
          dislike: 8,
          notSure: 5,
        },
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
        isLiked: null,
        votes: {
          like: 20,
          dislike: 8,
          notSure: 4,
        },
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
        isLiked: null,
        votes: {
          like: 30,
          dislike: 12,
          notSure: 5,
        },
        description: "Direct skywalk access",
        images: [
          { url: "/api/placeholder/800/600", caption: "Skywalk entrance" },
          { url: "/api/placeholder/800/600", caption: "Ground level entrance" },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 10,
          notSure: 6,
        },
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
        isLiked: null,
        votes: {
          like: 35,
          dislike: 50,
          notSure: 6,
        },
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
        isLiked: null,
        votes: {
          like: 38,
          dislike: 15,
          notSure: 5,
        },
        description: "Multiple glass elevators throughout",
        images: [
          { url: "/api/placeholder/800/600", caption: "Glass elevator" },
          { url: "/api/placeholder/800/600", caption: "Elevator interior" },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 10,
          notSure: 5,
        },
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
        isLiked: null,
        votes: {
          like: 25,
          dislike: 9,
          notSure: 5,
        },
        description: "Comfortable rest areas on each floor",
        images: [
          { url: "/api/placeholder/800/600", caption: "Public seating area" },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 10,
          dislike: 10,
          notSure: 16,
        },
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
