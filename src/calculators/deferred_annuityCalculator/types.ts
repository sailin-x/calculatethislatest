export interface deferred_annuityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface deferred_annuityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface deferred_annuityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface deferred_annuityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
