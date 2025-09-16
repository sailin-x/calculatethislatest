import { EstatePlanningInputs, EstatePlanningResults } from './types';

/**
 * Calculate comprehensive estate planning analysis
 */
export function calculateEstatePlanning(inputs: EstatePlanningInputs): EstatePlanningResults {
  const {
    totalAssets,
    annualIncome,
    annualExpenses,
    federalTaxBracket,
    stateTaxBracket,
    estateTaxExemption,
    planningHorizon,
    expectedInflation,
    expectedReturn,
    numberOfChildren,
    numberOfGrandchildren,
    desiredLegacy,
    educationFunding,
    charitableGiving,
    lifeExpectancy,
    longTermCare,
    hasWill,
    hasTrust,
    hasPowerOfAttorney,
    hasHealthcareDirective
  } = inputs;

  // Calculate current estate value
  const currentEstateValue = totalAssets;

  // Calculate projected estate value with growth
  const projectedEstateValue = calculateProjectedValue(inputs);

  // Calculate inflation-adjusted value
  const inflationAdjustedValue = calculateInflationAdjustedValue(inputs);

  // Calculate estate taxes
  const federalEstateTax = calculateFederalEstateTax(projectedEstateValue, estateTaxExemption, federalTaxBracket);
  const stateEstateTax = calculateStateEstateTax(projectedEstateValue, stateTaxBracket);
  const totalEstateTax = federalEstateTax + stateEstateTax;
  const afterTaxEstate = projectedEstateValue - totalEstateTax;

  // Calculate beneficiary inheritances
  const perChildInheritance = numberOfChildren > 0 ? afterTaxEstate / numberOfChildren : 0;
  const perGrandchildInheritance = numberOfGrandchildren > 0 ? afterTaxEstate / numberOfGrandchildren : 0;

  // Calculate education funding shortfall
  const educationFundShortfall = Math.max(0, educationFunding - (afterTaxEstate * 0.1));

  // Assess planning gaps
  const willGap = !hasWill;
  const trustGap = !hasTrust;
  const powerOfAttorneyGap = !hasPowerOfAttorney;
  const healthcareDirectiveGap = !hasHealthcareDirective;

  // Generate recommendations
  const recommendedActions = generateRecommendedActions(inputs);
  const priorityLevel = calculatePriorityLevel(inputs);
  const estimatedPlanningCost = calculateEstimatedPlanningCost(inputs);

  // Calculate risk assessment
  const estateRiskScore = calculateEstateRiskScore(inputs);
  const riskFactors = identifyRiskFactors(inputs);
  const mitigationStrategies = generateMitigationStrategies(inputs);

  // Calculate legacy analysis
  const legacyAchievement = calculateLegacyAchievement(inputs, afterTaxEstate);
  const charitableImpact = calculateCharitableImpact(inputs);
  const familySecurityScore = calculateFamilySecurityScore(inputs);

  // Calculate financial projections
  const annualRequiredIncome = calculateAnnualRequiredIncome(inputs);
  const retirementShortfall = calculateRetirementShortfall(inputs);
  const longTermCareCost = calculateLongTermCareCost(inputs);

  return {
    currentEstateValue,
    projectedEstateValue,
    inflationAdjustedValue,
    federalEstateTax,
    stateEstateTax,
    totalEstateTax,
    afterTaxEstate,
    perChildInheritance,
    perGrandchildInheritance,
    educationFundShortfall,
    willGap,
    trustGap,
    powerOfAttorneyGap,
    healthcareDirectiveGap,
    recommendedActions,
    priorityLevel,
    estimatedPlanningCost,
    estateRiskScore,
    riskFactors,
    mitigationStrategies,
    legacyAchievement,
    charitableImpact,
    familySecurityScore,
    annualRequiredIncome,
    retirementShortfall,
    longTermCareCost
  };
}

/**
 * Calculate projected estate value with growth and inflation
 */
function calculateProjectedValue(inputs: EstatePlanningInputs): number {
  const { totalAssets, planningHorizon, expectedReturn, expectedInflation } = inputs;

  const realReturn = expectedReturn - expectedInflation;
  const growthFactor = Math.pow(1 + realReturn / 100, planningHorizon);

  return totalAssets * growthFactor;
}

/**
 * Calculate inflation-adjusted estate value
 */
function calculateInflationAdjustedValue(inputs: EstatePlanningInputs): number {
  const { totalAssets, planningHorizon, expectedInflation } = inputs;

  const inflationFactor = Math.pow(1 + expectedInflation / 100, planningHorizon);
  return totalAssets / inflationFactor;
}

/**
 * Calculate federal estate tax
 */
function calculateFederalEstateTax(estateValue: number, exemption: number, taxBracket: number): number {
  const taxableEstate = Math.max(0, estateValue - exemption);
  return taxableEstate * (taxBracket / 100);
}

/**
 * Calculate state estate tax
 */
function calculateStateEstateTax(estateValue: number, stateTaxBracket: number): number {
  return estateValue * (stateTaxBracket / 100);
}

/**
 * Generate recommended actions based on analysis
 */
function generateRecommendedActions(inputs: EstatePlanningInputs): string[] {
  const actions: string[] = [];

  if (!inputs.hasWill) {
    actions.push('Create or update your Last Will and Testament');
  }

  if (!inputs.hasTrust) {
    actions.push('Establish a Revocable Living Trust to avoid probate');
  }

  if (!inputs.hasPowerOfAttorney) {
    actions.push('Execute Durable Power of Attorney for financial matters');
  }

  if (!inputs.hasHealthcareDirective) {
    actions.push('Create Advance Healthcare Directive and Living Will');
  }

  if (inputs.totalAssets > 1000000) {
    actions.push('Consider establishing a Family Limited Partnership');
  }

  if (inputs.businessInterests > 0) {
    actions.push('Create a succession plan for business interests');
  }

  if (inputs.charitableGiving > 0) {
    actions.push('Establish charitable giving vehicles (CRUT, CLAT)');
  }

  actions.push('Review beneficiary designations on all accounts');
  actions.push('Update insurance policies and beneficiary designations');
  actions.push('Consider gifting strategies to reduce estate tax');

  return actions;
}

/**
 * Calculate priority level for estate planning
 */
function calculatePriorityLevel(inputs: EstatePlanningInputs): 'low' | 'medium' | 'high' | 'urgent' {
  const { age, totalAssets, hasWill, hasTrust, healthStatus } = inputs;

  let score = 0;

  // Age factor
  if (age > 70) score += 3;
  else if (age > 60) score += 2;
  else if (age > 50) score += 1;

  // Asset factor
  if (totalAssets > 5000000) score += 3;
  else if (totalAssets > 2000000) score += 2;
  else if (totalAssets > 1000000) score += 1;

  // Planning factor
  if (!hasWill) score += 2;
  if (!hasTrust) score += 2;

  // Health factor
  if (healthStatus === 'poor') score += 2;
  else if (healthStatus === 'fair') score += 1;

  if (score >= 8) return 'urgent';
  if (score >= 5) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}

/**
 * Calculate estimated planning cost
 */
function calculateEstimatedPlanningCost(inputs: EstatePlanningInputs): number {
  const { totalAssets, hasWill, hasTrust } = inputs;

  let baseCost = 0;

  if (!hasWill) baseCost += 2000;
  if (!hasTrust) baseCost += 5000;

  // Additional costs based on complexity
  if (totalAssets > 5000000) baseCost += 10000;
  else if (totalAssets > 2000000) baseCost += 5000;
  else if (totalAssets > 1000000) baseCost += 2000;

  return baseCost;
}

/**
 * Calculate estate risk score (0-100, higher is riskier)
 */
function calculateEstateRiskScore(inputs: EstatePlanningInputs): number {
  const { hasWill, hasTrust, hasPowerOfAttorney, hasHealthcareDirective, healthStatus, age } = inputs;

  let riskScore = 100; // Start with maximum risk

  // Reduce risk for each planning element in place
  if (hasWill) riskScore -= 20;
  if (hasTrust) riskScore -= 20;
  if (hasPowerOfAttorney) riskScore -= 15;
  if (hasHealthcareDirective) riskScore -= 15;

  // Adjust for age (older = higher risk)
  if (age > 70) riskScore += 10;
  else if (age > 60) riskScore += 5;

  // Adjust for health
  if (healthStatus === 'poor') riskScore += 10;
  else if (healthStatus === 'fair') riskScore += 5;

  return Math.max(0, Math.min(100, riskScore));
}

/**
 * Identify risk factors
 */
function identifyRiskFactors(inputs: EstatePlanningInputs): string[] {
  const risks: string[] = [];

  if (!inputs.hasWill) risks.push('No Will - estate may go through probate');
  if (!inputs.hasTrust) risks.push('No Trust - assets may be subject to probate');
  if (!inputs.hasPowerOfAttorney) risks.push('No Power of Attorney - difficulty managing affairs if incapacitated');
  if (!inputs.hasHealthcareDirective) risks.push('No Healthcare Directive - medical decisions may be delayed');

  if (inputs.totalAssets > inputs.estateTaxExemption) {
    risks.push('Estate exceeds federal exemption - subject to estate tax');
  }

  if (inputs.healthStatus === 'poor') {
    risks.push('Poor health status increases urgency of planning');
  }

  if (inputs.businessInterests > 0) {
    risks.push('Business interests require succession planning');
  }

  return risks;
}

/**
 * Generate mitigation strategies
 */
function generateMitigationStrategies(inputs: EstatePlanningInputs): string[] {
  const strategies: string[] = [];

  if (!inputs.hasWill || !inputs.hasTrust) {
    strategies.push('Consult with estate planning attorney');
  }

  if (inputs.totalAssets > inputs.estateTaxExemption) {
    strategies.push('Implement gifting strategies to reduce taxable estate');
    strategies.push('Consider life insurance to fund estate taxes');
  }

  if (inputs.businessInterests > 0) {
    strategies.push('Create business succession plan');
  }

  if (inputs.charitableGiving > 0) {
    strategies.push('Use charitable trusts to reduce estate tax');
  }

  strategies.push('Review and update beneficiary designations annually');
  strategies.push('Maintain adequate life insurance coverage');

  return strategies;
}

/**
 * Calculate legacy achievement percentage
 */
function calculateLegacyAchievement(inputs: EstatePlanningInputs, afterTaxEstate: number): number {
  const { desiredLegacy } = inputs;

  if (desiredLegacy <= 0) return 100;
  return Math.min(100, (afterTaxEstate / desiredLegacy) * 100);
}

/**
 * Calculate charitable impact
 */
function calculateCharitableImpact(inputs: EstatePlanningInputs): number {
  const { charitableGiving, totalAssets } = inputs;

  if (totalAssets <= 0) return 0;
  return (charitableGiving / totalAssets) * 100;
}

/**
 * Calculate family security score
 */
function calculateFamilySecurityScore(inputs: EstatePlanningInputs): number {
  const { hasWill, hasTrust, hasPowerOfAttorney, hasHealthcareDirective, numberOfChildren } = inputs;

  let score = 0;

  if (hasWill) score += 25;
  if (hasTrust) score += 25;
  if (hasPowerOfAttorney) score += 25;
  if (hasHealthcareDirective) score += 25;

  // Bonus for having children
  if (numberOfChildren > 0) score += 10;

  return Math.min(100, score);
}

/**
 * Calculate annual required income
 */
function calculateAnnualRequiredIncome(inputs: EstatePlanningInputs): number {
  const { annualExpenses, expectedInflation, planningHorizon } = inputs;

  // Adjust for inflation over planning horizon
  const inflationFactor = Math.pow(1 + expectedInflation / 100, planningHorizon);
  return annualExpenses * inflationFactor;
}

/**
 * Calculate retirement shortfall
 */
function calculateRetirementShortfall(inputs: EstatePlanningInputs): number {
  const { annualIncome, annualExpenses, retirementAccounts } = inputs;

  const annualShortfall = Math.max(0, annualExpenses - annualIncome);
  const yearsToCover = retirementAccounts > 0 ? retirementAccounts / annualShortfall : 0;

  return annualShortfall * Math.max(0, 30 - yearsToCover); // Assume 30-year retirement
}

/**
 * Calculate long-term care cost
 */
function calculateLongTermCareCost(inputs: EstatePlanningInputs): number {
  const { longTermCare, lifeExpectancy, age } = inputs;

  if (!longTermCare) return 0;

  const yearsOfCare = Math.max(0, lifeExpectancy - age - 2); // Assume care starts 2 years before death
  const annualCost = 100000; // Average annual LTC cost

  return yearsOfCare * annualCost;
}

/**
 * Validate estate planning inputs
 */
export function validateEstatePlanningInputs(inputs: EstatePlanningInputs): string[] {
  const errors: string[] = [];

  if (inputs.age < 18 || inputs.age > 120) {
    errors.push('Age must be between 18 and 120');
  }

  if (inputs.totalAssets < 0) {
    errors.push('Total assets cannot be negative');
  }

  if (inputs.annualIncome < 0) {
    errors.push('Annual income cannot be negative');
  }

  if (inputs.annualExpenses < 0) {
    errors.push('Annual expenses cannot be negative');
  }

  if (inputs.federalTaxBracket < 0 || inputs.federalTaxBracket > 50) {
    errors.push('Federal tax bracket must be between 0% and 50%');
  }

  if (inputs.stateTaxBracket < 0 || inputs.stateTaxBracket > 20) {
    errors.push('State tax bracket must be between 0% and 20%');
  }

  if (inputs.estateTaxExemption < 0) {
    errors.push('Estate tax exemption cannot be negative');
  }

  if (inputs.planningHorizon < 1 || inputs.planningHorizon > 50) {
    errors.push('Planning horizon must be between 1 and 50 years');
  }

  if (inputs.expectedInflation < 0 || inputs.expectedInflation > 10) {
    errors.push('Expected inflation must be between 0% and 10%');
  }

  if (inputs.expectedReturn < -10 || inputs.expectedReturn > 30) {
    errors.push('Expected return must be between -10% and 30%');
  }

  if (inputs.lifeExpectancy < inputs.age || inputs.lifeExpectancy > 150) {
    errors.push('Life expectancy must be greater than age and less than 150');
  }

  return errors;
}
