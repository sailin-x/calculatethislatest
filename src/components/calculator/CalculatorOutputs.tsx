import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, Info, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCalculator } from '../../contexts/CalculatorContext';
import { formatCurrency, formatPercentage, formatNumber } from '../../utils/formatters';
import { useState } from 'react';

export function CalculatorOutputs() {
  const { state } = useCalculator();
  const { currentCalculator, outputs, lastCalculation, isCalculating } = state;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!currentCalculator) {
    return null;
  }

  const hasResults = lastCalculation && Object.keys(outputs).length > 0;

  const formatOutputValue = (value: any, type: string, format?: string): string => {
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }

    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
        return formatNumber(value);
      case 'text':
        return String(value);
      default:
        return String(value);
    }
  };

  const copyToClipboard = async (value: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (isCalculating) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Calculating...</p>
        </div>
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Enter your values and click Calculate to see results
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Results */}
      <div className="space-y-3">
        {currentCalculator.outputs.map((output) => {
          const value = outputs[output.id];
          const formattedValue = formatOutputValue(value, output.type, output.format);
          
          return (
            <Card key={output.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{output.label}</h4>
                    <Badge variant="outline" className="text-xs">
                      {output.type}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {formattedValue}
                  </div>
                  {output.explanation && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {output.explanation}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(formattedValue, output.id)}
                  className="ml-2"
                >
                  {copiedField === output.id ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Calculation Explanation */}
      {lastCalculation?.explanation && (
        <>
          <Separator />
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">How this was calculated:</h4>
                <p className="text-sm text-blue-800">{lastCalculation.explanation}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Intermediate Steps */}
      {lastCalculation?.intermediateSteps && Object.keys(lastCalculation.intermediateSteps).length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Calculation Steps:</h4>
            <div className="space-y-2">
              {Object.entries(lastCalculation.intermediateSteps).map(([step, value]) => (
                <div key={step} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                  <span className="text-muted-foreground">{step}:</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Additional Information */}
      <div className="text-xs text-muted-foreground text-center pt-2 border-t">
        Results are calculated using industry-standard formulas and may be subject to rounding.
        Always consult with a professional for important financial decisions.
      </div>
    </div>
  );
}