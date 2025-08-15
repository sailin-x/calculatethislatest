import { Calculator, Search, Menu, X, Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const colorPalettes = [
    { name: "Green", primary: "142 76% 36%", class: "bg-green-500" },
    { name: "Blue", primary: "221 83% 53%", class: "bg-blue-500" },
    { name: "Purple", primary: "262 83% 58%", class: "bg-purple-500" },
    { name: "Orange", primary: "25 95% 53%", class: "bg-orange-500" },
    { name: "Pink", primary: "330 81% 60%", class: "bg-pink-500" },
  ];

  const setColorPalette = (primary: string) => {
    document.documentElement.style.setProperty('--primary', primary);
  };

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
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Palette className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Color Palette</p>
                  <div className="grid grid-cols-5 gap-2">
                    {colorPalettes.map((palette) => (
                      <button
                        key={palette.name}
                        onClick={() => setColorPalette(palette.primary)}
                        className={`w-8 h-8 rounded-md ${palette.class} hover:scale-110 transition-transform`}
                        title={palette.name}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
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