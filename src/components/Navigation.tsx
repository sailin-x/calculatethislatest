import { Calculator, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Calculate<span className="text-primary">This</span>
              </h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="relative bg-card border rounded-lg overflow-hidden">
                <div className="flex items-center">
                  <Search className="ml-4 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search 560+ calculators..."
                    className="flex-1 border-0 bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none"
                  />
                  <Button 
                    size="sm" 
                    className="m-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Go
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {['Categories', 'Popular', 'New', 'Random'].map((item) => (
              <Button 
                key={item}
                variant="ghost" 
                className="text-foreground hover:text-primary"
              >
                {item}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur-sm animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <div className="relative bg-background border rounded-lg overflow-hidden">
                  <div className="flex items-center">
                    <Search className="ml-3 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search calculators..."
                      className="flex-1 border-0 bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground focus:ring-0"
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
                    className="justify-start text-foreground hover:text-primary"
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