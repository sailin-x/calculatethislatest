export interface cash_out_refinanceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cash_out_refinanceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cash_out_refinanceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cash_out_refinanceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
