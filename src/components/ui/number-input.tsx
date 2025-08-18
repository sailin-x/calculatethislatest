import React, { forwardRef, useState, useEffect } from 'react';
import { CalculatorInput, CalculatorInputProps } from './calculator-input';
import { formatNumber, parseFormattedNumber } from '@/utils/formatters';

export interface NumberInputProps extends Omit<CalculatorInputProps, 'type'> {
  onValueChange?: (value: number) => void;
  value?: number;
  precision?: number;
  allowNegative?: boolean;
  formatOnBlur?: boolean;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ 
    onValueChange, 
    value, 
    precision = 2, 
    allowNegative = true,
    formatOnBlur = true,
    onChange, 
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (value !== undefined && !isFocused) {
        if (value === 0) {
          setDisplayValue('');
        } else if (formatOnBlur) {
          setDisplayValue(formatNumber(value, 'en-US', 0, precision));
        } else {
          setDisplayValue(value.toString());
        }
      }
    }, [value, precision, formatOnBlur, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);
      
      const numericValue = parseFormattedNumber(inputValue);
      
      // Apply negative constraint
      const finalValue = !allowNegative && numericValue < 0 ? 0 : numericValue;
      
      onValueChange?.(finalValue);
      
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
      if (formatOnBlur) {
        const numericValue = parseFormattedNumber(displayValue);
        if (numericValue !== 0) {
          setDisplayValue(formatNumber(numericValue, 'en-US', 0, precision));
        }
      }
      props.onBlur?.(e);
    };

    return (
      <CalculatorInput
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="0"
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };