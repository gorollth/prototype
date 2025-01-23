'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';

const mockChats = [
  {
    id: 1,
    driver: 'John Doe',
    lastMessage: 'Yes, I have experience with electric wheelchairs.',
    timestamp: '2 hours ago',
    unread: 2
  },
  {
    id: 2,
    driver: 'Sarah Wheeler',
    lastMessage: 'I will be there in 10 minutes.',
    timestamp: '1 day ago',
    unread: 0
  }
];

export default function ChatsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-600">Messages</h1>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {mockChats.map((chat) => (
          <div 
            key={chat.id}
            onClick={() => router.push(`/carpool/${chat.id}/chat`)}
            className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{chat.driver}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {chat.timestamp}
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-1">{chat.lastMessage}</p>
            {chat.unread > 0 && (
              <div className="mt-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}