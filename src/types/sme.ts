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
  createdAt: Date;
  updatedAt: Date;
} 