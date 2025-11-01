export interface skewness_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface skewness_calculatorResults {
  result: number;
  analysis?: string;
}

export interface skewness_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface skewness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
