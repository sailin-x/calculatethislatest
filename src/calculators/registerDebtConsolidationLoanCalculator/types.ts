export interface registerDebtConsolidationLoanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerDebtConsolidationLoanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerDebtConsolidationLoanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerDebtConsolidationLoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
