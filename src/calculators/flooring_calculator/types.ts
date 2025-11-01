export interface flooring_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface flooring_calculatorResults {
  result: number;
  analysis?: string;
}

export interface flooring_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface flooring_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
