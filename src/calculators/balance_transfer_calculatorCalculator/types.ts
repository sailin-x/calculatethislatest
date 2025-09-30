export interface balance_transfer_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface balance_transfer_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface balance_transfer_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface balance_transfer_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
