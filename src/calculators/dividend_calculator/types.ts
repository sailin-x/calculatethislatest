export interface dividend_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dividend_calculatorResults {
  result: number;
  analysis?: string;
}

export interface dividend_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dividend_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
