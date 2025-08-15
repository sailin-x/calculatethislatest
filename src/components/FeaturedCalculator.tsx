import { Calendar, Star, ArrowRight, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedCalculator = () => {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium">Calculator of the Day</span>
          </div>
          <p className="text-muted-foreground">Friday, August 15</p>
        </div>

        <Card className="relative overflow-hidden bg-gradient-card backdrop-blur-lg border-border/50 shadow-glass">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-primary opacity-10 rounded-full translate-y-12 -translate-x-12" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-glass">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Auto Insurance Calculator
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Explore Auto Insurance Calculator with detailed metrics and analysis
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
                <Badge variant="outline" className="border-green-500/30 text-green-600">
                  Financial
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-0">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                Discover a new featured calculator every day!
              </p>
              <Button className="bg-gradient-primary hover:shadow-card-hover transition-all duration-300 rounded-xl">
                Calculate now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturedCalculator;