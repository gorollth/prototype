export interface LocationFeature {
  name: string;
  isLiked: boolean;
  totalVotes: number;
  description: string;
  images: {
    url: string;
    caption?: string;
  }[];
}

export interface Location {
  id: number;
  name: string;
  position: [number, number];
  category: "Shopping Mall" | "Public Transport" | "Park" | "Restaurant";
  accessibility: "high" | "medium" | "low";
  features: string[];
  description: string;
  accessibilityScores: {
    parking?: LocationFeature;
    elevator?: LocationFeature;
    restroom?: LocationFeature;
    entrance?: LocationFeature;
    pathway?: LocationFeature;
    assistance?: LocationFeature;
  };
}
