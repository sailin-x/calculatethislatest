import React, { useState, useEffect } from 'react';
import { ValidationMessage } from './ValidationMessage';
import { ValidationMessages } from '../../utils/validationMessages';

interface FieldValidationProps {
  fieldName: string;
  value: any;
  error?: string;
  warning?: string;
  calculatorType?: string;
  showContextualHelp?: boolean;
  className?: string;
}

export function FieldValidation({
  fieldName,
  value,
  error,
  warning,
  calculatorType = '',
  showContextualHelp = true,
  className
}: FieldValidationProps) {
  const [contextualHelp, setContextualHelp] = useState<string | null>(null);

  useEffect(() => {
    if (showContextualHelp && value !== undefined && value !== '') {
      const help = ValidationMessages.getContextualHelp(fieldName, value, calculatorType);
      setContextualHelp(help);
    } else {
      setContextualHelp(null);
    }
  }, [fieldName, value, calculatorType, showContextualHelp]);

  return (
    <div className={`space-y-2 ${className}`}>
      {error && (
        <ValidationMessage
          type="error"
          message={error}
          field={fieldName}
        />
      )}
      
      {warning && !error && (
        <ValidationMessage
          type="warning"
          message={warning}
          field={fieldName}
        />
      )}
      
      {contextualHelp && !error && !warning && (
        <ValidationMessage
          type="info"
          message={contextualHelp}
          showHelp={false}
        />
      )}
    </div>
  );
}

interface SmartValidationProps {
  fieldName: string;
  value: any;
  calculatorType: string;
  error?: string;
  warning?: string;
  children: React.ReactNode;
}

export function SmartValidation({
  fieldName,
  value,
  calculatorType,
  error,
  warning,
  children
}: SmartValidationProps) {
  const getSmartSuggestions = (): string[] => {
    const suggestions: string[] = [];
    
    // Financial field suggestions
    if (calculatorType === 'mortgage') {
      if (fieldName === 'creditScore' && value < 620) {
        suggestions.push('Consider improving credit score to 620+ for better rates');
      }
      if (fieldName === 'downPayment' && value < 20) {
        suggestions.push('20% down payment eliminates PMI requirements');
      }
      if (fieldName === 'loanTerm' && value > 30) {
        suggestions.push('Shorter terms save on total interest paid');
      }
    }
    
    // Health field suggestions
    if (calculatorType === 'bmi') {
      if (fieldName === 'weight' && value > 0) {
        const bmi = calculateBMI(value, 70); // Assume average height for suggestion
        if (bmi > 25) {
          suggestions.push('Consider consulting a healthcare provider about weight management');
        }
      }
    }
    
    // Business field suggestions
    if (calculatorType === 'saas') {
      if (fieldName === 'churnRate' && value > 5) {
        suggestions.push('Monthly churn above 5% indicates retention issues');
      }
      if (fieldName === 'cac' && value > 100) {
        suggestions.push('High CAC may indicate inefficient marketing spend');
      }
    }
    
    return suggestions;
  };

  const calculateBMI = (weight: number, height: number): number => {
    return (weight / (height * height)) * 703; // BMI formula for lbs/inches
  };

  const suggestions = getSmartSuggestions();

  return (
    <div className="space-y-2">
      {children}
      
      <FieldValidation
        fieldName={fieldName}
        value={value}
        error={error}
        warning={warning}
        calculatorType={calculatorType}
      />
      
      {suggestions.length > 0 && !error && (
        <div className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <ValidationMessage
              key={index}
              type="info"
              message={suggestion}
              showHelp={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}