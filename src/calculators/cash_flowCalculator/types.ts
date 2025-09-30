export interface cash_flowCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cash_flowCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cash_flowCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cash_flowCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
