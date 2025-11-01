import { TrustFundDistributionInputs, TrustFundDistributionOutputs, TrustFundDistributionMetrics, TrustFundDistributionAnalysis } from './types';

// Calculate monthly distribution amount
export function calculateMonthlyDistribution(
  principal: number,
  annualIncome: number,
  duration: number,
  frequency: string
): number {
  const totalDistributions = principal + (annualIncome * duration);
  const periodsPerYear = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
  return totalDistributions / (duration * periodsPerYear);
}

// Calculate annual distribution amount
export function calculateAnnualDistribution(
  principal: number,
  annualIncome: number,
  duration: number
): number {
  return (principal + (annualIncome * duration)) / duration;
}

// Calculate total distributions over trust duration
export function calculateTotalDistributions(
  principal: number,
  annualIncome: number,
  duration: number
): number {
  return principal + (annualIncome * duration);
}

// Calculate remaining principal after distributions
export function calculateRemainingPrincipal(
  principal: number,
  totalDistributions: number
): number {
  return Math.max(0, principal - totalDistributions);
}

// Calculate tax liability on distributions
export function calculateTaxLiability(
  distributions: number,
  taxRate: number,
  trustType: string
): number {
  // Different tax treatments for different trust types
  let effectiveTaxRate = taxRate / 100;

  if (trustType === 'charitable') {
    effectiveTaxRate = 0; // Charitable trusts may have different tax treatment
  } else if (trustType === 'irrevocable') {
    effectiveTaxRate *= 0.8; // Simplified - irrevocable trusts may have lower effective rates
  }

  return distributions * effectiveTaxRate;
}

// Calculate net distribution after taxes and fees
export function calculateNetDistribution(
  grossDistribution: number,
  taxLiability: number,
  administrativeCosts: number
): number {
  return grossDistribution - taxLiability - administrativeCosts;
}

// Calculate inflation-adjusted value
export function calculateInflationAdjustedValue(
  value: number,
  inflationRate: number,
  years: number
): number {
  const rate = inflationRate / 100;
  return value / Math.pow(1 + rate, years);
}

// Calculate beneficiary income per period
export function calculateBeneficiaryIncome(
  netDistribution: number,
  frequency: string,
  beneficiaries: number
): number {
  const periodsPerYear = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
  return netDistribution / periodsPerYear / beneficiaries;
}

// Calculate administrative cost percentage
export function calculateAdministrativeCostPercentage(
  administrativeCosts: number,
  totalDistributions: number
): number {
  return totalDistributions > 0 ? (administrativeCosts / totalDistributions) * 100 : 0;
}

// Generate distribution schedule
export function generateDistributionSchedule(
  annualDistribution: number,
  duration: number,
  frequency: string
): string[] {
  const schedule: string[] = [];
  const periodsPerYear = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
  const periodAmount = annualDistribution / periodsPerYear;

  for (let year = 1; year <= Math.min(duration, 5); year++) {
    const periodName = frequency === 'monthly' ? 'Month' :
                      frequency === 'quarterly' ? 'Quarter' : 'Year';
    schedule.push(`Year ${year}: ${periodsPerYear} x $${periodAmount.toFixed(2)}`);
  }

  if (duration > 5) {
    schedule.push(`...continuing for ${duration - 5} more years`);
  }

  return schedule;
}

// Calculate tax efficiency of trust distributions
export function calculateTaxEfficiency(
  grossDistributions: number,
  netDistributions: number
): number {
  return grossDistributions > 0 ? (netDistributions / grossDistributions) * 100 : 100;
}

// Main calculation function
export function calculateTrustFundDistribution(inputs: TrustFundDistributionInputs): TrustFundDistributionOutputs {
  const annualDistribution = calculateAnnualDistribution(
    inputs.trustPrincipal,
    inputs.annualIncome,
    inputs.trustDuration
  );

  const monthlyDistribution = calculateMonthlyDistribution(
    inputs.trustPrincipal,
    inputs.annualIncome,
    inputs.trustDuration,
    inputs.distributionFrequency
  );

  const totalDistributions = calculateTotalDistributions(
    inputs.trustPrincipal,
    inputs.annualIncome,
    inputs.trustDuration
  );

  const remainingPrincipal = calculateRemainingPrincipal(
    inputs.trustPrincipal,
    totalDistributions
  );

  const taxLiability = calculateTaxLiability(
    totalDistributions,
    inputs.taxRate,
    inputs.trustType
  );

  const administrativeCosts = (inputs.administrativeCosts / 100) * totalDistributions;

  const netDistribution = calculateNetDistribution(
    totalDistributions,
    taxLiability,
    administrativeCosts
  );

  const trustDurationYears = inputs.trustDuration;

  const inflationAdjustedValue = calculateInflationAdjustedValue(
    netDistribution,
    inputs.inflationRate,
    trustDurationYears / 2 // Mid-point adjustment
  );

  const beneficiaryIncome = calculateBeneficiaryIncome(
    netDistribution,
    inputs.distributionFrequency,
    inputs.numberOfBeneficiaries
  );

  const administrativeCostPercentage = calculateAdministrativeCostPercentage(
    administrativeCosts,
    totalDistributions
  );

  const distributionSchedule = generateDistributionSchedule(
    annualDistribution,
    trustDurationYears,
    inputs.distributionFrequency
  );

  const taxEfficiency = calculateTaxEfficiency(
    totalDistributions,
    netDistribution
  );

  return {
    monthlyDistribution,
    annualDistribution,
    totalDistributions,
    remainingPrincipal,
    taxLiability,
    netDistribution,
    trustDurationYears,
    inflationAdjustedValue,
    beneficiaryIncome,
    administrativeCostPercentage,
    distributionSchedule,
    taxEfficiency
  };
}

// Generate analysis and recommendations
export function generateTrustFundDistributionAnalysis(
  inputs: TrustFundDistributionInputs,
  outputs: TrustFundDistributionOutputs
): TrustFundDistributionAnalysis {
  let recommendation = '';
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  if (outputs.remainingPrincipal < 0) {
    recommendation = 'Warning: Trust distributions exceed principal. Consider reducing distribution amounts or extending trust duration.';
    riskLevel = 'High';
  } else if (outputs.administrativeCostPercentage > 5) {
    recommendation = 'Administrative costs are high. Consider trusts with lower management fees.';
    riskLevel = 'Medium';
  } else if (inputs.trustType === 'irrevocable' && inputs.beneficiaryAge < 25) {
    recommendation = 'Irrevocable trusts work well for younger beneficiaries. Consider asset protection benefits.';
    riskLevel = 'Low';
  } else {
    recommendation = 'Trust distribution plan appears sustainable. Monitor investment performance and adjust as needed.';
    riskLevel = 'Low';
  }

  if (inputs.generationSkipping) {
    recommendation += ' Generation-skipping trusts can provide significant tax benefits for multiple generations.';
  }

  if (inputs.requiredMinimumDistribution && inputs.beneficiaryAge >= 73) {
    recommendation += ' RMDs will be required starting at age 73. Plan accordingly.';
  }

  return { recommendation, riskLevel };
}

// Calculate result for metrics
export function calculateResult(inputs: TrustFundDistributionInputs): number {
  const outputs = calculateTrustFundDistribution(inputs);
  return outputs.netDistribution;
}

// Generate metrics
export function generateMetrics(inputs: TrustFundDistributionInputs): TrustFundDistributionMetrics {
  return {
    result: calculateResult(inputs)
  };
}

// Generate analysis
export function generateAnalysis(inputs: TrustFundDistributionInputs): TrustFundDistributionAnalysis {
  const outputs = calculateTrustFundDistribution(inputs);
  return generateTrustFundDistributionAnalysis(inputs, outputs);
}