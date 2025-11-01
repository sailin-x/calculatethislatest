export interface credit_card_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface credit_card_calculatorResults {
  result: number;
  analysis?: string;
}

export interface credit_card_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface credit_card_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
