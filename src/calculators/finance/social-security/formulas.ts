import { SocialSecurityInputs, SocialSecurityMetrics, SocialSecurityAnalysis } from './types';

// Calculate monthly benefit based on claiming age and PIA
export function calculateMonthlyBenefit(
  primaryInsuranceAmount: number,
  fullRetirementAge: number,
  plannedClaimingAge: number,
  earlyRetirementReduction: number,
  delayedRetirementCredits: number
): number {
  const ageDifference = plannedClaimingAge - fullRetirementAge;

  if (ageDifference < 0) {
    // Early claiming - reduction applies
    const monthsEarly = Math.abs(ageDifference) * 12;
    const reductionFactor = earlyRetirementReduction / 100;
    return primaryInsuranceAmount * (1 - reductionFactor * monthsEarly / 36); // Max 36 months reduction
  } else if (ageDifference > 0) {
    // Delayed claiming - credits apply
    const monthsDelayed = ageDifference * 12;
    const creditFactor = delayedRetirementCredits / 100;
    return primaryInsuranceAmount * (1 + creditFactor * monthsDelayed / 12);
  } else {
    // At FRA - full benefit
    return primaryInsuranceAmount;
  }
}

// Calculate annual benefit
export function calculateAnnualBenefit(monthlyBenefit: number): number {
  return monthlyBenefit * 12;
}

// Calculate lifetime benefits
export function calculateLifetimeBenefits(
  monthlyBenefit: number,
  lifeExpectancy: number,
  plannedClaimingAge: number,
  includeCOLA: boolean,
  colaRate: number
): number {
  const claimingAge = plannedClaimingAge;
  const yearsOfBenefits = Math.max(0, lifeExpectancy - claimingAge);

  let totalBenefits = 0;
  let currentBenefit = monthlyBenefit;

  for (let year = 0; year < yearsOfBenefits; year++) {
    totalBenefits += currentBenefit * 12; // Annual benefit

    if (includeCOLA) {
      currentBenefit *= (1 + colaRate / 100);
    }
  }

  return totalBenefits;
}

// Calculate present value of benefits
export function calculatePresentValueOfBenefits(
  monthlyBenefit: number,
  lifeExpectancy: number,
  plannedClaimingAge: number,
  discountRate: number,
  includeCOLA: boolean,
  colaRate: number
): number {
  const claimingAge = plannedClaimingAge;
  const yearsOfBenefits = Math.max(0, lifeExpectancy - claimingAge);

  let presentValue = 0;
  let currentBenefit = monthlyBenefit;

  for (let year = 0; year < yearsOfBenefits; year++) {
    const annualBenefit = currentBenefit * 12;
    presentValue += annualBenefit / Math.pow(1 + discountRate / 100, year + 1);

    if (includeCOLA) {
      currentBenefit *= (1 + colaRate / 100);
    }
  }

  return presentValue;
}

// Calculate reduction amount and percentage
export function calculateReductionAmount(
  primaryInsuranceAmount: number,
  monthlyBenefit: number
): { amount: number; percentage: number } {
  const reductionAmount = primaryInsuranceAmount - monthlyBenefit;
  const reductionPercentage = (reductionAmount / primaryInsuranceAmount) * 100;

  return {
    amount: Math.max(0, reductionAmount),
    percentage: Math.max(0, reductionPercentage)
  };
}

// Calculate delayed retirement credits
export function calculateDelayedRetirementCredits(
  primaryInsuranceAmount: number,
  monthlyBenefit: number
): { amount: number; percentage: number } {
  const creditAmount = monthlyBenefit - primaryInsuranceAmount;
  const creditPercentage = (creditAmount / primaryInsuranceAmount) * 100;

  return {
    amount: Math.max(0, creditAmount),
    percentage: Math.max(0, creditPercentage)
  };
}

// Calculate taxes on benefits
export function calculateAnnualTaxes(
  annualBenefit: number,
  taxRate: number,
  includeTaxes: boolean
): number {
  if (!includeTaxes) return 0;
  return annualBenefit * (taxRate / 100);
}

// Calculate lifetime taxes
export function calculateLifetimeTaxes(
  annualTaxes: number,
  yearsOfBenefits: number
): number {
  return annualTaxes * yearsOfBenefits;
}

// Calculate after-tax benefits
export function calculateAfterTaxBenefits(
  monthlyBenefit: number,
  annualBenefit: number,
  taxRate: number,
  includeTaxes: boolean
): { monthly: number; annual: number } {
  if (!includeTaxes) {
    return { monthly: monthlyBenefit, annual: annualBenefit };
  }

  const afterTaxAnnual = annualBenefit * (1 - taxRate / 100);
  const afterTaxMonthly = afterTaxAnnual / 12;

  return {
    monthly: afterTaxMonthly,
    annual: afterTaxAnnual
  };
}

// Calculate breakeven analysis
export function calculateBreakevenAnalysis(
  primaryInsuranceAmount: number,
  earlyClaimingBenefit: number,
  plannedClaimingAge: number,
  fullRetirementAge: number,
  lifeExpectancy: number
): { breakevenAge: number; breakevenYears: number; additionalLifetimeBenefits: number } {
  const monthlyDifference = primaryInsuranceAmount - earlyClaimingBenefit;
  const annualDifference = monthlyDifference * 12;

  // Simplified breakeven calculation
  const yearsToBreakEven = Math.abs(annualDifference) > 0 ?
    Math.abs(primaryInsuranceAmount * 12) / Math.abs(annualDifference) : 0;

  const breakevenAge = plannedClaimingAge + yearsToBreakEven;
  const additionalLifetimeBenefits = annualDifference * Math.max(0, lifeExpectancy - breakevenAge);

  return {
    breakevenAge,
    breakevenYears: yearsToBreakEven,
    additionalLifetimeBenefits
  };
}

// Calculate spousal benefits
export function calculateSpousalBenefit(
  ownPIA: number,
  spousePIA: number,
  hasSpouse: boolean
): number {
  if (!hasSpouse) return 0;

  // Spousal benefit is 50% of higher earner's PIA, but not more than own benefit
  const higherPIA = Math.max(ownPIA, spousePIA || 0);
  const spousalAmount = higherPIA * 0.5;

  return Math.min(spousalAmount, ownPIA);
}

// Calculate survivor benefits
export function calculateSurvivorBenefit(
  deceasedPIA: number,
  survivorPIA: number,
  calculateSurvivorBenefits: boolean
): number {
  if (!calculateSurvivorBenefits) return 0;

  // Survivor benefit is 100% of deceased's benefit, but at least 75% of survivor's own benefit
  const survivorAmount = Math.max(deceasedPIA, survivorPIA * 0.75);

  return survivorAmount;
}

// Calculate optimal claiming age
export function calculateOptimalClaimingAge(
  primaryInsuranceAmount: number,
  lifeExpectancy: number,
  discountRate: number
): number {
  // Simplified optimization - in practice would use more complex analysis
  // Generally, longer life expectancy favors later claiming
  const lifeExpectancyFactor = lifeExpectancy - 80; // Base at 80 years

  if (lifeExpectancyFactor > 5) {
    return 70; // Delay to maximize benefits
  } else if (lifeExpectancyFactor > 0) {
    return 67; // Claim at FRA
  } else {
    return 62; // Claim early if shorter life expectancy
  }
}

// Calculate benefit efficiency
export function calculateBenefitEfficiency(
  lifetimeBenefits: number,
  presentValueOfBenefits: number,
  primaryInsuranceAmount: number
): number {
  if (primaryInsuranceAmount === 0) return 0;
  return (lifetimeBenefits / primaryInsuranceAmount) / 12; // Monthly efficiency ratio
}

// Generate Social Security analysis
export function generateSocialSecurityAnalysis(
  inputs: SocialSecurityInputs,
  metrics: SocialSecurityMetrics
): SocialSecurityAnalysis {
  const { lifeExpectancy, plannedClaimingAge, fullRetirementAge, primaryInsuranceAmount } = inputs;
  const { monthlyBenefit, lifetimeBenefits, breakevenAge, benefitEfficiency } = metrics;

  // Determine benefit adequacy
  const adequacyRatio = monthlyBenefit / (primaryInsuranceAmount * 0.8); // Compare to 80% of PIA
  let benefitAdequacy: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
  if (adequacyRatio >= 1.0) benefitAdequacy = 'excellent';
  else if (adequacyRatio >= 0.8) benefitAdequacy = 'good';
  else if (adequacyRatio >= 0.6) benefitAdequacy = 'fair';

  // Determine claiming strategy
  const ageDifference = plannedClaimingAge - fullRetirementAge;
  let claimingStrategy: 'optimal' | 'good' | 'fair' | 'suboptimal' = 'fair';
  if (Math.abs(ageDifference) <= 1) claimingStrategy = 'optimal';
  else if (Math.abs(ageDifference) <= 3) claimingStrategy = 'good';
  else if (ageDifference < -3) claimingStrategy = 'suboptimal'; // Claiming too early

  // Generate recommendations
  const recommendations = [];
  if (claimingStrategy === 'suboptimal') {
    recommendations.push('Consider delaying claiming to increase monthly benefits');
  }
  if (lifeExpectancy > 85) {
    recommendations.push('With longer life expectancy, delaying benefits may be optimal');
  }
  if (benefitAdequacy === 'poor') {
    recommendations.push('Consider working longer or reducing retirement expenses');
  }

  // Claiming strategy advice
  const claimingStrategyAdvice = [
    'Claim at Full Retirement Age (FRA) for unreduced benefits',
    'Delay to age 70 for maximum benefits if possible',
    'Consider claiming early only if immediate income needed',
    'Coordinate with spouse for optimal household benefits'
  ];

  // Tax optimization tips
  const taxOptimizationTips = [
    'Consider Roth conversions before claiming benefits',
    'Manage other income sources to minimize taxation',
    'Consider state tax implications',
    'Plan withdrawals from tax-advantaged accounts'
  ];

  // Risk factors
  const riskFactors = [];
  if (lifeExpectancy < 80) {
    riskFactors.push('Shorter life expectancy favors earlier claiming');
  }
  if (plannedClaimingAge < 62) {
    riskFactors.push('Claiming before earliest eligibility reduces benefits permanently');
  }

  // Longevity risk
  const longevityRisk = lifeExpectancy > 90 ?
    'High longevity risk - consider delayed claiming' :
    'Moderate longevity risk - balance with other factors';

  // Inflation risk
  const inflationRisk = 'COLA adjustments help maintain purchasing power, but may not keep pace with medical costs';

  // Policy risk
  const policyRisk = 'Benefits guaranteed by law, but future changes possible';

  // Comparison analysis
  const earlyClaimingBenefit = calculateMonthlyBenefit(primaryInsuranceAmount, fullRetirementAge, 62, 0.05, 0);
  const delayedClaimingBenefit = calculateMonthlyBenefit(primaryInsuranceAmount, fullRetirementAge, 70, 0, 0.08);

  const vsEarlyClaiming = {
    difference: monthlyBenefit - earlyClaimingBenefit,
    percentage: ((monthlyBenefit - earlyClaimingBenefit) / earlyClaimingBenefit) * 100,
    rationale: ageDifference >= 0 ? 'Delayed claiming provides higher monthly benefits' : 'Early claiming reduces monthly benefits'
  };

  const vsDelayedClaiming = {
    difference: delayedClaimingBenefit - monthlyBenefit,
    percentage: ((delayedClaimingBenefit - monthlyBenefit) / monthlyBenefit) * 100,
    rationale: ageDifference < 0 ? 'Further delay would increase monthly benefits' : 'Already claiming at optimal or delayed age'
  };

  // Retirement readiness
  const incomeReplacementTarget = 70; // 70% of pre-retirement income
  const actualReplacement = (monthlyBenefit * 12) / (primaryInsuranceAmount * 12) * 100;
  let retirementReadiness: 'on_track' | 'caution' | 'at_risk' = 'at_risk';
  if (actualReplacement >= incomeReplacementTarget) retirementReadiness = 'on_track';
  else if (actualReplacement >= incomeReplacementTarget * 0.8) retirementReadiness = 'caution';

  const incomeReplacement = actualReplacement;
  const savingsGap = Math.max(0, incomeReplacementTarget - actualReplacement);

  // Eligibility requirements
  const eligibilityRequirements = [
    'Earned 40 quarters of coverage (10 years)',
    'Reached minimum retirement age (currently 62)',
    'U.S. citizen or legal resident with sufficient work credits'
  ];

  // Claiming deadlines
  const claimingDeadlines = [
    'Can claim as early as age 62',
    'Must claim by age 70 for maximum delayed credits',
    'Benefits begin month after claiming',
    'Can suspend benefits after FRA if still working'
  ];

  // Appeal rights
  const appealRights = [
    '60-day deadline to appeal benefit decisions',
    'Reconsideration, hearing, Appeals Council, federal court',
    'Right to representation',
    'Benefits continue during appeal process'
  ];

  // Family impact
  const spousalImpact = inputs.hasSpouse ?
    'Spousal benefits can provide additional household income' :
    'No spousal benefits available';

  const survivorImpact = inputs.calculateSurvivorBenefits ?
    'Survivor benefits protect remaining spouse' :
    'Consider survivor benefits for married couples';

  const dependentImpact = 'Dependent benefits available for children under 18 or disabled';

  // Economic analysis
  const purchasingPower = lifetimeBenefits / Math.pow(1 + inputs.inflationRate / 100, lifeExpectancy - plannedClaimingAge);
  const realReturn = benefitEfficiency > 1 ? 'Positive real return on Social Security investment' : 'Negative real return';
  const inflationAdjustedValue = purchasingPower;

  return {
    benefitAdequacy,
    claimingStrategy,
    recommendations,
    claimingStrategyAdvice,
    taxOptimizationTips,
    riskFactors,
    longevityRisk,
    inflationRisk,
    policyRisk,
    vsEarlyClaiming,
    vsDelayedClaiming,
    retirementReadiness,
    incomeReplacement,
    savingsGap,
    eligibilityRequirements,
    claimingDeadlines,
    appealRights,
    spousalImpact,
    survivorImpact,
    dependentImpact,
    purchasingPower,
    realReturn,
    inflationAdjustedValue
  };
}