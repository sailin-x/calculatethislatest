export interface expense_tracker_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface expense_tracker_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface expense_tracker_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface expense_tracker_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
