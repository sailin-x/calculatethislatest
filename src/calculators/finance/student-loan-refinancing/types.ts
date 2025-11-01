export interface StudentLoanRefinancingInputs {
  currentLoanBalance: number;
  currentInterestRate: number;
  currentMonthlyPayment: number;
  remainingTermMonths: number;
  creditScore: number;
  annualIncome: number;
  debtToIncomeRatio: number;
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'retired';
  loanType: 'federal' | 'private' | 'consolidation';
  cosignerAvailable: boolean;
  cosignerCreditScore?: number;
  cosignerIncome?: number;
  targetInterestRate?: number;
  targetTermYears?: number;
  closingCosts?: number;
  monthlyIncome?: number;
  monthlyDebts?: number;
}

export interface StudentLoanRefinancingOutputs {
  newMonthlyPayment: number;
  totalSavings: number;
  breakEvenMonths: number;
  totalInterestSaved: number;
  newTotalPayments: number;
  newTotalInterest: number;
  paymentToIncomeRatio: number;
  debtToIncomeRatio: number;
  eligibilityScore: number;
  recommendedRefinance: boolean;
  riskAssessment: 'Low' | 'Medium' | 'High';
}

export interface StudentLoanRefinancingMetrics {
  result: number;
}

export interface StudentLoanRefinancingAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}