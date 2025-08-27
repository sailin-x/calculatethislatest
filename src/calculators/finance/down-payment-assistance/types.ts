export interface DownPaymentAssistanceInputs {
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  borrowerIncome: number;
  householdSize: number;
  areaMedianIncome: number;
  creditScore: number;
  debtToIncomeRatio: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured';
  propertyLocation: string;
  assistanceType: 'grant' | 'loan' | 'tax-credit' | 'forgivable-loan' | 'matched-savings';
  programName: string;
  programRequirements: {
    firstTimeBuyer: boolean;
    incomeLimit: number;
    purchasePriceLimit: number;
    creditScoreMinimum: number;
    debtToIncomeMaximum: number;
    occupancyRequirement: number;
    propertyTypeRestrictions: string[];
    locationRestrictions: string[];
  };
  assistanceAmount: number;
  assistancePercentage: number;
  repaymentTerms: {
    forgivable: boolean;
    forgivenessPeriod: number;
    interestRate: number;
    loanTerm: number;
    monthlyPayment: number;
    deferredPayment: boolean;
    deferredPeriod: number;
    balloonPayment: boolean;
    balloonAmount: number;
  };
  taxImplications: {
    taxable: boolean;
    taxCredit: boolean;
    taxCreditAmount: number;
    taxCreditPeriod: number;
    recaptureTax: boolean;
    recapturePeriod: number;
    recaptureAmount: number;
  };
  closingCosts: number;
  prepaidItems: number;
  earnestMoney: number;
  sellerConcessions: number;
  otherCredits: number;
  totalCashNeeded: number;
  availableCash: number;
  cashShortfall: number;
  programEligibility: boolean;
  applicationFee: number;
  processingFee: number;
  underwritingFee: number;
  appraisalFee: number;
  titleInsurance: number;
  recordingFees: number;
  transferTaxes: number;
  otherFees: number;
  totalFees: number;
  netAssistance: number;
  effectiveDownPayment: number;
  effectiveLoanAmount: number;
  monthlyPayment: number;
  totalMonthlyPayment: number;
  paymentToIncomeRatio: number;
  debtServiceCoverageRatio: number;
  affordabilityScore: number;
  programComparison: Array<{
    programName: string;
    assistanceAmount: number;
    repaymentTerms: string;
    taxImplications: string;
    eligibility: boolean;
    recommendation: string;
  }>;
}

export interface DownPaymentAssistanceMetrics {
  totalAssistance: number;
  netAssistance: number;
  effectiveDownPayment: number;
  effectiveLoanAmount: number;
  monthlyPayment: number;
  totalMonthlyPayment: number;
  paymentToIncomeRatio: number;
  debtServiceCoverageRatio: number;
  affordabilityScore: number;
  cashToClose: number;
  totalCost: number;
  savingsAmount: number;
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  roi: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  paybackPeriod: number;
  programEfficiency: number;
  costBenefitRatio: number;
  riskScore: number;
  approvalProbability: number;
  recommendedProgram: string;
  alternativePrograms: string[];
  applicationTimeline: number;
  approvalTimeline: number;
  fundingTimeline: number;
  closingTimeline: number;
  occupancyTimeline: number;
  forgivenessTimeline: number;
  recaptureTimeline: number;
  taxImplications: {
    taxableAmount: number;
    taxCreditAmount: number;
    recaptureAmount: number;
    netTaxBenefit: number;
  };
  repaymentSchedule: Array<{
    year: number;
    payment: number;
    balance: number;
    forgiven: number;
    taxable: number;
  }>;
  cashFlowProjection: Array<{
    month: number;
    income: number;
    expenses: number;
    assistance: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }>;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface DownPaymentAssistanceAnalysis {
  assistanceGrade: string;
  eligibilityStatus: string;
  recommendations: string;
  programComparison: string;
  affordabilityAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface DownPaymentAssistanceOutputs extends DownPaymentAssistanceMetrics {
  analysis: DownPaymentAssistanceAnalysis;
}
