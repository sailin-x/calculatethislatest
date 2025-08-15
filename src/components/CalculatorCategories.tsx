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
    name: "FINANCIAL",
    description: "MORTGAGES, LOANS, INVESTMENTS & FINANCIAL METRICS",
    icon: DollarSign,
    count: "120+",
    color: "from-green-500 to-emerald-600"
  },
  {
    name: "MATHEMATICS",
    description: "BASIC & ADVANCED MATHEMATICAL CALCULATIONS",
    icon: Calculator,
    count: "85+",
    color: "from-blue-500 to-cyan-600"
  },
  {
    name: "HEALTH & FITNESS",
    description: "BMI, CALORIE & HEALTH-RELATED CALCULATIONS",
    icon: Heart,
    count: "95+",
    color: "from-red-500 to-pink-600"
  },
  {
    name: "DATE & TIME",
    description: "AGE CALCULATOR, TIME ZONE CONVERTER & MORE",
    icon: Clock,
    count: "45+",
    color: "from-purple-500 to-violet-600"
  },
  {
    name: "UNIT CONVERSION",
    description: "CONVERT BETWEEN DIFFERENT UNITS OF MEASUREMENT",
    icon: ArrowLeftRight,
    count: "75+",
    color: "from-orange-500 to-amber-600"
  },
  {
    name: "EVERYDAY",
    description: "PRACTICAL CALCULATORS FOR EVERYDAY SITUATIONS",
    icon: Coffee,
    count: "65+",
    color: "from-brown-500 to-yellow-600"
  },
  {
    name: "BUSINESS",
    description: "PROFIT MARGINS, DISCOUNTS & BUSINESS TOOLS",
    icon: Briefcase,
    count: "55+",
    color: "from-slate-500 to-gray-600"
  },
  {
    name: "EDUCATION",
    description: "ACADEMIC CALCULATORS FOR STUDENTS & EDUCATORS",
    icon: GraduationCap,
    count: "40+",
    color: "from-indigo-500 to-blue-600"
  }
];

const CalculatorCategories = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-section">
      {/* Sharp Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-none rotate-45" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/10 rounded-none -rotate-12" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-brutal-slide">
          <h2 className="text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter leading-none">
            PRECISION
            <br />
            <span className="text-primary">CATEGORIES</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-mono tracking-wide uppercase">
            BROWSE OUR COMPREHENSIVE COLLECTION ORGANIZED BY CATEGORY
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index}
                className="animate-brutal-slide group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full group-hover:shadow-neon group-hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur-xl border-2 border-primary/30 hover:border-primary rounded-none shadow-brutal relative overflow-hidden">
                  {/* Geometric Corner Element */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-primary opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className={`p-4 rounded-none bg-gradient-to-r ${category.color} shadow-brutal group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <Badge className="bg-primary/20 text-primary border-2 border-primary text-lg px-4 py-2 font-black tracking-wide rounded-none">
                        {category.count}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors duration-300 tracking-wide">
                      {category.name}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-8 font-mono text-sm">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-black group-hover:translate-x-2 transition-transform duration-300 tracking-wide uppercase">
                      BROWSE TOOLS
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform duration-300" />
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