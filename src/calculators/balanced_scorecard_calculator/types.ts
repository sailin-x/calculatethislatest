export interface balanced_scorecard_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface balanced_scorecard_calculatorResults {
  result: number;
  analysis?: string;
}

export interface balanced_scorecard_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface balanced_scorecard_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
