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
    description: "Mortgages, loans, investments & financial metrics",
    icon: DollarSign,
    count: "120+",
    color: "text-green-600"
  },
  {
    name: "Mathematics",
    description: "Basic & advanced mathematical calculations",
    icon: Calculator,
    count: "85+",
    color: "text-blue-600"
  },
  {
    name: "Health & Fitness",
    description: "BMI, calorie & health-related calculations",
    icon: Heart,
    count: "95+",
    color: "text-red-600"
  },
  {
    name: "Date & Time",
    description: "Age calculator, time zone converter & more",
    icon: Clock,
    count: "45+",
    color: "text-purple-600"
  },
  {
    name: "Unit Conversion",
    description: "Convert between different units of measurement",
    icon: ArrowLeftRight,
    count: "75+",
    color: "text-orange-600"
  },
  {
    name: "Everyday",
    description: "Practical calculators for everyday situations",
    icon: Coffee,
    count: "65+",
    color: "text-amber-600"
  },
  {
    name: "Business",
    description: "Profit margins, discounts & business tools",
    icon: Briefcase,
    count: "55+",
    color: "text-slate-600"
  },
  {
    name: "Education",
    description: "Academic calculators for students & educators",
    icon: GraduationCap,
    count: "40+",
    color: "text-indigo-600"
  }
];

const CalculatorCategories = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Explore by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our comprehensive collection organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index}
                className="animate-fade-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-card border hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-lg ${category.color} bg-primary/10 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {category.count}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Browse Tools
                      <ArrowRight className="w-4 h-4 ml-2" />
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