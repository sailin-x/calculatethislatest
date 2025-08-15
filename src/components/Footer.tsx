import { Calculator, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-xl border-t-2 border-primary/30 shadow-inset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-primary p-3 rounded-none shadow-brutal">
                <Calculator className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight">
                  CALCULATE<span className="text-primary">THIS</span>
                </h3>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                  PRECISION TOOLS
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-8 font-mono leading-relaxed">
              THE ULTIMATE COLLECTION OF FREE ONLINE CALCULATORS FOR PRECISION CALCULATIONS.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" className="bg-card hover:bg-primary/10 border-2 border-primary/30 hover:border-primary text-primary rounded-none shadow-hard transition-snap">
                <Github className="w-5 h-5" />
              </Button>
              <Button size="sm" className="bg-card hover:bg-primary/10 border-2 border-primary/30 hover:border-primary text-primary rounded-none shadow-hard transition-snap">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="sm" className="bg-card hover:bg-primary/10 border-2 border-primary/30 hover:border-primary text-primary rounded-none shadow-hard transition-snap">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black text-foreground mb-6 tracking-wide uppercase">QUICK LINKS</h4>
            <ul className="space-y-3">
              {['ALL CALCULATORS', 'CATEGORIES', 'POPULAR', 'NEW CALCULATORS'].map((link) => (
                <li key={link}>
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary font-mono tracking-wide transition-snap">
                    {link}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-black text-foreground mb-6 tracking-wide uppercase">CATEGORIES</h4>
            <ul className="space-y-3">
              {['FINANCIAL', 'MATHEMATICS', 'HEALTH & FITNESS', 'UNIT CONVERSION'].map((category) => (
                <li key={category}>
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary font-mono tracking-wide transition-snap">
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-black text-foreground mb-6 tracking-wide uppercase">SUPPORT</h4>
            <ul className="space-y-3">
              {['HELP CENTER', 'CONTACT US', 'PRIVACY POLICY', 'TERMS OF SERVICE'].map((support) => (
                <li key={support}>
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary font-mono tracking-wide transition-snap">
                    {support}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t-2 border-primary/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground font-mono tracking-wide">
              © 2024 CALCULATETHIS. ALL RIGHTS RESERVED.
            </p>
            <p className="text-muted-foreground font-mono tracking-wide mt-4 md:mt-0">
              PRECISION CALCULATIONS FOR EVERYONE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;