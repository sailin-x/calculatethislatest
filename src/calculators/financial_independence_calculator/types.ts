export interface financial_independence_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_independence_calculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_independence_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_independence_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
