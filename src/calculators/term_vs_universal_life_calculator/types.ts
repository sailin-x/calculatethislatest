export interface term_vs_universal_life_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface term_vs_universal_life_calculatorResults {
  result: number;
  analysis?: string;
}

export interface term_vs_universal_life_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface term_vs_universal_life_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
