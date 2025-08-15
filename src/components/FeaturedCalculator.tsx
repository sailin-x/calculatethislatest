import { Calendar, Star, ArrowRight, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedCalculator = () => {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-6 h-6 text-primary mr-3" />
            <span className="text-primary font-bold text-xl tracking-wide">Calculator of the Day</span>
          </div>
          <p className="text-muted-foreground text-xl font-light">Friday, August 15</p>
        </div>

        <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <Card className="group relative overflow-hidden bg-gradient-card backdrop-blur-2xl border-border/30 shadow-glow hover:shadow-glow hover:-translate-y-1 transition-all duration-500">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-primary opacity-10 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full translate-y-16 -translate-x-16 group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10 p-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-500">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    Auto Insurance Calculator
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Explore Auto Insurance Calculator with detailed metrics and comprehensive analysis
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-3">
                <Badge className="bg-primary/15 text-primary border-primary/30 px-4 py-2 text-lg font-bold">
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  Featured
                </Badge>
                <Badge variant="outline" className="border-green-500/40 text-green-600 px-4 py-1 text-base font-semibold">
                  Financial
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-0 p-10">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground flex items-center text-lg">
                <Star className="w-5 h-5 mr-2 text-yellow-500 fill-current" />
                Discover a new featured calculator every day!
              </p>
              <Button className="group bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-500 rounded-2xl px-8 py-3 text-lg font-bold">
                Calculate now
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
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