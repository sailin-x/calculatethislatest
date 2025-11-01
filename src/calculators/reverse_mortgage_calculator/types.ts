export interface reverse_mortgage_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface reverse_mortgage_calculatorResults {
  result: number;
  analysis?: string;
}

export interface reverse_mortgage_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface reverse_mortgage_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
