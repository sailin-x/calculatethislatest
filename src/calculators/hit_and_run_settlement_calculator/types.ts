export interface hit_and_run_settlement_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hit_and_run_settlement_calculatorResults {
  result: number;
  analysis?: string;
}

export interface hit_and_run_settlement_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hit_and_run_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
