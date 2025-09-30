export interface arm_mortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface arm_mortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface arm_mortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface arm_mortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
