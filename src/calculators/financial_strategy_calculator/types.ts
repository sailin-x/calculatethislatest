export interface financial_strategy_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_strategy_calculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_strategy_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_strategy_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
