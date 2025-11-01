export interface probability_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface probability_calculatorResults {
  result: number;
  analysis?: string;
}

export interface probability_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface probability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
