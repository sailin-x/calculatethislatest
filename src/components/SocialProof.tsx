import { Users, Star, Calculator, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SocialProof = () => {
  const stats = [
    {
      icon: Users,
      value: "2.5M+",
      label: "Monthly Users",
      description: "Trust our calculators"
    },
    {
      icon: Calculator,
      value: "560+",
      label: "Calculators",
      description: "Across all categories"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "User Rating",
      description: "Based on 50k+ reviews"
    },
    {
      icon: TrendingUp,
      value: "99.9%",
      label: "Accuracy Rate",
      description: "Verified calculations"
    }
  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 border border-primary/20 text-primary">
            Trusted Worldwide
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Millions Choose CalculateThis.ai
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join millions of users who rely on our precision calculators for accurate, fast, and reliable calculations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;