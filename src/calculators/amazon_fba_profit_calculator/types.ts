export interface amazon_fba_profit_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface amazon_fba_profit_calculatorResults {
  result: number;
  analysis?: string;
}

export interface amazon_fba_profit_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface amazon_fba_profit_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
