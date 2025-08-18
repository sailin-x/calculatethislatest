import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, ArrowLeft, Calculator as CalculatorIcon } from 'lucide-react';
import { Calculator, CalculatorCategory } from '../../types/calculator';
import { calculatorRegistry } from '../../data/calculatorRegistry';
import { getCategoryInfo } from '../../constants/categories';

interface CalculatorListProps {
  category: CalculatorCategory;
  onCalculatorSelect: (calculatorId: string) => void;
  onBackToCategories: () => void;
  className?: string;
}

export function CalculatorList({ 
  category, 
  onCalculatorSelect, 
  onBackToCategories, 
  className 
}: CalculatorListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const categoryInfo = getCategoryInfo(category);
  const allCalculators = calculatorRegistry.getCalculatorsByCategory(category);
  const subcategories = calculatorRegistry.getSubcategories(category);

  // Filter calculators based on search and subcategory
  const filteredCalculators = allCalculators.filter(calc => {
    const matchesSearch = searchQuery === '' || 
      calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubcategory = selectedSubcategory === null || 
      calc.subcategory === selectedSubcategory;

    return matchesSearch && matchesSubcategory;
  });

  const groupedCalculators = selectedSubcategory 
    ? { [selectedSubcategory]: filteredCalculators }
    : filteredCalculators.reduce((groups, calc) => {
        const subcat = calc.subcategory || 'Other';
        if (!groups[subcat]) groups[subcat] = [];
        groups[subcat].push(calc);
        return groups;
      }, {} as Record<string, Calculator[]>);

  const renderCalculatorCard = (calculator: Calculator) => (
    <Card 
      key={calculator.id}
      className="group hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-primary/30"
      onClick={() => onCalculatorSelect(calculator.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base group-hover:text-primary transition-colors">
              {calculator.title}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              {calculator.description}
            </CardDescription>
          </div>
          <CalculatorIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors ml-2 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {calculator.subcategory && (
            <Badge variant="outline" className="text-xs">
              {calculator.subcategory}
            </Badge>
          )}
          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
            Use Calculator →
          </Button>
        </div>
        
        {/* Usage instructions preview */}
        {calculator.usageInstructions.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              {calculator.usageInstructions[0]}
              {calculator.usageInstructions.length > 1 && '...'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBackToCategories}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{categoryInfo?.title}</h1>
          <p className="text-muted-foreground">{categoryInfo?.description}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Subcategory Filter */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSubcategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubcategory(null)}
            >
              All
            </Button>
            {subcategories.map((subcat) => (
              <Button
                key={subcat}
                variant={selectedSubcategory === subcat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubcategory(subcat)}
              >
                {subcat}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
          {selectedSubcategory && ` in ${selectedSubcategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Calculator Groups */}
      {Object.keys(groupedCalculators).length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <div className="text-center">
              <CalculatorIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No calculators found</p>
              {searchQuery && (
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setSearchQuery('')}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedCalculators).map(([subcategory, calculators]) => (
            <div key={subcategory}>
              {!selectedSubcategory && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-lg font-semibold">{subcategory}</h2>
                    <Badge variant="secondary">
                      {calculators.length} calculator{calculators.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <Separator className="mb-4" />
                </>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {calculators.map(renderCalculatorCard)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}