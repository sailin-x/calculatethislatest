import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CurrencyInput } from '@/components/ui/currency-input';
import { PercentageInput } from '@/components/ui/percentage-input';
import { NumberInput } from '@/components/ui/number-input';
import { HelpCircle } from 'lucide-react';
import { useCalculator } from '../../contexts/CalculatorContext';
import { SmartValidation } from '../validation/FieldValidation';
import { CalculatorInput } from '../../types/calculator';

export function CalculatorInputs() {
  const { state, updateInput, validateField } = useCalculator();
  const { currentCalculator, inputs, validation } = state;

  if (!currentCalculator) {
    return null;
  }

  const handleInputChange = async (inputId: string, value: any) => {
    updateInput(inputId, value);
    // Validate field immediately for real-time feedback
    await validateField(inputId, value);
  };

  const renderInput = (input: CalculatorInput) => {
    const value = inputs[input.id] || '';
    const hasError = validation.errors[input.id];
    const hasWarning = validation.warnings?.[input.id];

    const inputElement = (() => {
      switch (input.type) {
        case 'currency':
          return (
            <CurrencyInput
              value={parseFloat(value) || 0}
              onValueChange={(newValue) => handleInputChange(input.id, newValue)}
              placeholder={input.placeholder}
              error={hasError}
              label=""
              required={false}
            />
          );

        case 'percentage':
          return (
            <PercentageInput
              value={parseFloat(value) || 0}
              onValueChange={(newValue) => handleInputChange(input.id, newValue)}
              placeholder={input.placeholder}
              error={hasError}
              label=""
              required={false}
            />
          );

        case 'number':
          return (
            <NumberInput
              value={parseFloat(value) || 0}
              onValueChange={(newValue) => handleInputChange(input.id, newValue)}
              placeholder={input.placeholder}
              min={input.min}
              max={input.max}
              error={hasError}
              label=""
              required={false}
            />
          );

        case 'select':
          return (
            <Select
              value={value}
              onValueChange={(newValue) => handleInputChange(input.id, newValue)}
            >
              <SelectTrigger className={hasError ? 'border-red-500' : ''}>
                <SelectValue placeholder={input.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {input.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case 'boolean':
          return (
            <div className="flex items-center space-x-2">
              <Switch
                checked={Boolean(value)}
                onCheckedChange={(checked) => handleInputChange(input.id, checked)}
              />
              <Label htmlFor={input.id} className="text-sm">
                {value ? 'Yes' : 'No'}
              </Label>
            </div>
          );

        case 'date':
          return (
            <Input
              type="date"
              value={value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              className={hasError ? 'border-red-500' : ''}
            />
          );

        default:
          return (
            <Input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              placeholder={input.placeholder}
              className={hasError ? 'border-red-500' : ''}
            />
          );
      }
    })();

    return (
      <SmartValidation
        key={input.id}
        fieldName={input.id}
        value={value}
        calculatorType={currentCalculator?.category || ''}
        error={hasError}
        warning={hasWarning}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor={input.id} className="text-sm font-medium">
              {input.label}
              {input.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {input.tooltip && (
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{input.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          
          {inputElement}
        </div>
      </SmartValidation>
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(currentCalculator.inputs).map(([inputId, input]) => renderInput({ id: inputId, ...input }))}
    </div>
  );
}