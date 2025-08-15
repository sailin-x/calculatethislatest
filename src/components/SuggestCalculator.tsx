import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Send } from "lucide-react";

const SuggestCalculator = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [calculatorName, setCalculatorName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For now, just show a success message
    // In production, this would send to Supabase
    setTimeout(() => {
      toast({
        title: "Thank you for your suggestion!",
        description: "We'll review your calculator idea and get back to you soon.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setCalculatorName("");
      setDescription("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Suggest a Calculator
          </h2>
          <p className="text-muted-foreground">
            Have an idea for a calculator that would help you or others? 
            We'd love to hear from you and potentially build it!
          </p>
        </div>
        
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Share Your Idea</CardTitle>
            <CardDescription>
              Tell us about the calculator you'd like to see on our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calculatorName">Calculator Name</Label>
                <Input
                  id="calculatorName"
                  value={calculatorName}
                  onChange={(e) => setCalculatorName(e.target.value)}
                  placeholder="e.g., Carbon Footprint Calculator"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this calculator should do, what inputs it needs, and what it should calculate..."
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Suggestion
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SuggestCalculator;