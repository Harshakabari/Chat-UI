import { Contact, User } from '@/types/chat';

export const currentUser: User = {
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
};

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    lastMessage: 'Hey! How are you doing?',
    time: '2:30 PM',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    lastMessage: 'Thanks for your help!',
    time: '1:45 PM',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Carol Davis',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    lastMessage: 'See you tomorrow',
    time: '12:20 PM',
    isOnline: true,
  },
  {
    id: '4',
    name: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    lastMessage: 'Great job on the project!',
    time: '11:15 AM',
    isOnline: false,
  },
  {
    id: '5',
    name: 'Eva Martinez',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    lastMessage: 'Let me know when you\'re free',
    time: '10:30 AM',
    isOnline: true,
  },
];

export const botResponses = [
  "That's interesting! Tell me more.",
  "I completely understand what you mean.",
  "Thanks for sharing that with me!",
  "How was your day today?",
  "That sounds great! 🎉",
  "I'm here if you need anything.",
  "What are your plans for the weekend?",
  "That's awesome! Keep it up!",
  "I appreciate you reaching out.",
  "Hope you're having a wonderful day!",
];