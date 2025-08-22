export interface MortgagePayoffInputs {
  loanAmount: number;
  currentBalance: number;
  interestRate: number;
  loanTerm: number;
  yearsRemaining: number;
  monthlyPayment: number;
  additionalMonthlyPayment: number;
  lumpSumPayment: number;
  biweeklyPayment: boolean;
  extraPaymentFrequency: 'monthly' | 'quarterly' | 'annually' | 'one-time';
  annualIncome: number;
  emergencyFund: number;
  otherDebts: number;
  investmentReturn: number;
  taxRate: number;
  inflationRate: number;
  homeValue: number;
  refinanceRate: number;
  refinanceCosts: number;
  payoffGoal: 'minimum-time' | 'minimum-cost' | 'balanced' | 'specific-date';
  targetPayoffDate: string;
  prepaymentPenalty: boolean;
  penaltyAmount: number;
  state: string;
}

export interface MortgagePayoffOutputs {
  standardPayoffDate: string;
  acceleratedPayoffDate: string;
  timeSaved: number;
  interestSaved: number;
  totalCostSavings: number;
  monthlyPaymentIncrease: number;
  payoffStrategy: string;
  refinanceAnalysis: string;
  investmentComparison: string;
  cashFlowImpact: string;
  taxImplications: string;
  riskAssessment: string;
  opportunityCost: number;
  breakEvenAnalysis: string;
  scenarioComparison: string;
  recommendations: string;
  implementationPlan: string;
  milestoneTimeline: string;
  financialImpact: string;
  nextSteps: string;
}
