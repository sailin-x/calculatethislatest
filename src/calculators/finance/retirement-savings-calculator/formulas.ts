import { RetirementSavingsInputs, RetirementSavingsResults, RetirementSavingsMetrics } from './types';

export function calculateRetirementSavings(inputs: RetirementSavingsInputs): RetirementSavingsResults {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    inflationRate,
    retirementIncomeNeeded,
    socialSecurityBenefit,
    taxBracket,
    contributionFrequency,
    accountType,
    employerMatch,
    employerMatchLimit
  } = inputs;

  // Calculate years to retirement
  const yearsToRetirement = retirementAge - currentAge;

  // Calculate total contributions
  const annualContribution = contributionFrequency === 'monthly' ? monthlyContribution * 12 : monthlyContribution;
  const employerContribution = Math.min(annualContribution * (employerMatch / 100), employerMatchLimit);
  const totalAnnualContribution = annualContribution + employerContribution;

  // Calculate future value of current savings
  const futureValueCurrent = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);

  // Calculate future value of contributions
  const futureValueContributions = totalAnnualContribution * ((Math.pow(1 + expectedReturn / 100, yearsToRetirement) - 1) / (expectedReturn / 100));

  // Calculate total savings at retirement
  const totalSavingsAtRetirement = futureValueCurrent + futureValueContributions;

  // Calculate net income sources
  const totalIncomeSources = socialSecurityBenefit + (retirementIncomeNeeded - socialSecurityBenefit) * (1 - taxBracket / 100);

  // Calculate savings gap
  const savingsGap = Math.max(0, retirementIncomeNeeded - totalIncomeSources);

  // Calculate monthly and annual savings needed
  const annualSavingsNeeded = savingsGap;
  const monthlySavingsNeeded = annualSavingsNeeded / 12;

  // Calculate retirement readiness score (0-100)
  const readinessScore = Math.min(100, Math.max(0, (totalSavingsAtRetirement / retirementIncomeNeeded) * 100));

  // Calculate replacement ratio
  const replacementRatio = (totalIncomeSources / retirementIncomeNeeded) * 100;

  // Determine savings strategy
  const savingsStrategy = determineSavingsStrategy(
    readinessScore,
    yearsToRetirement,
    totalSavingsAtRetirement,
    retirementIncomeNeeded
  );

  return {
    totalSavingsAtRetirement,
    monthlySavingsNeeded,
    annualSavingsNeeded,
    savingsGap,
    yearsToRetirement,
    retirementReadinessScore: readinessScore,
    projectedAnnualIncome: totalIncomeSources,
    replacementRatio,
    savingsStrategy
  };
}

function determineSavingsStrategy(
  readinessScore: number,
  yearsToRetirement: number,
  savings: number,
  needed: number
): string {
  if (readinessScore >= 90) {
    return 'Excellent progress - consider tax-advantaged accounts and catch-up contributions';
  } else if (readinessScore >= 70) {
    return 'Good progress - focus on consistent contributions and investment growth';
  } else if (readinessScore >= 50) {
    return 'Moderate progress - increase contributions and consider professional advice';
  } else if (yearsToRetirement > 20) {
    return 'Behind schedule - significantly increase contributions and consider delaying retirement';
  } else {
    return 'Significantly behind - immediate action needed: increase contributions, reduce expenses, or delay retirement';
  }
}

export function calculateRetirementSavingsMetrics(
  inputs: RetirementSavingsInputs,
  results: RetirementSavingsResults
): RetirementSavingsMetrics {
  const { monthlyContribution, currentSavings, expectedReturn, currentAge, retirementAge } = inputs;
  const { retirementReadinessScore, totalSavingsAtRetirement, annualSavingsNeeded } = results;
  const yearsToRetirement = retirementAge - currentAge;

  // Calculate savings rate
  const annualIncome = monthlyContribution * 12 * 2; // Rough estimate
  const savingsRate = annualIncome > 0 ? ((monthlyContribution * 12) / annualIncome) * 100 : 0;

  // Calculate investment efficiency
  const investmentEfficiency = expectedReturn > 0 ? (totalSavingsAtRetirement / (currentSavings + monthlyContribution * 12 * yearsToRetirement)) * 100 : 0;

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  if (yearsToRetirement > 30) riskLevel = 'high';
  else if (yearsToRetirement < 10) riskLevel = 'low';

  // Determine goal achievement
  let goalAchievement: 'behind' | 'on_track' | 'ahead' = 'on_track';
  if (retirementReadinessScore < 60) goalAchievement = 'behind';
  else if (retirementReadinessScore > 90) goalAchievement = 'ahead';

  return {
    savingsRate,
    investmentEfficiency,
    riskLevel,
    timeHorizon: yearsToRetirement,
    goalAchievement
  };
}

export function validateRetirementSavingsInputs(inputs: RetirementSavingsInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentAge < 0 || inputs.currentAge > 120) {
    errors.push('Current age must be between 0 and 120');
  }

  if (inputs.retirementAge <= inputs.currentAge) {
    errors.push('Retirement age must be greater than current age');
  }

  if (inputs.currentSavings < 0) {
    errors.push('Current savings cannot be negative');
  }

  if (inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.inflationRate < -10 || inputs.inflationRate > 20) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  if (inputs.retirementIncomeNeeded <= 0) {
    errors.push('Retirement income needed must be greater than $0');
  }

  if (inputs.socialSecurityBenefit < 0) {
    errors.push('Social Security benefit cannot be negative');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.employerMatch < 0 || inputs.employerMatch > 100) {
    errors.push('Employer match must be between 0% and 100%');
  }

  if (inputs.employerMatchLimit < 0) {
    errors.push('Employer match limit cannot be negative');
  }

  return errors;
}