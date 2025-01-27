// src/app/community/components/PostCard.tsx
'use client';

import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostCardProps {
 id: number;
 imageUrl: string;
 title: string;
 username: string;
 likes: number;
 comments: number;
 userAvatar?: string;
}

export function PostCard({ id, imageUrl, title, username, likes: initialLikes, comments, userAvatar }: PostCardProps) {
 const router = useRouter();
 const [liked, setLiked] = useState(false);
 const [likes, setLikes] = useState(initialLikes);

 const handleLike = (e: React.MouseEvent) => {
   e.stopPropagation();
   if (liked) {
     setLikes(likes - 1);
   } else {
     setLikes(likes + 1);
   }
   setLiked(!liked);
 };

 const handleShare = (e: React.MouseEvent) => {
   e.stopPropagation();
   // Share functionality
 };

 return (
   <div 
     className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-[0.98]"
     onClick={() => router.push(`/community/${id}`)}
   >
     <div className="aspect-square bg-gray-100 relative">
       <img
         src={imageUrl}
         alt="Post content" 
         className="w-full h-full object-cover"
       />
     </div>
     <div className="p-3">
       <div className="flex items-center gap-2 mb-2">
         <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
           {userAvatar ? (
             <img src={userAvatar} alt={username} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600">
               {username[0].toUpperCase()}
             </div>
           )}
         </div>
         <span className="text-sm font-medium">{username}</span>
       </div>
       <p className="text-sm line-clamp-2 mb-2">{title}</p>
       <div className="flex items-center gap-4">
         <button 
           onClick={handleLike}
           className="flex items-center gap-1"
         >
           <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
           <span className="text-xs text-gray-600">{likes}</span>
         </button>
         <button 
           className="flex items-center gap-1"
           onClick={(e) => e.stopPropagation()}
         >
           <MessageCircle size={18} className="text-gray-600" />
           <span className="text-xs text-gray-600">{comments}</span>
         </button>
         <button 
           onClick={handleShare}
           className="flex items-center gap-1"
         >
           <Share2 size={18} className="text-gray-600" />
         </button>
       </div>
     </div>
   </div>
 );
}