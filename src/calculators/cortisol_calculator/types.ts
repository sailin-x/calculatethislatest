export interface cortisol_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cortisol_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cortisol_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cortisol_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
