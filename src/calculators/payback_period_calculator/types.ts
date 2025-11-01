export interface payback_period_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface payback_period_calculatorResults {
  result: number;
  analysis?: string;
}

export interface payback_period_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface payback_period_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
