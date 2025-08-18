import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface CalculatorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  prefix?: string;
  suffix?: string;
}

const CalculatorInput = forwardRef<HTMLInputElement, CalculatorInputProps>(
  ({ className, label, error, hint, required, prefix, suffix, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={props.id} className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        
        <div className="relative">
          {prefix && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
              {prefix}
            </div>
          )}
          
          <Input
            ref={ref}
            className={cn(
              prefix && "pl-8",
              suffix && "pr-8",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            {...props}
          />
          
          {suffix && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
              {suffix}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  }
);

CalculatorInput.displayName = "CalculatorInput";

export { CalculatorInput };