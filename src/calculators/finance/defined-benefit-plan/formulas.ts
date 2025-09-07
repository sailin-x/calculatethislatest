import {
  DefinedBenefitPlanInputs,
  DefinedBenefitPlanOutputs,
  DefinedBenefitPlanMetrics,
  DefinedBenefitPlanAnalysis
} from './types';

// Helper function to calculate vesting percentage
function calculateVestingPercentage(yearsOfService: number, vestingSchedule: string): number {
  switch (vestingSchedule) {
    case 'immediate':
      return 100;
    case 'cliff':
      return yearsOfService >= 3 ? 100 : 0;
    case 'graded':
      if (yearsOfService >= 6) return 100;
      if (yearsOfService >= 5) return 80;
      if (yearsOfService >= 4) return 60;
      if (yearsOfService >= 3) return 40;
      if (yearsOfService >= 2) return 20;
      return 0;
    default:
      return 0;
  }
}

// Helper function to calculate benefit amount
function calculateBenefitAmount(
  finalAverageSalary: number,
  yearsOfService: number,
  benefitMultiplier: number,
  benefitFormula: string
): number {
  switch (benefitFormula) {
    case 'final_average':
      return finalAverageSalary * yearsOfService * benefitMultiplier / 100;
    case 'career_average':
      return finalAverageSalary * yearsOfService * benefitMultiplier / 100;
    case 'flat_benefit':
      return benefitMultiplier * 12; // Monthly benefit
    default:
      return 0;
  }
}

// Helper function to calculate early retirement reduction
function calculateEarlyRetirementReduction(
  retirementAge: number,
  minimumRetirementAge: number,
  earlyRetirementReduction: number
): number {
  if (retirementAge >= minimumRetirementAge) return 1;
  const yearsEarly = minimumRetirementAge - retirementAge;
  return Math.max(0, 1 - (yearsEarly * earlyRetirementReduction / 100));
}

// Helper function to calculate lump sum equivalent
function calculateLumpSumEquivalent(
  monthlyBenefit: number,
  lifeExpectancy: number,
  discountRate: number
): number {
  const monthlyRate = discountRate / 12;
  const periods = lifeExpectancy * 12;

  if (monthlyRate === 0) {
    return monthlyBenefit * periods;
  }

  return monthlyBenefit * ((1 - Math.pow(1 + monthlyRate, -periods)) / monthlyRate);
}

// Helper function to calculate present value
function calculatePresentValue(
  futureValue: number,
  years: number,
  discountRate: number
): number {
  return futureValue / Math.pow(1 + discountRate, years);
}

// Helper function to assess plan health
function assessPlanHealth(fundingRatio: number): string {
  if (fundingRatio >= 1.0) return 'excellent';
  if (fundingRatio >= 0.9) return 'good';
  if (fundingRatio >= 0.8) return 'fair';
  if (fundingRatio >= 0.7) return 'poor';
  return 'critical';
}

// Main calculation function
export function calculateDefinedBenefitPlan(inputs: DefinedBenefitPlanInputs): DefinedBenefitPlanOutputs {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSalary,
    yearsOfService,
    expectedSalaryIncrease,
    finalAverageSalary,
    benefitMultiplier,
    yearsOfServiceRequired,
    minimumRetirementAge,
    earlyRetirementReduction,
    currentAccountBalance,
    employerContribution,
    employeeContribution,
    expectedReturnRate,
    colaRate,
    colaStartAge,
    taxBracket,
    analysisPeriod,
    inflationRate,
    discountRate
  } = inputs;

  // Calculate vesting
  const vestingPercentage = calculateVestingPercentage(yearsOfService, inputs.vestingSchedule);
  const yearsUntilVested = Math.max(0, 3 - yearsOfService); // Assuming 3-year cliff

  // Calculate benefit amount
  const baseMonthlyBenefit = calculateBenefitAmount(
    finalAverageSalary,
    Math.min(yearsOfService, yearsOfServiceRequired),
    benefitMultiplier,
    inputs.benefitFormula
  );

  // Apply early retirement reduction
  const earlyRetirementFactor = calculateEarlyRetirementReduction(
    retirementAge,
    minimumRetirementAge,
    earlyRetirementReduction
  );

  const adjustedMonthlyBenefit = baseMonthlyBenefit * earlyRetirementFactor * (vestingPercentage / 100);
  const annualBenefit = adjustedMonthlyBenefit * 12;

  // Calculate lump sum equivalent
  const lumpSumEquivalent = calculateLumpSumEquivalent(
    adjustedMonthlyBenefit,
    lifeExpectancy - retirementAge,
    discountRate
  );

  // Calculate present value
  const presentValue = calculatePresentValue(
    lumpSumEquivalent,
    retirementAge - currentAge,
    discountRate
  );

  // Calculate contributions
  const totalEmployerContributions = employerContribution * yearsOfService;
  const totalEmployeeContributions = employeeContribution * yearsOfService;
  const totalContributions = totalEmployerContributions + totalEmployeeContributions;

  // Calculate projected benefit with COLA
  const yearsWithCola = Math.max(0, lifeExpectancy - colaStartAge);
  const colaAdjustedBenefit = adjustedMonthlyBenefit * Math.pow(1 + colaRate / 100, yearsWithCola);

  // Assess plan health (simplified)
  const fundingRatio = 0.85; // This would come from plan data
  const planHealth = assessPlanHealth(fundingRatio);

  // Calculate comparison metrics
  const vsDefinedContribution = annualBenefit * 0.8; // Simplified comparison
  const replacementRatio = (annualBenefit / currentSalary) * 100;
  const benefitSecurity = fundingRatio * 100;

  // Create metrics object
  const metrics: DefinedBenefitPlanMetrics = {
    monthlyBenefit: adjustedMonthlyBenefit,
    annualBenefit,
    lumpSumEquivalent,
    presentValue,
    vestingPercentage,
    yearsUntilVested,
    totalEmployerContributions,
    totalEmployeeContributions,
    totalContributions,
    projectedBenefit: adjustedMonthlyBenefit,
    colaAdjustedBenefit,
    fundingRatio,
    planHealth: planHealth as any,
    vsDefinedContribution,
    replacementRatio,
    benefitSecurity
  };

  // Assess overall plan rating
  const planRating = vestingPercentage === 100 && fundingRatio >= 0.8
    ? 'Excellent'
    : vestingPercentage >= 80 && fundingRatio >= 0.7
    ? 'Good'
    : vestingPercentage >= 60
    ? 'Fair'
    : 'Poor';

  // Create analysis object
  const analysis: DefinedBenefitPlanAnalysis = {
    planRating: planRating as any,
    recommendation: planRating === 'Excellent' || planRating === 'Good'
      ? 'Your defined benefit plan provides strong retirement security'
      : 'Consider supplementing with additional retirement savings',
    keyInsights: [
      `Monthly benefit: $${Math.round(adjustedMonthlyBenefit).toLocaleString()}`,
      `Vesting status: ${vestingPercentage}%`,
      `Replacement ratio: ${Math.round(replacementRatio)}%`,
      `Plan funding: ${Math.round(fundingRatio * 100)}%`
    ],

    benefitCalculation: `Based on ${yearsOfService} years of service and final average salary of $${finalAverageSalary.toLocaleString()}`,
    vestingAnalysis: vestingPercentage === 100
      ? 'Fully vested - entitled to full benefit'
      : `Vested at ${vestingPercentage}% - ${yearsUntilVested} years until full vesting`,
    retirementReadiness: replacementRatio >= 70
      ? 'Strong retirement income replacement'
      : 'Consider additional retirement planning',

    planStability: fundingRatio >= 0.9
      ? 'Well-funded plan with strong financial health'
      : 'Monitor plan funding status closely',
    fundingStatus: `Plan is ${Math.round(fundingRatio * 100)}% funded`,
    employerCommitment: employerContribution > 0
      ? 'Employer provides matching contributions'
      : 'Employee-funded plan',

    longevityRisk: lifeExpectancy > 90
      ? 'Long life expectancy increases benefit value'
      : 'Conservative life expectancy assumptions',
    inflationRisk: colaRate > 2
      ? 'Good inflation protection with COLA'
      : 'Limited inflation protection',
    investmentRisk: inputs.planType === 'traditional'
      ? 'Employer bears investment risk'
      : 'Shared risk between employer and employee',

    taxStrategy: `Benefits taxed as ordinary income at ${taxBracket}% bracket`,
    withdrawalOptimization: 'Benefits can be taken as annuity or lump sum',

    vsOtherRetirementOptions: `Defined benefit vs 401(k): ${Math.round((annualBenefit / vsDefinedContribution - 1) * 100)}% advantage`,
    costBenefitAnalysis: `Net benefit: $${Math.round(annualBenefit - totalEmployeeContributions).toLocaleString()}`,

    immediateActions: [
      'Review plan summary and benefit statement',
      'Verify vesting status and service credit',
      'Update beneficiary designations',
      'Consider spousal benefits if applicable'
    ],

    longTermStrategy: `Plan provides guaranteed income for ${lifeExpectancy - retirementAge} years`,
    monitoringPlan: 'Review annual benefit statements and plan funding updates',

    recommendedResources: [
      'PBGC website for plan insurance information',
      'IRS Publication 575 (Pension and Annuity Income)',
      'Plan administrator benefit calculator',
      'Financial advisor consultation'
    ],

    nextSteps: [
      'Request personalized benefit estimate',
      'Review plan provisions and options',
      'Consider integration with other retirement accounts',
      'Plan for required minimum distributions if applicable'
    ]
  };

  return {
    metrics,
    analysis,
    monthlyRetirementIncome: adjustedMonthlyBenefit,
    annualRetirementIncome: annualBenefit,
    totalValue: presentValue,
    netBenefit: annualBenefit - totalEmployeeContributions
  };
}

// Validation function
export function validateDefinedBenefitPlanInputs(inputs: DefinedBenefitPlanInputs): string[] {
  const errors: string[] = [];

  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 80) {
    errors.push('Current age must be between 18 and 80');
  }

  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 100) {
    errors.push('Retirement age must be greater than current age and less than 100');
  }

  if (!inputs.yearsOfService || inputs.yearsOfService < 0) {
    errors.push('Years of service cannot be negative');
  }

  if (!inputs.finalAverageSalary || inputs.finalAverageSalary <= 0) {
    errors.push('Final average salary must be greater than 0');
  }

  if (!inputs.benefitMultiplier || inputs.benefitMultiplier <= 0) {
    errors.push('Benefit multiplier must be greater than 0');
  }

  if (!inputs.minimumRetirementAge || inputs.minimumRetirementAge < 50 || inputs.minimumRetirementAge > 70) {
    errors.push('Minimum retirement age must be between 50 and 70');
  }

  if (inputs.expectedReturnRate !== undefined && (inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2)) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  return errors;
}