import { SocialSecurityOptimizationInputs, SocialSecurityOptimizationOutputs } from './types';

// Social Security benefit calculation constants (2024)
const FULL_RETIREMENT_AGE = 67;
const EARLY_RETIREMENT_AGE = 62;
const DELAYED_RETIREMENT_CREDITS_MAX_AGE = 70;
const EARLY_RETIREMENT_REDUCTION = 0.00556; // ~5/9% per month
const DELAYED_RETIREMENT_INCREASE = 0.08; // 8% per year

export function calculateBenefitAmount(pia: number, claimingAge: number): number {
  if (claimingAge < EARLY_RETIREMENT_AGE) {
    throw new Error('Cannot claim before age 62');
  }

  if (claimingAge >= DELAYED_RETIREMENT_CREDITS_MAX_AGE) {
    // Maximum delayed retirement credits (32 months * 2/3% = 24%)
    return pia * 1.24;
  }

  if (claimingAge > FULL_RETIREMENT_AGE) {
    // Delayed retirement credits: 2/3% per month
    const monthsDelayed = (claimingAge - FULL_RETIREMENT_AGE) * 12;
    const delayedIncrease = monthsDelayed * (2/3) / 100;
    return pia * (1 + delayedIncrease);
  }

  if (claimingAge < FULL_RETIREMENT_AGE) {
    // Early retirement reduction: 5/9% per month
    const monthsEarly = (FULL_RETIREMENT_AGE - claimingAge) * 12;
    const earlyReduction = monthsEarly * (5/9) / 100;
    return pia * (1 - earlyReduction);
  }

  return pia; // Full retirement age
}

export function calculateSpousalBenefit(primaryPia: number, spousePia: number, claimingAge: number): number {
  const primaryBenefit = calculateBenefitAmount(primaryPia, claimingAge);
  const spouseBenefit = calculateBenefitAmount(spousePia, claimingAge);

  // Spousal benefit is 50% of primary's benefit, but not less than own benefit
  const spousalAmount = primaryBenefit * 0.5;
  return Math.max(spousalAmount, spouseBenefit);
}

export function calculateNetPresentValue(benefit: number, claimingAge: number, lifespan: number, discountRate: number, inflationRate: number): number {
  let npv = 0;
  const monthlyBenefit = benefit;
  const realDiscountRate = (discountRate - inflationRate) / 100;

  for (let age = claimingAge; age < lifespan; age++) {
    const yearsFromNow = age - claimingAge;
    const presentValue = monthlyBenefit * 12 / Math.pow(1 + realDiscountRate, yearsFromNow);
    npv += presentValue;
  }

  return npv;
}

export function findOptimalClaimingAge(pia: number, currentAge: number, lifespan: number, discountRate: number, inflationRate: number): number {
  let maxNpv = 0;
  let optimalAge = FULL_RETIREMENT_AGE;

  for (let age = EARLY_RETIREMENT_AGE; age <= DELAYED_RETIREMENT_CREDITS_MAX_AGE; age++) {
    if (age < currentAge) continue;

    const benefit = calculateBenefitAmount(pia, age);
    const npv = calculateNetPresentValue(benefit, age, lifespan, discountRate, inflationRate);

    if (npv > maxNpv) {
      maxNpv = npv;
      optimalAge = age;
    }
  }

  return optimalAge;
}

export function calculateBreakEvenAge(primaryAge: number, primaryPia: number, delayedAge: number, delayedPia: number): number {
  const primaryBenefit = calculateBenefitAmount(primaryPia, primaryAge);
  const delayedBenefit = calculateBenefitAmount(delayedPia, delayedAge);

  const monthlyDifference = delayedBenefit - primaryBenefit;
  const totalEarlyPayments = primaryBenefit * 12 * (delayedAge - primaryAge);

  return delayedAge + (totalEarlyPayments / (monthlyDifference * 12));
}

export function calculateSocialSecurityOptimization(inputs: SocialSecurityOptimizationInputs): SocialSecurityOptimizationOutputs {
  // Find optimal claiming ages
  const optimalClaimingAge = findOptimalClaimingAge(
    inputs.primaryInsuranceAmount,
    inputs.currentAge,
    inputs.expectedLifespan,
    inputs.discountRate,
    inputs.inflationRate
  );

  let spouseOptimalClaimingAge: number | undefined;
  if (inputs.spouseCurrentAge && inputs.spousePrimaryInsuranceAmount && inputs.spouseExpectedLifespan) {
    spouseOptimalClaimingAge = findOptimalClaimingAge(
      inputs.spousePrimaryInsuranceAmount,
      inputs.spouseCurrentAge,
      inputs.spouseExpectedLifespan,
      inputs.discountRate,
      inputs.inflationRate
    );
  }

  // Calculate benefits at optimal ages
  const monthlyBenefit = calculateBenefitAmount(inputs.primaryInsuranceAmount, optimalClaimingAge);
  const spouseMonthlyBenefit = spouseOptimalClaimingAge && inputs.spousePrimaryInsuranceAmount
    ? calculateBenefitAmount(inputs.spousePrimaryInsuranceAmount, spouseOptimalClaimingAge)
    : undefined;

  // Calculate lifetime benefits
  const totalLifetimeBenefits = monthlyBenefit * 12 * (inputs.expectedLifespan - optimalClaimingAge);
  const spouseTotalLifetimeBenefits = spouseMonthlyBenefit
    ? spouseMonthlyBenefit * 12 * (inputs.spouseExpectedLifespan! - spouseOptimalClaimingAge!)
    : undefined;

  // Calculate combined benefits for married couples
  let combinedMonthlyBenefit = monthlyBenefit;
  if (spouseMonthlyBenefit && inputs.filingStrategy === 'married_filing_jointly') {
    combinedMonthlyBenefit = Math.max(monthlyBenefit, spouseMonthlyBenefit);
  }

  // Calculate break-even analysis (comparing FRA vs optimal)
  const breakEvenAge = calculateBreakEvenAge(
    FULL_RETIREMENT_AGE,
    inputs.primaryInsuranceAmount,
    optimalClaimingAge,
    inputs.primaryInsuranceAmount
  );

  // Calculate NPV
  const netPresentValue = calculateNetPresentValue(
    monthlyBenefit,
    optimalClaimingAge,
    inputs.expectedLifespan,
    inputs.discountRate,
    inputs.inflationRate
  );

  const spouseNetPresentValue = spouseMonthlyBenefit && spouseOptimalClaimingAge && inputs.spouseExpectedLifespan
    ? calculateNetPresentValue(
        spouseMonthlyBenefit,
        spouseOptimalClaimingAge,
        inputs.spouseExpectedLifespan,
        inputs.discountRate,
        inputs.inflationRate
      )
    : undefined;

  const combinedNetPresentValue = netPresentValue + (spouseNetPresentValue || 0);

  // Calculate benefit increases
  const fraBenefit = calculateBenefitAmount(inputs.primaryInsuranceAmount, FULL_RETIREMENT_AGE);
  const benefitIncreasePercentage = ((monthlyBenefit - fraBenefit) / fraBenefit) * 100;

  const spouseBenefitIncreasePercentage = spouseMonthlyBenefit && inputs.spousePrimaryInsuranceAmount
    ? ((spouseMonthlyBenefit - calculateBenefitAmount(inputs.spousePrimaryInsuranceAmount, FULL_RETIREMENT_AGE)) /
       calculateBenefitAmount(inputs.spousePrimaryInsuranceAmount, FULL_RETIREMENT_AGE)) * 100
    : undefined;

  // Years to break even
  const yearsToBreakEven = breakEvenAge - FULL_RETIREMENT_AGE;

  // Generate strategy comparison
  const strategyComparison = [];
  for (let age = EARLY_RETIREMENT_AGE; age <= DELAYED_RETIREMENT_CREDITS_MAX_AGE; age += 2) {
    if (age < inputs.currentAge) continue;

    const benefit = calculateBenefitAmount(inputs.primaryInsuranceAmount, age);
    const npv = calculateNetPresentValue(benefit, age, inputs.expectedLifespan, inputs.discountRate, inputs.inflationRate);

    strategyComparison.push({
      strategy: `Claim at age ${age}`,
      monthlyBenefit: benefit,
      totalBenefits: benefit * 12 * (inputs.expectedLifespan - age),
      netPresentValue: npv
    });
  }

  // Determine recommended strategy
  let recommendedStrategy = `Claim at age ${optimalClaimingAge} for maximum lifetime value`;
  if (optimalClaimingAge < FULL_RETIREMENT_AGE) {
    recommendedStrategy += ' (early claiming prioritizes immediate income)';
  } else if (optimalClaimingAge > FULL_RETIREMENT_AGE) {
    recommendedStrategy += ' (delayed claiming maximizes monthly benefit)';
  }

  return {
    optimalClaimingAge,
    spouseOptimalClaimingAge,
    monthlyBenefit,
    spouseMonthlyBenefit,
    totalLifetimeBenefits,
    spouseTotalLifetimeBenefits,
    combinedMonthlyBenefit,
    breakEvenAge,
    netPresentValue,
    spouseNetPresentValue,
    combinedNetPresentValue,
    benefitIncreasePercentage,
    spouseBenefitIncreasePercentage,
    yearsToBreakEven,
    recommendedStrategy,
    strategyComparison
  };
}

export function calculateResult(inputs: SocialSecurityOptimizationInputs): number {
  const result = calculateSocialSecurityOptimization(inputs);
  return result.netPresentValue;
}