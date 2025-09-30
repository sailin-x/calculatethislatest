export interface carb_cycling_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface carb_cycling_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface carb_cycling_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface carb_cycling_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
