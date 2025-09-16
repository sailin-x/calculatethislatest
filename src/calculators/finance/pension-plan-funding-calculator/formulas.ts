import { PensionFundingInputs, PensionFundingResults, PensionFundingMetrics } from './types';

export function calculatePensionFunding(inputs: PensionFundingInputs): PensionFundingResults {
  const {
    currentPlanBalance,
    targetRetirementBalance,
    currentAge,
    retirementAge,
    annualContribution,
    employerMatch,
    expectedReturn,
    inflationRate,
    currentSalary,
    salaryGrowthRate,
    planType,
    fundingStrategy,
    includeCatchUp
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  const adjustedExpectedReturn = getAdjustedReturn(expectedReturn, fundingStrategy);

  // Calculate total contributions
  const totalEmployeeContributions = calculateTotalContributions(
    annualContribution,
    yearsToRetirement,
    salaryGrowthRate,
    includeCatchUp,
    currentAge
  );

  const totalEmployerContributions = calculateEmployerContributions(
    currentSalary,
    employerMatch,
    yearsToRetirement,
    salaryGrowthRate
  );

  const totalContributions = totalEmployeeContributions + totalEmployerContributions;

  // Calculate investment growth
  const investmentGrowth = calculateInvestmentGrowth(
    currentPlanBalance,
    totalContributions,
    adjustedExpectedReturn,
    yearsToRetirement
  );

  // Calculate projected balance
  const projectedBalance = currentPlanBalance + totalContributions + investmentGrowth;

  // Calculate funding gap
  const fundingGap = Math.max(0, targetRetirementBalance - projectedBalance);

  // Calculate monthly contribution needed
  const monthlyContributionNeeded = calculateMonthlyContributionNeeded(
    fundingGap,
    adjustedExpectedReturn,
    yearsToRetirement
  );

  // Calculate years to goal
  const yearsToGoal = calculateYearsToGoal(
    currentPlanBalance,
    targetRetirementBalance,
    annualContribution + (currentSalary * employerMatch / 100),
    adjustedExpectedReturn
  );

  // Calculate catch-up contribution if applicable
  const catchUpContribution = includeCatchUp && currentAge >= 50
    ? Math.min(annualContribution * 0.5, 6500) // 2024 catch-up limit
    : 0;

  // Calculate retirement readiness
  const retirementReadiness = Math.min(100, (projectedBalance / targetRetirementBalance) * 100);

  return {
    totalContributions,
    employerContributions: totalEmployerContributions,
    investmentGrowth,
    yearsToGoal,
    monthlyContributionNeeded,
    projectedBalance,
    fundingGap,
    catchUpContribution,
    retirementReadiness
  };
}

function getAdjustedReturn(expectedReturn: number, strategy: string): number {
  const adjustments = {
    'aggressive': 1.2,
    'moderate': 1.0,
    'conservative': 0.8
  };
  return expectedReturn * (adjustments[strategy as keyof typeof adjustments] || 1.0);
}

function calculateTotalContributions(
  annualContribution: number,
  years: number,
  salaryGrowth: number,
  includeCatchUp: boolean,
  currentAge: number
): number {
  let total = 0;
  let currentContribution = annualContribution;

  for (let year = 1; year <= years; year++) {
    total += currentContribution;

    // Add catch-up contribution if applicable
    if (includeCatchUp && currentAge + year >= 50) {
      total += Math.min(currentContribution * 0.5, 6500);
    }

    // Grow contribution with salary
    currentContribution *= (1 + salaryGrowth / 100);
  }

  return total;
}

function calculateEmployerContributions(
  currentSalary: number,
  employerMatch: number,
  years: number,
  salaryGrowth: number
): number {
  let total = 0;
  let currentSalaryAmount = currentSalary;

  for (let year = 1; year <= years; year++) {
    total += currentSalaryAmount * (employerMatch / 100);
    currentSalaryAmount *= (1 + salaryGrowth / 100);
  }

  return total;
}

function calculateInvestmentGrowth(
  currentBalance: number,
  contributions: number,
  expectedReturn: number,
  years: number
): number {
  // Simplified calculation - assumes contributions are made evenly throughout the year
  const averageBalance = currentBalance + (contributions / 2);
  return averageBalance * (Math.pow(1 + expectedReturn / 100, years) - 1);
}

function calculateMonthlyContributionNeeded(
  fundingGap: number,
  expectedReturn: number,
  years: number
): number {
  if (years <= 0 || fundingGap <= 0) return 0;

  const monthlyRate = expectedReturn / 100 / 12;
  const months = years * 12;

  if (monthlyRate === 0) {
    return fundingGap / months;
  }

  return fundingGap * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
         (Math.pow(1 + monthlyRate, months) - 1);
}

function calculateYearsToGoal(
  currentBalance: number,
  targetBalance: number,
  annualContribution: number,
  expectedReturn: number
): number {
  if (currentBalance >= targetBalance) return 0;
  if (annualContribution <= 0) return 999;

  const rate = expectedReturn / 100;
  const futureValue = targetBalance - currentBalance;

  if (rate === 0) {
    return futureValue / annualContribution;
  }

  // Solve for n in: PMT * ((1+r)^n - 1)/r = FV
  const n = Math.log((futureValue * rate / annualContribution) + 1) / Math.log(1 + rate);
  return Math.ceil(n);
}

export function calculatePensionFundingMetrics(
  inputs: PensionFundingInputs,
  results: PensionFundingResults
): PensionFundingMetrics {
  const { annualContribution, employerMatch, currentSalary, fundingStrategy, targetRetirementBalance } = inputs;
  const { totalContributions, employerContributions, projectedBalance } = results;

  // Calculate contribution efficiency
  const contributionEfficiency = totalContributions > 0
    ? (projectedBalance / totalContributions) * 100
    : 0;

  // Calculate employer match utilization
  const potentialEmployerMatch = currentSalary * (employerMatch / 100);
  const employerMatchUtilization = potentialEmployerMatch > 0
    ? (employerContributions / potentialEmployerMatch) * 100
    : 0;

  // Calculate risk-adjusted progress
  const riskAdjustment = {
    'aggressive': 0.9,
    'moderate': 1.0,
    'conservative': 1.1
  }[fundingStrategy] || 1.0;

  const riskAdjustedProgress = (projectedBalance / targetRetirementBalance) * riskAdjustment * 100;

  // Determine funding status
  let fundingStatus: 'on_track' | 'behind' | 'ahead' = 'on_track';
  if (projectedBalance < targetRetirementBalance * 0.8) fundingStatus = 'behind';
  else if (projectedBalance > targetRetirementBalance * 1.1) fundingStatus = 'ahead';

  // Determine retirement confidence
  let retirementConfidence: 'low' | 'medium' | 'high' = 'medium';
  if (riskAdjustedProgress < 70) retirementConfidence = 'low';
  else if (riskAdjustedProgress > 90) retirementConfidence = 'high';

  return {
    contributionEfficiency,
    employerMatchUtilization,
    riskAdjustedProgress,
    fundingStatus,
    retirementConfidence
  };
}

export function validatePensionFundingInputs(inputs: PensionFundingInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentPlanBalance < 0) {
    errors.push('Current plan balance cannot be negative');
  }

  if (inputs.targetRetirementBalance <= 0) {
    errors.push('Target retirement balance must be greater than $0');
  }

  if (inputs.currentAge < 0 || inputs.currentAge > 120) {
    errors.push('Current age must be between 0 and 120');
  }

  if (inputs.retirementAge <= inputs.currentAge) {
    errors.push('Retirement age must be greater than current age');
  }

  if (inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.employerMatch < 0 || inputs.employerMatch > 100) {
    errors.push('Employer match must be between 0% and 100%');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.currentSalary <= 0) {
    errors.push('Current salary must be greater than $0');
  }

  if (inputs.salaryGrowthRate < -10 || inputs.salaryGrowthRate > 20) {
    errors.push('Salary growth rate must be between -10% and 20%');
  }

  return errors;
}