export interface distressed_debt_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface distressed_debt_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface distressed_debt_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface distressed_debt_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
