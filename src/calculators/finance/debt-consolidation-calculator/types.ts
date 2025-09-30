export interface DebtConsolidationInputs {
  // Current Debts
  creditCardBalance: number;
  creditCardRate: number;
  personalLoanBalance: number;
  personalLoanRate: number;
  otherDebts: Array<{
    name: string;
    balance: number;
    rate: number;
    minimumPayment: number;
  }>;

  // Consolidation Loan Details
  consolidationAmount: number;
  consolidationRate: number;
  consolidationTerm: number;
  consolidationFees: number;

  // Financial Information
  monthlyIncome: number;
  monthlyExpenses: number;

  // Goals
  payoffPriority: 'lowest_rate' | 'highest_balance' | 'lowest_payment';
  targetMonthlyPayment: number;
}

export interface DebtConsolidationResults {
  // Current Situation Analysis
  totalCurrentDebt: number;
  totalCurrentPayments: number;
  weightedAverageRate: number;
  totalCurrentInterest: number;

  // Consolidation Analysis
  consolidationPayment: number;
  totalConsolidationCost: number;
  totalConsolidationInterest: number;
  interestSavings: number;
  paymentSavings: number;

  // Payoff Scenarios
  payoffTimeCurrent: number;
  payoffTimeConsolidated: number;
  monthsSaved: number;

  // Debt-to-Income Analysis
  currentDTI: number;
  consolidatedDTI: number;
  affordabilityRating: 'excellent' | 'good' | 'fair' | 'poor';

  // Break-even Analysis
  breakEvenMonths: number;
  breakEvenSavings: number;

  // Alternative Strategies
  debtAvalancheSavings: number;
  debtSnowballSavings: number;

  // Recommendations
  recommendedStrategy: string;
  consolidationRating: 'excellent' | 'good' | 'fair' | 'poor';
  riskAssessment: string;
  nextSteps: string[];

  // Detailed Breakdown
  debtBreakdown: Array<{
    type: string;
    balance: number;
    rate: number;
    payment: number;
    payoffMonths: number;
  }>;

  // Comparison Scenarios
  scenarios: {
    current: {
      totalPaid: number;
      totalInterest: number;
      payoffMonths: number;
    };
    consolidated: {
      totalPaid: number;
      totalInterest: number;
      payoffMonths: number;
    };
    avalanche: {
      totalPaid: number;
      totalInterest: number;
      payoffMonths: number;
    };
    snowball: {
      totalPaid: number;
      totalInterest: number;
      payoffMonths: number;
    };
  };
}