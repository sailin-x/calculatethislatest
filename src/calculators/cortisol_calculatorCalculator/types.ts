export interface cortisol_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cortisol_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cortisol_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cortisol_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
