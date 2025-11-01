export interface liquidation_price_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface liquidation_price_calculatorResults {
  result: number;
  analysis?: string;
}

export interface liquidation_price_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface liquidation_price_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
