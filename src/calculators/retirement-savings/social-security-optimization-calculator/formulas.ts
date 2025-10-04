```typescript
import { SocialSecurityOptimizationCalculatorInputs, SocialSecurityOptimizationCalculatorMetrics, SocialSecurityOptimizationCalculatorAnalysis } from './types';

function calculateMonthlyBenefit(claimingAge: number, fra: number, pia: number): number {
  if (claimingAge === fra) {
    return pia;
  } else if (claimingAge > fra && claimingAge <= 70) {
    const monthsDelayed = (claimingAge - fra) * 12;
    const delayRatePerMonth = (2 / 3) / 100; // 2/3 % per month
    const increase = monthsDelayed * delayRatePerMonth;
    return pia * (1 + increase);
  } else if (claimingAge < fra && claimingAge >= 62) {
    const monthsEarly = (fra - claimingAge) * 12;
    let reduction = 0;
    const first36Rate = (5 / 9) / 100; // 5/9 % per month for first 36 months
    const additionalRate = (5 / 12) / 100; // 5/12 % per month thereafter
    if (monthsEarly <= 36) {
      reduction = monthsEarly * first36Rate;
    } else {
      reduction = 36 * first36Rate + (monthsEarly - 36) * additionalRate;
    }
    return pia * (1 - reduction);
  } else {
    throw new Error(`Invalid claiming age: ${claimingAge}. Must be between 62 and 70.`);
  }
}

function calculateTotalBenefits(
  claimingAge: number,
  currentAge: number,
  lifeExpectancy: number,
  monthlyBenefit: number
): number {
  const effectiveStartAge = Math.max(claimingAge, currentAge);
  if (effectiveStartAge >= lifeExpectancy) {
    return 0;
  }
  const receivingYears = lifeExpectancy - effectiveStartAge;
  return receivingYears * monthlyBenefit * 12; // Annualized total nominal benefits
}

export function calculateResult(inputs: SocialSecurityOptimizationCalculatorInputs): number {
  const { currentAge, fullRetirementAge, primaryInsuranceAmount, lifeExpectancy } = inputs;

  if (currentAge >= 70) {
    return 70; // Cannot delay further
  }

  if (lifeExpectancy <= currentAge) {
    return Math.max(62, currentAge); // No benefits expected
  }

  const startClaimAge = Math.max(62, currentAge);
  let optimalAge = Math.ceil(startClaimAge);
  let maxTotal = 0;

  for (let age = Math.ceil(startClaimAge); age <= 70; age++) {
    const monthlyBenefit = calculateMonthlyBenefit(age, fullRetirementAge, primaryInsuranceAmount);
    const total = calculateTotalBenefits(age, currentAge, lifeExpectancy, monthlyBenefit);
    if (total > maxTotal) {
      maxTotal = total;
      optimalAge = age;
    }
  }

  return optimalAge;
}

export function generateAnalysis(
  inputs: SocialSecurityOptimizationCalculatorInputs,
  metrics: SocialSecurityOptimizationCalculatorMetrics
): SocialSecurityOptimizationCalculatorAnalysis {
  const { currentAge, fullRetirementAge, primaryInsuranceAmount, lifeExpectancy } = inputs;
  const optimalAge = metrics.result;

  // Recompute for analysis details
  const optimalMonthly = calculateMonthlyBenefit(optimalAge, fullRetirementAge, primaryInsuranceAmount);
  const optimalTotal = calculateTotalBenefits(optimalAge, currentAge, lifeExpectancy, optimalMonthly);

  const fraMonthly = primaryInsuranceAmount;
  const fraTotal = calculateTotalBenefits(fullRetirementAge, currentAge, lifeExpectancy, fraMonthly);

  const benefitIncreasePercent = fraTotal > 0 ? ((optimalTotal / fraTotal) - 1) * 100 : 0;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (optimalAge < fullRetirementAge) {
    riskLevel = 'Medium'; // Longevity risk if you live longer than expected
  } else if (optimalAge > fullRetirementAge + 3) {
    riskLevel = 'Medium'; // Mortality risk if you pass away earlier than expected
  }

  const recommendation = `Based on your current age of ${currentAge}, full retirement age of ${fullRetirementAge}, and expected life expectancy of ${lifeExpectancy}, the optimal age to claim Social Security benefits is ${optimalAge}. This maximizes your estimated lifetime benefits to approximately $${optimalTotal.toLocaleString()}. Compared to claiming at your full retirement age, this approach increases your total benefits by ${benefitIncreasePercent.toFixed(1)}%. Consider consulting a financial advisor for personalized factors like spousal benefits or health changes.`;

  return { recommendation, riskLevel };
}
```