import { useState, useEffect, useCallback } from 'react';
import { ValidationRule, ValidationResult } from '../types/calculator';
import { CalculatorEngine } from '../engines/CalculatorEngine';

interface UseValidationOptions {
  debounceMs?: number;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

interface ValidationState {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
  isValidating: boolean;
  hasValidated: boolean;
}

/**
 * Custom hook for managing validation state with real-time feedback
 */
export function useValidation(
  rules: ValidationRule[],
  inputs: Record<string, any>,
  options: UseValidationOptions = {}
) {
  const {
    debounceMs = 300,
    validateOnChange = true,
    validateOnBlur = true
  } = options;

  const [validationState, setValidationState] = useState<ValidationState>({
    isValid: true,
    errors: {},
    warnings: {},
    isValidating: false,
    hasValidated: false
  });

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const engine = new CalculatorEngine();

  // Validate inputs against rules
  const validateInputs = useCallback(async (inputsToValidate: Record<string, any>): Promise<ValidationResult> => {
    const errors: Record<string, string> = {};
    const warnings: Record<string, string> = {};

    for (const rule of rules) {
      try {
        const fieldValue = inputsToValidate[rule.field];
        const isValid = rule.validator(fieldValue, inputsToValidate);
        
        if (!isValid) {
          if (rule.type === 'business' && rule.message.includes('warning')) {
            warnings[rule.field] = rule.message;
          } else {
            errors[rule.field] = rule.message;
          }
        }
      } catch (error) {
        console.error(`Validation error for field ${rule.field}:`, error);
        errors[rule.field] = 'Validation error occurred';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings
    };
  }, [rules]);

  // Debounced validation
  const debouncedValidate = useCallback((inputsToValidate: Record<string, any>) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setValidationState(prev => ({ ...prev, isValidating: true }));

    const timer = setTimeout(async () => {
      const result = await validateInputs(inputsToValidate);
      setValidationState({
        isValid: result.isValid,
        errors: result.errors,
        warnings: (result as any).warnings || {},
        isValidating: false,
        hasValidated: true
      });
    }, debounceMs);

    setDebounceTimer(timer);
  }, [debounceMs, validateInputs, debounceTimer]);

  // Immediate validation (for onBlur)
  const immediateValidate = useCallback(async (inputsToValidate: Record<string, any>) => {
    setValidationState(prev => ({ ...prev, isValidating: true }));
    
    const result = await validateInputs(inputsToValidate);
    setValidationState({
      isValid: result.isValid,
      errors: result.errors,
      warnings: (result as any).warnings || {},
      isValidating: false,
      hasValidated: true
    });
  }, [validateInputs]);

  // Validate specific field
  const validateField = useCallback(async (fieldName: string, value: any): Promise<string | null> => {
    const fieldRules = rules.filter(rule => rule.field === fieldName);
    
    for (const rule of fieldRules) {
      try {
        const isValid = rule.validator(value, inputs);
        if (!isValid) {
          return rule.message;
        }
      } catch (error) {
        console.error(`Validation error for field ${fieldName}:`, error);
        return 'Validation error occurred';
      }
    }
    
    return null;
  }, [rules, inputs]);

  // Clear validation for specific field
  const clearFieldValidation = useCallback((fieldName: string) => {
    setValidationState(prev => {
      const newErrors = { ...prev.errors };
      const newWarnings = { ...prev.warnings };
      delete newErrors[fieldName];
      delete newWarnings[fieldName];
      
      return {
        ...prev,
        errors: newErrors,
        warnings: newWarnings,
        isValid: Object.keys(newErrors).length === 0
      };
    });
  }, []);

  // Reset all validation
  const resetValidation = useCallback(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    setValidationState({
      isValid: true,
      errors: {},
      warnings: {},
      isValidating: false,
      hasValidated: false
    });
  }, [debounceTimer]);

  // Effect to validate on input changes
  useEffect(() => {
    if (validateOnChange && Object.keys(inputs).length > 0) {
      debouncedValidate(inputs);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [inputs, validateOnChange, debouncedValidate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return {
    ...validationState,
    validateField,
    validateInputs: immediateValidate,
    clearFieldValidation,
    resetValidation,
    debouncedValidate: validateOnChange ? debouncedValidate : immediateValidate
  };
}