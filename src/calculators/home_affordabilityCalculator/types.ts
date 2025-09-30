export interface home_affordabilityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface home_affordabilityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface home_affordabilityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface home_affordabilityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
