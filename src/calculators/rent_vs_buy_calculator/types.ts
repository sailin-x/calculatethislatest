export interface rent_vs_buy_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rent_vs_buy_calculatorResults {
  result: number;
  analysis?: string;
}

export interface rent_vs_buy_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rent_vs_buy_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
