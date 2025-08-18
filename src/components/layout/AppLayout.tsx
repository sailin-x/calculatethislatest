import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Calculator, Home, Search, Bookmark, History } from 'lucide-react';
import { SearchBar } from '../navigation/SearchBar';
import { useCalculator } from '../../contexts/CalculatorContext';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
  onCalculatorSelect: (calculatorId: string) => void;
}

export function AppLayout({ children, onNavigateHome, onCalculatorSelect }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCalculator();

  const navigationItems = [
    { icon: Home, label: 'Home', onClick: onNavigateHome },
    { icon: Search, label: 'Search', onClick: () => {} },
    { icon: Bookmark, label: 'Favorites', onClick: () => {} },
    { icon: History, label: 'Recent', onClick: () => {} },
  ];

  const MobileNavigation = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">CalculateThis.ai</span>
        </div>
        
        <div className="space-y-4">
          <SearchBar 
            onCalculatorSelect={(id) => {
              onCalculatorSelect(id);
              setIsMobileMenuOpen(false);
            }}
            className="mb-4"
          />
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <MobileNavigation />
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={onNavigateHome}
            >
              <Calculator className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg hidden sm:inline">CalculateThis.ai</span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar onCalculatorSelect={onCalculatorSelect} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                onClick={item.onClick}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      {state.currentCalculator && (
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Button 
                variant="link" 
                size="sm" 
                onClick={onNavigateHome}
                className="p-0 h-auto text-muted-foreground hover:text-primary"
              >
                Home
              </Button>
              <span>/</span>
              <span className="capitalize">{state.currentCalculator.category}</span>
              {state.currentCalculator.subcategory && (
                <>
                  <span>/</span>
                  <span>{state.currentCalculator.subcategory}</span>
                </>
              )}
              <span>/</span>
              <span className="text-foreground font-medium">
                {state.currentCalculator.title}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Mobile Search Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-30">
        <SearchBar 
          onCalculatorSelect={onCalculatorSelect}
          placeholder="Search calculators..."
        />
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-primary" />
                <span className="font-bold">CalculateThis.ai</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Industry-leading calculators for finance, business, health, and more.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" size="sm" className="p-0 h-auto">Finance & Investment</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">Business Operations</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">Health & Fitness</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">Construction</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" size="sm" className="p-0 h-auto">How to Use</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">Examples</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">FAQ</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">Contact</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" size="sm" className="p-0 h-auto">Privacy Policy</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">Terms of Service</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">Disclaimer</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CalculateThis.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}