import React, { forwardRef, useState, useEffect } from 'react';
import { CalculatorInput, CalculatorInputProps } from './calculator-input';
import { formatCurrency, parseFormattedNumber } from '@/utils/formatters';

export interface CurrencyInputProps extends Omit<CalculatorInputProps, 'type' | 'prefix'> {
  currency?: string;
  onValueChange?: (value: number) => void;
  value?: number;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currency = 'USD', onValueChange, value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (value !== undefined && !isFocused) {
        setDisplayValue(value === 0 ? '' : formatCurrency(value).replace('$', ''));
      }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);
      
      const numericValue = parseFormattedNumber(inputValue);
      onValueChange?.(numericValue);
      
      // Call original onChange if provided
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Remove formatting when focused for easier editing
      if (value !== undefined && value !== 0) {
        setDisplayValue(value.toString());
      }
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // Reformat when focus is lost
      const numericValue = parseFormattedNumber(displayValue);
      if (numericValue !== 0) {
        setDisplayValue(formatCurrency(numericValue).replace('$', ''));
      }
      props.onBlur?.(e);
    };

    return (
      <CalculatorInput
        ref={ref}
        type="text"
        prefix="$"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="0.00"
        hint="Enter amount in dollars"
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };