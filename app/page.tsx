'use client';

import { useState } from 'react';
import Navbar from '@/components/chat/Navbar';
import Sidebar from '@/components/chat/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { currentUser, contacts, botResponses } from '@/data/mockData';
import { Contact, Message } from '@/types/chat';

export default function ChatApp() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      text: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'read',
    },
    {
      id: '2',
      senderId: 'me',
      text: 'I\'m doing great, thanks! How about you?',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      status: 'read',
    },
    {
      id: '3',
      senderId: '1',
      text: 'I\'m wonderful! Just working on some exciting projects.',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      status: 'read',
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (messageText: string) => {
    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: messageText,
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages(prev => [...prev, message]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedContact.id,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
        status: 'read',
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setIsSidebarOpen(false);
    // Reset messages for demo - in real app, would load contact's messages
    setMessages([
      {
        id: '1',
        senderId: contact.id,
        text: contact.lastMessage,
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        status: 'read',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-50">
      <Navbar currentUser={currentUser} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          contacts={contacts}
          selectedContact={selectedContact}
          isSidebarOpen={isSidebarOpen}
          onContactSelect={handleContactSelect}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-[calc(100dvh-4rem)]">
          <ChatHeader
            selectedContact={selectedContact}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />

          <MessageList messages={messages} isTyping={isTyping} />

          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}