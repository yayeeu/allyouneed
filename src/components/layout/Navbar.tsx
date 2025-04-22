
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-aiYouNeed-600">
              AIYouNeed
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/browse" className="text-gray-600 hover:text-aiYouNeed-600">
              Browse AI Tools
            </Link>
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <div className="flex items-center">
                <Link to={user.userType === 'sme' ? '/sme-dashboard' : '/startup-dashboard'} className="mr-4">
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/browse" 
                className="text-gray-600 hover:text-aiYouNeed-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse AI Tools
              </Link>
              {!user && (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-aiYouNeed-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-aiYouNeed-500 hover:bg-aiYouNeed-600">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link 
                    to={user.userType === 'sme' ? '/sme-dashboard' : '/startup-dashboard'} 
                    className="text-gray-600 hover:text-aiYouNeed-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-600 hover:text-aiYouNeed-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start px-0"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
