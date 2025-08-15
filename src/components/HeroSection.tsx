import { Search, ArrowRight, Calculator, TrendingUp, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Floating Elements */}
      <div className="absolute top-24 left-16 opacity-60">
        <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute top-32 right-24 opacity-60">
        <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-40 left-24 opacity-60">
        <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
          <Zap className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 right-32 opacity-60">
        <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
          <Target className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-up">
          <Badge className="mb-8 bg-primary/10 border border-primary/20 text-primary text-lg px-6 py-2">
            <Calculator className="w-5 h-5 mr-2" />
            560+ Precision Tools
          </Badge>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Calculate
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Everything
            </span>
          </h1>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Precision calculators for financial planning, mathematics, health metrics & everyday calculations
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative group">
            <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg border">
              <div className="flex items-center p-2">
                <Search className="ml-4 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search our vast collection of tools..."
                  className="flex-1 border-0 bg-transparent px-4 py-4 text-lg placeholder:text-muted-foreground focus:ring-0 focus:outline-none"
                />
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground m-2 px-8"
                >
                  Search
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
          >
            Explore Tools
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border border-primary text-primary hover:bg-primary/5 px-8 py-4 text-lg"
          >
            View Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;