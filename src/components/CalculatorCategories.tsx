import { 
  DollarSign, 
  Calculator, 
  Heart, 
  Clock, 
  ArrowLeftRight, 
  Coffee, 
  Briefcase, 
  GraduationCap,
  ArrowRight 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    name: "Financial",
    description: "Calculate mortgages, loans, investments, and other financial metrics.",
    icon: DollarSign,
    count: "120+",
    color: "from-green-500 to-emerald-600"
  },
  {
    name: "Math",
    description: "Basic and advanced math calculators for all your needs.",
    icon: Calculator,
    count: "85+",
    color: "from-blue-500 to-cyan-600"
  },
  {
    name: "Health & Fitness",
    description: "BMI, calorie, and other health-related calculators.",
    icon: Heart,
    count: "95+",
    color: "from-red-500 to-pink-600"
  },
  {
    name: "Date & Time",
    description: "Age calculator, time zone converter, and more.",
    icon: Clock,
    count: "45+",
    color: "from-purple-500 to-violet-600"
  },
  {
    name: "Unit Conversion",
    description: "Convert between different units of measurement.",
    icon: ArrowLeftRight,
    count: "75+",
    color: "from-orange-500 to-amber-600"
  },
  {
    name: "Everyday",
    description: "Practical calculators for everyday situations.",
    icon: Coffee,
    count: "65+",
    color: "from-brown-500 to-yellow-600"
  },
  {
    name: "Business",
    description: "Profit margins, discounts, and other business tools.",
    icon: Briefcase,
    count: "55+",
    color: "from-slate-500 to-gray-600"
  },
  {
    name: "Education",
    description: "Academic calculators for students and educators.",
    icon: GraduationCap,
    count: "40+",
    color: "from-indigo-500 to-blue-600"
  }
];

const CalculatorCategories = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-8 tracking-tight">
            Calculator Categories
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Browse our comprehensive collection organized by category to find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index}
                className="animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full group-hover:shadow-glow group-hover:-translate-y-2 transition-all duration-500 cursor-pointer bg-gradient-card backdrop-blur-2xl border-border/30 hover:border-primary/30 relative overflow-hidden">
                  {/* Card Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} shadow-glow group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary/80 text-muted-foreground text-lg px-4 py-1 font-semibold">
                      {category.count}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Browse calculators
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CalculatorCategories;