import { Search, Calculator, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-glass">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2.5 rounded-xl shadow-glass animate-glow-pulse">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CalculateThis.ai
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search 560+ calculators..."
                className="pl-10 bg-secondary/30 border-border/30 focus:bg-background/80 focus:border-primary/30 transition-all duration-500 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground/80 hover:text-primary hover:scale-105 transition-all duration-300 font-medium">
              Home
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary hover:scale-105 transition-all duration-300 font-medium">
              All Calculators
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary hover:scale-105 transition-all duration-300 font-medium">
              Categories
            </a>
            <Button variant="default" size="sm" className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-500 rounded-xl font-semibold">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;