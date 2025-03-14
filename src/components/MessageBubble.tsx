// src/components/chat/MessageBubble.tsx

import type { Message } from "@/lib/types/message";
import { useLanguage } from "../../contexts/LanguageContext";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  // const { t } = useLanguage();

  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          message.sender === "user" ? "bg-blue-600 text-white" : "bg-white"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p
          className={`text-[10px] mt-1 ${
            message.sender === "user" ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}
