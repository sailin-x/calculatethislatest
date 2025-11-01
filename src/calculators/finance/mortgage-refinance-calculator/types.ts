export interface MortgageRefinanceInputs {
  currentLoanAmount: number;
  currentInterestRate: number;
  currentLoanTerm: number; // months remaining
  currentMonthlyPayment: number;
  propertyValue: number;
  newInterestRate: number;
  newLoanTerm: number; // years
  closingCosts: number;
  cashOutAmount: number;
  currentLoanBalance: number;
  timeToRefinance: number; // months
  expectedStayDuration: number; // months
  currentPropertyTaxes: number;
  currentHomeownersInsurance: number;
  currentPMI: number;
  newPMI: number;
  discountPoints: number;
  lenderCredits: number;
  appraisalFee: number;
  titleInsurance: number;
  otherFees: number;
  marketConditions: 'Stable' | 'Rising' | 'Falling';
  creditScore: number;
  loanType: 'Conventional' | 'FHA' | 'VA' | 'USDA';
  refinanceType: 'Rate-and-Term' | 'Cash-Out' | 'Cash-In';
  prepaymentPenalty: number;
  currentLoanOriginationDate: string;
}

export interface MortgageRefinanceOutputs {
  newMonthlyPayment: number;
  monthlySavings: number;
  totalRefinanceCosts: number;
  breakEvenPeriod: number; // months
  totalSavingsOverTime: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  cashToClose: number;
  newLoanAmount: number;
  newTotalPayments: number;
  totalInterestSavings: number;
  equityPosition: number;
  loanToValueRatio: number;
  debtToIncomeRatio: number;
  affordabilityAnalysis: {
    paymentToIncomeRatio: number;
    housingExpenseRatio: number;
    affordabilityScore: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  };
  costBenefitAnalysis: {
    costToBenefitRatio: number;
    monthlyBenefit: number;
    annualBenefit: number;
    roi: number;
  };
  riskAssessment: {
    interestRateRisk: 'Low' | 'Medium' | 'High';
    prepaymentPenaltyRisk: 'Low' | 'Medium' | 'High';
    marketTimingRisk: 'Low' | 'Medium' | 'High';
    overallRisk: 'Low' | 'Medium' | 'High';
  };
  scenarioAnalysis: {
    conservative: {
      monthlyPayment: number;
      totalCost: number;
      breakEven: number;
    };
    expected: {
      monthlyPayment: number;
      totalCost: number;
      breakEven: number;
    };
    optimistic: {
      monthlyPayment: number;
      totalCost: number;
      breakEven: number;
    };
  };
  recommendations: {
    shouldRefinance: boolean;
    primaryRecommendation: string;
    alternativeOptions: string[];
    timingAdvice: string;
    riskConsiderations: string[];
  };
  comparisonMetrics: {
    currentVsNew: {
      monthlyPayment: { current: number; new: number; difference: number };
      totalPayments: { current: number; new: number; difference: number };
      totalInterest: { current: number; new: number; difference: number };
    };
    breakEvenAnalysis: {
      monthsToBreakEven: number;
      yearsToBreakEven: number;
      totalSavingsAfterBreakEven: number;
    };
  };
}