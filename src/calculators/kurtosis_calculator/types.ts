export interface kurtosis_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface kurtosis_calculatorResults {
  result: number;
  analysis?: string;
}

export interface kurtosis_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface kurtosis_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
