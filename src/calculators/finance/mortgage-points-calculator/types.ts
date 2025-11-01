export interface MortgagePointsInputs {
  loanAmount: number;
  baseInterestRate: number;
  loanTerm: number;
  discountPoints: number;
  originationPoints: number;
  lenderCredits: number;
  expectedHoldingPeriod: number;
  propertyAppreciationRate: number;
  closingCosts: number;
  otherFees: number;
  currentMarketRate: number;
  creditScore: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  propertyValue: number;
  downPayment: number;
  monthlyPaymentWithoutPoints: number;
  monthlyPaymentWithPoints: number;
}

export interface MortgagePointsOutputs {
  pointsCost: number;
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
  breakevenPeriod: number;
  breakevenMonths: number;
  netBenefit: number;
  effectiveRateWithPoints: number;
  effectiveRateWithoutPoints: number;
  rateReduction: number;
  costPerBasisPoint: number;
  returnOnInvestment: number;
  breakEvenAnalysis: {
    monthsToBreakEven: number;
    yearsToBreakEven: number;
    totalSavingsAtBreakEven: number;
    propertyValueAtBreakEven: number;
  };
  cashFlowImpact: {
    monthlyCashFlowWithoutPoints: number;
    monthlyCashFlowWithPoints: number;
    annualCashFlowDifference: number;
    totalCashFlowOverHoldingPeriod: number;
  };
  comparisonScenarios: {
    scenario: string;
    pointsPurchased: number;
    interestRate: number;
    monthlyPayment: number;
    totalCost: number;
    netSavings: number;
  }[];
  recommendation: {
    recommendedPoints: number;
    rationale: string;
    alternativeOptions: string[];
    riskConsiderations: string[];
  };
}