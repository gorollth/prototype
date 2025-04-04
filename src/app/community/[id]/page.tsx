// src/app/community/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Share2, ChevronLeft, Send, ChevronRight, ChevronLeft as ArrowLeft } from 'lucide-react';
import { use } from 'react';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
 const router = useRouter();
 const [liked, setLiked] = useState(false);
 const [comment, setComment] = useState('');
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
 const { id } = use(params);

 const post = {
   id: id,
   images: [
     '/image/community/community_2/community_2_1.jpg',
     '/image/community/community_2/community_2_2.jpg',
     '/image/community/community_2/community_2_3.jpg'
   ],
   title: 'Found a great accessible route through Central Park!',
   username: 'sarah_wheels',
   userAvatar: '/api/placeholder/40/40',
   likes: 124,
   comments: [
     {
       id: 1,
       username: 'john_doe',
       content: 'This is really helpful! Thanks for sharing!',
       timestamp: '2h ago'
     },
     {
       id: 2,
       username: 'accessibility_guide',
       content: 'Great find! The elevator access there is really convenient.',
       timestamp: '1h ago'
     }
   ],
   timestamp: '3h ago',
   content: 'The paths are wide and well-maintained, perfect for wheelchairs. I particularly enjoyed the peaceful atmosphere and friendly staff.'
 };

 const handleComment = () => {
   if (comment.trim()) {
     setComment('');
   }
 };

 const nextImage = () => {
   setCurrentImageIndex((prev) => 
     prev === post.images.length - 1 ? 0 : prev + 1
   );
 };

 const previousImage = () => {
   setCurrentImageIndex((prev) => 
     prev === 0 ? post.images.length - 1 : prev - 1
   );
 };

 return (
   <div className="min-h-screen bg-gray-50 pb-16 text-gray-600">
     {/* Header */}
     <div className="sticky top-0 bg-white z-10 shadow-sm">
       <div className="flex items-center p-4">
         <button onClick={() => router.back()} className="p-1">
           <ChevronLeft size={24} />
         </button>
         <h1 className="ml-2 text-lg font-semibold">Post</h1>
       </div>
     </div>

     {/* Post Content */}
     <div className="bg-white">
       {/* Author Info */}
       <div className="flex items-center p-4">
         <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
           <img src={post.userAvatar} alt={post.username} className="w-full h-full object-cover" />
         </div>
         <div className="ml-3">
           <p className="font-medium">{post.username}</p>
           <p className="text-sm text-gray-500">{post.timestamp}</p>
         </div>
       </div>

       {/* Image Carousel */}
       <div className="aspect-square bg-gray-100 relative">
         <img 
           src={post.images[currentImageIndex]} 
           alt={`Post content ${currentImageIndex + 1}`} 
           className="w-full h-full object-cover"
         />
         
         {post.images.length > 1 && (
           <>
             <button 
               onClick={previousImage}
               className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
             >
               <ArrowLeft size={24} />
             </button>
             <button 
               onClick={nextImage}
               className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
             >
               <ChevronRight size={24} />
             </button>
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
               {post.images.map((_, index) => (
                 <div 
                   key={index}
                   className={`w-2 h-2 rounded-full ${
                     index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                   }`}
                 />
               ))}
             </div>
           </>
         )}
       </div>

       {/* Rest of the components remain the same */}
       <div className="p-4 border-b">
         <div className="flex items-center gap-4 mb-3">
           <button 
             onClick={() => setLiked(!liked)}
             className="flex items-center gap-1"
           >
             <Heart 
               size={24} 
               className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
             />
             <span className="text-sm text-gray-600">{post.likes}</span>
           </button>
           <button className="flex items-center gap-1">
             <MessageCircle size={24} className="text-gray-600" />
             <span className="text-sm text-gray-600">{post.comments.length}</span>
           </button>
           <button className="flex items-center gap-1">
             <Share2 size={24} className="text-gray-600" />
           </button>
         </div>
         <p className="font-medium mb-2">{post.title}</p>
         <p className="text-gray-600">{post.content}</p>
       </div>

       {/* Comments */}
       <div className="p-4 space-y-4">
         {post.comments.map((comment) => (
           <div key={comment.id} className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
             <div>
               <div className="flex items-baseline gap-2">
                 <span className="font-medium">{comment.username}</span>
                 <span className="text-xs text-gray-500">{comment.timestamp}</span>
               </div>
               <p className="text-gray-600">{comment.content}</p>
             </div>
           </div>
         ))}
       </div>
     </div>

     {/* Comment Input */}
     <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3">
       <div className="flex items-center gap-2">
         <input
           type="text"
           value={comment}
           onChange={(e) => setComment(e.target.value)}
           placeholder="Add a comment..."
           className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
         />
         <button
           onClick={handleComment}
           disabled={!comment.trim()}
           className={`p-2 rounded-full ${
             comment.trim() ? 'text-blue-500' : 'text-gray-400'
           }`}
         >
           <Send size={20} />
         </button>
       </div>
     </div>
   </div>
 );
}