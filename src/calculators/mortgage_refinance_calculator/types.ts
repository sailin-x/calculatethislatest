export interface mortgage_refinance_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_refinance_calculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_refinance_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_refinance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
