import React, { useState } from 'react';
import { AppLayout } from './layout/AppLayout';
import { CategoryGrid } from './navigation/CategoryGrid';
import { CalculatorList } from './navigation/CalculatorList';
import { CalculatorInterface } from './calculator/CalculatorInterface';
import { useCalculator } from '../contexts/CalculatorContext';
import { CalculatorCategory } from '../types/calculator';

type ViewState = 
  | { type: 'home' }
  | { type: 'category'; category: CalculatorCategory }
  | { type: 'calculator'; calculatorId: string };

export function CalculatorApp() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const { setCalculator, clearCalculator } = useCalculator();

  const handleNavigateHome = () => {
    setViewState({ type: 'home' });
    clearCalculator();
  };

  const handleCategorySelect = (category: CalculatorCategory) => {
    setViewState({ type: 'category', category });
    clearCalculator();
  };

  const handleCalculatorSelect = (calculatorId: string) => {
    setCalculator(calculatorId);
    setViewState({ type: 'calculator', calculatorId });
  };

  const handleBackToCategories = () => {
    if (viewState.type === 'category') {
      setViewState({ type: 'home' });
    }
    clearCalculator();
  };

  const renderContent = () => {
    switch (viewState.type) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Industry-Leading Calculators
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professional-grade calculation tools across finance, business, health, construction, 
                mathematics, and lifestyle. Each calculator delivers real-world accuracy with 
                comprehensive features that match or exceed industry standards.
              </p>
            </div>
            
            <CategoryGrid onCategorySelect={handleCategorySelect} />
            
            <div className="text-center space-y-4 pt-8">
              <h2 className="text-2xl font-semibold">Why Choose CalculateThis.ai?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="space-y-2">
                  <h3 className="font-medium">Industry-Standard Formulas</h3>
                  <p className="text-sm text-muted-foreground">
                    All calculations use professionally validated formulas and real-world data
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Comprehensive Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Each calculator includes advanced options and detailed explanations
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Professional Accuracy</h3>
                  <p className="text-sm text-muted-foreground">
                    Results you can trust for important financial and business decisions
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'category':
        return (
          <CalculatorList
            category={viewState.category}
            onCalculatorSelect={handleCalculatorSelect}
            onBackToCategories={handleBackToCategories}
          />
        );

      case 'calculator':
        return <CalculatorInterface />;

      default:
        return null;
    }
  };

  return (
    <AppLayout
      onNavigateHome={handleNavigateHome}
      onCalculatorSelect={handleCalculatorSelect}
    >
      {renderContent()}
    </AppLayout>
  );
}