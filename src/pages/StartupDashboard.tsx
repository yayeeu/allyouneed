import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStartups, claimStartup, updateStartup } from '@/services/mockData';
import { Startup } from '@/types';
import { Link } from 'react-router-dom';
import { Search, Edit, Check, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from "@/components/ui/label";

const StartupDashboard = () => {
  const { user } = useAuth();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [claimedStartup, setClaimedStartup] = useState<Startup | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    website: '',
    description: '',
    tags: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    const loadStartups = async () => {
      if (!user) return;
      
      try {
        const allStartups = await getStartups();
        setStartups(allStartups);
        
        const claimed = allStartups.find(s => s.claimed && s.claimedBy === user.id);
        if (claimed) {
          setClaimedStartup(claimed);
          setEditForm({
            name: claimed.name,
            website: claimed.website,
            description: claimed.description,
            tags: claimed.tags.join(', ')
          });
        }
      } catch (error) {
        console.error('Error loading startups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStartups();
  }, [user]);
  
  const handleClaimStartup = async (startupId: string) => {
    if (!user) return;
    
    try {
      setIsClaiming(true);
      const claimed = await claimStartup(startupId, user.id);
      setClaimedStartup(claimed);
      
      setStartups(prevStartups => 
        prevStartups.map(s => 
          s.id === startupId ? claimed : s
        )
      );
      
      setEditForm({
        name: claimed.name,
        website: claimed.website,
        description: claimed.description,
        tags: claimed.tags.join(', ')
      });
      
      toast.success('You have successfully claimed this startup! You can now manage your profile.');
    } catch (error) {
      console.error('Error claiming startup:', error);
      toast.error('Failed to claim startup. Please try again.');
    } finally {
      setIsClaiming(false);
    }
  };
  
  const handleSaveProfile = async () => {
    if (!claimedStartup || !user) return;
    
    try {
      setIsSaving(true);
      
      const updatedStartup = await updateStartup(claimedStartup.id, {
        name: editForm.name,
        website: editForm.website,
        description: editForm.description,
        tags: editForm.tags.split(',').map(tag => tag.trim())
      });
      
      setClaimedStartup(updatedStartup);
      setIsEditing(false);
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating startup:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const filteredStartups = startups.filter(startup => 
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
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

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">AI Startup Dashboard</h1>
      
      {claimedStartup ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your AI Tool Profile</CardTitle>
                  <CardDescription>Manage your AI tool listing</CardDescription>
                </div>
                <Button
                  variant={isEditing ? "ghost" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Company Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={4}
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={editForm.tags}
                        onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Company Name</h3>
                      <p>{claimedStartup.name}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Website</h3>
                      <a href={claimedStartup.website} target="_blank" rel="noopener noreferrer" className="text-aiYouNeed-600 hover:underline">
                        {claimedStartup.website}
                      </a>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Description</h3>
                      <p>{claimedStartup.description}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Categories</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {claimedStartup.aiToolCategories.map((category, index) => (
                          <Badge key={index} className="bg-aiYouNeed-100 text-aiYouNeed-800 hover:bg-aiYouNeed-200">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Tags</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {claimedStartup.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Analytics</CardTitle>
                <CardDescription>How your listing is performing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Profile Views</p>
                    <p className="text-2xl font-bold">214</p>
                    <p className="text-green-600 text-xs">↑ 12% vs last week</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Website Clicks</p>
                    <p className="text-2xl font-bold">47</p>
                    <p className="text-green-600 text-xs">↑ 8% vs last week</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">SME Matches</p>
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-gray-500 text-xs">Businesses matched with your tool</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full">
                    View Full Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Basic information</span>
                    <Badge className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" /> Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Logo uploaded</span>
                    <Badge className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" /> Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Use cases</span>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Case studies</span>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-200 h-2 rounded-full">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-center text-sm mt-2">Profile 75% complete</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <h2 className="text-2xl font-semibold mb-4">Claim Your Startup Profile</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  If your AI tool is already listed, search and claim your profile. Or create a new listing if your startup isn't listed yet.
                </p>
                
                <div className="flex items-center gap-4 max-w-md mx-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search for your startup..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex-shrink-0"
                    onClick={() => toast.info('Coming soon: Create a new startup listing')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStartups.length > 0 ? (
              filteredStartups.map((startup) => (
                <Card key={startup.id} className={startup.claimed ? 'border-gray-200 bg-gray-50' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={startup.logo || "https://via.placeholder.com/100"} 
                          alt={`${startup.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {startup.claimed ? (
                        <Badge variant="outline" className="text-gray-500">Already Claimed</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">Available</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-3">{startup.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {startup.aiToolCategories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2">{startup.description}</p>
                    <a 
                      href={startup.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-aiYouNeed-600 hover:underline mt-2 inline-block"
                    >
                      {startup.website}
                    </a>
                  </CardContent>
                  <CardFooter>
                    {startup.claimed ? (
                      <Button variant="outline" className="w-full" disabled>
                        Already Claimed
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleClaimStartup(startup.id)} 
                        className="w-full bg-aiYouNeed-500 hover:bg-aiYouNeed-600"
                        disabled={isClaiming}
                      >
                        {isClaiming ? 'Processing...' : 'Claim This Profile'}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <h3 className="text-xl font-medium mb-2">No matching startups found</h3>
                      <p className="text-gray-600 mb-6">
                        We couldn't find any startups matching your search. Would you like to add a new listing?
                      </p>
                      <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Startup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupDashboard;
