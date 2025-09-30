export interface cash_on_cash_returnCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cash_on_cash_returnCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cash_on_cash_returnCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cash_on_cash_returnCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
