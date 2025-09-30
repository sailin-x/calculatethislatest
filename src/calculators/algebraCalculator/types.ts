export interface algebraCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface algebraCalculatorResults {
  result: number;
  analysis?: string;
}

export interface algebraCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface algebraCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
