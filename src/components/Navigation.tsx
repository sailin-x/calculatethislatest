import { Calculator, Search, Menu, X, Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPrimary, setCurrentPrimary] = useState("142 76% 36%"); // Default green
  const { theme, setTheme } = useTheme();

  const colorPalettes = [
    { name: "Stripe Purple", primary: "263 90% 67%", class: "bg-[#8B5CF6]" },
    { name: "Airbnb Coral", primary: "354 84% 65%", class: "bg-[#FF5A5F]" },
    { name: "Cursor Blue", primary: "214 100% 59%", class: "bg-[#007AFF]" },
    { name: "Spotify Green", primary: "141 73% 42%", class: "bg-[#1DB954]" },
    { name: "Netflix Red", primary: "355 78% 56%", class: "bg-[#E50914]" },
    { name: "Uber Black", primary: "0 0% 0%", class: "bg-black" },
    { name: "Notion Gray", primary: "210 9% 31%", class: "bg-[#37352F]" },
    { name: "Slack Aubergine", primary: "291 64% 42%", class: "bg-[#4A154B]" },
    { name: "Shopify Mint", primary: "154 60% 51%", class: "bg-[#00A96E]" },
    { name: "Twitch Purple", primary: "261 83% 58%", class: "bg-[#9146FF]" },
    { name: "Discord Blurple", primary: "235 86% 65%", class: "bg-[#5865F2]" },
    { name: "Orange Modern", primary: "25 95% 53%", class: "bg-[#FF6B35]" },
  ];

  const setColorPalette = (primary: string) => {
    console.log('Setting color palette to:', primary);
    
    // For black color in dark mode, use a medium gray for better contrast
    const isBlack = primary === "0 0% 0%";
    const adjustedPrimary = isBlack ? "0 0% 65%" : primary;
    
    document.documentElement.style.setProperty('--primary', adjustedPrimary);
    document.documentElement.style.setProperty('--gradient-primary', `linear-gradient(135deg, hsl(${adjustedPrimary}), hsl(${adjustedPrimary}))`);
    setCurrentPrimary(primary); // Keep original for UI state
    console.log('CSS variable set, current value:', getComputedStyle(document.documentElement).getPropertyValue('--primary'));
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">
                Calculate<span className="text-primary">This</span>
              </h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="relative bg-card border border-border/50 rounded-lg overflow-hidden">
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
              <PopoverContent className="w-56 p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-3">Theme</p>
                    <div className="flex gap-2">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("light")}
                        className="flex-1"
                      >
                        <Sun className="w-4 h-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className="flex-1"
                      >
                        <Moon className="w-4 h-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-3">Color Palette</p>
                    <div className="grid grid-cols-6 gap-2">
                      {colorPalettes.map((palette) => (
                        <button
                          key={palette.name}
                          onClick={() => setColorPalette(palette.primary)}
                          className={`w-8 h-8 rounded-md ${palette.class} hover:scale-110 transition-transform shadow-sm`}
                          title={palette.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
          <div className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-sm animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <div className="relative bg-background border border-border/50 rounded-lg overflow-hidden">
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