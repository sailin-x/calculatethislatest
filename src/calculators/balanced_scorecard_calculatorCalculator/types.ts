export interface balanced_scorecard_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface balanced_scorecard_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface balanced_scorecard_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface balanced_scorecard_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
