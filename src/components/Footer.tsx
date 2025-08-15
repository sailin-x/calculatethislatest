import { Calculator, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-glass">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CalculateThis.ai
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              The most comprehensive collection of online calculators for financial planning, 
              math, health, conversions, and everyday calculations.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="border-border/50 hover:bg-primary/10">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-border/50 hover:bg-primary/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-border/50 hover:bg-primary/10">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  All Calculators
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Popular
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  New Calculators
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 CalculateThis.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;