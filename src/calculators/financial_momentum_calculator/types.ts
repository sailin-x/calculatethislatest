export interface financial_momentum_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_momentum_calculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_momentum_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_momentum_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
