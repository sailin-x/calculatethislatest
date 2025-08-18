import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Scale, 
  Briefcase, 
  Heart, 
  HardHat, 
  Calculator, 
  Car,
  ChevronRight
} from 'lucide-react';
import { CALCULATOR_CATEGORIES, CategoryInfo } from '../../constants/categories';
import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CalculatorCategory } from '../../types/calculator';

const categoryIcons = {
  DollarSign,
  Scale,
  Briefcase,
  Heart,
  HardHat,
  Calculator,
  Car
};

interface CategoryGridProps {
  onCategorySelect: (category: CalculatorCategory) => void;
  className?: string;
}

export function CategoryGrid({ onCategorySelect, className }: CategoryGridProps) {
  const getCategoryCount = (categoryId: CalculatorCategory): number => {
    return calculatorRegistry.getCategoryCount(categoryId);
  };

  const renderCategoryCard = (category: CategoryInfo) => {
    const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons] || Calculator;
    const calculatorCount = getCategoryCount(category.id);

    return (
      <Card 
        key={category.id}
        className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20"
        onClick={() => onCategorySelect(category.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-lg ${category.color} text-white`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {category.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {category.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {calculatorCount} calculator{calculatorCount !== 1 ? 's' : ''}
            </Badge>
            <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
              View All →
            </Button>
          </div>
          
          {/* Subcategory Preview */}
          <div className="mt-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Categories include:</p>
            <div className="flex flex-wrap gap-1">
              {category.subcategories.slice(0, 3).map((sub) => (
                <Badge key={sub} variant="outline" className="text-xs">
                  {sub}
                </Badge>
              ))}
              {category.subcategories.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{category.subcategories.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CALCULATOR_CATEGORIES.map(renderCategoryCard)}
      </div>
    </div>
  );
}