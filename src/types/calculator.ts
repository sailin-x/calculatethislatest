// Core calculator type definitions
export type CalculatorCategory = 
  | 'finance'
  | 'legal'
  | 'business'
  | 'health'
  | 'construction'
  | 'math'
  | 'lifestyle';

export type InputType =
  | 'number'
  | 'currency'
  | 'percentage'
  | 'date'
  | 'select'
  | 'boolean'
  | 'text';

export type OutputType = 
  | 'currency'
  | 'percentage'
  | 'number'
  | 'text'
  | 'chart';

export type ValidationType = 
  | 'required'
  | 'range'
  | 'format'
  | 'business'
  | 'cross-field';

export interface SelectOption {
  value: string;
  label: string;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: InputType;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: SelectOption[];
  tooltip?: string;
  placeholder?: string;
  defaultValue?: any;
}

export interface CalculatorOutput {
  id: string;
  label: string;
  type: OutputType;
  format?: string;
  explanation?: string;
}

export interface ValidationRule {
  field: string;
  type: ValidationType;
  message: string;
  validator: (value: any, allInputs?: Record<string, any>) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface CalculationResult {
  outputs: Record<string, any>;
  explanation?: string;
  intermediateSteps?: Record<string, any>;
}

export interface Formula {
  id: string;
  name: string;
  description: string;
  calculate: (inputs: Record<string, any>) => CalculationResult;
}

export interface CalculatorExample {
  title: string;
  description: string;
  inputs: Record<string, any>;
  expectedOutputs: Record<string, any>;
}

export interface Calculator {
  id: string;
  title: string;
  category: CalculatorCategory;
  subcategory?: string;
  description: string;
  usageInstructions: string[];
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  formulas: Formula[];
  validationRules: ValidationRule[];
  examples: CalculatorExample[];
}