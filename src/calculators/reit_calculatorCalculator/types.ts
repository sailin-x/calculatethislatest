export interface reit_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface reit_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface reit_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface reit_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
