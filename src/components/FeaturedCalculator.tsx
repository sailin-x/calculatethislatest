import { Calendar, Star, ArrowRight, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedCalculator = () => {
  return (
    <section className="py-32 relative bg-gradient-section">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      
      {/* Sharp Geometric Background */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-none rotate-45" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-none -rotate-12" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-brutal-slide">
          <div className="flex items-center justify-center mb-8">
            <Calendar className="w-8 h-8 text-primary mr-4" />
            <span className="text-primary font-black text-3xl tracking-widest uppercase">TOOL OF THE DAY</span>
          </div>
          <p className="text-muted-foreground text-2xl font-mono tracking-wide uppercase">FRIDAY, AUGUST 15</p>
        </div>

        <div className="animate-brutal-slide" style={{ animationDelay: '0.2s' }}>
          <Card className="group relative overflow-hidden bg-card/90 backdrop-blur-2xl border-2 border-primary/30 shadow-brutal hover:shadow-neon hover:-translate-y-2 transition-all duration-500 rounded-none">
            {/* Sharp Background Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-primary opacity-10 rounded-none group-hover:opacity-20 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-none group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
            <CardHeader className="relative z-10 p-12">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-8">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-none shadow-brutal group-hover:scale-110 transition-transform duration-500">
                    <DollarSign className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-foreground mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight">
                      AUTO INSURANCE CALCULATOR
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-xl font-mono">
                      EXPLORE AUTO INSURANCE WITH DETAILED METRICS & COMPREHENSIVE ANALYSIS
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-4">
                  <Badge className="bg-primary/20 text-primary border-2 border-primary px-6 py-3 text-xl font-black tracking-wide rounded-none">
                    <Star className="w-5 h-5 mr-3 fill-current" />
                    FEATURED
                  </Badge>
                  <Badge className="border-2 border-green-500 text-green-600 px-6 py-2 text-lg font-black tracking-wide rounded-none bg-green-500/10">
                    FINANCIAL
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-0 p-12">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground flex items-center text-xl font-mono">
                  <Star className="w-6 h-6 mr-3 text-yellow-500 fill-current" />
                  DISCOVER A NEW FEATURED CALCULATOR EVERY DAY!
                </p>
                <Button className="group bg-gradient-primary hover:shadow-neon hover:scale-105 transition-all duration-500 rounded-none shadow-brutal px-12 py-4 text-xl font-black tracking-widest uppercase">
                  CALCULATE NOW
                  <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
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