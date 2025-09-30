export interface './finance/debt-consolidation-loan-calculator/DebtConsolidationLoanCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-consolidation-loan-calculator/DebtConsolidationLoanCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-consolidation-loan-calculator/DebtConsolidationLoanCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-consolidation-loan-calculator/DebtConsolidationLoanCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
