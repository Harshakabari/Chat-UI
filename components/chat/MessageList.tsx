'use client';

import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export default function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.senderId === 'me'
                ? 'bg-blue-500 text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
            }`}>
              <p className="text-sm">{message.text}</p>
              <div className={`flex items-center justify-end mt-1 space-x-1 ${
                message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                <p className="text-xs">{formatTime(message.timestamp)}</p>
                {message.senderId === 'me' && (
                  <div className="flex">
                    <div className={`w-1 h-1 rounded-full ${
                      message.status === 'sent' ? 'bg-blue-200' : 
                      message.status === 'delivered' ? 'bg-blue-200' : 'bg-blue-100'
                    }`}></div>
                    <div className={`w-1 h-1 rounded-full ml-0.5 ${
                      message.status === 'delivered' || message.status === 'read' ? 'bg-blue-200' : 'bg-blue-300'
                    }`}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white border border-gray-200 rounded-bl-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}