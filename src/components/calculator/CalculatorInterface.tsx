import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, RotateCcw, Info } from 'lucide-react';
import { useCalculator } from '../../contexts/CalculatorContext';
import { CalculatorInputs } from './CalculatorInputs';
import { CalculatorOutputs } from './CalculatorOutputs';
import { ValidationSummary } from '../validation/ValidationMessage';
import { getCategoryColor, getCategoryTitle } from '../../constants/categories';

interface CalculatorInterfaceProps {
  className?: string;
}

export function CalculatorInterface({ className }: CalculatorInterfaceProps) {
  const { state, calculate, resetInputs, validateInputs } = useCalculator();
  const { currentCalculator, isCalculating, isValidating, validation } = state;

  if (!currentCalculator) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Select a calculator to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleCalculate = async () => {
    await calculate();
  };

  const handleReset = () => {
    resetInputs();
  };

  const categoryColor = getCategoryColor(currentCalculator.category);
  const categoryTitle = getCategoryTitle(currentCalculator.category);

  return (
    <div className={className}>
      {/* Calculator Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`${categoryColor} text-white`}>
                  {categoryTitle}
                </Badge>
                {currentCalculator.subcategory && (
                  <Badge variant="outline">
                    {currentCalculator.subcategory}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{currentCalculator.title}</CardTitle>
              <CardDescription className="text-base">
                {currentCalculator.description}
              </CardDescription>
            </div>
          </div>
          
          {/* Usage Instructions */}
          {currentCalculator.usageInstructions.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">How to use this calculator:</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    {currentCalculator.usageInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 font-medium">{index + 1}.</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculator Inputs
            </CardTitle>
            <CardDescription>
              Enter your values below to perform the calculation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CalculatorInputs />
            
            <Separator />
            
            <div className="flex gap-2">
              <Button 
                onClick={handleCalculate}
                disabled={isCalculating || isValidating || !validation.isValid}
                className="flex-1"
              >
                {isCalculating ? 'Calculating...' : isValidating ? 'Validating...' : 'Calculate'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={isCalculating || isValidating}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Enhanced Validation Summary */}
            <ValidationSummary
              errors={validation.errors}
              warnings={validation.warnings}
            />
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Your calculation results will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalculatorOutputs />
          </CardContent>
        </Card>
      </div>

      {/* Examples Section */}
      {currentCalculator.examples.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Examples</CardTitle>
            <CardDescription>
              Try these example calculations to see how the calculator works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCalculator.examples.map((example, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{example.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{example.description}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Inputs:</span>
                      <ul className="ml-4 mt-1">
                        {Object.entries(example.inputs).map(([key, value]) => (
                          <li key={key}>• {key}: {String(value)}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium">Expected Results:</span>
                      <ul className="ml-4 mt-1">
                        {Object.entries(example.expectedOutputs).map(([key, value]) => (
                          <li key={key}>• {key}: {String(value)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}