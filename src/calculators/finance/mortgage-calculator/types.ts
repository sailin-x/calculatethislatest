export interface MortgageInputs {
  // Personal Information
  annualSalary: number;

  // Loan Details
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  loanTermMonths?: number;

  // Property Information
  propertyValue: number;
  downPayment: number;
  downPaymentPercent?: number;

  // Additional Costs
  closingCosts: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  pmiRate?: number; // Private Mortgage Insurance

  // Payment Schedule
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';

  // Extra Payments
  extraPayment: number;
  extraPaymentFrequency: 'monthly' | 'yearly' | 'one_time';

  // Loan Type
  loanType: 'fixed' | 'adjustable' | 'interest_only' | 'balloon';

  // Adjustable Rate Details (if applicable)
  adjustmentPeriod?: number; // months
  adjustmentCaps?: {
    initial: number; // percentage
    periodic: number; // percentage
    lifetime: number; // percentage
  };

  // Prepayment Analysis
  prepaymentAnalysis: boolean;
  analysisPeriod?: number; // years

  // Tax Considerations
  taxRate: number;
  deductibleInterest: boolean;

  // Comparison Options
  compareRates?: number[]; // array of interest rates to compare
  compareTerms?: number[]; // array of loan terms to compare

  // Advanced Options
  inflationRate?: number;
  propertyAppreciation?: number;
  discountPoints?: number;
  originationFees?: number;
}

export interface MortgageResults {
  // Basic Payment Information
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;

  // Payment Breakdown
  principalPayment: number;
  interestPayment: number;
  taxPayment: number;
  insurancePayment: number;
  pmiPayment: number;

  // Loan Summary
  loanToValueRatio: number;
  debtToIncomeRatio?: number;
  affordabilityScore: string;

  // Amortization Details
  totalMonths: number;
  payoffDate: string;
  averageMonthlyPayment: number;

  // Interest Analysis
  totalInterestPercentage: number;
  interestToPrincipalRatio: number;
  effectiveInterestRate: number;

  // Equity Building
  equityAfter5Years: number;
  equityAfter10Years: number;
  equityAtPayoff: number;

  // Tax Benefits
  deductibleInterest: number;
  taxSavings: number;
  afterTaxMonthlyPayment: number;

  // Prepayment Analysis
  prepaymentSavings: number;
  timeSaved: number; // months
  breakEvenPoint: number; // months

  // Scenario Comparisons
  rateComparison: Array<{
    rate: number;
    monthlyPayment: number;
    totalCost: number;
    savings: number;
  }>;

  termComparison: Array<{
    term: number;
    monthlyPayment: number;
    totalCost: number;
    totalInterest: number;
  }>;

  // Cash Flow Analysis
  cashOnCashReturn: number;
  returnOnInvestment: number;
  netOperatingIncome: number;

  // Risk Analysis
  interestRateRisk: string;
  prepaymentRisk: string;
  defaultRisk: string;

  // Recommendations
  optimalStrategy: string;
  refinanceRecommendation: string;
  paymentOptimization: string[];

  // Future Projections
  balanceAfter5Years: number;
  balanceAfter10Years: number;
  remainingTermAfter5Years: number;

  // Affordability Metrics
  frontEndRatio: number;
  backEndRatio: number;
  housingExpenseRatio: number;

  // Investment Analysis
  propertyValueProjection: number;
  netWorthImpact: number;
  wealthBuildingEfficiency: number;

  // Break-Even Analysis
  breakEvenTime: number;
  breakEvenCost: number;
  profitabilityTimeline: string;
}
