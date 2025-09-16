import { PensionInputs, PensionResults, PensionMetrics } from './types';

export function calculatePensionComparison(inputs: PensionInputs): PensionResults {
  const {
    lumpSumAmount,
    annualAnnuityPayment,
    currentAge,
    lifeExpectancy,
    expectedReturn,
    inflationRate,
    taxBracket,
    annuityType,
    includeSpouse,
    spouseAge,
    spouseLifeExpectancy,
    riskTolerance
  } = inputs;

  // Calculate present value of annuity payments
  const annuityPresentValue = calculateAnnuityPresentValue(
    annualAnnuityPayment,
    lifeExpectancy - currentAge,
    expectedReturn,
    inflationRate,
    annuityType
  );

  // Calculate lump sum present value (already a lump sum, but adjust for taxes)
  const lumpSumPresentValue = lumpSumAmount * (1 - taxBracket / 100);

  // Calculate net benefit
  const netBenefit = lumpSumPresentValue - annuityPresentValue;

  // Calculate break-even years
  const breakEvenYears = calculateBreakEvenYears(
    annualAnnuityPayment,
    lumpSumAmount,
    expectedReturn
  );

  // Calculate monthly incomes
  const lumpSumMonthlyIncome = calculateLumpSumMonthlyIncome(
    lumpSumAmount,
    lifeExpectancy - currentAge,
    expectedReturn
  );

  const annuityMonthlyIncome = annualAnnuityPayment / 12;

  // Calculate risk-adjusted value
  const riskAdjustedValue = calculateRiskAdjustedValue(
    lumpSumPresentValue,
    annuityPresentValue,
    riskTolerance
  );

  // Determine recommended choice
  const recommendedChoice = determineRecommendedChoice(
    netBenefit,
    breakEvenYears,
    riskTolerance,
    lifeExpectancy - currentAge
  );

  return {
    lumpSumPresentValue,
    annuityPresentValue,
    netBenefit,
    breakEvenYears,
    lumpSumMonthlyIncome,
    annuityMonthlyIncome,
    riskAdjustedValue,
    recommendedChoice
  };
}

function calculateAnnuityPresentValue(
  annualPayment: number,
  years: number,
  discountRate: number,
  inflationRate: number,
  annuityType: string
): number {
  let presentValue = 0;
  const rate = discountRate / 100;

  for (let year = 1; year <= years; year++) {
    let payment = annualPayment;

    // Adjust for inflation if not inflation-adjusted annuity
    if (annuityType !== 'inflation_adjusted') {
      payment = payment / Math.pow(1 + inflationRate / 100, year - 1);
    }

    presentValue += payment / Math.pow(1 + rate, year);
  }

  return presentValue;
}

function calculateBreakEvenYears(
  annualAnnuityPayment: number,
  lumpSumAmount: number,
  expectedReturn: number
): number {
  if (annualAnnuityPayment <= 0) return 0;

  // Simplified break-even calculation
  const annualReturn = expectedReturn / 100;
  const years = Math.log(lumpSumAmount / annualAnnuityPayment) / Math.log(1 + annualReturn);

  return Math.max(0, Math.ceil(years));
}

function calculateLumpSumMonthlyIncome(
  lumpSumAmount: number,
  years: number,
  expectedReturn: number
): number {
  if (years <= 0) return 0;

  // Assume 4% safe withdrawal rate
  const annualIncome = lumpSumAmount * 0.04;
  return annualIncome / 12;
}

function calculateRiskAdjustedValue(
  lumpSumPV: number,
  annuityPV: number,
  riskTolerance: string
): number {
  const riskAdjustmentFactor = {
    'low': 0.8,    // Conservative - prefer annuity
    'medium': 1.0, // Neutral
    'high': 1.2    // Aggressive - prefer lump sum
  }[riskTolerance] || 1.0;

  return lumpSumPV * riskAdjustmentFactor;
}

function determineRecommendedChoice(
  netBenefit: number,
  breakEvenYears: number,
  riskTolerance: string,
  lifeExpectancyYears: number
): string {
  if (netBenefit > 0 && breakEvenYears < lifeExpectancyYears) {
    return 'Lump Sum';
  } else if (riskTolerance === 'low' || breakEvenYears > lifeExpectancyYears) {
    return 'Annuity';
  } else {
    return 'Depends on personal circumstances - consult financial advisor';
  }
}

export function calculatePensionMetrics(inputs: PensionInputs, results: PensionResults): PensionMetrics {
  const { lumpSumAmount, annualAnnuityPayment, lifeExpectancy, currentAge, riskTolerance } = inputs;
  const { lumpSumPresentValue, annuityPresentValue } = results;

  // Calculate efficiencies
  const lumpSumEfficiency = lumpSumAmount > 0 ? (lumpSumPresentValue / lumpSumAmount) * 100 : 0;
  const annuityEfficiency = annualAnnuityPayment > 0 ? (annuityPresentValue / (annualAnnuityPayment * (lifeExpectancy - currentAge))) * 100 : 0;

  // Determine risks
  const yearsRemaining = lifeExpectancy - currentAge;
  let longevityRisk: 'low' | 'medium' | 'high' = 'low';
  if (yearsRemaining > 30) longevityRisk = 'high';
  else if (yearsRemaining > 20) longevityRisk = 'medium';

  let marketRisk: 'low' | 'medium' | 'high' = 'low';
  if (riskTolerance === 'high') marketRisk = 'high';
  else if (riskTolerance === 'medium') marketRisk = 'medium';

  let inflationProtection: 'low' | 'medium' | 'high' = 'low';
  if (inputs.annuityType === 'inflation_adjusted') inflationProtection = 'high';
  else if (inputs.annuityType === 'variable') inflationProtection = 'medium';

  return {
    lumpSumEfficiency,
    annuityEfficiency,
    longevityRisk,
    marketRisk,
    inflationProtection
  };
}

export function validatePensionInputs(inputs: PensionInputs): string[] {
  const errors: string[] = [];

  if (inputs.lumpSumAmount <= 0) {
    errors.push('Lump sum amount must be greater than $0');
  }

  if (inputs.annualAnnuityPayment <= 0) {
    errors.push('Annual annuity payment must be greater than $0');
  }

  if (inputs.currentAge < 0 || inputs.currentAge > 120) {
    errors.push('Current age must be between 0 and 120');
  }

  if (inputs.lifeExpectancy <= inputs.currentAge) {
    errors.push('Life expectancy must be greater than current age');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.includeSpouse && (inputs.spouseAge < 0 || inputs.spouseAge > 120)) {
    errors.push('Spouse age must be between 0 and 120');
  }

  if (inputs.includeSpouse && inputs.spouseLifeExpectancy <= inputs.spouseAge) {
    errors.push('Spouse life expectancy must be greater than spouse age');
  }

  return errors;
}