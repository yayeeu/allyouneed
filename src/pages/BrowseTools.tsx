
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getStartups, aiToolCategories } from '@/services/mockData';
import { Startup } from '@/types';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const BrowseTools = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStartups = async () => {
      try {
        const data = await getStartups();
        setStartups(data);
        setFilteredStartups(data);
      } catch (error) {
        console.error('Error loading startups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStartups();
  }, []);

  useEffect(() => {
    let filtered = [...startups];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        startup => 
          startup.name.toLowerCase().includes(term) ||
          startup.description.toLowerCase().includes(term) ||
          startup.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        startup => 
          startup.aiToolCategories.some(category => selectedCategories.includes(category))
      );
    }
    
    setFilteredStartups(filtered);
  }, [searchTerm, selectedCategories, startups]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-aiYouNeed-500 rounded-full border-t-transparent mx-auto mb-4"></div>
          <p>Loading AI tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse AI Tools</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search AI tools..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Filters sidebar */}
        <div className="col-span-12 md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
                Clear all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <ScrollArea className="h-80">
                    <div className="space-y-2">
                      {aiToolCategories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <Label 
                            htmlFor={`category-${category}`}
                            className="text-sm cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Status</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="claimed" />
                    <Label htmlFor="claimed" className="text-sm cursor-pointer">
                      Verified providers only
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Results grid */}
        <div className="col-span-12 md:col-span-9">
          {filteredStartups.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  Showing {filteredStartups.length} of {startups.length} AI tools
                </p>
                
                <div className="flex items-center space-x-2">
                  {selectedCategories.map(category => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <button 
                        onClick={() => handleCategoryToggle(category)}
                        className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        &times;
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStartups.map((startup) => (
                  <Link 
                    to={`/startup/${startup.id}`} 
                    key={startup.id}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow duration-200">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded overflow-hidden">
                            <img 
                              src={startup.logo || "https://via.placeholder.com/100"} 
                              alt={`${startup.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {startup.claimed && (
                            <Badge className="bg-green-100 text-green-800">Verified</Badge>
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
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" className="w-full" size="sm">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <h3 className="text-xl font-medium mb-2">No AI tools found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any AI tools matching your search criteria.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseTools;
