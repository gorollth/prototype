// src/lib/types/obstacle.ts

export type ObstacleType =
  | "construction"
  | "broken_elevator"
  | "steep_slope"
  | "narrow_path"
  | "blocked_path"
  | "stairs_only"
  | "temporary";

export interface Obstacle {
  id: number;
  type: ObstacleType;
  position: [number, number];
  title: string;
  description: string;
  reportedAt: string;
  reportedBy: string;
  status: "active" | "resolved";
  imageUrl?: string;
  lastVerified?: string;
}
