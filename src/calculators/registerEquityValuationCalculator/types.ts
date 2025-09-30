export interface registerEquityValuationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerEquityValuationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerEquityValuationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerEquityValuationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
