export interface LoanCalculatorInputs {
  loanAmount: number;
  interestRate: number; // Annual interest rate as percentage
  loanTerm: number; // Loan term in years
  paymentFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  loanType?: 'personal' | 'business' | 'student' | 'auto' | 'other';
  extraPayment?: number; // Optional extra payment per period
}

export interface AmortizationPayment {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

export interface EarlyPayoffAnalysis {
  originalTerm: number; // Original term in periods
  newTerm: number; // New term with extra payments
  totalSavings: number; // Interest savings
  timeSaved: number; // Periods saved
  originalTotalInterest: number;
  newTotalInterest: number;
}

export interface LoanCalculatorOutputs {
  monthlyPayment: number; // EMI - Equated Monthly Installment
  totalInterestPaid: number;
  totalAmountPaid: number;
  numberOfPayments: number;
  payoffDate: string; // Estimated payoff date
  amortizationSchedule: AmortizationPayment[];
  earlyPayoffAnalysis?: EarlyPayoffAnalysis;
}

export interface LoanCalculatorMetrics {
  debtToIncomeRatio?: number;
  paymentToIncomeRatio?: number;
  interestCoverageRatio?: number;
}

export interface LoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  insights: string[];
  warnings: string[];
}
