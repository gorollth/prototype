// src/app/carpool/[id]/chat/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';

interface Message {
  id: number;
  sender: 'driver' | 'user';
  text: string;
  timestamp: string;
}

// Mock chat data with conversation ID
const mockChats: Record<string, Message[]> = {
  '1': [
    { id: 1, sender: 'driver', text: 'Hello! I can help with wheelchair loading.', timestamp: '09:00 AM' },
    { id: 2, sender: 'user', text: 'Great! Do you have experience with electric wheelchairs?', timestamp: '09:02 AM' },
    { id: 3, sender: 'driver', text: 'Yes, I have 3 years of experience handling various types of wheelchairs.', timestamp: '09:05 AM' }
  ],
  '2': [
    { id: 1, sender: 'driver', text: 'Hi there! Ready to assist you with the ride.', timestamp: '10:00 AM' }
  ]
};

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat messages based on ID
  useEffect(() => {
    const chatMessages = mockChats[params.id] || [];
    setMessages(chatMessages);
  }, [params.id]);

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

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button 
              onClick={handleBack} 
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
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pt-16 pb-36">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-[10px] mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t z-20">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}