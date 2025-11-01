export interface body_recomposition_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface body_recomposition_calculatorResults {
  result: number;
  analysis?: string;
}

export interface body_recomposition_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface body_recomposition_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
