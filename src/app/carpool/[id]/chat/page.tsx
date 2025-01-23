'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MessageBubble } from '@/app/components/MessageBubble';
import type { Message } from '@/app/lib/types/message';

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'driver', text: 'Hello! I can help with wheelchair loading.', timestamp: '09:00 AM' },
    { id: 2, sender: 'user', text: 'Great! Do you have experience with electric wheelchairs?', timestamp: '09:02 AM' },
    { id: 3, sender: 'driver', text: 'Yes, I have 3 years of experience handling various types of wheelchairs.', timestamp: '09:05 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button 
              onClick={() => router.back()} 
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-medium">John Doe</h1>
              <p className="text-xs text-gray-500">Driver</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Message Input */}
      <footer
        className="sticky bottom-0 bg-white border-t z-20"
        style={{ marginBottom: '4rem' }} // Adjust space for bottom nav bar
      >
        <div className="max-w-2xl mx-auto px-4 py-3">
          <form 
            onSubmit={handleSend} 
            className="flex gap-2 bg-gray-100 rounded-full p-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}