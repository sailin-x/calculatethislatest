export interface mortgage_equityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_equityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_equityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_equityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
