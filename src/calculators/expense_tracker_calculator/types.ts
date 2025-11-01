export interface expense_tracker_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface expense_tracker_calculatorResults {
  result: number;
  analysis?: string;
}

export interface expense_tracker_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface expense_tracker_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
