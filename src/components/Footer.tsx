import { Calculator, Mail, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Calculate<span className="text-primary">This</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Your go-to platform for precision calculators. From financial planning to everyday calculations, 
              we provide the tools you need for accurate results.
            </p>
            <div className="flex space-x-4 mt-6">
              <div className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </div>
              <div className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Github className="w-4 h-4" />
              </div>
              <div className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {['Financial', 'Mathematics', 'Health & Fitness', 'Date & Time', 'Unit Conversion'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Help'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 CalculateThis.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;