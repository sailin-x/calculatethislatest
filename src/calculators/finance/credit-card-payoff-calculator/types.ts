export interface CreditCardPayoffInputs {
  // Current Debt Information
  currentBalance: number;
  creditLimit: number;
  interestRate: number; // Annual percentage

  // Payment Information
  minimumPayment: number;
  plannedPayment: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';

  // Additional Factors
  includeFees: boolean;
  annualFee: number;
  cashAdvanceFee: number;
  latePaymentFee: number;

  // Extra Payment Options
  extraPayment: number;
  extraPaymentFrequency: 'monthly' | 'biweekly' | 'weekly';

  // Balance Transfer (if applicable)
  isBalanceTransfer: boolean;
  balanceTransferFee: number;
  promotionalRate: number;
  promotionalPeriod: number; // months

  // Goal Settings
  payoffGoal: 'debt_free' | 'minimum_payments' | 'custom_amount';
  customPayoffAmount: number;
  targetDate: string; // ISO date string

  // Financial Context
  monthlyIncome: number;
  monthlyExpenses: number;
  emergencyFund: number;

  // Strategy Preferences
  payoffStrategy: 'avalanche' | 'snowball' | 'custom';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';

  // Advanced Options
  inflationRate: number;
  investmentReturn: number;
  taxRate: number;
}

export interface CreditCardPayoffResults {
  // Current Situation Analysis
  currentSituation: {
    totalDebt: number;
    utilizationRate: number;
    minimumPaymentCoverage: number;
    debtToIncomeRatio: number;
  };

  // Payoff Projections
  payoffProjections: {
    minimumPaymentPayoff: {
      monthsToPayoff: number;
      totalInterest: number;
      totalPayments: number;
      payoffDate: string;
    };
    plannedPaymentPayoff: {
      monthsToPayoff: number;
      totalInterest: number;
      totalPayments: number;
      payoffDate: string;
    };
    aggressivePayoff: {
      monthsToPayoff: number;
      totalInterest: number;
      totalPayments: number;
      payoffDate: string;
    };
  };

  // Payment Analysis
  paymentAnalysis: {
    recommendedPayment: number;
    paymentBreakdown: {
      principal: number;
      interest: number;
      fees: number;
    };
    paymentFrequency: string;
    paymentImpact: string;
  };

  // Strategy Recommendations
  strategyRecommendations: {
    optimalStrategy: string;
    monthlySavings: number;
    timeSavings: number;
    interestSavings: number;
    actionItems: string[];
  };

  // Risk Assessment
  riskAssessment: {
    defaultRisk: number;
    collectionRisk: number;
    creditScoreImpact: string;
    recommendations: string[];
  };

  // Financial Impact
  financialImpact: {
    totalCostSavings: number;
    monthlyCashFlow: number;
    emergencyFundGap: number;
    creditUtilization: number;
    debtFreedomDate: string;
  };

  // Scenario Analysis
  scenarioAnalysis: {
    bestCase: {
      payoffTime: number;
      totalCost: number;
      monthlyPayment: number;
    };
    worstCase: {
      payoffTime: number;
      totalCost: number;
      monthlyPayment: number;
    };
    realisticCase: {
      payoffTime: number;
      totalCost: number;
      monthlyPayment: number;
    };
  };

  // Progress Tracking
  progressTracking: {
    currentProgress: number;
    monthsCompleted: number;
    monthsRemaining: number;
    principalPaid: number;
    interestPaid: number;
  };

  // Alternative Options
  alternativeOptions: {
    balanceTransfer: {
      isRecommended: boolean;
      potentialSavings: number;
      breakEvenPoint: number;
      risks: string[];
    };
    debtConsolidation: {
      isRecommended: boolean;
      potentialSavings: number;
      requirements: string[];
      risks: string[];
    };
    hardshipPrograms: {
      available: boolean;
      potentialBenefits: string[];
      requirements: string[];
    };
  };

  // Success Metrics
  successMetrics: {
    feasibilityScore: number;
    confidenceLevel: number;
    achievabilityRating: 'difficult' | 'challenging' | 'achievable' | 'easy';
    riskLevel: 'low' | 'medium' | 'high';
  };

  // Educational Content
  educationalContent: {
    debtMyths: string[];
    bestPractices: string[];
    warningSigns: string[];
    successTips: string[];
  };

  // Action Plan
  actionPlan: {
    immediateActions: string[];
    monthlyActions: string[];
    longTermStrategies: string[];
    monitoringSteps: string[];
  };
}