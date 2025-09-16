import { EstateTaxLiabilityInputs, EstateTaxLiabilityResults } from './types';

/**
 * Calculate comprehensive Estate Tax Liability with planning analysis
 */
export function calculateEstateTaxLiability(inputs: EstateTaxLiabilityInputs): EstateTaxLiabilityResults {
  const {
    totalGrossEstate,
    probateAssets,
    nonProbateAssets,
    jointlyOwnedAssets,
    lifeInsuranceProceeds,
    retirementAccounts,
    businessInterests,
    realEstateValue,
    personalPropertyValue,
    investmentAccounts,
    cashAndEquivalents,
    funeralExpenses,
    medicalExpenses,
    estateTaxesPaid,
    administrativeExpenses,
    debtsAndLiabilities,
    charitableBequests,
    maritalDeduction,
    annualExclusionGifts,
    lifetimeExclusionUsed,
    federalEstateTaxRate,
    stateEstateTaxRate,
    hasStateEstateTax,
    stateName,
    usePortability,
    deceasedSpouseExclusionUsed,
    survivingSpouse,
    survivingChildren,
    survivingGrandchildren,
    charitableOrganizations,
    inflationRate,
    discountRate,
    considerStepUpInBasis,
    considerCapitalGainsTax,
    includeGenerationSkipping,
    generationSkippingTaxRate,
    useUnifiedCredit,
    useQTIPTrust,
    useCreditShelterTrust,
    useLifeInsuranceTrust,
    considerGiftingStrategy,
    annualGiftingAmount,
    marketVolatility,
    legislativeRisk,
    familyRisk,
    valuationRisk,
    optimizeForTaxSavings,
    optimizeForBeneficiaryProtection,
    optimizeForAssetProtection,
    minimizeAdministrativeBurden,
    maximizeWealthTransfer
  } = inputs;

  // Calculate estate summary
  const estateSummary = calculateEstateSummary(inputs);
  const { grossEstateValue, netEstateValue, taxableEstateValue, estateTaxExemption, remainingExemption, unifiedCreditUsed, unifiedCreditRemaining } = estateSummary;

  // Calculate tax calculations
  const taxCalculations = calculateTaxCalculations(inputs, taxableEstateValue);
  const { federalEstateTax, stateEstateTax, generationSkippingTax, totalEstateTax, effectiveTaxRate, marginalTaxRate } = taxCalculations;

  // Calculate deductions breakdown
  const deductionsBreakdown = calculateDeductionsBreakdown(inputs);
  const { totalDeductions, maritalDeductionUsed, charitableDeductionUsed, administrativeDeductionUsed, otherDeductionsUsed } = deductionsBreakdown;

  // Calculate credits applied
  const creditsApplied = calculateCreditsApplied(inputs, federalEstateTax);
  const { unifiedCreditApplied, stateDeathTaxCredit, foreignDeathTaxCredit, totalCreditsApplied } = creditsApplied;

  // Calculate beneficiary analysis
  const beneficiaryAnalysis = calculateBeneficiaryAnalysis(inputs, netEstateValue, totalEstateTax);
  const { beneficiaryShareValue, afterTaxBeneficiaryShare, survivingSpouseShare, childrenShare, grandchildrenShare, charitableShare } = beneficiaryAnalysis;

  // Calculate planning analysis
  const planningAnalysis = calculatePlanningAnalysis(inputs, totalEstateTax);
  const { taxSavingsFromPlanning, additionalExemptionAvailable, portabilityBenefit, giftingStrategyBenefit, trustPlanningBenefit } = planningAnalysis;

  // Calculate comparative scenarios
  const vsNoPlanning = calculateVsNoPlanning(inputs, totalGrossEstate);
  const vsBasicPlanning = calculateVsBasicPlanning(inputs, totalGrossEstate);
  const vsAdvancedPlanning = calculateVsAdvancedPlanning(inputs, totalGrossEstate);

  // Calculate risk assessment
  const riskAssessment = calculateRiskAssessment(inputs);
  const { taxLiabilityVolatility, legislativeRiskImpact, familyRiskImpact, valuationRiskImpact, overallRiskScore } = riskAssessment;

  // Generate optimization recommendations
  const recommendedEstatePlan = generateRecommendedEstatePlan(inputs);
  const optimalTrustStructure = generateOptimalTrustStructure(inputs);
  const giftingStrategy = generateGiftingStrategy(inputs);
  const insuranceStrategy = generateInsuranceStrategy(inputs);
  const assetAllocationStrategy = generateAssetAllocationStrategy(inputs);

  // Calculate planning scores
  const estateTaxEfficiencyScore = calculateEstateTaxEfficiencyScore(inputs, effectiveTaxRate);
  const beneficiaryProtectionScore = calculateBeneficiaryProtectionScore(inputs);
  const assetProtectionScore = calculateAssetProtectionScore(inputs);
  const administrativeEfficiencyScore = calculateAdministrativeEfficiencyScore(inputs);
  const overallPlanningScore = calculateOverallPlanningScore(inputs);

  // Generate compliance and administration
  const requiredFilings = generateRequiredFilings(inputs);
  const taxReportingRequirements = generateTaxReportingRequirements(inputs);
  const fiduciaryResponsibilities = generateFiduciaryResponsibilities(inputs);
  const complianceChecklist = generateComplianceChecklist(inputs);

  // Generate projections
  const fiveYearProjection = generateFiveYearProjection(inputs);
  const tenYearProjection = generateTenYearProjection(inputs);

  // Calculate advanced analytics
  const estateTaxLeverageRatio = calculateEstateTaxLeverageRatio(inputs, totalEstateTax);
  const exemptionUtilizationRate = calculateExemptionUtilizationRate(inputs, taxableEstateValue);
  const taxEfficiencyRatio = calculateTaxEfficiencyRatio(inputs, totalEstateTax);
  const intergenerationalWealthTransferRatio = calculateIntergenerationalWealthTransferRatio(inputs);
  const estatePlanningEffectivenessIndex = calculateEstatePlanningEffectivenessIndex(inputs);

  // Calculate cost analysis
  const costAnalysis = calculateCostAnalysis(inputs);
  const { planningCosts, implementationCosts, ongoingCosts, totalCosts, benefitCostRatio, netBenefit } = costAnalysis;

  // Calculate wealth transfer efficiency
  const wealthTransferEfficiency = calculateWealthTransferEfficiency(inputs, totalEstateTax);
  const taxBurdenRatio = calculateTaxBurdenRatio(inputs, totalEstateTax);
  const beneficiaryNetBenefit = calculateBeneficiaryNetBenefit(inputs, totalEstateTax);
  const charitableImpact = calculateCharitableImpact(inputs);

  // Calculate scenario analysis
  const bestCaseScenario = calculateBestCaseScenario(inputs);
  const worstCaseScenario = calculateWorstCaseScenario(inputs);
  const mostLikelyScenario = calculateMostLikelyScenario(inputs);

  // Generate action items
  const immediateActions = generateImmediateActions(inputs);
  const shortTermActions = generateShortTermActions(inputs);
  const longTermActions = generateLongTermActions(inputs);
  const monitoringRequirements = generateMonitoringRequirements(inputs);

  return {
    grossEstateValue,
    netEstateValue,
    taxableEstateValue,
    estateTaxExemption,
    remainingExemption,
    unifiedCreditUsed,
    unifiedCreditRemaining,
    federalEstateTax,
    stateEstateTax,
    generationSkippingTax,
    totalEstateTax,
    effectiveTaxRate,
    marginalTaxRate,
    totalDeductions,
    maritalDeductionUsed,
    charitableDeductionUsed,
    administrativeDeductionUsed,
    otherDeductionsUsed,
    unifiedCreditApplied,
    stateDeathTaxCredit,
    foreignDeathTaxCredit,
    totalCreditsApplied,
    beneficiaryShareValue,
    afterTaxBeneficiaryShare,
    survivingSpouseShare,
    childrenShare,
    grandchildrenShare,
    charitableShare,
    taxSavingsFromPlanning,
    additionalExemptionAvailable,
    portabilityBenefit,
    giftingStrategyBenefit,
    trustPlanningBenefit,
    vsNoPlanning,
    vsBasicPlanning,
    vsAdvancedPlanning,
    taxLiabilityVolatility,
    legislativeRiskImpact,
    familyRiskImpact,
    valuationRiskImpact,
    overallRiskScore,
    recommendedEstatePlan,
    optimalTrustStructure,
    giftingStrategy,
    insuranceStrategy,
    assetAllocationStrategy,
    estateTaxEfficiencyScore,
    beneficiaryProtectionScore,
    assetProtectionScore,
    administrativeEfficiencyScore,
    overallPlanningScore,
    requiredFilings,
    taxReportingRequirements,
    fiduciaryResponsibilities,
    complianceChecklist,
    fiveYearProjection,
    tenYearProjection,
    estateTaxLeverageRatio,
    exemptionUtilizationRate,
    taxEfficiencyRatio,
    intergenerationalWealthTransferRatio,
    estatePlanningEffectivenessIndex,
    planningCosts,
    implementationCosts,
    ongoingCosts,
    totalCosts,
    benefitCostRatio,
    netBenefit,
    wealthTransferEfficiency,
    taxBurdenRatio,
    beneficiaryNetBenefit,
    charitableImpact,
    bestCaseScenario,
    worstCaseScenario,
    mostLikelyScenario,
    immediateActions,
    shortTermActions,
    longTermActions,
    monitoringRequirements
  };
}

/**
 * Calculate estate summary
 */
function calculateEstateSummary(inputs: EstateTaxLiabilityInputs): {
  grossEstateValue: number;
  netEstateValue: number;
  taxableEstateValue: number;
  estateTaxExemption: number;
  remainingExemption: number;
  unifiedCreditUsed: number;
  unifiedCreditRemaining: number;
} {
  const {
    totalGrossEstate,
    funeralExpenses,
    medicalExpenses,
    estateTaxesPaid,
    administrativeExpenses,
    debtsAndLiabilities,
    charitableBequests,
    maritalDeduction,
    lifetimeExclusionUsed
  } = inputs;

  // Calculate gross estate value
  const grossEstateValue = totalGrossEstate;

  // Calculate deductions
  const totalDeductions = funeralExpenses + medicalExpenses + estateTaxesPaid +
                         administrativeExpenses + debtsAndLiabilities +
                         charitableBequests + maritalDeduction;

  // Calculate net estate value
  const netEstateValue = grossEstateValue - totalDeductions;

  // Calculate taxable estate value
  const taxableEstateValue = Math.max(0, netEstateValue - lifetimeExclusionUsed);

  // Estate tax exemption (2024 amount)
  const estateTaxExemption = 13800000; // $13.8 million for 2024
  const remainingExemption = Math.max(0, estateTaxExemption - taxableEstateValue);

  // Unified credit calculation (simplified)
  const unifiedCreditUsed = taxableEstateValue > 0 ? Math.min(taxableEstateValue * 0.4, 600000) : 0; // Approximate unified credit
  const unifiedCreditRemaining = Math.max(0, 600000 - unifiedCreditUsed);

  return {
    grossEstateValue,
    netEstateValue,
    taxableEstateValue,
    estateTaxExemption,
    remainingExemption,
    unifiedCreditUsed,
    unifiedCreditRemaining
  };
}

/**
 * Calculate tax calculations
 */
function calculateTaxCalculations(inputs: EstateTaxLiabilityInputs, taxableEstateValue: number): {
  federalEstateTax: number;
  stateEstateTax: number;
  generationSkippingTax: number;
  totalEstateTax: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
} {
  const {
    federalEstateTaxRate,
    stateEstateTaxRate,
    hasStateEstateTax,
    includeGenerationSkipping,
    generationSkippingTaxRate
  } = inputs;

  // Federal estate tax
  const federalTaxableAmount = Math.max(0, taxableEstateValue);
  const federalEstateTax = federalTaxableAmount * (federalEstateTaxRate / 100);

  // State estate tax
  const stateEstateTax = hasStateEstateTax ? federalTaxableAmount * (stateEstateTaxRate / 100) : 0;

  // Generation skipping tax
  const generationSkippingTax = includeGenerationSkipping ? federalTaxableAmount * (generationSkippingTaxRate / 100) : 0;

  // Total estate tax
  const totalEstateTax = federalEstateTax + stateEstateTax + generationSkippingTax;

  // Effective tax rate
  const effectiveTaxRate = taxableEstateValue > 0 ? (totalEstateTax / taxableEstateValue) * 100 : 0;

  // Marginal tax rate (simplified)
  const marginalTaxRate = federalEstateTaxRate + (hasStateEstateTax ? stateEstateTaxRate : 0);

  return {
    federalEstateTax,
    stateEstateTax,
    generationSkippingTax,
    totalEstateTax,
    effectiveTaxRate,
    marginalTaxRate
  };
}

/**
 * Calculate deductions breakdown
 */
function calculateDeductionsBreakdown(inputs: EstateTaxLiabilityInputs): {
  totalDeductions: number;
  maritalDeductionUsed: number;
  charitableDeductionUsed: number;
  administrativeDeductionUsed: number;
  otherDeductionsUsed: number;
} {
  const {
    funeralExpenses,
    medicalExpenses,
    estateTaxesPaid,
    administrativeExpenses,
    debtsAndLiabilities,
    charitableBequests,
    maritalDeduction
  } = inputs;

  const totalDeductions = funeralExpenses + medicalExpenses + estateTaxesPaid +
                         administrativeExpenses + debtsAndLiabilities +
                         charitableBequests + maritalDeduction;

  return {
    totalDeductions,
    maritalDeductionUsed: maritalDeduction,
    charitableDeductionUsed: charitableBequests,
    administrativeDeductionUsed: administrativeExpenses,
    otherDeductionsUsed: funeralExpenses + medicalExpenses + estateTaxesPaid + debtsAndLiabilities
  };
}

/**
 * Calculate credits applied
 */
function calculateCreditsApplied(inputs: EstateTaxLiabilityInputs, federalEstateTax: number): {
  unifiedCreditApplied: number;
  stateDeathTaxCredit: number;
  foreignDeathTaxCredit: number;
  totalCreditsApplied: number;
} {
  const { useUnifiedCredit, hasStateEstateTax } = inputs;

  // Unified credit (simplified)
  const unifiedCreditApplied = useUnifiedCredit ? Math.min(federalEstateTax * 0.4, 600000) : 0;

  // State death tax credit (simplified)
  const stateDeathTaxCredit = hasStateEstateTax ? federalEstateTax * 0.05 : 0;

  // Foreign death tax credit (simplified)
  const foreignDeathTaxCredit = 0; // Assume no foreign tax for simplicity

  const totalCreditsApplied = unifiedCreditApplied + stateDeathTaxCredit + foreignDeathTaxCredit;

  return {
    unifiedCreditApplied,
    stateDeathTaxCredit,
    foreignDeathTaxCredit,
    totalCreditsApplied
  };
}

/**
 * Calculate beneficiary analysis
 */
function calculateBeneficiaryAnalysis(
  inputs: EstateTaxLiabilityInputs,
  netEstateValue: number,
  totalEstateTax: number
): {
  beneficiaryShareValue: number;
  afterTaxBeneficiaryShare: number;
  survivingSpouseShare: number;
  childrenShare: number;
  grandchildrenShare: number;
  charitableShare: number;
} {
  const { survivingSpouse, survivingChildren, survivingGrandchildren, charitableOrganizations, charitableBequests } = inputs;

  const totalBeneficiaries = (survivingSpouse ? 1 : 0) + survivingChildren + survivingGrandchildren + charitableOrganizations;
  const beneficiaryShareValue = totalBeneficiaries > 0 ? netEstateValue / totalBeneficiaries : 0;
  const afterTaxBeneficiaryShare = totalBeneficiaries > 0 ? (netEstateValue - totalEstateTax) / totalBeneficiaries : 0;

  // Individual shares
  const survivingSpouseShare = survivingSpouse ? beneficiaryShareValue : 0;
  const childrenShare = survivingChildren > 0 ? beneficiaryShareValue * survivingChildren : 0;
  const grandchildrenShare = survivingGrandchildren > 0 ? beneficiaryShareValue * survivingGrandchildren : 0;
  const charitableShare = charitableBequests;

  return {
    beneficiaryShareValue,
    afterTaxBeneficiaryShare,
    survivingSpouseShare,
    childrenShare,
    grandchildrenShare,
    charitableShare
  };
}

/**
 * Calculate planning analysis
 */
function calculatePlanningAnalysis(inputs: EstateTaxLiabilityInputs, totalEstateTax: number): {
  taxSavingsFromPlanning: number;
  additionalExemptionAvailable: number;
  portabilityBenefit: number;
  giftingStrategyBenefit: number;
  trustPlanningBenefit: number;
} {
  const { usePortability, useAnnualExclusions, useLifetimeExclusions, annualGiftingAmount, useQTIPTrust, useCreditShelterTrust } = inputs;

  // Estimate tax savings from planning
  const taxSavingsFromPlanning = totalEstateTax * 0.25; // Assume 25% reduction through planning

  // Additional exemption available
  const additionalExemptionAvailable = usePortability ? 13800000 : 0; // Portability allows deceased spouse's unused exemption

  // Portability benefit
  const portabilityBenefit = usePortability ? totalEstateTax * 0.1 : 0;

  // Gifting strategy benefit
  const giftingStrategyBenefit = useAnnualExclusions ? annualGiftingAmount * 0.4 : 0; // Assume 40% effective tax rate on gifted amounts

  // Trust planning benefit
  const trustPlanningBenefit = (useQTIPTrust || useCreditShelterTrust) ? totalEstateTax * 0.15 : 0;

  return {
    taxSavingsFromPlanning,
    additionalExemptionAvailable,
    portabilityBenefit,
    giftingStrategyBenefit,
    trustPlanningBenefit
  };
}

/**
 * Calculate comparison to no planning
 */
function calculateVsNoPlanning(inputs: EstateTaxLiabilityInputs, totalEstateValue: number): {
  taxLiability: number;
  difference: number;
  savingsPercentage: number;
} {
  const { federalEstateTaxRate, stateEstateTaxRate, hasStateEstateTax, lifetimeExclusionUsed } = inputs;

  // Estate tax exemption (2024 amount)
  const estateTaxExemption = 13800000;
  const taxableAmount = Math.max(0, totalEstateValue - estateTaxExemption);
  const taxLiability = taxableAmount * (federalEstateTaxRate / 100) +
                      (hasStateEstateTax ? taxableAmount * (stateEstateTaxRate / 100) : 0);

  const difference = 0; // This is the baseline
  const savingsPercentage = 0; // This is the baseline

  return { taxLiability, difference, savingsPercentage };
}

/**
 * Calculate comparison to basic planning
 */
function calculateVsBasicPlanning(inputs: EstateTaxLiabilityInputs, totalEstateValue: number): {
  taxLiability: number;
  difference: number;
  savingsPercentage: number;
} {
  const noPlanning = calculateVsNoPlanning(inputs, totalEstateValue);
  const taxLiability = noPlanning.taxLiability * 0.9; // Assume 10% reduction with basic planning
  const difference = noPlanning.taxLiability - taxLiability;
  const savingsPercentage = (difference / noPlanning.taxLiability) * 100;

  return { taxLiability, difference, savingsPercentage };
}

/**
 * Calculate comparison to advanced planning
 */
function calculateVsAdvancedPlanning(inputs: EstateTaxLiabilityInputs, totalEstateValue: number): {
  taxLiability: number;
  difference: number;
  savingsPercentage: number;
} {
  const noPlanning = calculateVsNoPlanning(inputs, totalEstateValue);
  const taxLiability = noPlanning.taxLiability * 0.7; // Assume 30% reduction with advanced planning
  const difference = noPlanning.taxLiability - taxLiability;
  const savingsPercentage = (difference / noPlanning.taxLiability) * 100;

  return { taxLiability, difference, savingsPercentage };
}

/**
 * Calculate risk assessment
 */
function calculateRiskAssessment(inputs: EstateTaxLiabilityInputs): {
  taxLiabilityVolatility: number;
  legislativeRiskImpact: number;
  familyRiskImpact: number;
  valuationRiskImpact: number;
  overallRiskScore: number;
} {
  const { marketVolatility, legislativeRisk, familyRisk, valuationRisk } = inputs;

  const taxLiabilityVolatility = marketVolatility * 0.8; // Estate values are correlated with market
  const legislativeRiskImpact = legislativeRisk * 0.6; // Legislative changes affect estate tax rates
  const familyRiskImpact = familyRisk * 0.4; // Family dynamics affect estate distribution
  const valuationRiskImpact = valuationRisk * 0.5; // Valuation disputes can affect tax liability
  const overallRiskScore = (taxLiabilityVolatility + legislativeRiskImpact + familyRiskImpact + valuationRiskImpact) / 4;

  return {
    taxLiabilityVolatility,
    legislativeRiskImpact,
    familyRiskImpact,
    valuationRiskImpact,
    overallRiskScore
  };
}

/**
 * Generate recommended estate plan
 */
function generateRecommendedEstatePlan(inputs: EstateTaxLiabilityInputs): string {
  const { totalGrossEstate, survivingSpouse, survivingChildren, charitableOrganizations } = inputs;

  if (totalGrossEstate > 25000000) {
    return 'Comprehensive estate plan with multiple trusts, annual gifting, and life insurance';
  }

  if (survivingSpouse) {
    return 'Credit shelter trust with portability to maximize exemptions';
  }

  if (survivingChildren > 0) {
    return 'Generation-skipping trusts and 529 plans for education funding';
  }

  if (charitableOrganizations > 0) {
    return 'Charitable remainder trusts and qualified disclaimers';
  }

  return 'Basic revocable living trust with pour-over will';
}

/**
 * Generate optimal trust structure
 */
function generateOptimalTrustStructure(inputs: EstateTaxLiabilityInputs): string {
  const { totalGrossEstate, survivingSpouse, survivingChildren } = inputs;

  if (totalGrossEstate > 20000000) {
    return 'Complex trust structure with multiple tiers and asset protection features';
  }

  if (survivingSpouse && survivingChildren > 0) {
    return 'Qualified terminable interest property (QTIP) trust with credit shelter trust';
  }

  if (survivingChildren > 0) {
    return 'Generation-skipping dynasty trust for long-term wealth transfer';
  }

  return 'Simple revocable living trust with testamentary trusts for beneficiaries';
}

/**
 * Generate gifting strategy
 */
function generateGiftingStrategy(inputs: EstateTaxLiabilityInputs): string {
  const { useAnnualExclusions, useLifetimeExclusions, annualGiftingAmount } = inputs;

  if (useAnnualExclusions && useLifetimeExclusions) {
    return 'Annual exclusion gifts combined with lifetime exemption utilization through trusts';
  }

  if (useAnnualExclusions) {
    return 'Annual exclusion gifts to reduce taxable estate while maintaining control';
  }

  return 'Strategic gifting program with Crummey trusts for irrevocable transfers';
}

/**
 * Generate insurance strategy
 */
function generateInsuranceStrategy(inputs: EstateTaxLiabilityInputs): string {
  const { useLifeInsuranceTrust, totalGrossEstate } = inputs;

  if (useLifeInsuranceTrust && totalGrossEstate > 10000000) {
    return 'Life insurance trust (ILIT) for estate tax liquidity';
  }

  if (useLifeInsuranceTrust) {
    return 'Second-to-die life insurance for survivor protection';
  }

  return 'Consider life insurance as part of comprehensive estate plan for liquidity';
}

/**
 * Generate asset allocation strategy
 */
function generateAssetAllocationStrategy(inputs: EstateTaxLiabilityInputs): string {
  const { totalGrossEstate, marketVolatility } = inputs;

  if (totalGrossEstate > 50000000) {
    return 'Diversified portfolio with 40% stocks, 30% bonds, 20% real estate, 10% alternatives';
  }

  if (marketVolatility > 25) {
    return 'Conservative allocation with 60% bonds, 30% stocks, 10% cash equivalents';
  }

  return 'Balanced portfolio with 50% stocks, 35% bonds, 15% real estate and alternatives';
}

/**
 * Calculate estate tax efficiency score
 */
function calculateEstateTaxEfficiencyScore(inputs: EstateTaxLiabilityInputs, effectiveTaxRate: number): number {
  let score = 100 - effectiveTaxRate; // Lower tax rate = higher score

  if (inputs.usePortability) score += 10;
  if (inputs.useAnnualExclusions) score += 5;
  if (inputs.useLifetimeExclusions) score += 5;
  if (inputs.useQTIPTrust) score += 10;
  if (inputs.useCreditShelterTrust) score += 10;

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate beneficiary protection score
 */
function calculateBeneficiaryProtectionScore(inputs: EstateTaxLiabilityInputs): number {
  const { survivingSpouse, survivingChildren, useQTIPTrust, useCreditShelterTrust } = inputs;

  let score = 50; // Base score

  if (survivingSpouse) score += 20;
  if (survivingChildren > 0) score += 15;
  if (useQTIPTrust) score += 10;
  if (useCreditShelterTrust) score += 10;

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate asset protection score
 */
function calculateAssetProtectionScore(inputs: EstateTaxLiabilityInputs): number {
  const { useLifeInsuranceTrust, considerAssetProtectionTrust, considerIrrevocableTrust } = inputs;

  let score = 50; // Base score

  if (useLifeInsuranceTrust) score += 15;
  if (considerAssetProtectionTrust) score += 20;
  if (considerIrrevocableTrust) score += 15;

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate administrative efficiency score
 */
function calculateAdministrativeEfficiencyScore(inputs: EstateTaxLiabilityInputs): number {
  const { minimizeAdministrativeBurden } = inputs;

  let score = 60; // Base score

  if (minimizeAdministrativeBurden) score += 20;

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate overall planning score
 */
function calculateOverallPlanningScore(inputs: EstateTaxLiabilityInputs): number {
  const { optimizeForTaxSavings, optimizeForBeneficiaryProtection, optimizeForAssetProtection, maximizeWealthTransfer } = inputs;

  let score = 60; // Base score

  if (optimizeForTaxSavings) score += 15;
  if (optimizeForBeneficiaryProtection) score += 15;
  if (optimizeForAssetProtection) score += 10;
  if (maximizeWealthTransfer) score += 10;

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate required filings
 */
function generateRequiredFilings(inputs: EstateTaxLiabilityInputs): string[] {
  const filings: string[] = [
    'Form 706 - United States Estate (and Generation-Skipping Transfer) Tax Return',
    'Form 8971 - Information Regarding Beneficiaries Acquiring Property from a Decedent'
  ];

  if (inputs.hasStateEstateTax) {
    filings.push(`${inputs.stateName} Estate Tax Return`);
  }

  if (inputs.includeGenerationSkipping) {
    filings.push('Form 709 - United States Gift (and Generation-Skipping Transfer) Tax Return');
  }

  if (inputs.considerGiftingStrategy) {
    filings.push('Form 709 - United States Gift (and Generation-Skipping Transfer) Tax Return');
  }

  return filings;
}

/**
 * Generate tax reporting requirements
 */
function generateTaxReportingRequirements(inputs: EstateTaxLiabilityInputs): string[] {
  const requirements: string[] = [
    'File estate tax return within 9 months of death',
    'Report all assets includible in gross estate',
    'Calculate and report deductions and credits',
    'Report distributions to beneficiaries',
    'File annual income tax returns for estate/trust'
  ];

  return requirements;
}

/**
 * Generate fiduciary responsibilities
 */
function generateFiduciaryResponsibilities(inputs: EstateTaxLiabilityInputs): string[] {
  const responsibilities: string[] = [
    'Act in best interests of beneficiaries',
    'Maintain accurate estate records',
    'File required tax returns timely',
    'Distribute assets according to will/trust',
    'Provide accounting to beneficiaries',
    'Invest assets prudently',
    'Keep beneficiaries informed'
  ];

  return responsibilities;
}

/**
 * Generate compliance checklist
 */
function generateComplianceChecklist(inputs: EstateTaxLiabilityInputs): string[] {
  const checklist: string[] = [
    'Complete and sign will',
    'Establish durable power of attorney',
    'Create healthcare proxy and living will',
    'Set up revocable living trust',
    'Fund trust with assets',
    'Review beneficiary designations',
    'Update insurance policies',
    'Organize important documents'
  ];

  return checklist;
}

/**
 * Generate five-year projection
 */
function generateFiveYearProjection(inputs: EstateTaxLiabilityInputs): Array<{
  year: number;
  estateValue: number;
  taxLiability: number;
  netToBeneficiaries: number;
  inflationAdjustedValue: number;
}> {
  const { totalGrossEstate, inflationRate, federalEstateTaxRate } = inputs;

  const projection = [];

  for (let year = 1; year <= 5; year++) {
    const estateValue = totalGrossEstate * Math.pow(1 + inflationRate / 100, year);
    const taxableAmount = Math.max(0, estateValue - 13800000); // 2024 exemption
    const taxLiability = taxableAmount * (federalEstateTaxRate / 100);
    const netToBeneficiaries = estateValue - taxLiability;
    const inflationAdjustedValue = estateValue / Math.pow(1 + inflationRate / 100, year);

    projection.push({
      year,
      estateValue,
      taxLiability,
      netToBeneficiaries,
      inflationAdjustedValue
    });
  }

  return projection;
}

/**
 * Generate ten-year projection
 */
function generateTenYearProjection(inputs: EstateTaxLiabilityInputs): Array<{
  year: number;
  estateValue: number;
  taxLiability: number;
  netToBeneficiaries: number;
  legislativeChangeImpact: number;
}> {
  const { totalGrossEstate, inflationRate, federalEstateTaxRate, legislativeRisk } = inputs;

  const projection = [];

  for (let year = 1; year <= 10; year++) {
    const estateValue = totalGrossEstate * Math.pow(1 + inflationRate / 100, year);
    const taxableAmount = Math.max(0, estateValue - 13800000); // 2024 exemption
    const taxLiability = taxableAmount * (federalEstateTaxRate / 100);
    const netToBeneficiaries = estateValue - taxLiability;
    const legislativeChangeImpact = taxLiability * (legislativeRisk / 100);

    projection.push({
      year,
      estateValue,
      taxLiability,
      netToBeneficiaries,
      legislativeChangeImpact
    });
  }

  return projection;
}

/**
 * Calculate estate tax leverage ratio
 */
function calculateEstateTaxLeverageRatio(inputs: EstateTaxLiabilityInputs, totalEstateTax: number): number {
  const { totalGrossEstate } = inputs;

  return totalGrossEstate > 0 ? totalEstateTax / totalGrossEstate : 0;
}

/**
 * Calculate exemption utilization rate
 */
function calculateExemptionUtilizationRate(inputs: EstateTaxLiabilityInputs, taxableEstateValue: number): number {
  const exemption = 13800000; // 2024 exemption

  return taxableEstateValue > 0 ? Math.min(100, (taxableEstateValue / exemption) * 100) : 0;
}

/**
 * Calculate tax efficiency ratio
 */
function calculateTaxEfficiencyRatio(inputs: EstateTaxLiabilityInputs, totalEstateTax: number): number {
  const { totalGrossEstate } = inputs;

  return totalGrossEstate > 0 ? (totalGrossEstate - totalEstateTax) / totalGrossEstate : 0;
}

/**
 * Calculate intergenerational wealth transfer ratio
 */
function calculateIntergenerationalWealthTransferRatio(inputs: EstateTaxLiabilityInputs): number {
  const { survivingChildren, survivingGrandchildren } = inputs;

  return (survivingChildren + survivingGrandchildren) > 0 ? 1 / (survivingChildren + survivingGrandchildren) : 0;
}

/**
 * Calculate estate planning effectiveness index
 */
function calculateEstatePlanningEffectivenessIndex(inputs: EstateTaxLiabilityInputs): number {
  const { usePortability, useQTIPTrust, useCreditShelterTrust, useLifeInsuranceTrust } = inputs;

  let index = 50; // Base index

  if (usePortability) index += 10;
  if (useQTIPTrust) index += 15;
  if (useCreditShelterTrust) index += 15;
  if (useLifeInsuranceTrust) index += 10;

  return Math.max(0, Math.min(100, index));
}

/**
 * Calculate cost analysis
 */
function calculateCostAnalysis(inputs: EstateTaxLiabilityInputs): {
  planningCosts: number;
  implementationCosts: number;
  ongoingCosts: number;
  totalCosts: number;
  benefitCostRatio: number;
  netBenefit: number;
} {
  const { totalGrossEstate } = inputs;

  const planningCosts = Math.min(50000, totalGrossEstate * 0.001); // 0.1% of estate or $50k max
  const implementationCosts = Math.min(25000, totalGrossEstate * 0.0005); // 0.05% of estate or $25k max
  const ongoingCosts = Math.min(10000, totalGrossEstate * 0.0002); // 0.02% of estate or $10k max
  const totalCosts = planningCosts + implementationCosts + ongoingCosts;
  const benefitCostRatio = totalCosts > 0 ? (totalGrossEstate * 0.3) / totalCosts : 0; // Assume 30% tax savings benefit
  const netBenefit = (totalGrossEstate * 0.3) - totalCosts; // Net benefit from planning

  return {
    planningCosts,
    implementationCosts,
    ongoingCosts,
    totalCosts,
    benefitCostRatio,
    netBenefit
  };
}

/**
 * Calculate wealth transfer efficiency
 */
function calculateWealthTransferEfficiency(inputs: EstateTaxLiabilityInputs, totalEstateTax: number): number {
  const { totalGrossEstate } = inputs;

  return totalGrossEstate > 0 ? (totalGrossEstate - totalEstateTax) / totalGrossEstate : 0;
}

/**
 * Calculate tax burden ratio
 */
function calculateTaxBurdenRatio(inputs: EstateTaxLiabilityInputs, totalEstateTax: number): number {
  const { totalGrossEstate } = inputs;

  return totalGrossEstate > 0 ? totalEstateTax / totalGrossEstate : 0;
}

/**
 * Calculate beneficiary net benefit
 */
function calculateBeneficiaryNetBenefit(inputs: EstateTaxLiabilityInputs, totalEstateTax: number): number {
  const { totalGrossEstate } = inputs;

  const netTransfer = totalGrossEstate - totalEstateTax;
  const totalBeneficiaries = (inputs.survivingSpouse ? 1 : 0) + inputs.survivingChildren + inputs.survivingGrandchildren + inputs.charitableOrganizations;
  return totalBeneficiaries > 0 ? netTransfer / totalBeneficiaries : 0;
}

/**
 * Calculate charitable impact
 */
function calculateCharitableImpact(inputs: EstateTaxLiabilityInputs): number {
  const { charitableBequests, totalGrossEstate } = inputs;

  return totalGrossEstate > 0 ? (charitableBequests / totalGrossEstate) * 100 : 0;
}

/**
 * Calculate best case scenario
 */
function calculateBestCaseScenario(inputs: EstateTaxLiabilityInputs): {
  taxLiability: number;
  netTransfer: number;
  probability: number;
} {
  const { totalGrossEstate, federalEstateTaxRate } = inputs;

  const taxLiability = totalGrossEstate * (federalEstateTaxRate / 100) * 0.5; // Assume 50% reduction in best case
  const netTransfer = totalGrossEstate - taxLiability;
  const probability = 25; // 25% probability

  return { taxLiability, netTransfer, probability };
}

/**
 * Calculate worst case scenario
 */
function calculateWorstCaseScenario(inputs: EstateTaxLiabilityInputs): {
  taxLiability: number;
  netTransfer: number;
  probability: number;
} {
  const { totalGrossEstate, federalEstateTaxRate, stateEstateTaxRate, hasStateEstateTax } = inputs;

  const taxLiability = totalGrossEstate * ((federalEstateTaxRate + (hasStateEstateTax ? stateEstateTaxRate : 0)) / 100) * 1.2; // Assume 20% increase in worst case
  const netTransfer = totalGrossEstate - taxLiability;
  const probability = 15; // 15% probability

  return { taxLiability, netTransfer, probability };
}

/**
 * Calculate most likely scenario
 */
function calculateMostLikelyScenario(inputs: EstateTaxLiabilityInputs): {
  taxLiability: number;
  netTransfer: number;
  probability: number;
} {
  const { totalGrossEstate, federalEstateTaxRate, stateEstateTaxRate, hasStateEstateTax } = inputs;

  const taxLiability = totalGrossEstate * ((federalEstateTaxRate + (hasStateEstateTax ? stateEstateTaxRate : 0)) / 100) * 0.8; // Assume 20% reduction in most likely case
  const netTransfer = totalGrossEstate - taxLiability;
  const probability = 60; // 60% probability

  return { taxLiability, netTransfer, probability };
}

/**
 * Generate immediate actions
 */
function generateImmediateActions(inputs: EstateTaxLiabilityInputs): string[] {
  const actions: string[] = [
    'Review and update will and trust documents',
    'Update beneficiary designations on all accounts',
    'Gather and organize important documents',
    'Review insurance policies and coverage',
    'Consider annual exclusion gifts to family members'
  ];

  return actions;
}

/**
 * Generate short term actions
 */
function generateShortTermActions(inputs: EstateTaxLiabilityInputs): string[] {
  const actions: string[] = [
    'Establish or review revocable living trust',
    'Set up durable power of attorney',
    'Create healthcare proxy and living will',
    'Review asset titling and ownership',
    'Consider life insurance trust if applicable',
    'Implement annual gifting strategy'
  ];

  return actions;
}

/**
 * Generate long term actions
 */
function generateLongTermActions(inputs: EstateTaxLiabilityInputs): string[] {
  const actions: string[] = [
    'Implement comprehensive estate plan',
    'Consider irrevocable trusts for asset protection',
    'Review business succession planning',
    'Establish family limited partnerships if applicable',
    'Plan for generation-skipping transfers',
    'Regular review and updates of estate plan'
  ];

  return actions;
}

/**
 * Generate monitoring requirements
 */
function generateMonitoringRequirements(inputs: EstateTaxLiabilityInputs): string[] {
  const requirements: string[] = [
    'Annual review of estate plan documents',
    'Monitor changes in tax laws and exemptions',
    'Review beneficiary designations annually',
    'Update insurance coverage as needed',
    'Track annual exclusion gifts',
    'Monitor estate value changes'
  ];

  return requirements;
}

/**
 * Validate Estate Tax Liability inputs
 */
export function validateEstateTaxLiabilityInputs(inputs: EstateTaxLiabilityInputs): string[] {
  const errors: string[] = [];

  if (inputs.totalGrossEstate <= 0) {
    errors.push('Total gross estate must be greater than 0');
  }

  if (inputs.totalGrossEstate < 10000) {
    errors.push('Estate value seems unusually low for estate tax planning');
  }

  const totalBeneficiaries = (inputs.survivingSpouse ? 1 : 0) + inputs.survivingChildren + inputs.survivingGrandchildren + inputs.charitableOrganizations;
  if (totalBeneficiaries <= 0) {
    errors.push('Number of beneficiaries must be greater than 0');
  }

  if (inputs.federalEstateTaxRate < 0 || inputs.federalEstateTaxRate > 50) {
    errors.push('Federal estate tax rate must be between 0% and 50%');
  }

  if (inputs.stateEstateTaxRate < 0 || inputs.stateEstateTaxRate > 20) {
    errors.push('State estate tax rate must be between 0% and 20%');
  }

  if (inputs.generationSkippingTaxRate < 0 || inputs.generationSkippingTaxRate > 50) {
    errors.push('Generation skipping tax rate must be between 0% and 50%');
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  if (inputs.marketVolatility < 0 || inputs.marketVolatility > 100) {
    errors.push('Market volatility must be between 0 and 100');
  }

  if (inputs.legislativeRisk < 0 || inputs.legislativeRisk > 100) {
    errors.push('Legislative risk must be between 0 and 100');
  }

  if (inputs.familyRisk < 0 || inputs.familyRisk > 100) {
    errors.push('Family risk must be between 0 and 100');
  }

  if (inputs.valuationRisk < 0 || inputs.valuationRisk > 100) {
    errors.push('Valuation risk must be between 0 and 100');
  }

  return errors;
}