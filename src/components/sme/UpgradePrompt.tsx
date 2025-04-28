
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UpgradePrompt = () => {
  const { toast } = useToast();
  
  const handleUpgradeClick = () => {
    toast({
      title: "Coming Soon",
      description: "Payment processing will be available soon!",
    });
  };
  
  return (
    <Card className="border-2 border-aiYouneed-100">
      <CardHeader>
        <CardTitle className="text-xl">Unlock Advanced AI Insights</CardTitle>
        <CardDescription>
          Get personalized recommendations and a custom AI adoption playbook
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {[
            'Detailed AI readiness assessment',
            'Custom implementation roadmap',
            'ROI projections for recommended tools',
            'Priority support from AI experts',
            'Monthly strategy consultations'
          ].map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-aiYouneed-500 hover:bg-aiYouneed-600"
          onClick={handleUpgradeClick}
        >
          Upgrade to Premium - $49/month
        </Button>
      </CardFooter>
    </Card>
  );
};
