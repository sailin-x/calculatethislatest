export interface incurred_but_not_reported_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface incurred_but_not_reported_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface incurred_but_not_reported_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface incurred_but_not_reported_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
