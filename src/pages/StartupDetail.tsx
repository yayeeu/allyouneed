import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStartupById } from '@/services/mockData';
import { Startup } from '@/types';
import { ArrowLeft, ExternalLink, Check } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const StartupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStartup = async () => {
      if (!id) return;
      
      try {
        const data = await getStartupById(id);
        setStartup(data);
      } catch (error) {
        console.error('Error loading startup:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStartup();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-aiYouNeed-500 rounded-full border-t-transparent mx-auto mb-4"></div>
          <p>Loading AI tool details...</p>
        </div>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">AI Tool Not Found</h3>
              <p className="text-gray-600 mb-4">
                The AI tool you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/browse">
                <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                  Browse All AI Tools
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="mb-6">
        <Link to="/browse" className="flex items-center text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to AI Tools
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
              {startup?.logo ? (
                <img 
                  src={startup.logo} 
                  alt={`${startup?.name} logo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/placeholder.svg') {
                      target.src = '/placeholder.svg';
                    }
                  }}
                />
              ) : (
                <Avatar className="w-full h-full">
                  <AvatarFallback>{startup?.name?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold mr-2">{startup?.name}</h1>
                {startup?.claimed && (
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 mt-1">{startup?.website}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {startup?.aiToolCategories.map((category, index) => (
                  <Badge key={index} variant="secondary">{category}</Badge>
                ))}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="integrated-rating">Integrated Rating</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {startup.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{startup.description}</p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-2">Features</h3>
                  <ul className="space-y-2">
                    {startup.aiToolCategories.map((category, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-600 mt-1" />
                        <span>
                          {category === 'Content Creation' && 'AI-powered content generation with customizable templates'}
                          {category === 'Data Analysis' && 'Advanced analytics with interactive dashboards'}
                          {category === 'Customer Service' && '24/7 customer support automation with multi-language support'}
                          {category === 'Marketing' && 'Campaign optimization with performance prediction'}
                          {category === 'Sales' && 'Lead scoring and sales forecasting'}
                          {category === 'HR & Recruitment' && 'Automated candidate matching and screening'}
                          {category === 'Operations' && 'Workflow optimization and efficiency monitoring'}
                          {category === 'Project Management' && 'AI task assignment and timeline prediction'}
                          {category === 'Email Automation' && 'Personalized email sequences with A/B testing'}
                          {category === 'Financial Management' && 'Cash flow prediction and financial planning assistance'}
                          {category.includes('Website') && 'AI-driven website builder with SEO optimization'}
                          {category.includes('Document') && 'Automated document processing and data extraction'}
                          {!['Content Creation', 'Data Analysis', 'Customer Service', 'Marketing', 
                             'Sales', 'HR & Recruitment', 'Operations', 'Project Management', 
                             'Email Automation', 'Financial Management'].includes(category) && 
                             !category.includes('Website') && !category.includes('Document') && 
                             `Advanced ${category} capabilities tailored for businesses`}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {startup.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrated-rating">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <span className="font-bold text-aiYouNeed-600">.I.A.M.</span> Framework Breakdown
                  </CardTitle>
                  <CardDescription>
                    A structured rating to help you evaluate this AI tool for Integration, Accuracy, and Maneuverability.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-8">
                    {/* INTEGRATION */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="inline-block bg-aiYouNeed-100 rounded-full p-1 mr-2">
                          <span className="text-aiYouNeed-600 font-semibold">I</span>
                        </span>
                        <span className="font-semibold text-lg">Integration</span>
                        <span className="ml-2 text-sm text-gray-500">Can it plug into what we already use?</span>
                      </div>
                      <ul className="pl-4 list-disc text-gray-700 space-y-1">
                        <li>System Compatibility</li>
                        <li>API &amp; Middleware Support</li>
                        <li>Data Migration &amp; Sync</li>
                        <li>Security Compliance &amp; Identity Management</li>
                      </ul>
                    </div>
                    {/* ACCURACY */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="inline-block bg-aiYouNeed-100 rounded-full p-1 mr-2">
                          <span className="text-aiYouNeed-600 font-semibold">A</span>
                        </span>
                        <span className="font-semibold text-lg">Accuracy</span>
                        <span className="ml-2 text-sm text-gray-500">Can it do what it promises — and do it well?</span>
                      </div>
                      <ul className="pl-4 list-disc text-gray-700 space-y-1">
                        <li>Core Function Effectiveness</li>
                        <li>Output Reliability</li>
                        <li>Edge Case Performance</li>
                        <li>Metric Tracking &amp; Benchmarking</li>
                      </ul>
                    </div>
                    {/* MANEUVERABILITY */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="inline-block bg-aiYouNeed-100 rounded-full p-1 mr-2">
                          <span className="text-aiYouNeed-600 font-semibold">M</span>
                        </span>
                        <span className="font-semibold text-lg">Maneuverability (User Friendliness)</span>
                        <span className="ml-2 text-sm text-gray-500">How easily can users start and stay productive?</span>
                      </div>
                      <ul className="pl-4 list-disc text-gray-700 space-y-1">
                        <li>Intuitive UI/UX</li>
                        <li>Short Learning Curve</li>
                        <li>Training &amp; Documentation Support</li>
                        <li>Customizability for User Needs</li>
                      </ul>
                    </div>
                    {/* Illustration example */}
                    <div className="bg-aiYouNeed-50 p-4 rounded-lg mt-2">
                      <h4 className="text-lg font-semibold mb-2 text-aiYouNeed-600">Example: Applied to Email Automation Tool</h4>
                      <div>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                          <li>
                            <span className="font-bold text-aiYouNeed-600">Integration:</span> Supports Gmail, Outlook, and CRM sync; easy data import/export; meets SSO and SOC2 compliance.
                          </li>
                          <li>
                            <span className="font-bold text-aiYouNeed-600">Accuracy:</span> Sends emails as scheduled, achieves 99% delivery &amp; response rate accuracy, handles duplicate contacts, and tracks open/click metrics.
                          </li>
                          <li>
                            <span className="font-bold text-aiYouNeed-600">Maneuverability:</span> Simple drag-and-drop campaign builder, in-app tips/tutorials, and robust user configuration tools.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="use-cases">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-xl font-medium mb-2">Use cases coming soon</h3>
                    <p className="text-gray-600">
                      Real-world examples and use cases will be added by the provider soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pricing">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-xl font-medium mb-2">Pricing information coming soon</h3>
                    <p className="text-gray-600">
                      Pricing details will be available once the provider updates their profile.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="mb-6 bg-aiYouNeed-50 border-aiYouNeed-100 rounded-2xl shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center py-4">
                <h3 className="font-semibold mb-4">Interested in this tool?</h3>
                <a href={startup?.website} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-aiYouNeed-500 hover:bg-aiYouNeed-600 mb-2">
                    Visit Website
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
                <Button variant="outline" className="w-full mt-2">
                  Save for Later
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-aiYouNeed-50 border-aiYouNeed-100 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Similar Tools</CardTitle>
              <CardDescription>Other tools in this category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start">
                  <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 mr-3 flex items-center justify-center">
                    <Avatar className="w-full h-full">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Similar AI Tool {i}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {startup?.aiToolCategories[0] || 'AI'} solution for businesses
                    </p>
                    <Link to={`/startup/startup-${10 + i}`} className="text-xs text-aiYouNeed-600 hover:underline">
                      Learn more
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;
