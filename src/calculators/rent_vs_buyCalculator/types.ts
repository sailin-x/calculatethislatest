export interface rent_vs_buyCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rent_vs_buyCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rent_vs_buyCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rent_vs_buyCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
