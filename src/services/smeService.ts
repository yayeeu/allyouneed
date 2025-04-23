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