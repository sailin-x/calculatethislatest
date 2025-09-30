export interface DebtPayoffCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface DebtPayoffCalculatorResults {
  result: number;
  analysis?: string;
}

export interface DebtPayoffCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface DebtPayoffCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
