import { Calculator, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-hard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur animate-neon-pulse" />
              <div className="relative bg-gradient-primary p-3 rounded-xl shadow-brutal">
                <Calculator className="w-8 h-8 text-primary-foreground animate-geometric-spin" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">
                CALCULATE<span className="text-primary">THIS</span>
              </h1>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                PRECISION TOOLS
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all duration-300" />
              <div className="relative bg-card/80 backdrop-blur-xl border border-primary/30 rounded-2xl overflow-hidden shadow-inset">
                <div className="flex items-center">
                  <Search className="ml-6 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search 560+ calculators..."
                    className="flex-1 border-0 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none font-mono"
                  />
                  <Button 
                    size="sm" 
                    className="m-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide transition-snap shadow-hard hover:shadow-neon"
                  >
                    GO
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {['Categories', 'Popular', 'New', 'Random'].map((item) => (
              <Button 
                key={item}
                variant="ghost" 
                className="text-foreground hover:text-primary hover:bg-primary/10 font-bold tracking-wide transition-snap border border-transparent hover:border-primary/30"
              >
                {item}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/20 bg-card/90 backdrop-blur-xl animate-slide-brutal">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur opacity-30" />
                <div className="relative bg-background/80 border border-primary/30 rounded-xl overflow-hidden shadow-inset">
                  <div className="flex items-center">
                    <Search className="ml-4 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search calculators..."
                      className="flex-1 border-0 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-0"
                    />
                  </div>
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-2">
                {['Categories', 'Popular', 'New', 'Random'].map((item) => (
                  <Button 
                    key={item}
                    variant="ghost" 
                    className="justify-start text-foreground hover:text-primary hover:bg-primary/10 font-bold tracking-wide transition-snap border border-transparent hover:border-primary/30"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;