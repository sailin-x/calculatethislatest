export interface EquityValuationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface EquityValuationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface EquityValuationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface EquityValuationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
