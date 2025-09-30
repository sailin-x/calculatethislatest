export interface mortgage_vs_rentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_vs_rentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_vs_rentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_vs_rentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
