import { SMEProfile } from '../types/sme';

// In a real application, this would be an API call
export const createSMEProfile = async (profile: Omit<SMEProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<SMEProfile> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    ...profile,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
}

export const createChatSession = async (userId: string, type: string): Promise<ChatSession> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
    messages: []
  };
};

export const addChatMessage = async (sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date()
  };
}; 