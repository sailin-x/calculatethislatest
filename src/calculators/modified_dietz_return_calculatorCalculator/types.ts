export interface modified_dietz_return_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface modified_dietz_return_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface modified_dietz_return_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface modified_dietz_return_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
