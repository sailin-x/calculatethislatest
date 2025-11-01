export interface PmiCancellationInputs {
  // Loan details
  originalLoanAmount: number;
  currentLoanBalance: number;
  originalLoanDate: string; // ISO date string
  interestRate: number; // percentage

  // Property details
  originalPropertyValue: number;
  currentPropertyValue: number;
  propertyAddress: string;

  // PMI details
  pmiRate: number; // percentage
  pmiType: 'Borrower Paid' | 'Lender Paid' | 'Split';
  monthlyPmiPayment: number;

  // Equity details
  currentEquity: number;
  loanToValueRatio: number; // percentage

  // Timeline
  monthsSinceOrigination: number;
  yearsSinceOrigination: number;

  // Cancellation options
  automaticCancellationLtv: number; // percentage (typically 78% or 80%)
  lenderCancellationLtv: number; // percentage (typically 75% or 77%)

  // Additional costs
  appraisalFee: number;
  titleSearchFee: number;
  otherFees: number;

  // Tax implications
  marginalTaxRate: number; // percentage
  stateTaxRate: number; // percentage

  // Future projections
  expectedPropertyAppreciation: number; // annual percentage
  expectedPayoffDate: string; // ISO date string

  // Loan terms
  originalLoanTerm: number; // years
  remainingTerm: number; // years
}

export interface PmiCancellationOutputs {
  // Current status
  currentLtvRatio: number; // percentage
  equityPercentage: number; // percentage
  monthsToAutomaticCancellation: number;
  monthsToLenderCancellation: number;

  // PMI savings calculations
  monthlyPmiSavings: number;
  annualPmiSavings: number;
  totalPmiSavings: number; // over remaining loan term
  lifetimePmiSavings: number; // over original loan term

  // Break-even analysis
  breakEvenMonths: number;
  breakEvenYears: number;
  totalCancellationCost: number;
  netSavings: number;

  // Tax implications
  taxSavingsFromCancellation: number;
  afterTaxMonthlySavings: number;
  afterTaxAnnualSavings: number;

  // Future projections
  projectedLtvAtAutomaticCancellation: number; // percentage
  projectedLtvAtLenderCancellation: number; // percentage
  projectedEquityAtAutomaticCancellation: number;
  projectedEquityAtLenderCancellation: number;

  // Cost-benefit analysis
  costBenefitRatio: number;
  returnOnCancellationInvestment: number; // percentage
  paybackPeriod: number; // months

  // Recommendation
  recommendedAction: 'Cancel Now' | 'Wait for Automatic' | 'Request Lender Cancellation' | 'Keep PMI';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  rationale: string[];

  // Alternative scenarios
  automaticCancellationScenario: {
    monthsToCancellation: number;
    totalPmiPaid: number;
    totalSavings: number;
    netBenefit: number;
  };

  lenderCancellationScenario: {
    monthsToCancellation: number;
    totalPmiPaid: number;
    totalSavings: number;
    netBenefit: number;
    successProbability: number; // percentage
  };

  immediateCancellationScenario: {
    totalCost: number;
    monthlySavings: number;
    breakEvenPeriod: number;
    netBenefit: number;
  };

  // Risk analysis
  risksOfCancellation: string[];
  benefitsOfCancellation: string[];
  opportunityCostOfWaiting: number;

  // Documentation requirements
  requiredDocuments: string[];
  estimatedProcessingTime: number; // days
  successRate: number; // percentage

  // Comparison with alternatives
  refinanceOption: {
    estimatedCost: number;
    estimatedSavings: number;
    breakEvenPeriod: number;
    recommended: boolean;
  };

  loanModificationOption: {
    estimatedCost: number;
    estimatedSavings: number;
    feasibility: 'High' | 'Medium' | 'Low';
  };

  // Detailed cash flow impact
  monthlyCashFlowImprovement: number;
  annualCashFlowImprovement: number;
  totalCashFlowImprovement: number;

  // Equity and loan metrics
  equityBuildRate: number; // monthly
  loanPaydownRate: number; // monthly
  remainingPrincipal: number;

  // Market conditions
  currentMarketValue: number;
  marketTrend: 'Appreciating' | 'Stable' | 'Declining';
  marketVolatility: 'Low' | 'Medium' | 'High';

  // Compliance and legal notes
  federalProtections: string[];
  stateSpecificRequirements: string[];
  lenderSpecificPolicies: string[];
}