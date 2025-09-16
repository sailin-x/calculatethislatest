import { APTValueInputs, APTValueResults } from './types';

/**
 * Calculate Asset Protection Trust (APT) value and analysis
 */
export function calculateAPTValue(inputs: APTValueInputs): APTValueResults {
  const {
    trustAssets,
    annualContributions,
    contributionYears,
    trustDuration,
    distributionFrequency,
    trusteeFees,
    expectedReturn,
    inflationRate,
    taxRate,
    numberOfBeneficiaries,
    beneficiaryAges,
    lifeExpectancy,
    setupCosts,
    annualLegalFees,
    stateOfFormation,
    includeInflation,
    discountRate,
    analysisPeriod
  } = inputs;

  // Calculate total contributions
  const totalContributions = trustAssets + (annualContributions * contributionYears);

  // Calculate trust growth
  const projectedTrustValue = calculateTrustGrowth(inputs);
  const currentTrustValue = trustAssets;

  // Calculate fees and costs
  const totalFees = calculateTotalFees(inputs);
  const totalSetupCosts = setupCosts;
  const annualOperatingCosts = trusteeFees + annualLegalFees;

  // Calculate beneficiary distributions
  const annualDistribution = calculateAnnualDistribution(inputs, projectedTrustValue);
  const totalDistributions = annualDistribution * trustDuration;
  const perBeneficiaryValue = projectedTrustValue / numberOfBeneficiaries;

  // Calculate tax analysis
  const taxSavings = calculateTaxSavings(inputs, projectedTrustValue);
  const afterTaxValue = projectedTrustValue - taxSavings;
  const effectiveTaxRate = taxRate; // Simplified

  // Calculate financial metrics
  const internalRateOfReturn = calculateIRR(inputs);
  const netPresentValue = calculateNPV(inputs, projectedTrustValue);
  const benefitCostRatio = calculateBenefitCostRatio(inputs, projectedTrustValue);

  // Calculate break-even period
  const breakEvenPeriod = calculateBreakEvenPeriod(inputs);

  // Calculate protection analysis
  const assetProtectionLevel = calculateAssetProtectionLevel(inputs);
  const creditorProtectionScore = calculateCreditorProtectionScore(inputs);
  const spendthriftProtection = true; // APTs typically include spendthrift provisions

  // Generate recommendations
  const recommendation = generateRecommendation(inputs, projectedTrustValue);
  const riskAssessment = generateRiskAssessment(inputs);
  const nextSteps = generateNextSteps(inputs);

  return {
    currentTrustValue,
    projectedTrustValue,
    totalContributions,
    totalFees,
    perBeneficiaryValue,
    annualDistribution,
    totalDistributions,
    taxSavings,
    afterTaxValue,
    effectiveTaxRate,
    assetProtectionLevel,
    creditorProtectionScore,
    spendthriftProtection,
    totalSetupCosts,
    annualOperatingCosts,
    breakEvenPeriod,
    internalRateOfReturn,
    netPresentValue,
    benefitCostRatio,
    recommendation,
    riskAssessment,
    nextSteps
  };
}

/**
 * Calculate trust growth over time
 */
function calculateTrustGrowth(inputs: APTValueInputs): number {
  const {
    trustAssets,
    annualContributions,
    contributionYears,
    expectedReturn,
    inflationRate,
    includeInflation,
    analysisPeriod
  } = inputs;

  let trustValue = trustAssets;
  const adjustedReturn = includeInflation ?
    (expectedReturn - inflationRate) / 100 :
    expectedReturn / 100;

  // Grow initial assets
  for (let year = 1; year <= analysisPeriod; year++) {
    trustValue *= (1 + adjustedReturn);
  }

  // Add contributions with growth
  for (let year = 1; year <= Math.min(contributionYears, analysisPeriod); year++) {
    const contributionValue = annualContributions;
    let futureValue = contributionValue;

    // Grow this contribution for remaining years
    for (let growthYear = year; growthYear <= analysisPeriod; growthYear++) {
      futureValue *= (1 + adjustedReturn);
    }

    trustValue += futureValue;
  }

  return trustValue;
}

/**
 * Calculate total fees over the trust period
 */
function calculateTotalFees(inputs: APTValueInputs): number {
  const { trusteeFees, annualLegalFees, trustDuration } = inputs;
  return (trusteeFees + annualLegalFees) * trustDuration;
}

/**
 * Calculate annual distribution per beneficiary
 */
function calculateAnnualDistribution(inputs: APTValueInputs, trustValue: number): number {
  const { numberOfBeneficiaries, distributionFrequency } = inputs;

  const annualDistribution = trustValue / numberOfBeneficiaries;

  // Adjust for distribution frequency
  switch (distributionFrequency) {
    case 'monthly':
      return annualDistribution / 12;
    case 'quarterly':
      return annualDistribution / 4;
    case 'semi-annual':
      return annualDistribution / 2;
    case 'annual':
    default:
      return annualDistribution;
  }
}

/**
 * Calculate tax savings from trust structure
 */
function calculateTaxSavings(inputs: APTValueInputs, trustValue: number): number {
  const { taxRate, trustDuration } = inputs;

  // Simplified tax calculation - trusts may have different tax treatment
  // This is a basic estimate
  const annualTaxSavings = (trustValue / trustDuration) * (taxRate / 100);
  return annualTaxSavings * trustDuration;
}

/**
 * Calculate Internal Rate of Return
 */
function calculateIRR(inputs: APTValueInputs): number {
  const { trustAssets, annualContributions, contributionYears, expectedReturn } = inputs;
  const totalContributions = trustAssets + (annualContributions * contributionYears);

  // Simplified IRR calculation
  // In practice, this would use more sophisticated methods
  return expectedReturn * 0.8; // Conservative estimate
}

/**
 * Calculate Net Present Value
 */
function calculateNPV(inputs: APTValueInputs, futureValue: number): number {
  const { discountRate, analysisPeriod, trustAssets, annualContributions, contributionYears } = inputs;
  const totalContributions = trustAssets + (annualContributions * contributionYears);

  const discountFactor = Math.pow(1 + discountRate / 100, -analysisPeriod);
  const presentValue = futureValue * discountFactor;

  return presentValue - totalContributions;
}

/**
 * Calculate benefit-cost ratio
 */
function calculateBenefitCostRatio(inputs: APTValueInputs, trustValue: number): number {
  const { trustAssets, annualContributions, contributionYears, setupCosts, annualLegalFees, trusteeFees, trustDuration } = inputs;
  const totalContributions = trustAssets + (annualContributions * contributionYears);

  const totalCosts = setupCosts + (annualLegalFees + trusteeFees) * trustDuration;
  const totalBenefits = trustValue + calculateTaxSavings(inputs, trustValue);

  return totalBenefits / (totalContributions + totalCosts);
}

/**
 * Calculate break-even period
 */
function calculateBreakEvenPeriod(inputs: APTValueInputs): number {
  const { setupCosts, annualLegalFees, trusteeFees, annualContributions } = inputs;

  const annualCosts = annualLegalFees + trusteeFees;
  const annualBenefits = annualContributions;

  if (annualBenefits <= annualCosts) return 0;

  return Math.ceil(setupCosts / (annualBenefits - annualCosts));
}

/**
 * Calculate asset protection level
 */
function calculateAssetProtectionLevel(inputs: APTValueInputs): string {
  const { stateOfFormation, trustDuration } = inputs;

  // Simplified assessment based on state and duration
  const strongStates = ['alaska', 'delaware', 'south dakota'];
  const isStrongState = strongStates.includes(stateOfFormation.toLowerCase());

  if (isStrongState && trustDuration >= 10) {
    return 'Very High';
  } else if (isStrongState || trustDuration >= 5) {
    return 'High';
  } else if (trustDuration >= 2) {
    return 'Medium';
  } else {
    return 'Low';
  }
}

/**
 * Calculate creditor protection score (0-100)
 */
function calculateCreditorProtectionScore(inputs: APTValueInputs): number {
  const { stateOfFormation, trustDuration, numberOfBeneficiaries } = inputs;

  let score = 50; // Base score

  // State strength factor
  const strongStates = ['alaska', 'delaware', 'south dakota'];
  if (strongStates.includes(stateOfFormation.toLowerCase())) {
    score += 25;
  }

  // Duration factor
  if (trustDuration >= 10) score += 15;
  else if (trustDuration >= 5) score += 10;
  else if (trustDuration >= 2) score += 5;

  // Beneficiary factor
  if (numberOfBeneficiaries > 1) score += 5;

  return Math.min(100, Math.max(0, score));
}

/**
 * Generate recommendation
 */
function generateRecommendation(inputs: APTValueInputs, trustValue: number): string {
  const { trustDuration, stateOfFormation, numberOfBeneficiaries, trustAssets, annualContributions, contributionYears } = inputs;
  const totalContributions = trustAssets + (annualContributions * contributionYears);

  if (trustValue > totalContributions * 1.5 && trustDuration >= 5) {
    return 'Strong recommendation for APT establishment. The projected growth and protection benefits justify the setup costs and ongoing fees.';
  } else if (trustValue > totalContributions * 1.2) {
    return 'Consider APT establishment. The projected returns are favorable, though the break-even period may be longer than optimal.';
  } else {
    return 'Carefully evaluate APT establishment. Consider alternative asset protection strategies that may offer better risk-adjusted returns.';
  }
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: APTValueInputs): string {
  const { expectedReturn, trustDuration, stateOfFormation } = inputs;

  if (expectedReturn > 8 && trustDuration >= 10) {
    return 'Low to Moderate Risk - Long time horizon and reasonable return expectations provide good risk mitigation.';
  } else if (expectedReturn > 6 && trustDuration >= 5) {
    return 'Moderate Risk - Reasonable time horizon with conservative return expectations.';
  } else {
    return 'Moderate to High Risk - Shorter time horizon or aggressive return expectations increase risk exposure.';
  }
}

/**
 * Generate next steps
 */
function generateNextSteps(inputs: APTValueInputs): string[] {
  const steps = [
    'Consult with estate planning attorney specializing in asset protection',
    'Review trust documents and ensure compliance with state laws',
    'Verify chosen state provides adequate asset protection laws'
  ];

  if (inputs.trustAssets > 1000000) {
    steps.push('Consider professional trustee services for high-value trusts');
  }

  steps.push('Establish funding mechanism for the trust');
  steps.push('Set up beneficiary designations and distribution terms');
  steps.push('Implement regular trust administration procedures');

  return steps;
}

/**
 * Validate APT value inputs
 */
export function validateAPTValueInputs(inputs: APTValueInputs): string[] {
  const errors: string[] = [];

  if (inputs.trustAssets < 0) {
    errors.push('Trust assets cannot be negative');
  }

  if (inputs.annualContributions < 0) {
    errors.push('Annual contributions cannot be negative');
  }

  if (inputs.contributionYears < 0) {
    errors.push('Contribution years cannot be negative');
  }

  if (inputs.trustDuration <= 0) {
    errors.push('Trust duration must be greater than 0');
  }

  if (inputs.expectedReturn < -10 || inputs.expectedReturn > 30) {
    errors.push('Expected return must be between -10% and 30%');
  }

  if (inputs.numberOfBeneficiaries < 1) {
    errors.push('Number of beneficiaries must be at least 1');
  }

  if (inputs.setupCosts < 0) {
    errors.push('Setup costs cannot be negative');
  }

  if (inputs.annualLegalFees < 0) {
    errors.push('Annual legal fees cannot be negative');
  }

  if (inputs.analysisPeriod <= 0 || inputs.analysisPeriod > 100) {
    errors.push('Analysis period must be between 1 and 100 years');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  return errors;
}