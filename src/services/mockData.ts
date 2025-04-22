
import { Startup, SMEProfile, ChatSession, ChatMessage, Recommendation } from '../types';

// AI Tool Categories
export const aiToolCategories = [
  'Content Creation',
  'Data Analysis',
  'Customer Service',
  'Marketing',
  'Sales',
  'HR & Recruitment',
  'Operations',
  'Financial Management',
  'Project Management',
  'Email Automation',
  'Website Building',
  'E-commerce',
  'Social Media',
  'SEO',
  'Translation',
  'Code Generation',
  'Document Processing',
  'Image Generation',
  'Video Creation',
  'Voice Recognition'
];

// Mock Startups Data
export const mockStartups: Startup[] = [
  {
    id: 'startup-1',
    name: 'ContentGenius',
    website: 'https://contentgenius.ai',
    description: 'AI content creation platform that helps businesses create blog posts, social media updates, and marketing copy.',
    aiToolCategories: ['Content Creation', 'Marketing'],
    claimed: false,
    tags: ['Content Creation', 'Marketing', 'Copywriting', 'Blog', 'Social Media'],
    logo: 'https://source.unsplash.com/random/100x100?logo,blue'
  },
  {
    id: 'startup-2',
    name: 'DataSense',
    website: 'https://datasense.io',
    description: 'Advanced analytics platform for SMEs to make sense of their business data without a data science team.',
    aiToolCategories: ['Data Analysis', 'Business Intelligence'],
    claimed: false,
    tags: ['Analytics', 'Data Visualization', 'Reporting', 'Business Intelligence'],
    logo: 'https://source.unsplash.com/random/100x100?logo,green'
  },
  {
    id: 'startup-3',
    name: 'CustomerBot',
    website: 'https://customerbot.eu',
    description: 'Customer service AI chatbot that handles inquiries 24/7 in multiple languages.',
    aiToolCategories: ['Customer Service', 'Chat'],
    claimed: true,
    claimedBy: 'user-1234',
    tags: ['Customer Support', 'Chatbot', 'Multilingual', '24/7 Service'],
    logo: 'https://source.unsplash.com/random/100x100?logo,orange'
  },
  {
    id: 'startup-4',
    name: 'MarketingMind',
    website: 'https://marketingmind.ai',
    description: 'AI-powered marketing campaign optimization with predictive analytics.',
    aiToolCategories: ['Marketing', 'Data Analysis'],
    claimed: false,
    tags: ['Campaign Optimization', 'Analytics', 'Marketing', 'Predictive AI'],
    logo: 'https://source.unsplash.com/random/100x100?logo,red'
  },
  {
    id: 'startup-5',
    name: 'SalesPredict',
    website: 'https://salespredict.eu',
    description: 'Sales forecasting and lead scoring platform for B2B businesses.',
    aiToolCategories: ['Sales', 'Data Analysis'],
    claimed: false,
    tags: ['Sales', 'Forecasting', 'Lead Scoring', 'B2B'],
    logo: 'https://source.unsplash.com/random/100x100?logo,purple'
  },
  {
    id: 'startup-6',
    name: 'TalentMatch',
    website: 'https://talentmatch.io',
    description: 'AI recruitment tool that matches job descriptions with the perfect candidates.',
    aiToolCategories: ['HR & Recruitment'],
    claimed: false,
    tags: ['Recruitment', 'HR', 'Talent Acquisition', 'Hiring'],
    logo: 'https://source.unsplash.com/random/100x100?logo,cyan'
  },
  {
    id: 'startup-7',
    name: 'OptiOps',
    website: 'https://optiops.co',
    description: 'Operations optimization platform that streamlines workflows and identifies inefficiencies.',
    aiToolCategories: ['Operations', 'Project Management'],
    claimed: false,
    tags: ['Operations', 'Workflow', 'Efficiency', 'Optimization'],
    logo: 'https://source.unsplash.com/random/100x100?logo,yellow'
  },
  {
    id: 'startup-8',
    name: 'FinanceMaster',
    website: 'https://financemaster.eu',
    description: 'Financial management AI that predicts cash flow issues and suggests optimization strategies.',
    aiToolCategories: ['Financial Management'],
    claimed: false,
    tags: ['Finance', 'Cash Flow', 'Financial Planning', 'Accounting'],
    logo: 'https://source.unsplash.com/random/100x100?logo,teal'
  },
  {
    id: 'startup-9',
    name: 'ProjectPilot',
    website: 'https://projectpilot.io',
    description: 'AI project management tool that automatically assigns tasks and predicts project timelines.',
    aiToolCategories: ['Project Management'],
    claimed: false,
    tags: ['Project Management', 'Task Assignment', 'Timeline Prediction'],
    logo: 'https://source.unsplash.com/random/100x100?logo,indigo'
  },
  {
    id: 'startup-10',
    name: 'EmailPro',
    website: 'https://emailpro.ai',
    description: 'Email automation tool that composes personalized emails for marketing and sales outreach.',
    aiToolCategories: ['Email Automation', 'Marketing', 'Sales'],
    claimed: false,
    tags: ['Email', 'Automation', 'Personalization', 'Outreach'],
    logo: 'https://source.unsplash.com/random/100x100?logo,gray'
  }
];

// Add 20 more mock startups
for (let i = 11; i <= 30; i++) {
  const categories = [
    aiToolCategories[Math.floor(Math.random() * aiToolCategories.length)],
    aiToolCategories[Math.floor(Math.random() * aiToolCategories.length)]
  ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
  
  mockStartups.push({
    id: `startup-${i}`,
    name: `AI Tool ${i}`,
    website: `https://aitool${i}.eu`,
    description: `Description for AI Tool ${i} - helping businesses with ${categories.join(' and ')}.`,
    aiToolCategories: categories,
    claimed: false,
    tags: [...categories, 'AI', 'Tool'],
    logo: `https://source.unsplash.com/random/100x100?logo,${i % 10}`
  });
}

// Sample SME profiles
export const mockSMEProfiles: Record<string, SMEProfile> = {
  'user-1': {
    userId: 'user-1',
    industry: 'Retail',
    goals: ['Increase online sales', 'Improve customer support', 'Automate marketing'],
    currentTools: ['Shopify', 'Mailchimp', 'Facebook Ads'],
    painPoints: ['Time-consuming content creation', 'Inefficient customer service', 'Manual data analysis'],
    aiFamiliarity: 'beginner',
    recommendations: [
      {
        category: 'Content Creation',
        description: 'AI tools can help you create product descriptions, blog posts, and marketing copy faster.',
        relevanceScore: 90
      },
      {
        category: 'Customer Service',
        description: 'AI chatbots can handle common customer inquiries 24/7, freeing up your team.',
        relevanceScore: 85
      },
      {
        category: 'Marketing',
        description: 'AI marketing tools can optimize your ad spending and target the right customers.',
        relevanceScore: 75
      }
    ]
  },
  'user-2': {
    userId: 'user-2',
    industry: 'Professional Services',
    goals: ['Streamline document processing', 'Improve client communications', 'Automate appointment scheduling'],
    currentTools: ['Microsoft Office', 'Gmail', 'Calendly'],
    painPoints: ['Manual document review', 'Email overload', 'Client follow-up management'],
    aiFamiliarity: 'intermediate',
    recommendations: [
      {
        category: 'Document Processing',
        description: 'AI document analysis tools can extract key information and automate review processes.',
        relevanceScore: 95
      },
      {
        category: 'Email Automation',
        description: 'Email AI tools can help categorize, prioritize, and draft responses to client inquiries.',
        relevanceScore: 80
      },
      {
        category: 'Customer Service',
        description: 'AI scheduling assistants can manage your calendar and client follow-ups automatically.',
        relevanceScore: 70
      }
    ]
  }
};

// Sample chat sessions
export const mockChatSessions: Record<string, ChatSession> = {
  'session-1': {
    id: 'session-1',
    userId: 'user-1',
    type: 'sme_onboarding',
    messages: [
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Hi there! I\'m here to help match you with the perfect AI tools for your business. To get started, could you tell me what industry you\'re in?',
        timestamp: new Date('2023-07-15T10:00:00')
      },
      {
        id: 'msg-2',
        sender: 'user',
        text: 'I run a small retail business selling handmade jewelry.',
        timestamp: new Date('2023-07-15T10:01:00')
      },
      {
        id: 'msg-3',
        sender: 'bot',
        text: 'That\'s great! Handmade jewelry is a wonderful niche. What are your top business goals right now?',
        timestamp: new Date('2023-07-15T10:01:30')
      }
    ],
    createdAt: new Date('2023-07-15T10:00:00'),
    updatedAt: new Date('2023-07-15T10:01:30')
  }
};

// Helper functions to simulate API calls
export const getStartups = async (filters?: {
  categories?: string[];
  search?: string;
  claimed?: boolean;
}): Promise<Startup[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let results = [...mockStartups];
  
  if (filters) {
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter(startup => 
        startup.aiToolCategories.some(cat => filters.categories?.includes(cat))
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        startup => 
          startup.name.toLowerCase().includes(searchLower) ||
          startup.description.toLowerCase().includes(searchLower) ||
          startup.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (filters.claimed !== undefined) {
      results = results.filter(startup => startup.claimed === filters.claimed);
    }
  }
  
  return results;
};

export const getSMEProfile = async (userId: string): Promise<SMEProfile | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockSMEProfiles[userId] || null;
};

export const getStartupById = async (startupId: string): Promise<Startup | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockStartups.find(startup => startup.id === startupId) || null;
};

export const claimStartup = async (startupId: string, userId: string): Promise<Startup> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const startupIndex = mockStartups.findIndex(s => s.id === startupId);
  
  if (startupIndex === -1) {
    throw new Error('Startup not found');
  }
  
  const updatedStartup = {
    ...mockStartups[startupIndex],
    claimed: true,
    claimedBy: userId
  };
  
  mockStartups[startupIndex] = updatedStartup;
  
  return updatedStartup;
};

export const updateStartup = async (startupId: string, data: Partial<Startup>): Promise<Startup> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const startupIndex = mockStartups.findIndex(s => s.id === startupId);
  
  if (startupIndex === -1) {
    throw new Error('Startup not found');
  }
  
  const updatedStartup = {
    ...mockStartups[startupIndex],
    ...data
  };
  
  mockStartups[startupIndex] = updatedStartup;
  
  return updatedStartup;
};

// Simulate creating an SME profile
export const createSMEProfile = async (profile: Omit<SMEProfile, 'recommendations'>): Promise<SMEProfile> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock recommendations based on the profile data
  const recommendations: Recommendation[] = [];
  
  // Based on industry, create a recommendation
  if (profile.industry === 'Retail') {
    recommendations.push({
      category: 'Content Creation',
      description: 'AI tools can help create compelling product descriptions and marketing copy.',
      relevanceScore: 90
    });
  } else if (profile.industry === 'Professional Services') {
    recommendations.push({
      category: 'Document Processing',
      description: 'AI document analysis can streamline your workflow and reduce manual review time.',
      relevanceScore: 95
    });
  }
  
  // Based on pain points
  if (profile.painPoints.some(p => p.toLowerCase().includes('customer'))) {
    recommendations.push({
      category: 'Customer Service',
      description: 'AI chatbots can handle routine inquiries and support tasks 24/7.',
      relevanceScore: 85
    });
  }
  
  if (profile.painPoints.some(p => p.toLowerCase().includes('marketing') || p.toLowerCase().includes('sales'))) {
    recommendations.push({
      category: 'Marketing',
      description: 'AI marketing tools can optimize campaigns and increase conversion rates.',
      relevanceScore: 80
    });
  }
  
  // If recommendations are empty, add a default one
  if (recommendations.length === 0) {
    recommendations.push({
      category: 'Business Intelligence',
      description: 'AI analytics tools can help you gain insights from your business data.',
      relevanceScore: 75
    });
  }
  
  const newProfile: SMEProfile = {
    ...profile,
    recommendations
  };
  
  mockSMEProfiles[profile.userId] = newProfile;
  
  return newProfile;
};

// Chat session related functions
export const createChatSession = async (userId: string, type: 'sme_onboarding'): Promise<ChatSession> => {
  const sessionId = `session-${Date.now()}`;
  
  const initialMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    sender: 'bot',
    text: 'Hi there! I\'m here to help match you with the perfect AI tools for your business. To get started, could you tell me what industry you\'re in?',
    timestamp: new Date()
  };
  
  const newSession: ChatSession = {
    id: sessionId,
    userId,
    type,
    messages: [initialMessage],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockChatSessions[sessionId] = newSession;
  
  return newSession;
};

export const getChatSession = async (sessionId: string): Promise<ChatSession | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockChatSessions[sessionId] || null;
};

export const addChatMessage = async (sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatSession> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const session = mockChatSessions[sessionId];
  
  if (!session) {
    throw new Error('Chat session not found');
  }
  
  const newMessage: ChatMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    timestamp: new Date()
  };
  
  session.messages.push(newMessage);
  session.updatedAt = new Date();
  
  // If user sent a message, simulate bot response
  if (message.sender === 'user') {
    // Add bot response after a short delay
    setTimeout(() => {
      const botResponse = simulateBotResponse(session, message.text);
      session.messages.push(botResponse);
      session.updatedAt = new Date();
    }, 1000);
  }
  
  return session;
};

// Helper to simulate bot responses
const simulateBotResponse = (session: ChatSession, userMessage: string): ChatMessage => {
  const userMessageLower = userMessage.toLowerCase();
  let responseText = '';
  
  if (session.type === 'sme_onboarding') {
    const messageCount = session.messages.length;
    
    // Simple logic to determine which question we're on based on message count
    switch (messageCount) {
      case 2: // After first user response about industry
        responseText = `Thanks for sharing that! Now, could you tell me about your top business goals right now?`;
        break;
      case 4: // After response about goals
        responseText = `Great goals! What tools or software are you currently using in your business?`;
        break;
      case 6: // After response about current tools
        responseText = `I see. What are your main pain points or challenges that you'd like to solve with AI tools?`;
        break;
      case 8: // After response about pain points
        responseText = `How would you rate your familiarity with AI technologies? (Beginner, Intermediate, Advanced)`;
        break;
      case 10: // Final response
        responseText = `Perfect! I've gathered all the information I need to recommend some AI tools that would be perfect for your business. Check your dashboard shortly for personalized recommendations!`;
        break;
      default:
        responseText = `Thanks for your message. Is there anything else you'd like to share about your business needs?`;
    }
  } else {
    // Generic fallback responses
    if (userMessageLower.includes('help')) {
      responseText = `I'm here to help! What specific information are you looking for?`;
    } else if (userMessageLower.includes('thank')) {
      responseText = `You're welcome! Let me know if you have any other questions.`;
    } else {
      responseText = `Thanks for your message. How else can I assist you today?`;
    }
  }
  
  return {
    id: `msg-bot-${Date.now()}`,
    sender: 'bot',
    text: responseText,
    timestamp: new Date()
  };
};
