'use client';

import { Menu, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Contact } from '@/types/chat';

interface ChatHeaderProps {
  selectedContact: Contact;
  onOpenSidebar: () => void;
}

export default function ChatHeader({ selectedContact, onOpenSidebar }: ChatHeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-2"
            onClick={onOpenSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {selectedContact.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{selectedContact.name}</p>
              <p className="text-xs text-gray-500">
                {selectedContact.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}