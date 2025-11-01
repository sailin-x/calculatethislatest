export interface forex_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface forex_calculatorResults {
  result: number;
  analysis?: string;
}

export interface forex_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface forex_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
