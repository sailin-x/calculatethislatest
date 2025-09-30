export interface './finance/retirement-savings/student-loan-repayment-calculator/StudentLoanRepaymentCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/student-loan-repayment-calculator/StudentLoanRepaymentCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/student-loan-repayment-calculator/StudentLoanRepaymentCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/student-loan-repayment-calculator/StudentLoanRepaymentCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
