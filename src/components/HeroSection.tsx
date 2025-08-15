import { Search, ArrowRight, Calculator, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-mesh animate-pulse opacity-40" />
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-white/15 backdrop-blur-2xl p-4 rounded-2xl shadow-glow border border-white/20">
          <Calculator className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white/15 backdrop-blur-2xl p-4 rounded-2xl shadow-glow border border-white/20">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="bg-white/15 backdrop-blur-2xl p-4 rounded-2xl shadow-glow border border-white/20">
          <Zap className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Badge variant="secondary" className="mb-8 bg-white/20 backdrop-blur-2xl border-white/30 text-white text-lg px-6 py-2 shadow-glow">
            <Calculator className="w-5 h-5 mr-3" />
            560+ Premium Calculators
          </Badge>
        </div>
        
        <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
            Simple, Powerful
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-glow-pulse">
              Calculators
            </span>
            <br />
            for Every Need
          </h1>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            The ultimate collection of free online calculators for financial planning, mathematics, health metrics, and everyday calculations.
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl p-2 shadow-glow border border-white/30">
              <div className="flex items-center">
                <Search className="ml-6 text-gray-500 w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Search our vast collection of calculators..."
                  className="flex-1 border-0 bg-transparent px-6 py-4 text-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
                />
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-500 rounded-2xl px-8 py-3 font-semibold"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button 
            size="lg" 
            className="group bg-white text-primary hover:bg-white/90 hover:scale-105 hover:shadow-glow transition-all duration-500 rounded-2xl shadow-glass px-10 py-4 text-xl font-bold"
          >
            Explore All Calculators
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/40 text-white hover:bg-white/20 hover:scale-105 backdrop-blur-2xl transition-all duration-500 rounded-2xl px-10 py-4 text-xl font-semibold shadow-glass"
          >
            View Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;