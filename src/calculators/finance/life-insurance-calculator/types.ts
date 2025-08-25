/**
 * Life Insurance Calculator Types
 * Comprehensive life insurance calculations including term, whole, universal, and variable life insurance
 */

export interface LifeInsuranceCalculatorInputs {
  // Personal Information
  age: number;
  gender: 'male' | 'female';
  healthStatus: 'excellent' | 'very-good' | 'good' | 'fair' | 'poor';
  smokingStatus: 'non-smoker' | 'smoker' | 'former-smoker';
  height: number; // in inches
  weight: number; // in pounds
  
  // Insurance Details
  insuranceType: 'term' | 'whole' | 'universal' | 'variable' | 'indexed';
  coverageAmount: number;
  policyTerm: number; // for term insurance
  premiumPaymentFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  
  // Financial Information
  annualIncome: number;
  currentSavings: number;
  outstandingDebts: number;
  funeralExpenses: number;
  childrenEducationCosts: number;
  mortgageBalance: number;
  
  // Policy Features
  includeRiders: boolean;
  accidentalDeathBenefit: boolean;
  disabilityWaiver: boolean;
  criticalIllnessRider: boolean;
  longTermCareRider: boolean;
  
  // Advanced Options
  includeInflation: boolean;
  inflationRate: number;
  includeTaxes: boolean;
  taxRate: number;
  
  // Investment Options (for variable/universal)
  expectedReturn: number;
  volatility: number;
  cashValueGrowth: number;
  
  // Underwriting Factors
  familyHistory: 'excellent' | 'good' | 'fair' | 'poor';
  occupation: 'low-risk' | 'medium-risk' | 'high-risk';
  hobbies: 'low-risk' | 'medium-risk' | 'high-risk';
  travelFrequency: 'low' | 'medium' | 'high';
  
  // Monte Carlo Parameters
  monteCarloSamples: number;
  confidenceLevel: number;
}

export interface LifeInsuranceCalculatorResults {
  // Basic Calculations
  basicCalculation: {
    monthlyPremium: number;
    annualPremium: number;
    totalPremiums: number;
    deathBenefit: number;
    netDeathBenefit: number;
    costPerThousand: number;
  };
  
  // Policy Analysis
  policyAnalysis: {
    policyType: string;
    coveragePeriod: number;
    premiumGuarantee: boolean;
    cashValueProjection: number;
    surrenderValue: number;
    loanValue: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    totalCost: number;
    averageAnnualCost: number;
    costPerYear: number;
    costPerMonth: number;
    costPerDay: number;
    breakevenPeriod: number;
  };
  
  // Cash Value Analysis (for permanent policies)
  cashValueAnalysis?: {
    year1Value: number;
    year5Value: number;
    year10Value: number;
    year20Value: number;
    year30Value: number;
    projectedCashValue: number;
    surrenderCharges: number;
    netCashValue: number;
  };
  
  // Death Benefit Analysis
  deathBenefitAnalysis: {
    immediateDeathBenefit: number;
    deathBenefitAt65: number;
    deathBenefitAt75: number;
    deathBenefitAt85: number;
    inflationAdjustedBenefit: number;
    realValue: number;
  };
  
  // Needs Analysis
  needsAnalysis: {
    incomeReplacement: number;
    debtPayoff: number;
    educationFunding: number;
    funeralExpenses: number;
    emergencyFund: number;
    totalNeeds: number;
    coverageGap: number;
    excessCoverage: number;
  };
  
  // Tax Analysis
  taxAnalysis?: {
    premiumTaxDeductibility: number;
    deathBenefitTaxFree: boolean;
    cashValueTaxDeferred: boolean;
    surrenderTaxLiability: number;
    loanTaxImplications: number;
  };
  
  // Inflation Analysis
  inflationAnalysis?: {
    inflationAdjustedPremium: number;
    inflationAdjustedDeathBenefit: number;
    purchasingPowerLoss: number;
    realCost: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    probabilityOfDeath: number;
    expectedValue: number;
    riskPremium: number;
    insuranceEfficiency: number;
    coverageAdequacy: number;
  };
  
  // Comparison Analysis
  comparison: {
    vsTermInsurance: number;
    vsWholeInsurance: number;
    vsUniversalInsurance: number;
    vsSelfInsurance: number;
    vsInvestment: number;
  };
  
  // Rider Analysis
  riderAnalysis?: {
    accidentalDeathCost: number;
    disabilityWaiverCost: number;
    criticalIllnessCost: number;
    longTermCareCost: number;
    totalRiderCost: number;
    riderValue: number;
  };
  
  // Summary
  summary: {
    recommendedCoverage: number;
    recommendedPolicyType: string;
    monthlyCost: number;
    annualCost: number;
    totalLifetimeCost: number;
    keyRecommendations: string[];
  };
  
  // Monte Carlo Results
  monteCarloResults?: {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  };
}
