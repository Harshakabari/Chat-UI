'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Contact } from '@/types/chat';

interface SidebarProps {
  contacts: Contact[];
  selectedContact: Contact;
  isSidebarOpen: boolean;
  onContactSelect: (contact: Contact) => void;
  onCloseSidebar: () => void;
}

export default function Sidebar({
  contacts,
  selectedContact,
  isSidebarOpen,
  onContactSelect,
  onCloseSidebar,
}: SidebarProps) {
  return (
    <>
      <div className={`
        fixed left-0 z-40 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        top-16 h-[calc(100vh-4rem)] lg:top-0 lg:h-full
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={onCloseSidebar}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Input
                placeholder="Search conversations..."
                className="pl-4 pr-4 py-2 text-sm"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => onContactSelect(contact)}
                  className={`
                    flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100
                    ${selectedContact.id === contact.id ? 'bg-blue-100' : ''}
                  `}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-500">{contact.time}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onCloseSidebar}
        />
      )}
    </>
  );
}