export interface mortgage_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_calculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
