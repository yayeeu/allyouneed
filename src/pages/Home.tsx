
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { aiToolCategories } from '@/services/mockData';
import { ArrowRight, Search, Sparkles, Building, Zap } from 'lucide-react';

const Home = () => {
  // Feature cards for SMEs
  const smeFeatures = [
    {
      icon: <Sparkles className="h-8 w-8 text-aiYouNeed-500" />,
      title: 'AI Tool Recommendations',
      description: 'Get personalized AI tool suggestions based on your business needs and goals.'
    },
    {
      icon: <Search className="h-8 w-8 text-aiYouNeed-500" />,
      title: 'Find the Right Tools',
      description: 'Browse and discover AI solutions across multiple categories that fit your business.'
    },
    {
      icon: <Zap className="h-8 w-8 text-aiYouNeed-500" />,
      title: 'Streamline Adoption',
      description: 'Learn how to implement AI tools effectively with expert guidance and resources.'
    }
  ];
  
  // Feature cards for startups
  const startupFeatures = [
    {
      icon: <Building className="h-8 w-8 text-aiYouNeed-500" />,
      title: 'Showcase Your Tool',
      description: "Create a compelling profile that highlights your AI solution's unique value."
    },
    {
      icon: <Search className="h-8 w-8 text-aiYouNeed-500" />,
      title: 'Reach New Customers',
      description: 'Connect with SMEs actively searching for AI solutions in your category.'
    },
    {
      icon: <Zap className="h-8 w-8 text-aiYouNeed-500" />,
      title: 'Growth Analytics',
      description: 'Track your profile performance and optimize your visibility on the platform.'
    }
  ];

  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-aiYouNeed-800 to-aiYouNeed-600 text-white">
        <div className="container px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Connecting SMEs with the AI tools they need to thrive
            </h1>
            <p className="text-lg md:text-xl mb-8 text-aiYouNeed-50">
              AIYouNeed simplifies discovering, evaluating, and implementing AI solutions for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-aiYouNeed-800 hover:bg-aiYouNeed-50">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-aiYouNeed-800">
                  Browse AI Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative dots */}
        <div className="absolute top-8 right-8 grid grid-cols-3 gap-2 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
          ))}
        </div>
      </section>
      
      {/* Categories section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Discover AI Tools by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect AI solutions across a wide range of categories to address your specific business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {aiToolCategories.slice(0, 10).map((category) => (
              <Link 
                key={category} 
                to={`/browse?category=${encodeURIComponent(category)}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-sm p-4 h-full hover:shadow-md transition-shadow border border-gray-100 text-center">
                  <h3 className="font-medium">{category}</h3>
                </div>
              </Link>
            ))}
            
            <Link to="/browse" className="block col-span-2 md:col-span-3 lg:col-span-5">
              <div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow border border-gray-100">
                <span className="text-aiYouNeed-600 font-medium">View All Categories</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* For SMEs section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="mb-2">For Small & Medium Businesses</Badge>
            <h2 className="text-3xl font-bold mb-4">Find the AI Tools Your Business Needs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AIYouNeed helps you discover, evaluate, and implement AI solutions tailored for your business goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {smeFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/signup">
              <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                Sign Up as an SME
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* For Startups section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="mb-2">For AI Startups</Badge>
            <h2 className="text-3xl font-bold mb-4">Showcase Your AI Solution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with businesses looking for AI solutions like yours. Claim your startup profile and grow your customer base.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {startupFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/signup">
              <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                Sign Up as a Startup
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-aiYouNeed-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business with AI?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join AIYouNeed today to discover the perfect AI tools for your business needs or showcase your AI solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-aiYouNeed-600 hover:bg-aiYouNeed-50">
                Get Started Now
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-aiYouNeed-600">
                Browse AI Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
