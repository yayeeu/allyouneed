import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createChatSession, addChatMessage, createSMEProfile } from '@/services/mockData';
import { ChatMessage } from '@/types';
import { toast } from 'sonner';

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [chatSessionId, setChatSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [stage, setStage] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    industry: '',
    goals: [] as string[],
    currentTools: [] as string[],
    painPoints: [] as string[],
    aiFamiliarity: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType !== 'sme') {
      navigate('/startup-dashboard');
      return;
    }

    const startChatSession = async () => {
      try {
        const session = await createChatSession(user.id, 'sme_onboarding');
        setChatSessionId(session.id);
        setMessages(session.messages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error creating chat session:', error);
        toast.error('Failed to start the onboarding process. Please try again.');
      }
    };

    startChatSession();
  }, [user, navigate]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || !chatSessionId) return;

    setIsSending(true);

    try {
      const message = {
        sender: 'user' as const,
        text: inputMessage
      };

      // Update local state immediately for better UX
      setMessages(prev => [
        ...prev,
        {
          id: `temp-${Date.now()}`,
          ...message,
          timestamp: new Date()
        }
      ]);

      setInputMessage('');

      // Save to "backend"
      const updatedSession = await addChatMessage(chatSessionId, message);
      
      // Update messages from response to get the bot's reply
      setTimeout(() => {
        setMessages(updatedSession.messages);
        setIsSending(false);
        
        // Update onboarding data
        updateOnboardingDataFromConversation(message.text);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
      setIsSending(false);
    }
  };

  const updateOnboardingDataFromConversation = (message: string) => {
    // Simple logic to extract information based on current stage
    switch (stage) {
      case 0:
        setOnboardingData(prev => ({ ...prev, industry: message }));
        setStage(1);
        break;
      case 1:
        setOnboardingData(prev => ({ ...prev, goals: message.split(',').map(g => g.trim()) }));
        setStage(2);
        break;
      case 2:
        setOnboardingData(prev => ({ ...prev, currentTools: message.split(',').map(t => t.trim()) }));
        setStage(3);
        break;
      case 3:
        setOnboardingData(prev => ({ ...prev, painPoints: message.split(',').map(p => p.trim()) }));
        setStage(4);
        break;
      case 4:
        const input = message.toLowerCase();
        let familiarity: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
        
        if (input.includes('intermediate')) {
          familiarity = 'intermediate';
        } else if (input.includes('advanced')) {
          familiarity = 'advanced';
        }
        
        setOnboardingData(prev => ({ ...prev, aiFamiliarity: familiarity }));
        setStage(5);
        
        // Complete the onboarding process
        setTimeout(() => {
          setIsComplete(true);
        }, 1500);
        break;
    }
  };

  const finishOnboarding = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Create SME profile with collected data
      if (user) {
        await createSMEProfile({
          userId: user.id,
          ...onboardingData
        });
      }
      
      toast.success('Onboarding completed! Redirecting to your dashboard.');
      navigate('/sme-dashboard');
    } catch (error) {
      console.error('Error finishing onboarding:', error);
      toast.error('Failed to complete onboarding. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-aiYouNeed-500 rounded-full border-t-transparent mx-auto mb-4"></div>
          <p>Preparing your onboarding experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to AIYouNeed</h1>
      <p className="text-center text-gray-600 mb-8">
        Let's find the perfect AI tools for your business. Our AI assistant will ask you a few questions to understand your needs.
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col h-[500px]">
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'bot'
                        ? 'bg-gray-100 text-gray-800'
                        : 'aiui-gradient text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {!isComplete ? (
              <div className="flex items-center">
                <Input
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow mr-2"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !isSending) {
                      sendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={isSending || !inputMessage.trim()}
                  className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600"
                >
                  {isSending ? 'Sending...' : 'Send'}
                </Button>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center gap-4">
                <p className="text-green-600 mb-2">
                  Great job! We've collected all the information we need.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full max-w-xs"
                >
                  <a
                    href="/sample-playbook.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Download Playbook
                  </a>
                </Button>
                <Button 
                  onClick={finishOnboarding}
                  className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600 w-full max-w-xs"
                >
                  View Your AI Tool Recommendations
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Onboarding Progress</h3>
        <div className="bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-aiYouNeed-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((stage / 5) * 100, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Industry</span>
          <span>Goals</span>
          <span>Tools</span>
          <span>Challenges</span>
          <span>AI Familiarity</span>
          <span>Complete</span>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
