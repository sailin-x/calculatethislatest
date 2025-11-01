export interface PrivateMortgageInsuranceInputs {
  // Loan details
  loanAmount: number;
  downPaymentAmount: number;
  downPaymentPercentage: number;
  loanToValueRatio: number;
  loanType: 'Conventional' | 'FHA' | 'VA' | 'USDA' | 'Portfolio';

  // Property details
  propertyValue: number;
  propertyType: 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family';
  propertyLocation: 'Urban' | 'Suburban' | 'Rural';
  propertyState: string;

  // Borrower details
  borrowerCreditScore: number;
  borrowerIncome: number;
  borrowerDebtToIncomeRatio: number;
  numberOfUnits: number;

  // PMI details
  pmiType: 'Borrower Paid' | 'Lender Paid' | 'Split';
  pmiRate: number; // Annual rate
  pmiTerm: number; // Years
  upfrontMip: number; // For FHA loans

  // Market conditions
  marketRate: number; // Current market interest rate
  marketTrend: 'Stable' | 'Increasing' | 'Decreasing';

  // Analysis options
  includeCancellationAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeRefinanceAnalysis: boolean;

  // Tax information
  marginalTaxRate: number;
  stateTaxRate: number;

  // Refinance details (optional)
  refinanceInterestRate?: number;
  refinanceClosingCosts?: number;
  refinanceTerm?: number;

  // Time factors
  loanOriginationDate: string;
  analysisDate: string;
  expectedPayoffDate?: string;
}

export interface PrivateMortgageInsuranceOutputs {
  // PMI calculations
  monthlyPmiPayment: number;
  annualPmiPayment: number;
  totalPmiCost: number;
  pmiCostAsPercentageOfLoan: number;

  // FHA specific
  upfrontMipAmount: number;
  monthlyMipPayment: number;
  totalMipCost: number;

  // Cancellation analysis
  automaticCancellationDate: string;
  lenderCancellationDate: string;
  monthsToAutomaticCancellation: number;
  monthsToLenderCancellation: number;
  cancellationSavings: number;

  // Break-even analysis
  breakEvenPeriodMonths: number;
  breakEvenPeriodYears: number;
  breakEvenLoanBalance: number;

  // Tax implications
  taxDeductiblePmi: number;
  afterTaxMonthlyPmi: number;
  afterTaxAnnualPmi: number;
  taxSavingsFromPmi: number;

  // Refinance analysis
  refinanceSavings: number;
  refinancePaybackPeriod: number;
  refinanceNetBenefit: number;

  // Risk assessment
  defaultRiskScore: number;
  prepaymentRiskScore: number;
  overallRiskAssessment: 'Low' | 'Medium' | 'High';

  // Alternatives analysis
  conventionalVsFhaComparison: {
    monthlyPaymentDifference: number;
    totalCostDifference: number;
    breakEvenPoint: number;
  };

  // Market analysis
  currentMarketPmiRate: number;
  rateComparisonToMarket: number;
  rateCompetitiveness: 'Below Market' | 'At Market' | 'Above Market';

  // Cash flow impact
  cashFlowImpactMonthly: number;
  cashFlowImpactAnnual: number;
  affordabilityRatio: number;

  // Investment analysis
  pmiAsInvestment: {
    roi: number;
    paybackPeriod: number;
    netPresentValue: number;
  };

  // Regulatory compliance
  fhaMipRefundEligibility: boolean;
  fhaMipRefundAmount: number;
  fhaMipRefundDate: string;

  // Scenario analysis
  bestCaseScenario: {
    totalSavings: number;
    optimalCancellationDate: string;
  };

  worstCaseScenario: {
    totalCost: number;
    riskFactors: string[];
  };

  // Recommendations
  recommendedStrategy: 'Keep PMI' | 'Cancel When Eligible' | 'Refinance' | 'Pay Down Loan';
  actionItems: string[];
  timeline: string[];

  // Cost comparison
  pmiVsNoPmiComparison: {
    monthlyDifference: number;
    annualDifference: number;
    totalDifference: number;
  };

  // Equity building
  equityBuildRate: number;
  timeTo80Ltv: number;
  timeTo78Ltv: number;

  // Lender requirements
  lenderPmiRequirements: string[];
  lenderCancellationPolicy: string;

  // State-specific information
  statePmiLaws: string[];
  stateCancellationRequirements: string[];

  // Historical analysis
  pmiRateHistory: Array<{
    date: string;
    rate: number;
    change: number;
  }>;

  // Future projections
  projectedPmiCost: number;
  projectedCancellationDate: string;
  projectedSavings: number;

  // Borrower education
  pmiFacts: string[];
  cancellationTips: string[];
  lenderNegotiationTips: string[];
}