// src/data/obstacles.ts

import { Obstacle } from "@/lib/types/obstacle";

export const sampleObstacles: Obstacle[] = [
  {
    id: "1",
    type: "construction",
    position: [13.7466, 100.5347],
    title: "Construction Zone",
    description:
      "Sidewalk repair work in progress. Alternative route available via skywalk.",
    reportedAt: "2024-02-10T08:00:00Z",
    reportedBy: "John D.",
    status: "active",
    lastVerified: "2024-02-11T10:30:00Z",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 5,
      resolved: 0,
    },
  },
  {
    id: "2",
    type: "broken_elevator",
    position: [13.7457, 100.5331],
    title: "Out of Order Elevator",
    description:
      "Main entrance elevator is not functioning. Please use alternative entrance on the east side.",
    reportedAt: "2024-02-09T15:20:00Z",
    reportedBy: "Sarah W.",
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 8,
      resolved: 1,
    },
  },
  {
    id: "3",
    type: "steep_slope",
    position: [13.7442, 100.5314],
    title: "Steep Ramp",
    description: "Temporary ramp has steep incline. May require assistance.",
    reportedAt: "2024-02-08T11:45:00Z",
    reportedBy: "Mike R.",
    status: "active",
    lastVerified: "2024-02-10T09:15:00Z",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 3,
      resolved: 0,
    },
  },
  {
    id: "4",
    type: "narrow_path",
    position: [13.747, 100.5385],
    title: "Narrow Pathway",
    description: "Path width less than standard for wheelchair access.",
    reportedAt: "2024-02-11T09:30:00Z",
    reportedBy: "Emma L.",
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 4,
      resolved: 0,
    },
  },
  {
    id: "5",
    type: "stairs_only",
    position: [13.748, 100.5322],
    title: "No Ramp Access",
    description:
      "Stairs only entrance. No wheelchair accessible route available.",
    reportedAt: "2024-02-10T14:20:00Z",
    reportedBy: "Tom H.",
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 6,
      resolved: 0,
    },
  },
  {
    id: "6",
    type: "blocked_path",
    position: [13.7463, 100.536],
    title: "Blocked Walkway",
    description:
      "Street vendor stalls blocking the accessible pathway. Need to take alternative route.",
    reportedAt: "2024-02-12T13:15:00Z",
    reportedBy: "Lisa M.",
    status: "active",
    lastVerified: "2024-02-12T16:45:00Z",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 7,
      resolved: 2,
    },
  },
  {
    id: "7",
    type: "temporary",
    position: [13.7475, 100.534],
    title: "Temporary Event Setup",
    description:
      "Event booth installation blocking part of the skywalk. Expected to clear by evening.",
    reportedAt: "2024-02-12T07:30:00Z",
    reportedBy: "David K.",
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 2,
      resolved: 0,
    },
  },
  {
    id: "8",
    type: "construction",
    position: [13.7445, 100.5375],
    title: "Building Renovation",
    description:
      "Ongoing building maintenance. Scaffolding narrows the pathway.",
    reportedAt: "2024-02-11T11:20:00Z",
    reportedBy: "Alex P.",
    status: "active",
    lastVerified: "2024-02-12T09:00:00Z",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 4,
      resolved: 1,
    },
  },
  {
    id: "9",
    type: "broken_elevator",
    position: [13.7485, 100.5355],
    title: "Malfunctioning Lift",
    description:
      "Service elevator to parking level out of order. Maintenance team notified.",
    reportedAt: "2024-02-12T10:45:00Z",
    reportedBy: "Rachel S.",
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 5,
      resolved: 0,
    },
  },
  {
    id: "10",
    type: "steep_slope",
    position: [13.745, 100.5365],
    title: "Steep Side Access",
    description:
      "Temporary access ramp too steep for independent wheelchair use. Please seek assistance.",
    reportedAt: "2024-02-12T12:00:00Z",
    reportedBy: "Chris B.",
    status: "active",
    lastVerified: "2024-02-12T14:30:00Z",
    imageUrl: "/api/placeholder/400/300",
    verifyCount: {
      stillPresent: 3,
      resolved: 0,
    },
  },
];
