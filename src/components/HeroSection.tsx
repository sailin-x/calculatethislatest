import { Search, ArrowRight, Calculator, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-1000">
        <div className="bg-white/10 backdrop-blur-lg p-3 rounded-xl shadow-glass">
          <Calculator className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute top-32 right-16 animate-bounce delay-500">
        <div className="bg-white/10 backdrop-blur-lg p-3 rounded-xl shadow-glass">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce delay-700">
        <div className="bg-white/10 backdrop-blur-lg p-3 rounded-xl shadow-glass">
          <Zap className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-6 bg-white/20 backdrop-blur-lg border-white/30 text-white">
          <Calculator className="w-4 h-4 mr-2" />
          560+ Calculators Available
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Simple, Powerful
          <br />
          <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Calculators
          </span>
          <br />
          for Every Need
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Free online calculators for financial planning, math, health, conversions, and everyday calculations.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search calculators..."
              className="pl-14 pr-6 py-4 text-lg bg-white/95 backdrop-blur-lg border-white/30 rounded-2xl focus:bg-white transition-all duration-300 shadow-glass"
            />
            <Button 
              size="lg" 
              className="absolute right-2 top-2 bg-gradient-primary hover:shadow-card-hover transition-all duration-300 rounded-xl"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 transition-all duration-300 rounded-xl shadow-glass px-8 py-3 text-lg font-semibold"
          >
            Explore All Calculators
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-lg transition-all duration-300 rounded-xl px-8 py-3 text-lg"
          >
            View Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;