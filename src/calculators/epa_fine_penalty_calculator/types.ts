export interface epa_fine_penalty_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface epa_fine_penalty_calculatorResults {
  result: number;
  analysis?: string;
}

export interface epa_fine_penalty_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface epa_fine_penalty_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
