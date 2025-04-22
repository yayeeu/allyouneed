
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

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userType, setUserType] = useState<UserType>('sme');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !passwordConfirm) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await signup(email, password, name, userType);
      toast.success('Account created successfully!');
      
      if (userType === 'sme') {
        navigate('/onboarding');
      } else {
        navigate('/startup-dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Sign up to find or list AI tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>I am registering as:</Label>
              <RadioGroup
                value={userType}
                onValueChange={(value: UserType) => setUserType(value)}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sme" id="sme" />
                  <Label htmlFor="sme" className="cursor-pointer">
                    Small/Medium Business
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="startup" id="startup" />
                  <Label htmlFor="startup" className="cursor-pointer">
                    AI Tool Provider
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-aiYouNeed-500 hover:bg-aiYouNeed-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-gray-600 text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-aiYouNeed-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
