'use client';

import { useState } from 'react';
import { MessageCircle, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  name: string;
  avatar: string;
}

interface NavbarProps {
  currentUser: User;
}

export default function Navbar({ currentUser }: NavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">ChatApp</h1>
            </div>
          </div>

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {currentUser.name}
              </span>
            </Button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </>
  );
}