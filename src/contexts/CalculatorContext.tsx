import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Calculator, ValidationResult, CalculationResult } from '../types/calculator';
import { CalculatorEngine } from '../engines/CalculatorEngine';
import { ValidationEngine } from '../engines/ValidationEngine';
import { calculatorRegistry } from '../data/calculatorRegistry';

// Calculator state interface
interface CalculatorState {
  currentCalculator: Calculator | null;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  validation: ValidationResult & { 
    warnings?: Record<string, string>; 
    suggestions?: Record<string, string> 
  };
  isCalculating: boolean;
  isValidating: boolean;
  lastCalculation: CalculationResult | null;
  history: CalculationResult[];
}

// Calculator actions
type CalculatorAction =
  | { type: 'SET_CALCULATOR'; payload: Calculator }
  | { type: 'UPDATE_INPUT'; payload: { field: string; value: any } }
  | { type: 'UPDATE_INPUTS'; payload: Record<string, any> }
  | { type: 'SET_VALIDATION'; payload: ValidationResult & { warnings?: Record<string, string>; suggestions?: Record<string, string> } }
  | { type: 'SET_CALCULATING'; payload: boolean }
  | { type: 'SET_VALIDATING'; payload: boolean }
  | { type: 'SET_CALCULATION_RESULT'; payload: CalculationResult }
  | { type: 'CLEAR_CALCULATOR' }
  | { type: 'RESET_INPUTS' }
  | { type: 'ADD_TO_HISTORY'; payload: CalculationResult };

// Initial state
const initialState: CalculatorState = {
  currentCalculator: null,
  inputs: {},
  outputs: {},
  validation: { isValid: true, errors: {}, warnings: {}, suggestions: {} },
  isCalculating: false,
  isValidating: false,
  lastCalculation: null,
  history: []
};

// Reducer function
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SET_CALCULATOR':
      return {
        ...initialState,
        currentCalculator: action.payload,
        inputs: Object.keys(action.payload.inputs).reduce((acc, key) => {
          acc[key] = action.payload.inputs[key].defaultValue || '';
          return acc;
        }, {} as Record<string, any>)
      };

    case 'UPDATE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.field]: action.payload.value
        }
      };

    case 'UPDATE_INPUTS':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ...action.payload
        }
      };

    case 'SET_VALIDATION':
      return {
        ...state,
        validation: action.payload
      };

    case 'SET_CALCULATING':
      return {
        ...state,
        isCalculating: action.payload
      };

    case 'SET_VALIDATING':
      return {
        ...state,
        isValidating: action.payload
      };

    case 'SET_CALCULATION_RESULT':
      return {
        ...state,
        outputs: action.payload.outputs,
        lastCalculation: action.payload,
        isCalculating: false
      };

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [action.payload, ...state.history.slice(0, 9)] // Keep last 10 calculations
      };

    case 'CLEAR_CALCULATOR':
      return initialState;

    case 'RESET_INPUTS':
      return {
        ...state,
        inputs: state.currentCalculator ? Object.keys(state.currentCalculator.inputs).reduce((acc, key) => {
          acc[key] = state.currentCalculator!.inputs[key].defaultValue || '';
          return acc;
        }, {} as Record<string, any>) : {},
        outputs: {},
        validation: { isValid: true, errors: {}, warnings: {}, suggestions: {} },
        lastCalculation: null
      };

    default:
      return state;
  }
}

// Context interface
interface CalculatorContextType {
  state: CalculatorState;
  engine: CalculatorEngine;
  validationEngine: ValidationEngine;
  
  // Calculator management
  setCalculator: (calculatorId: string) => void;
  clearCalculator: () => void;
  
  // Input management
  updateInput: (field: string, value: any) => void;
  updateInputs: (inputs: Record<string, any>) => void;
  resetInputs: () => void;
  
  // Calculation and validation
  calculate: () => Promise<void>;
  validateInputs: () => Promise<ValidationResult>;
  validateField: (field: string, value: any) => Promise<{ error?: string; warning?: string; suggestion?: string }>;
  
  // Utility functions
  getCalculator: (id: string) => Calculator | undefined;
  searchCalculators: (query: string) => Calculator[];
  getCalculatorsByCategory: (category: string) => Calculator[];
}

// Create context
const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// Calculator provider component
interface CalculatorProviderProps {
  children: ReactNode;
}

export function CalculatorProvider({ children }: CalculatorProviderProps) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const engine = new CalculatorEngine();
  const validationEngine = new ValidationEngine();

  // Calculator management functions
  const setCalculator = (calculatorId: string) => {
    const calculator = calculatorRegistry.getCalculator(calculatorId);
    if (calculator) {
      dispatch({ type: 'SET_CALCULATOR', payload: calculator });
    }
  };

  const clearCalculator = () => {
    dispatch({ type: 'CLEAR_CALCULATOR' });
  };

  // Input management functions
  const updateInput = (field: string, value: any) => {
    dispatch({ type: 'UPDATE_INPUT', payload: { field, value } });
  };

  const updateInputs = (inputs: Record<string, any>) => {
    dispatch({ type: 'UPDATE_INPUTS', payload: inputs });
  };

  const resetInputs = () => {
    dispatch({ type: 'RESET_INPUTS' });
  };

  // Validation functions
  const validateInputs = async (): Promise<ValidationResult> => {
    if (!state.currentCalculator) {
      return { isValid: false, errors: { general: 'No calculator selected' } };
    }

    dispatch({ type: 'SET_VALIDATING', payload: true });
    
    try {
      // For now, return a basic validation result
      // TODO: Implement proper validation using calculator-specific validation functions
      const validation: ValidationResult = { isValid: true, errors: {} };
      dispatch({ type: 'SET_VALIDATION', payload: validation });
      return validation;
    } finally {
      dispatch({ type: 'SET_VALIDATING', payload: false });
    }
  };

  const validateField = async (field: string, value: any) => {
    if (!state.currentCalculator) {
      return {};
    }

    // For now, return empty validation result
    // TODO: Implement field-specific validation
    return {};
  };

  // Calculation function
  const calculate = async (): Promise<void> => {
    if (!state.currentCalculator) return;

    dispatch({ type: 'SET_CALCULATING', payload: true });

    try {
      // Validate inputs first
      const validation = await validateInputs();
      if (!validation.isValid) {
        dispatch({ type: 'SET_CALCULATING', payload: false });
        return;
      }

      // Perform calculation using the calculator's calculate function
      if (state.currentCalculator.calculate) {
        const outputs = state.currentCalculator.calculate(state.inputs);
        const result: CalculationResult = {
          outputs,
          explanation: 'Calculation completed successfully'
        };
        dispatch({ type: 'SET_CALCULATION_RESULT', payload: result });
        dispatch({ type: 'ADD_TO_HISTORY', payload: result });
      }
    } catch (error) {
      console.error('Calculation error:', error);
      dispatch({ type: 'SET_CALCULATING', payload: false });
      // Could dispatch an error action here
    }
  };

  // Utility functions
  const getCalculator = (id: string) => calculatorRegistry.getCalculator(id);
  const searchCalculators = (query: string) => calculatorRegistry.searchCalculators(query);
  const getCalculatorsByCategory = (category: string) => 
    calculatorRegistry.getCalculatorsByCategory(category as any);

  const contextValue: CalculatorContextType = {
    state,
    engine,
    validationEngine,
    setCalculator,
    clearCalculator,
    updateInput,
    updateInputs,
    resetInputs,
    calculate,
    validateInputs,
    validateField,
    getCalculator,
    searchCalculators,
    getCalculatorsByCategory
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
}

// Custom hook to use calculator context
export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}