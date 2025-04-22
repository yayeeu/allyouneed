
// User types
export type UserType = "startup" | "sme";

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  linkedStartupId?: string;
}

// Startup types
export interface Startup {
  id: string;
  name: string;
  website: string;
  description: string;
  aiToolCategories: string[];
  claimed: boolean;
  claimedBy?: string;
  tags: string[];
  logo?: string;
}

// SME profile types
export interface SMEProfile {
  userId: string;
  industry: string;
  goals: string[];
  currentTools: string[];
  painPoints: string[];
  aiFamiliarity: 'beginner' | 'intermediate' | 'advanced';
  recommendations: Recommendation[];
}

export interface Recommendation {
  category: string;
  description: string;
  relevanceScore: number;
}

// Chat session types
export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  type: "sme_onboarding";
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Route guards
export const protectedRoutes = [
  '/dashboard',
  '/startup-dashboard',
  '/sme-dashboard',
  '/browse',
  '/profile',
  '/onboarding',
];

export const publicRoutes = ['/', '/login', '/signup'];
