export interface fertilizer_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fertilizer_calculatorResults {
  result: number;
  analysis?: string;
}

export interface fertilizer_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fertilizer_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
