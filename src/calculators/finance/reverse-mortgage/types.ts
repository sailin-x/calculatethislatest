export interface ReverseMortgageInputs {
  propertyValue: number;
  borrowerAge: number;
  youngestBorrowerAge: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured';
  propertyLocation: string;
  currentMortgageBalance: number;
  currentMonthlyPayment: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  hoaFees: number;
  maintenanceCosts: number;
  monthlyUtilities: number;
  otherMonthlyExpenses: number;
  loanType: 'hecm' | 'proprietary' | 'single-purpose';
  paymentOption: 'tenure' | 'term' | 'line-of-credit' | 'modified-tenure' | 'modified-term';
  termYears: number;
  interestRate: number;
  margin: number;
  expectedInterestRate: number;
  closingCosts: number;
  mortgageInsurancePremium: number;
  servicingFee: number;
  originationFee: number;
  appraisalFee: number;
  titleInsurance: number;
  recordingFees: number;
  otherFees: number;
  creditScore: number;
  debtToIncomeRatio: number;
  loanToValueRatio: number;
  occupancyType: 'primary-residence' | 'secondary-residence' | 'investment';
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor';
  propertyAge: number;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  lotSize: number;
  zoning: string;
  floodZone: boolean;
  environmentalHazards: boolean;
  titleIssues: boolean;
  liens: boolean;
  easements: boolean;
  encroachments: boolean;
  boundaryDisputes: boolean;
  buildingCodeViolations: boolean;
  taxDelinquencies: boolean;
  probateIssues: boolean;
}

export interface ReverseMortgageMetrics {
  maximumClaimAmount: number;
  principalLimit: number;
  availableFunds: number;
  monthlyPayment: number;
  lineOfCredit: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;
  effectiveInterestRate: number;
  loanBalance: number;
  equityRemaining: number;
  equityUtilization: number;
  breakEvenMonths: number;
  totalFees: number;
  upfrontCosts: number;
  monthlyServicingFee: number;
  totalServicingFees: number;
  mortgageInsuranceCost: number;
  interestAccrual: number;
  loanGrowthRate: number;
  projectedBalance: number;
  projectedEquity: number;
  repaymentObligation: number;
  nonRecourseProtection: boolean;
  fhaInsurance: boolean;
  paymentGuarantee: boolean;
  interestRateCap: number;
  negativeAmortization: boolean;
  mandatoryObligations: number;
  residualFunds: number;
  netPrincipalLimit: number;
  availableCash: number;
  monthlyDisbursement: number;
  annualDisbursement: number;
  totalDisbursement: number;
  remainingEquity: number;
  equityPreservation: number;
  loanEfficiency: number;
  costBenefitRatio: number;
  roi: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  paybackPeriod: number;
  breakEvenAge: number;
  lifeExpectancy: number;
  projectedLife: number;
  loanMaturity: number;
  repaymentTrigger: string;
  estateImpact: number;
  inheritanceReduction: number;
  taxImplications: string;
  benefitAnalysis: string;
  riskAssessment: string;
  suitabilityScore: number;
  recommendation: string;
  alternatives: string;
  marketComparison: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface ReverseMortgageAnalysis {
  suitabilityGrade: string;
  riskAssessment: string;
  recommendations: string;
  marketComparison: string;
  benefitAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface ReverseMortgageOutputs extends ReverseMortgageMetrics {
  analysis: ReverseMortgageAnalysis;
}
