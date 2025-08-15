import { Calendar, Star, ArrowRight, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedCalculator = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-primary mr-3" />
            <span className="text-primary font-semibold text-lg">Tool of the Day</span>
          </div>
          <p className="text-muted-foreground">Friday, August 15</p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <Card className="group relative overflow-hidden bg-card shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border">
            <CardHeader className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-green-100 text-green-600 p-4 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      Auto Insurance Calculator
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Calculate auto insurance premiums with detailed metrics & comprehensive analysis
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-3">
                  <Badge className="bg-primary/10 text-primary border border-primary/20">
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    Featured
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                    Financial
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 p-8">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500 fill-current" />
                  Discover a new featured calculator every day!
                </p>
                <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Calculate Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCalculator;