export interface StudentLoanRepaymentInputs {
  loanBalance: number;
  interestRate: number;
  loanTermYears: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  repaymentPlan: 'standard' | 'graduated' | 'extended' | 'income_based' | 'pay_as_you_earn' | 'revised_pay_as_you_earn' | 'income_contingent' | 'income_sensitive';
  familySize: number;
  stateOfResidence: string;
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'student';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  spouseIncome?: number;
  dependents: number;
  currentAge: number;
  expectedIncomeGrowth?: number;
  inflationRate?: number;
  taxRate?: number;
}

export interface StudentLoanRepaymentOutputs {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  payoffDate: string;
  debtToIncomeRatio: number;
  paymentToIncomeRatio: number;
  affordabilityScore: number;
  recommendedPlan: string;
  estimatedMonthlySavings: number;
  yearsToPayoff: number;
  totalCost: number;
}

export interface StudentLoanRepaymentMetrics {
  result: number;
}

export interface StudentLoanRepaymentAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}