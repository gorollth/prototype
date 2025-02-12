// src/lib/types/obstacle.ts

export type ObstacleType =
  | "construction"
  | "broken_elevator"
  | "steep_slope"
  | "narrow_path"
  | "blocked_path"
  | "stairs_only"
  | "temporary"
  | "other";

export interface Obstacle {
  id: string;
  title: string;
  description: string;
  type: ObstacleType;
  position: [number, number];
  status: "active" | "resolved";
  reportedBy: string;
  reportedAt: string;
  lastVerified?: string;
  imageUrl?: string;
  verifyCount: {
    stillPresent: number;
    resolved: number;
  };
}
