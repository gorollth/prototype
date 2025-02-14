// src/data/locations.ts

import { Location } from "@/lib/types/location"; // Assuming your interface is in this file

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
        images: [],
      },
      elevator: {
        name: "Elevators",
        isLiked: false,
        totalVotes: 67,
        description: "Multiple large elevators with clear signage",
        images: [],
      },
      restroom: {
        name: "Restrooms",
        isLiked: false,
        totalVotes: 38,
        description: "Accessible restrooms on every floor",
        images: [],
      },
      entrance: {
        name: "Entrances",
        isLiked: false,
        totalVotes: 52,
        description: "Level entrances with automatic doors",
        images: [],
      },
      pathway: {
        name: "Pathways",
        isLiked: false,
        totalVotes: 73,
        description: "Wide corridors and ramps throughout",
        images: [],
      },
      assistance: {
        name: "Staff Assistance",
        isLiked: false,
        totalVotes: 41,
        description: "Trained staff available on request",
        images: [],
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
        images: [],
      },
      elevator: {
        name: "Elevators",
        isLiked: false,
        totalVotes: 58,
        description: "Multiple glass elevators throughout",
        images: [],
      },
      restroom: {
        name: "Restrooms",
        isLiked: false,
        totalVotes: 43,
        description: "Accessible facilities on all floors",
        images: [],
      },
      entrance: {
        name: "Entrances",
        isLiked: false,
        totalVotes: 47,
        description: "Direct skywalk access",
        images: [],
      },
      pathway: {
        name: "Pathways",
        isLiked: false,
        totalVotes: 51,
        description: "Wide paths with smooth surfaces",
        images: [],
      },
    },
  },
];
