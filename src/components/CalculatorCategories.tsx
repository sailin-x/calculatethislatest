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
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Calculator Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse calculators by category to find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer bg-gradient-card backdrop-blur-lg border-border/50 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-glass`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary/80 text-muted-foreground">
                      {category.count}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Browse calculators
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CalculatorCategories;