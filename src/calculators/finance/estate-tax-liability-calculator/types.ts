export interface EstateTaxLiabilityInputs {
  // Estate Information
  totalGrossEstate: number;
  probateAssets: number;
  nonProbateAssets: number;
  jointlyOwnedAssets: number;
  lifeInsuranceProceeds: number;
  retirementAccounts: number;
  businessInterests: number;
  realEstateValue: number;
  personalPropertyValue: number;
  investmentAccounts: number;
  cashAndEquivalents: number;

  // Deductions and Credits
  funeralExpenses: number;
  medicalExpenses: number;
  estateTaxesPaid: number;
  administrativeExpenses: number;
  debtsAndLiabilities: number;
  charitableBequests: number;
  maritalDeduction: number;
  annualExclusionGifts: number;
  lifetimeExclusionUsed: number;

  // Tax Information
  federalEstateTaxRate: number;
  stateEstateTaxRate: number;
  hasStateEstateTax: boolean;
  stateName: string;
  usePortability: boolean;
  deceasedSpouseExclusionUsed: number;

  // Beneficiary Information
  survivingSpouse: boolean;
  survivingChildren: number;
  survivingGrandchildren: number;
  charitableOrganizations: number;

  // Advanced Options
  inflationRate: number;
  discountRate: number;
  considerStepUpInBasis: boolean;
  considerCapitalGainsTax: boolean;
  includeGenerationSkipping: boolean;
  generationSkippingTaxRate: number;

  // Planning Options
  useUnifiedCredit: boolean;
  useQTIPTrust: boolean;
  useCreditShelterTrust: boolean;
  useLifeInsuranceTrust: boolean;
  considerGiftingStrategy: boolean;
  annualGiftingAmount: number;

  // Risk Analysis
  marketVolatility: number;
  legislativeRisk: number;
  familyRisk: number;
  valuationRisk: number;

  // Optimization Goals
  optimizeForTaxSavings: boolean;
  optimizeForBeneficiaryProtection: boolean;
  optimizeForAssetProtection: boolean;
  minimizeAdministrativeBurden: boolean;
  maximizeWealthTransfer: boolean;
}

export interface EstateTaxLiabilityResults {
  // Estate Summary
  grossEstateValue: number;
  netEstateValue: number;
  taxableEstateValue: number;
  estateTaxExemption: number;
  remainingExemption: number;
  unifiedCreditUsed: number;
  unifiedCreditRemaining: number;

  // Tax Calculations
  federalEstateTax: number;
  stateEstateTax: number;
  generationSkippingTax: number;
  totalEstateTax: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;

  // Deductions Breakdown
  totalDeductions: number;
  maritalDeductionUsed: number;
  charitableDeductionUsed: number;
  administrativeDeductionUsed: number;
  otherDeductionsUsed: number;

  // Credits Applied
  unifiedCreditApplied: number;
  stateDeathTaxCredit: number;
  foreignDeathTaxCredit: number;
  totalCreditsApplied: number;

  // Beneficiary Analysis
  beneficiaryShareValue: number;
  afterTaxBeneficiaryShare: number;
  survivingSpouseShare: number;
  childrenShare: number;
  grandchildrenShare: number;
  charitableShare: number;

  // Planning Analysis
  taxSavingsFromPlanning: number;
  additionalExemptionAvailable: number;
  portabilityBenefit: number;
  giftingStrategyBenefit: number;
  trustPlanningBenefit: number;

  // Comparative Scenarios
  vsNoPlanning: {
    taxLiability: number;
    difference: number;
    savingsPercentage: number;
  };

  vsBasicPlanning: {
    taxLiability: number;
    difference: number;
    savingsPercentage: number;
  };

  vsAdvancedPlanning: {
    taxLiability: number;
    difference: number;
    savingsPercentage: number;
  };

  // Risk Assessment
  taxLiabilityVolatility: number;
  legislativeRiskImpact: number;
  familyRiskImpact: number;
  valuationRiskImpact: number;
  overallRiskScore: number;

  // Optimization Recommendations
  recommendedEstatePlan: string;
  optimalTrustStructure: string;
  giftingStrategy: string;
  insuranceStrategy: string;
  assetAllocationStrategy: string;

  // Planning Scores
  estateTaxEfficiencyScore: number;
  beneficiaryProtectionScore: number;
  assetProtectionScore: number;
  administrativeEfficiencyScore: number;
  overallPlanningScore: number;

  // Compliance and Administration
  requiredFilings: string[];
  taxReportingRequirements: string[];
  fiduciaryResponsibilities: string[];
  complianceChecklist: string[];

  // Projections
  fiveYearProjection: Array<{
    year: number;
    estateValue: number;
    taxLiability: number;
    netToBeneficiaries: number;
    inflationAdjustedValue: number;
  }>;

  tenYearProjection: Array<{
    year: number;
    estateValue: number;
    taxLiability: number;
    netToBeneficiaries: number;
    legislativeChangeImpact: number;
  }>;

  // Advanced Analytics
  estateTaxLeverageRatio: number;
  exemptionUtilizationRate: number;
  taxEfficiencyRatio: number;
  intergenerationalWealthTransferRatio: number;
  estatePlanningEffectivenessIndex: number;

  // Cost Analysis
  planningCosts: number;
  implementationCosts: number;
  ongoingCosts: number;
  totalCosts: number;
  benefitCostRatio: number;
  netBenefit: number;

  // Wealth Transfer Efficiency
  wealthTransferEfficiency: number;
  taxBurdenRatio: number;
  beneficiaryNetBenefit: number;
  charitableImpact: number;

  // Scenario Analysis
  bestCaseScenario: {
    taxLiability: number;
    netTransfer: number;
    probability: number;
  };

  worstCaseScenario: {
    taxLiability: number;
    netTransfer: number;
    probability: number;
  };

  mostLikelyScenario: {
    taxLiability: number;
    netTransfer: number;
    probability: number;
  };

  // Action Items
  immediateActions: string[];
  shortTermActions: string[];
  longTermActions: string[];
  monitoringRequirements: string[];
}