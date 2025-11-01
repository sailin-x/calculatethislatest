export interface balance_transfer_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface balance_transfer_calculatorResults {
  result: number;
  analysis?: string;
}

export interface balance_transfer_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface balance_transfer_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
