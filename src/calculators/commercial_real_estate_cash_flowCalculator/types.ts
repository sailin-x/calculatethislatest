export interface commercial_real_estate_cash_flowCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface commercial_real_estate_cash_flowCalculatorResults {
  result: number;
  analysis?: string;
}

export interface commercial_real_estate_cash_flowCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface commercial_real_estate_cash_flowCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
