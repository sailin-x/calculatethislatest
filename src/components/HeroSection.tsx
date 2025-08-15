import { Search, ArrowRight, Calculator, Zap, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-section">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      
      {/* Sharp Geometric Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-none rotate-45 opacity-20 animate-geometric-spin" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-accent/30 rounded-none rotate-12" />
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-primary/40 rounded-none -rotate-12" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-primary rounded-none rotate-45 opacity-15 animate-geometric-spin" style={{ animationDuration: '12s' }} />
      </div>

      {/* Floating Calculator Icons */}
      <div className="absolute top-24 left-16 animate-sharp-bounce" style={{ animationDelay: '0s' }}>
        <div className="bg-card/80 backdrop-blur-xl p-4 rounded-none shadow-brutal border border-primary/30">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-32 right-24 animate-sharp-bounce" style={{ animationDelay: '1s' }}>
        <div className="bg-card/80 backdrop-blur-xl p-4 rounded-none shadow-brutal border border-accent/30">
          <Zap className="w-8 h-8 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-40 left-24 animate-sharp-bounce" style={{ animationDelay: '2s' }}>
        <div className="bg-card/80 backdrop-blur-xl p-4 rounded-none shadow-brutal border border-primary/30">
          <Target className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 right-32 animate-sharp-bounce" style={{ animationDelay: '0.5s' }}>
        <div className="bg-card/80 backdrop-blur-xl p-4 rounded-none shadow-brutal border border-accent/30">
          <TrendingUp className="w-8 h-8 text-accent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-brutal-slide" style={{ animationDelay: '0.2s' }}>
          <Badge className="mb-8 bg-primary/20 backdrop-blur-xl border-2 border-primary text-primary text-lg px-8 py-3 shadow-hard font-black tracking-widest uppercase">
            <Calculator className="w-6 h-6 mr-3" />
            560+ PRECISION TOOLS
          </Badge>
        </div>
        
        <div className="animate-brutal-slide" style={{ animationDelay: '0.4s' }}>
          <h1 className="text-7xl md:text-9xl font-black text-foreground mb-8 leading-none tracking-tighter">
            CALCULATE
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-neon-pulse">
              EVERYTHING
            </span>
          </h1>
        </div>
        
        <div className="animate-brutal-slide" style={{ animationDelay: '0.6s' }}>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed font-mono">
            PRECISION CALCULATORS FOR FINANCIAL PLANNING, MATHEMATICS, 
            HEALTH METRICS & EVERYDAY CALCULATIONS
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-4xl mx-auto mb-16 animate-brutal-slide" style={{ animationDelay: '0.8s' }}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary rounded-none blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300" />
            <div className="relative bg-card/90 backdrop-blur-2xl rounded-none shadow-brutal border-2 border-primary">
              <div className="flex items-center p-2">
                <Search className="ml-6 text-muted-foreground w-7 h-7" />
                <Input
                  type="text"
                  placeholder="SEARCH OUR VAST COLLECTION OF PRECISION TOOLS..."
                  className="flex-1 border-0 bg-transparent px-6 py-6 text-xl placeholder:text-muted-foreground focus:ring-0 focus:outline-none font-mono uppercase tracking-wide"
                />
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-neon hover:scale-105 transition-all duration-300 rounded-none shadow-brutal px-12 py-6 font-black text-xl tracking-widest uppercase"
                >
                  SEARCH
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-brutal-slide" style={{ animationDelay: '1s' }}>
          <Button 
            size="lg" 
            className="group bg-gradient-primary hover:shadow-neon hover:scale-105 transition-all duration-300 rounded-none shadow-brutal px-16 py-6 text-2xl font-black tracking-widest uppercase"
          >
            EXPLORE TOOLS
            <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-primary text-primary hover:bg-primary/10 hover:scale-105 backdrop-blur-2xl transition-all duration-300 rounded-none px-16 py-6 text-2xl font-black tracking-widest uppercase shadow-hard"
          >
            VIEW CATEGORIES
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;