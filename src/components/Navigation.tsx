import { Search, Calculator, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glass">
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
                className="pl-10 bg-secondary/50 border-border/50 focus:bg-background transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              All Calculators
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Categories
            </a>
            <Button variant="default" size="sm" className="bg-gradient-primary hover:shadow-card-hover transition-all duration-300">
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