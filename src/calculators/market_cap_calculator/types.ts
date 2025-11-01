export interface market_cap_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface market_cap_calculatorResults {
  result: number;
  analysis?: string;
}

export interface market_cap_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface market_cap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
