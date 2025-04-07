// src/data/community.ts

export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  username: string;
  likes: number;
  comments: number;
  category: string;
  content?: string;
  createdAt?: string;
  tags?: string[];
  images?: string[];
}

export const samplePosts: Post[] = [
  {
    id: 1,
    imageUrl: "/image/community/community_1/community_1_0.jpg",
    title:
      "Found a great accessible route through Central Park! The paths are wide and well-maintained, perfect for wheelchairs.",
    username: "sarah_wheels",
    likes: 124,
    comments: 18,
    category: "Routes",
    content:
      "The paths are wide and well-maintained, perfect for wheelchairs. I particularly enjoyed the peaceful atmosphere and friendly staff.",
    createdAt: "2024-03-15T08:00:00Z",
    tags: ["parks", "outdoor", "Bangkok", "wheelchair friendly"],
    images: [
      "/image/community/community_2/community_2_1.jpg",
      "/image/community/community_2/community_2_2.jpg",
      "/image/community/community_2/community_2_3.jpg",
    ],
  },
  {
    id: 2,
    imageUrl: "/image/community/community_1/community_1_1.jpg",
    title:
      "This new café has amazing wheelchair access - automatic doors and spacious layout!",
    username: "mike_explorer",
    likes: 89,
    comments: 12,
    category: "Places",
    content:
      "This café is designed with everyone in mind. The doors are wide enough for wheelchairs, and they have accessible restrooms too. Disabled parking is available right in front of the shop. The menu offers a variety of options for those with dietary restrictions. Staff are trained to assist customers with special needs.",
    createdAt: "2024-03-20T10:15:00Z",
    tags: ["café", "coffee shop", "Thonglor", "Bangkok", "food and drinks"],
    images: ["/image/community/community_1/community_1_1.jpg"],
  },
  {
    id: 3,
    imageUrl: "/image/community/community_2/community_2_1.jpg",
    title:
      "Pro tip: This shopping mall has recently upgraded all their elevators. Much more reliable now!",
    username: "accessibility_guide",
    likes: 156,
    comments: 24,
    category: "Tips",
    content:
      "All elevators have been completely renovated, reducing wait times significantly. Buttons are positioned at a height accessible from wheelchairs. Highly recommended!",
    createdAt: "2024-03-25T14:30:00Z",
    tags: ["shopping mall", "elevators", "accessibility", "Bangkok"],
    images: ["/image/community/community_2/community_2_1.jpg"],
  },
  {
    id: 4,
    imageUrl: "/image/community/community_2/community_2_2.jpg",
    title:
      "Beautiful scenic route by the waterfront - completely accessible and great views!",
    username: "travel_with_wheels",
    likes: 210,
    comments: 32,
    category: "Routes",
    content:
      "The path is completely flat with ramps at all points where there are steps. Rest areas are available every 100 meters, most with covering for shade. Highly recommend visiting early morning or late afternoon to avoid the heat.",
    createdAt: "2024-03-28T16:45:00Z",
    tags: ["waterfront", "Chao Phraya", "Bangkok", "wheelchair accessible"],
    images: ["/image/community/community_2/community_2_2.jpg"],
  },
  {
    id: 5,
    imageUrl: "/image/community/community_2/community_2_3.jpg",
    title: "New wheelchair attachment that helps with rough terrain travel",
    username: "tech_accessibility",
    likes: 78,
    comments: 15,
    category: "Equipment",
    content:
      "This attachment helps wheelchair wheels be more flexible on uneven surfaces. Makes traveling around the city much more comfortable, especially on older pavements.",
    createdAt: "2024-03-30T09:20:00Z",
    tags: ["equipment", "technology", "wheelchairs", "accessories"],
    images: ["/image/community/community_2/community_2_3.jpg"],
  },
];

export const sampleComments = [
  {
    id: 1,
    postId: 1,
    username: "wheelie_explorer",
    content: "Thank you for sharing this information! It's very helpful.",
    createdAt: "2024-03-15T09:15:00Z",
  },
  {
    id: 2,
    postId: 1,
    username: "access_for_all",
    content:
      "I went there last week and totally agree it's a great accessible spot.",
    createdAt: "2024-03-15T11:30:00Z",
  },
  {
    id: 3,
    postId: 2,
    username: "coffee_lover",
    content: "Thanks for the recommendation, I'll check it out soon.",
    createdAt: "2024-03-20T12:15:00Z",
  },
  {
    id: 4,
    postId: 3,
    username: "shopaholic_wheels",
    content:
      "I noticed the upgrades too! Such a relief to have reliable elevators.",
    createdAt: "2024-03-25T16:20:00Z",
  },
  {
    id: 5,
    postId: 3,
    username: "city_explorer",
    content: "Which mall is this? I need to know!",
    createdAt: "2024-03-25T17:45:00Z",
  },
  {
    id: 6,
    postId: 4,
    username: "nature_lover",
    content:
      "The views look amazing! Is there access to restrooms along the route?",
    createdAt: "2024-03-28T18:30:00Z",
  },
  {
    id: 7,
    postId: 5,
    username: "gadget_enthusiast",
    content: "Where can I buy this? Looks really useful for city trips.",
    createdAt: "2024-03-30T10:45:00Z",
  },
];
