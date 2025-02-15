// Path: lib/types/obstacle.ts

export type ObstacleCategory =
  | "sidewalk_issues"
  | "permanent_obstacles"
  | "temporary_obstacles"
  | "connection_issues"
  | "safety_issues";

export type ObstacleType = {
  sidewalk_issues:
    | "rough_surface"
    | "broken_drain"
    | "flooding"
    | "steep_slope"
    | "narrow_path"
    | "no_ramp"
    | "other_sidewalk";

  permanent_obstacles:
    | "utility_pole"
    | "tree"
    | "bus_stop"
    | "permanent_stall"
    | "footbridge_no_lift"
    | "construction"
    | "other_permanent";

  temporary_obstacles:
    | "parked_car"
    | "parked_motorcycle"
    | "mobile_vendor"
    | "construction_material"
    | "garbage_bin"
    | "mobile_sign"
    | "fallen_wire"
    | "other_temporary";

  connection_issues:
    | "no_crossing_ramp"
    | "no_transit_ramp"
    | "difficult_transit_access"
    | "broken_elevator"
    | "broken_escalator"
    | "other_connection";

  safety_issues:
    | "poor_lighting"
    | "unsafe_area"
    | "broken_cctv"
    | "missing_warning"
    | "other_safety";
};

export interface Obstacle {
  id: string;
  category: ObstacleCategory;
  type: ObstacleType[ObstacleCategory];
  position: [number, number];
  title: string;
  description: string;
  imageUrl?: string;
  reportedBy: string;
  reportedAt: string;
  lastVerified?: string;
  status: "active" | "resolved";
  verifyCount: {
    stillPresent: number;
    resolved: number;
  };
}
