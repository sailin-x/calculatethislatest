export interface attribution_models_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface attribution_models_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface attribution_models_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface attribution_models_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
