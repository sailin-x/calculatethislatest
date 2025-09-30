export interface registerDebtPayoffCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerDebtPayoffCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerDebtPayoffCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerDebtPayoffCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
