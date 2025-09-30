export interface brrrr_strategyCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface brrrr_strategyCalculatorResults {
  result: number;
  analysis?: string;
}

export interface brrrr_strategyCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface brrrr_strategyCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
