
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSMEProfile, getStartups } from '@/services/mockData';
import { SMEProfile, Startup } from '@/types';
import { Link } from 'react-router-dom';

const SMEDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<SMEProfile | null>(null);
  const [recommendedStartups, setRecommendedStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        // Load SME profile
        const smeProfile = await getSMEProfile(user.id);
        setProfile(smeProfile);

        // If profile exists, load recommended startups based on categories
        if (smeProfile) {
          const categories = smeProfile.recommendations.map(r => r.category);
          const startups = await getStartups({ categories });
          setRecommendedStartups(startups);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-aiYouNeed-500 rounded-full border-t-transparent mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold mb-4">Complete Your Onboarding</h2>
              <p className="text-gray-600 mb-6">
                To receive personalized AI tool recommendations, please complete the onboarding process.
              </p>
              <Link to="/onboarding">
                <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                  Start Onboarding
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Side column with business info */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Your Business Profile</CardTitle>
              <CardDescription>Based on your onboarding responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Industry</h4>
                  <p>{profile.industry}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Business Goals</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.goals.map((goal, index) => (
                      <Badge key={index} variant="outline">{goal}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Current Tools</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.currentTools.map((tool, index) => (
                      <Badge key={index} variant="outline">{tool}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Pain Points</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.painPoints.map((pain, index) => (
                      <Badge key={index} variant="outline">{pain}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-500">AI Familiarity</h4>
                  <p className="capitalize">{profile.aiFamiliarity}</p>
                </div>
                
                <Link to="/onboarding">
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Update Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-6">Your AI Dashboard</h1>
          
          <Tabs defaultValue="recommendations">
            <TabsList className="mb-4">
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="saved">Saved Tools</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {profile.recommendations.map((recommendation, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{recommendation.category}</span>
                        <Badge className="bg-aiYouNeed-100 text-aiYouNeed-800 hover:bg-aiYouNeed-200">
                          {recommendation.relevanceScore}% Match
                        </Badge>
                      </CardTitle>
                      <CardDescription>{recommendation.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-3">Suggested Tools:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {recommendedStartups
                          .filter(startup => 
                            startup.aiToolCategories.includes(recommendation.category)
                          )
                          .slice(0, 4)
                          .map((startup, i) => (
                            <Card key={i} className="overflow-hidden">
                              <div className="flex p-3">
                                <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                                  <img 
                                    src={startup.logo || "https://via.placeholder.com/100"} 
                                    alt={`${startup.name} logo`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h5 className="font-medium text-sm">{startup.name}</h5>
                                  <p className="text-xs text-gray-500 line-clamp-2">{startup.description}</p>
                                  <Link to={`/startup/${startup.id}`}>
                                    <Button size="sm" variant="link" className="h-auto p-0 mt-1">
                                      Learn more
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>
                      <div className="mt-3 text-center">
                        <Link to={`/browse?category=${encodeURIComponent(recommendation.category)}`}>
                          <Button variant="outline" size="sm">
                            See all {recommendation.category} tools
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link to="/browse">
                  <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                    Browse All AI Tools
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-xl font-medium mb-2">No saved tools yet</h3>
                    <p className="text-gray-600 mb-4">
                      As you browse AI tools, save the ones you're interested in for later.
                    </p>
                    <Link to="/browse">
                      <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                        Browse AI Tools
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="text-xl font-medium mb-2">AI Adoption Insights</h3>
                    <p className="text-gray-600 mb-4">
                      Coming soon! Personalized insights about how AI can improve your business outcomes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SMEDashboard;
