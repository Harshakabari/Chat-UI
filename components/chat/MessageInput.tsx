'use client';

import { useState, useRef } from 'react';
import { Send, Smile, Paperclip, Image, File, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };

  const handleFileUpload = (type: 'image' | 'file' | 'video') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' 
        ? 'image/*' 
        : type === 'video' 
          ? 'video/*' 
          : '*/*';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewMessage(prev => prev + ` [Attached: ${file.name}]`);
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleFileUpload('image')}>
              <Image className="h-4 w-4 mr-2" />
              Image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFileUpload('video')}>
              <Video className="h-4 w-4 mr-2" />
              Video
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFileUpload('file')}>
              <File className="h-4 w-4 mr-2" />
              File
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex-1 relative">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="pr-12"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-4 w-4" />
            </Button>
            {showEmojiPicker && (
              <div className="absolute bottom-10 right-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={!newMessage.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}