export interface SMEProfile {
  id: string;
  userId: string;
  businessName: string;
  industry: string;
  description: string;
  location: string;
  website?: string;
  phone?: string;
  email?: string;
  goals?: string[];
  currentTools?: string[];
  painPoints?: string[];
  aiFamiliarity?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  updatedAt: Date;
} 