export interface home_improvement_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface home_improvement_calculatorResults {
  result: number;
  analysis?: string;
}

export interface home_improvement_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface home_improvement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
