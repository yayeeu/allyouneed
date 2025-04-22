
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
      <section className="relative bg-gradient-to-r from-aiYouNeed-900 to-aiYouNeed-500 text-white animate-fade-in">
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
                <Button size="lg" className="bg-aiYouNeed-100 text-aiYouNeed-800 hover:bg-aiYouNeed-50 font-bold shadow-md hover:scale-105 transition">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-aiYouNeed-100 hover:text-aiYouNeed-800 font-semibold shadow-md hover:scale-105 transition">
                  Browse AI Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative dots */}
        <div className="absolute top-8 right-8 grid grid-cols-3 gap-2 opacity-10">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
          ))}
        </div>
      </section>
      
      {/* Categories section */}
      <section className="py-16 bg-gradient-to-br from-aiYouNeed-50 via-white to-aiYouNeed-100 animate-fade-in">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-aiYouNeed-800">Discover AI Tools by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect AI solutions across a wide range of categories to address your specific business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {aiToolCategories.slice(0, 10).map((category) => (
              <Link 
                key={category} 
                to={`/browse?category=${encodeURIComponent(category)}`}
                className="block"
              >
                <div className="bg-white rounded-2xl shadow transition-transform border border-aiYouNeed-100 hover:shadow-lg hover:scale-105 ring-1 ring-aiYouNeed-200/20 text-center py-6 px-2">
                  <h3 className="font-medium text-aiYouNeed-700">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/browse" className="block mx-auto max-w-xs">
            <div className="bg-aiYouNeed-500 text-white rounded-xl py-3 px-2 text-center font-semibold hover:bg-aiYouNeed-600 transition hover:scale-105">
              View All Categories
            </div>
          </Link>
        </div>
      </section>
      
      {/* For SMEs section */}
      <section className="py-16 bg-gradient-to-b from-aiYouNeed-50 to-white animate-fade-in">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="mb-2 bg-aiYouNeed-200 text-aiYouNeed-900">For Small & Medium Businesses</Badge>
            <h2 className="text-3xl font-bold mb-4 text-aiYouNeed-800">Find the AI Tools Your Business Needs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AIYouNeed helps you discover, evaluate, and implement AI solutions tailored for your business goals.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 gap-8 mb-10">
            {smeFeatures.map((feature, index) => (
              <Card key={index} className="w-full bg-white/70 rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition border border-aiYouNeed-100">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center">
                    <div className="mx-auto mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-aiYouNeed-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/signup">
              <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600 text-white shadow hover:scale-105 transition">
                Sign Up as an SME
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      
      {/* For Startups section */}
      <section className="py-16 bg-gradient-to-br from-aiYouNeed-100 via-aiYouNeed-50 to-white animate-fade-in">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="mb-2 bg-aiYouNeed-300 text-aiYouNeed-900">For AI Startups</Badge>
            <h2 className="text-3xl font-bold mb-4 text-aiYouNeed-800">Showcase Your AI Solution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with businesses looking for AI solutions like yours. Claim your startup profile and grow your customer base.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 gap-8 mb-10">
            {startupFeatures.map((feature, index) => (
              <Card key={index} className="w-full bg-white/70 rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition border border-aiYouNeed-100">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center">
                    <div className="mx-auto mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-aiYouNeed-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/signup">
              <Button className="bg-aiYouNeed-700 hover:bg-aiYouNeed-800 text-white shadow hover:scale-105 transition">
                Claim Your Startup Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-gradient-to-r from-aiYouNeed-500 to-aiYouNeed-700 text-white animate-fade-in">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business with AI?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join AIYouNeed today to discover the perfect AI tools for your business needs or showcase your AI solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-aiYouNeed-600 hover:bg-aiYouNeed-50 font-bold shadow-md hover:scale-105 transition">
                Get Started Now
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-aiYouNeed-600 font-semibold shadow-md hover:scale-105 transition">
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
