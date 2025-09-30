export interface loan_to_value_ratioCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface loan_to_value_ratioCalculatorResults {
  result: number;
  analysis?: string;
}

export interface loan_to_value_ratioCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface loan_to_value_ratioCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
