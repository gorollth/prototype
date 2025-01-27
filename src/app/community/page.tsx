// src/app/community/page.tsx
'use client';

import { useState } from 'react';
import { CategoryTabs } from '@/components/CategoryTabs';
import { PostCard } from '@/components/PostCard';
import { SearchBar } from '@/components/SearchBar';

const samplePosts = [
 {
   id: 1,
   imageUrl: '/image/community/community_1/community_1_0.jpg',
   title: 'Found a great accessible route through Central Park! The paths are wide and well-maintained, perfect for wheelchairs.',
   username: 'sarah_wheels',
   likes: 124,
   comments: 18,
 },
 {
   id: 2,
   imageUrl: '/image/community/community_1/community_1_1.jpg', 
   title: 'This new café has amazing wheelchair access - automatic doors and spacious layout!',
   username: 'mike_explorer',
   likes: 89,
   comments: 12,
 },
 {
   id: 3,
   imageUrl: '/image/community/community_2/community_2_1.jpg',
   title: 'Pro tip: This shopping mall has recently upgraded all their elevators. Much more reliable now!',
   username: 'accessibility_guide',
   likes: 156,
   comments: 24,
 },
 {
   id: 4,
   imageUrl: '/image/community/community_2/community_2_2.jpg',
   title: 'Beautiful scenic route by the waterfront - completely accessible and great views!',
   username: 'travel_with_wheels',
   likes: 210,
   comments: 32,
 },
];

export default function CommunityPage() {
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [filteredPosts, setFilteredPosts] = useState(samplePosts);

 const handleSearch = (query: string) => {
   if (!query) {
     setFilteredPosts(samplePosts);
     return;
   }

   const filtered = samplePosts.filter(post => 
     post.title.toLowerCase().includes(query.toLowerCase()) ||
     post.username.toLowerCase().includes(query.toLowerCase())
   );
   setFilteredPosts(filtered);
 };

 return (
   <div className="min-h-screen bg-gray-50 pb-16 text-gray-600">
     <SearchBar onSearch={handleSearch} />
     <CategoryTabs onSelect={setSelectedCategory} />
     <div className="grid grid-cols-2 gap-2 p-2">
       {filteredPosts.map((post) => (
         <PostCard
           key={post.id}
           {...post}
         />
       ))}
     </div>
     {filteredPosts.length === 0 && (
       <div className="text-center py-8">
         <p className="text-gray-500">No posts found</p>
       </div>
     )}
   </div>
 );
}