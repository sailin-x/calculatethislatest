export interface TaxInputs {
  grossIncome: number;
  filingStatus: 'single' | 'married-filing-jointly' | 'married-filing-separately' | 'head-of-household' | 'qualifying-widow';
  dependents: number;
  age: number;
  blind: boolean;
  spouseBlind: boolean;
  stateOfResidence: string;
  localJurisdiction: string;
  w2Income: number;
  selfEmploymentIncome: number;
  businessIncome: number;
  rentalIncome: number;
  investmentIncome: number;
  capitalGains: number;
  qualifiedDividends: number;
  nonQualifiedDividends: number;
  interestIncome: number;
  socialSecurityBenefits: number;
  pensionIncome: number;
  annuityIncome: number;
  alimonyReceived: number;
  alimonyPaid: number;
  childSupportReceived: number;
  childSupportPaid: number;
  unemploymentCompensation: number;
  otherIncome: number;
  totalIncome: number;
  adjustments: {
    educatorExpenses: number;
    businessExpenses: number;
    healthSavingsAccount: number;
    movingExpenses: number;
    selfEmploymentTax: number;
    selfEmploymentRetirement: number;
    selfEmploymentHealthInsurance: number;
    penaltyOnEarlyWithdrawal: number;
    alimonyPaid: number;
    iraDeduction: number;
    studentLoanInterest: number;
    tuitionAndFees: number;
    domesticProductionActivities: number;
  };
  adjustedGrossIncome: number;
  standardDeduction: number;
  itemizedDeductions: {
    stateAndLocalTaxes: number;
    realEstateTaxes: number;
    personalPropertyTaxes: number;
    mortgageInterest: number;
    points: number;
    investmentInterest: number;
    charitableContributions: number;
    medicalExpenses: number;
    casualtyLosses: number;
    gamblingLosses: number;
    jobExpenses: number;
    taxPreparationFees: number;
    otherMiscellaneous: number;
  };
  totalItemizedDeductions: number;
  deductionUsed: number;
  qualifiedBusinessIncome: number;
  qualifiedBusinessIncomeDeduction: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  localTax: number;
  alternativeMinimumTax: number;
  netInvestmentIncomeTax: number;
  additionalMedicareTax: number;
  totalTax: number;
  withholding: {
    federal: number;
    state: number;
    local: number;
    socialSecurity: number;
    medicare: number;
  };
  estimatedTaxPayments: number;
  credits: {
    childTaxCredit: number;
    childAndDependentCareCredit: number;
    earnedIncomeCredit: number;
    americanOpportunityCredit: number;
    lifetimeLearningCredit: number;
    saverCredit: number;
    foreignTaxCredit: number;
    residentialEnergyCredit: number;
    electricVehicleCredit: number;
    adoptionCredit: number;
    otherCredits: number;
  };
  totalCredits: number;
  refund: number;
  amountOwed: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  averageTaxRate: number;
  taxBracket: {
    federal: string;
    state: string;
    local: string;
  };
  taxYear: number;
  alternativeScenarios: Array<{
    scenario: string;
    taxableIncome: number;
    totalTax: number;
    effectiveTaxRate: number;
    savings: number;
  }>;
}

export interface TaxMetrics {
  grossIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  localTax: number;
  alternativeMinimumTax: number;
  netInvestmentIncomeTax: number;
  additionalMedicareTax: number;
  totalTax: number;
  withholding: {
    federal: number;
    state: number;
    local: number;
    socialSecurity: number;
    medicare: number;
  };
  estimatedTaxPayments: number;
  totalCredits: number;
  refund: number;
  amountOwed: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  averageTaxRate: number;
  taxBracket: {
    federal: string;
    state: string;
    local: string;
  };
  taxSavings: number;
  taxEfficiency: number;
  taxOptimization: number;
  alternativeMinimumTaxExemption: number;
  netInvestmentIncomeTaxThreshold: number;
  additionalMedicareTaxThreshold: number;
  qualifiedBusinessIncomeDeduction: number;
  standardDeduction: number;
  itemizedDeductions: number;
  deductionUsed: number;
  personalExemption: number;
  dependentExemption: number;
  totalExemptions: number;
  taxCredits: {
    childTaxCredit: number;
    childAndDependentCareCredit: number;
    earnedIncomeCredit: number;
    americanOpportunityCredit: number;
    lifetimeLearningCredit: number;
    saverCredit: number;
    foreignTaxCredit: number;
    residentialEnergyCredit: number;
    electricVehicleCredit: number;
    adoptionCredit: number;
    otherCredits: number;
  };
  totalCredits: number;
  refund: number;
  amountOwed: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  averageTaxRate: number;
  taxBracket: {
    federal: string;
    state: string;
    local: string;
  };
  taxYear: number;
  alternativeScenarios: Array<{
    scenario: string;
    taxableIncome: number;
    totalTax: number;
    effectiveTaxRate: number;
    savings: number;
  }>;
  taxPlanningOpportunities: Array<{
    opportunity: string;
    potentialSavings: number;
    implementation: string;
    risk: string;
  }>;
  taxProjection: Array<{
    year: number;
    income: number;
    tax: number;
    effectiveRate: number;
    marginalRate: number;
  }>;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface TaxAnalysis {
  taxEfficiency: string;
  optimizationOpportunities: string;
  recommendations: string;
  planningStrategies: string;
  riskAssessment: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface TaxOutputs extends TaxMetrics {
  analysis: TaxAnalysis;
}
