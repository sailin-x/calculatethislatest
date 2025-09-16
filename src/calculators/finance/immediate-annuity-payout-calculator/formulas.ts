import { ImmediateAnnuityInputs, ImmediateAnnuityResults, ImmediateAnnuityMetrics } from './types';

export function calculateImmediateAnnuity(inputs: ImmediateAnnuityInputs): ImmediateAnnuityResults {
  const {
    principalAmount,
    age,
    gender,
    payoutType,
    payoutFrequency,
    annuityType,
    guaranteePeriod,
    jointAge,
    jointGender,
    inflationRate,
    interestRate,
    lifeExpectancy
  } = inputs;

  // Calculate mortality factor based on age and gender
  const mortalityFactor = calculateMortalityFactor(age, gender, lifeExpectancy);

  // Calculate payout multiplier based on payout type
  const payoutMultiplier = calculatePayoutMultiplier(payoutType, jointAge, jointGender, guaranteePeriod);

  // Calculate base annual payout
  const baseAnnualPayout = (principalAmount * interestRate * mortalityFactor * payoutMultiplier) / 100;

  // Adjust for payout frequency
  const frequencyMultiplier = getFrequencyMultiplier(payoutFrequency);
  const annualPayout = baseAnnualPayout;
  const periodicPayout = annualPayout / frequencyMultiplier;

  // Calculate inflation adjustment if applicable
  const inflationAdjustedPayout = annuityType === 'inflation-adjusted'
    ? periodicPayout * Math.pow(1 + inflationRate / 100, 1 / frequencyMultiplier)
    : periodicPayout;

  // Calculate total payments and duration
  const payoutDuration = Math.max(guaranteePeriod, lifeExpectancy - age);
  const totalPayments = payoutDuration * frequencyMultiplier;
  const totalPayoutAmount = inflationAdjustedPayout * totalPayments;

  // Calculate remaining principal (simplified)
  const remainingPrincipal = Math.max(0, principalAmount - totalPayoutAmount);

  // Calculate effective yield
  const effectiveYield = (totalPayoutAmount / principalAmount - 1) * 100 / payoutDuration;

  // Calculate break-even point
  const breakEvenPoint = principalAmount / periodicPayout;

  // Calculate survivor benefit
  const survivorBenefit = payoutType === 'joint-life' ? periodicPayout * 0.6 : 0;

  return {
    monthlyPayout: periodicPayout,
    annualPayout,
    totalPayments,
    totalPayoutAmount,
    payoutDuration,
    remainingPrincipal,
    effectiveYield,
    breakEvenPoint,
    survivorBenefit
  };
}

function calculateMortalityFactor(age: number, gender: string, lifeExpectancy: number): number {
  // Simplified mortality calculation
  const baseFactor = 0.05;
  const ageAdjustment = Math.max(0, (lifeExpectancy - age) / 100);
  const genderAdjustment = gender === 'female' ? 1.02 : 0.98;
  return baseFactor * ageAdjustment * genderAdjustment;
}

function calculatePayoutMultiplier(
  payoutType: string,
  jointAge?: number,
  jointGender?: string,
  guaranteePeriod?: number
): number {
  let multiplier = 1.0;

  switch (payoutType) {
    case 'single-life':
      multiplier = 1.0;
      break;
    case 'joint-life':
      if (jointAge && jointGender) {
        const jointMortalityFactor = calculateMortalityFactor(jointAge, jointGender, 85);
        multiplier = 0.85; // Reduced payout for joint life
      }
      break;
    case 'period-certain':
      if (guaranteePeriod) {
        multiplier = 0.95; // Slightly reduced for guarantee
      }
      break;
  }

  return multiplier;
}

function getFrequencyMultiplier(frequency: string): number {
  switch (frequency) {
    case 'monthly':
      return 12;
    case 'quarterly':
      return 4;
    case 'semi-annual':
      return 2;
    case 'annual':
      return 1;
    default:
      return 12;
  }
}

export function calculateImmediateAnnuityMetrics(
  inputs: ImmediateAnnuityInputs,
  results: ImmediateAnnuityResults
): ImmediateAnnuityMetrics {
  const { principalAmount, annuityType, payoutType } = inputs;
  const { totalPayoutAmount, payoutDuration } = results;

  // Calculate payout efficiency
  const payoutEfficiency = (totalPayoutAmount / principalAmount) * 100;

  // Calculate longevity protection
  const longevityProtection = payoutType === 'single-life' || payoutType === 'joint-life' ? 95 : 70;

  // Calculate inflation protection
  const inflationProtection = annuityType === 'inflation-adjusted' ? 90 : 60;

  // Risk assessment
  let riskAssessment: 'low' | 'medium' | 'high' = 'medium';
  if (payoutType === 'period-certain' && payoutDuration > 20) {
    riskAssessment = 'low';
  } else if (payoutType === 'single-life' && payoutDuration < 10) {
    riskAssessment = 'high';
  }

  return {
    payoutEfficiency,
    longevityProtection,
    inflationProtection,
    riskAssessment
  };
}

export function validateImmediateAnnuityInputs(inputs: ImmediateAnnuityInputs): string[] {
  const errors: string[] = [];

  if (inputs.principalAmount <= 0) {
    errors.push('Principal amount must be greater than $0');
  }

  if (inputs.age < 0 || inputs.age > 120) {
    errors.push('Age must be between 0 and 120');
  }

  if (inputs.lifeExpectancy <= inputs.age) {
    errors.push('Life expectancy must be greater than current age');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (inputs.guaranteePeriod < 0 || inputs.guaranteePeriod > 40) {
    errors.push('Guarantee period must be between 0 and 40 years');
  }

  if (inputs.payoutType === 'joint-life' && (!inputs.jointAge || !inputs.jointGender)) {
    errors.push('Joint age and gender are required for joint-life payout');
  }

  return errors;
}