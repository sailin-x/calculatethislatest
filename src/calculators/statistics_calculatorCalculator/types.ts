export interface statistics_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface statistics_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface statistics_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface statistics_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
