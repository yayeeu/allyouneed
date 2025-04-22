
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserType } from '@/types';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('sme');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password, userType);
      toast.success('Login successful!');
      navigate(userType === 'sme' ? '/sme-dashboard' : '/startup-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-aiYouNeed-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                value={userType}
                onValueChange={(value: UserType) => setUserType(value)}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sme" id="sme" />
                  <Label htmlFor="sme" className="cursor-pointer">SME</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="startup" id="startup" />
                  <Label htmlFor="startup" className="cursor-pointer">Startup</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-aiYouNeed-500 hover:bg-aiYouNeed-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-gray-600 text-center mt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-aiYouNeed-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
