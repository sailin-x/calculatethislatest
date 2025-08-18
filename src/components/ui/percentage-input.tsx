import React, { forwardRef, useState, useEffect } from 'react';
import { CalculatorInput, CalculatorInputProps } from './calculator-input';
import { parseFormattedNumber } from '@/utils/formatters';

export interface PercentageInputProps extends Omit<CalculatorInputProps, 'type' | 'suffix'> {
  onValueChange?: (value: number) => void;
  value?: number;
  precision?: number;
}

const PercentageInput = forwardRef<HTMLInputElement, PercentageInputProps>(
  ({ onValueChange, value, precision = 2, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(value === 0 ? '' : value.toFixed(precision));
      }
    }, [value, precision]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);
      
      const numericValue = parseFormattedNumber(inputValue);
      onValueChange?.(numericValue);
      
      // Call original onChange if provided
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Format to specified precision when focus is lost
      const numericValue = parseFormattedNumber(displayValue);
      if (numericValue !== 0) {
        setDisplayValue(numericValue.toFixed(precision));
      }
      props.onBlur?.(e);
    };

    return (
      <CalculatorInput
        ref={ref}
        type="number"
        suffix="%"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="0.00"
        hint="Enter as percentage (e.g., 4.5 for 4.5%)"
        step={Math.pow(10, -precision)}
        min={0}
        max={100}
        {...props}
      />
    );
  }
);

PercentageInput.displayName = "PercentageInput";

export { PercentageInput };