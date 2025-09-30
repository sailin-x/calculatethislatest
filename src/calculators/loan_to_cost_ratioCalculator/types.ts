export interface loan_to_cost_ratioCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface loan_to_cost_ratioCalculatorResults {
  result: number;
  analysis?: string;
}

export interface loan_to_cost_ratioCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface loan_to_cost_ratioCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
