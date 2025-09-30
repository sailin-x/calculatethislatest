export interface cap_rateCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cap_rateCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cap_rateCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cap_rateCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
