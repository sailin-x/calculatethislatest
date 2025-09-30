export interface DebtConsolidationLoanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface DebtConsolidationLoanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface DebtConsolidationLoanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface DebtConsolidationLoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
