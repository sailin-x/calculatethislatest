export interface mortgage_refinanceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_refinanceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_refinanceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_refinanceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
