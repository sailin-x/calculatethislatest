import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Gift } from "lucide-react";

const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For now, just show a success message
    // In production, this would save to Supabase
    setTimeout(() => {
      toast({
        title: "Welcome to our community!",
        description: "You'll receive exclusive calculator updates and tips soon.",
      });
      
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-8 w-8 text-primary" />
                <Gift className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Stay in the Loop</CardTitle>
            <CardDescription className="text-lg">
              Get notified when we add new calculators and receive exclusive tips 
              to make the most of our tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="sm:px-8"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Join 50,000+ users who trust us with their calculations. 
                Unsubscribe anytime.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EmailCapture;