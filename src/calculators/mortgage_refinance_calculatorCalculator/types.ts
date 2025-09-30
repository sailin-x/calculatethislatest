export interface mortgage_refinance_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_refinance_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_refinance_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_refinance_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
