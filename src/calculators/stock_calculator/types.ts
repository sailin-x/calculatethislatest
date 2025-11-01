export interface stock_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface stock_calculatorResults {
  result: number;
  analysis?: string;
}

export interface stock_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface stock_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
