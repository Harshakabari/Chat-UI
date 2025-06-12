export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface User {
  name: string;
  avatar: string;
}