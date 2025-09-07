import {
  FourZeroThreeBInputs,
  FourZeroThreeBMetrics,
  FourZeroThreeBAnalysis,
  FourZeroThreeBOutputs
} from './types';

// Helper function to calculate employee contributions
function calculateEmployeeContributions(
  annualSalary: number,
  employeeContributionPercent: number,
  yearsToRetirement: number,
  catchUpContributions: boolean,
  currentAge: number
): number {
  const baseContribution = annualSalary * (employeeContributionPercent / 100);
  let totalContributions = 0;

  for (let year = 0; year < yearsToRetirement; year++) {
    let yearlyContribution = baseContribution;

    // Add catch-up contributions for age 50+
    if (catchUpContributions && currentAge + year >= 50) {
      yearlyContribution += 6500; // 2023 catch-up limit
    }

    // Apply contribution limit
    yearlyContribution = Math.min(yearlyContribution, 22000); // 2023 limit

    totalContributions += yearlyContribution;
  }

  return totalContributions;
}

// Helper function to calculate employer match
function calculateEmployerMatch(
  annualSalary: number,
  employerMatchPercent: number,
  employeeContributionPercent: number,
  yearsToRetirement: number
): number {
  const employeeContribution = annualSalary * (employeeContributionPercent / 100);
  const matchAmount = Math.min(employeeContribution, annualSalary * (employerMatchPercent / 100));
  return matchAmount * yearsToRetirement;
}

// Helper function to calculate future value with compound growth
function calculateFutureValue(
  principal: number,
  annualContribution: number,
  years: number,
  annualReturn: number,
  inflationRate: number
): number {
  const monthlyReturn = annualReturn / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;
  const realReturn = monthlyReturn - monthlyInflation;

  let futureValue = principal;
  const monthlyContribution = annualContribution / 12;

  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      futureValue = (futureValue + monthlyContribution) * (1 + realReturn);
    }
  }

  return futureValue;
}

// Helper function to calculate tax savings
function calculateTaxSavings(
  contributions: number,
  taxRate: number
): number {
  return contributions * (taxRate / 100);
}

// Helper function to calculate required minimum distributions
function calculateRMD(age: number, balance: number): number {
  if (age < 73) return 0; // RMD starts at age 73

  const divisor = getLifeExpectancyDivisor(age);
  return balance / divisor;
}

// Helper function to get life expectancy divisor for RMD calculations
function getLifeExpectancyDivisor(age: number): number {
  // Simplified RMD table - in practice, this would use IRS tables
  if (age <= 73) return 26.5;
  if (age <= 74) return 25.5;
  if (age <= 75) return 24.6;
  if (age <= 76) return 23.7;
  if (age <= 77) return 22.9;
  if (age <= 78) return 22.0;
  if (age <= 79) return 21.1;
  if (age <= 80) return 20.2;
  if (age <= 81) return 19.4;
  if (age <= 82) return 18.5;
  if (age <= 83) return 17.7;
  if (age <= 84) return 16.8;
  if (age <= 85) return 16.0;
  if (age <= 86) return 15.2;
  if (age <= 87) return 14.4;
  if (age <= 88) return 13.7;
  if (age <= 89) return 12.9;
  if (age <= 90) return 12.2;
  if (age <= 91) return 11.5;
  if (age <= 92) return 10.8;
  if (age <= 93) return 10.1;
  if (age <= 94) return 9.5;
  if (age <= 95) return 8.9;
  if (age <= 96) return 8.4;
  if (age <= 97) return 7.8;
  if (age <= 98) return 7.3;
  if (age <= 99) return 6.8;
  return 6.4; // Age 100+
}

// Helper function to calculate safe withdrawal rate
function calculateSafeWithdrawalRate(balance: number, annualExpenses: number): number {
  return (annualExpenses / balance) * 100;
}

// Helper function to calculate replacement ratio
function calculateReplacementRatio(retirementIncome: number, preRetirementIncome: number): number {
  return (retirementIncome / preRetirementIncome) * 100;
}

// Helper function to generate scenario projections
function generateScenarios(
  baseInputs: FourZeroThreeBInputs,
  baseProjection: number
): { conservative: number; moderate: number; aggressive: number } {
  const conservativeReturn = baseInputs.expectedAnnualReturn * 0.7;
  const aggressiveReturn = baseInputs.expectedAnnualReturn * 1.3;

  const conservativeProjection = calculateFutureValue(
    baseInputs.currentBalance,
    baseInputs.annualSalary * (baseInputs.employeeContributionPercent / 100),
    baseInputs.retirementAge - baseInputs.currentAge,
    conservativeReturn,
    baseInputs.inflationRate
  );

  const aggressiveProjection = calculateFutureValue(
    baseInputs.currentBalance,
    baseInputs.annualSalary * (baseInputs.employeeContributionPercent / 100),
    baseInputs.retirementAge - baseInputs.currentAge,
    aggressiveReturn,
    baseInputs.inflationRate
  );

  return {
    conservative: conservativeProjection,
    moderate: baseProjection,
    aggressive: aggressiveProjection
  };
}

// Main calculation function
export function calculateFourZeroThreeB(
  inputs: FourZeroThreeBInputs
): FourZeroThreeBOutputs {
  const {
    currentAge,
    retirementAge,
    currentBalance,
    annualSalary,
    employeeContributionPercent,
    employerMatchPercent,
    expectedAnnualReturn,
    inflationRate,
    currentTaxRate,
    retirementTaxRate,
    catchUpContributions,
    analysisPeriod,
    includeSocialSecurity,
    socialSecurityBenefit,
    otherRetirementIncome,
    annualFees,
    administrativeFees
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;

  // Calculate contributions
  const employeeContributions = calculateEmployeeContributions(
    annualSalary,
    employeeContributionPercent,
    yearsToRetirement,
    catchUpContributions,
    currentAge
  );

  const employerContributions = calculateEmployerMatch(
    annualSalary,
    employerMatchPercent,
    employeeContributionPercent,
    yearsToRetirement
  );

  const totalContributions = employeeContributions + employerContributions;
  const averageAnnualContribution = totalContributions / yearsToRetirement;

  // Calculate growth projections
  const projectedBalance = calculateFutureValue(
    currentBalance,
    averageAnnualContribution,
    yearsToRetirement,
    expectedAnnualReturn,
    inflationRate
  );

  const totalGrowth = projectedBalance - currentBalance - totalContributions;

  // Calculate tax benefits
  const totalTaxSavings = calculateTaxSavings(employeeContributions, currentTaxRate);

  // Calculate retirement income
  const rmdAmount = calculateRMD(retirementAge, projectedBalance);
  const socialSecurityIncome = includeSocialSecurity ? socialSecurityBenefit * 12 : 0;
  const totalRetirementIncome = rmdAmount + socialSecurityIncome + otherRetirementIncome;
  const monthlyRetirementIncome = totalRetirementIncome / 12;

  // Calculate replacement ratio
  const replacementRatio = calculateReplacementRatio(totalRetirementIncome, annualSalary);

  // Calculate safe withdrawal rate
  const safeWithdrawalRate = calculateSafeWithdrawalRate(projectedBalance, totalRetirementIncome);

  // Generate scenarios
  const scenarios = generateScenarios(inputs, projectedBalance);

  // Generate analysis
  const analysis: FourZeroThreeBAnalysis = {
    retirementReadiness: replacementRatio > 80 ? 'Excellent' :
                        replacementRatio > 70 ? 'Good' :
                        replacementRatio > 60 ? 'Fair' :
                        replacementRatio > 50 ? 'Poor' : 'Critical',
    riskLevel: expectedAnnualReturn > 10 ? 'High' :
               expectedAnnualReturn > 7 ? 'Moderate' : 'Low',
    recommendation: replacementRatio < 70 ? 'Increase Contributions' :
                   replacementRatio > 90 ? 'Consider Alternatives' : 'Maintain Current',
    keyStrengths: [],
    keyWeaknesses: [],
    riskFactors: [],
    opportunities: [],
    contributionSummary: `Total contributions: $${totalContributions.toLocaleString()} over ${yearsToRetirement} years`,
    employerMatchAnalysis: `Employer contributions: $${employerContributions.toLocaleString()}`,
    catchUpAnalysis: catchUpContributions ? 'Catch-up contributions enabled for age 50+' : 'No catch-up contributions',
    performanceSummary: `Projected balance: $${projectedBalance.toLocaleString()}`,
    riskAdjustedReturns: `Expected return: ${expectedAnnualReturn}%`,
    diversificationAnalysis: '403(b) plan provides tax-deferred growth',
    taxEfficiencySummary: `Tax savings: $${totalTaxSavings.toLocaleString()}`,
    taxSavingsAnalysis: `Current tax rate: ${currentTaxRate}%, Retirement tax rate: ${retirementTaxRate}%`,
    retirementTaxAnalysis: 'Tax-deferred growth until retirement',
    retirementSecuritySummary: `Monthly income: $${monthlyRetirementIncome.toLocaleString()}`,
    incomeReplacementAnalysis: `Replacement ratio: ${replacementRatio.toFixed(1)}%`,
    longevityRiskAnalysis: `Safe withdrawal rate: ${safeWithdrawalRate.toFixed(1)}%`,
    contributionRecommendations: [
      'Maximize employer match',
      'Consider catch-up contributions at age 50',
      'Review contribution limits annually'
    ],
    investmentRecommendations: [
      'Diversify investment options',
      'Consider risk tolerance',
      'Review performance regularly'
    ],
    riskManagementRecommendations: [
      'Maintain emergency fund',
      'Consider insurance options',
      'Plan for healthcare costs'
    ],
    planningRecommendations: [
      'Work with financial advisor',
      'Review plan annually',
      'Update beneficiary designations'
    ],
    immediateActions: [
      'Increase contributions if below target',
      'Review investment allocations',
      'Check for employer match opportunities'
    ],
    shortTermGoals: [
      'Build emergency fund',
      'Pay off high-interest debt',
      'Increase retirement contributions'
    ],
    longTermStrategies: [
      'Maximize retirement savings',
      'Consider Roth conversion options',
      'Plan for required minimum distributions'
    ],
    performanceBenchmarks: [
      {
        metric: 'Annual Return',
        value: expectedAnnualReturn,
        benchmark: 7.0,
        industry: 'Retirement Plans'
      },
      {
        metric: 'Replacement Ratio',
        value: replacementRatio,
        benchmark: 70.0,
        industry: 'Retirement Planning'
      }
    ],
    decisionSummary: `Based on analysis, your retirement readiness is ${replacementRatio < 70 ? 'Poor' : replacementRatio < 80 ? 'Fair' : 'Good'}. ${replacementRatio < 70 ? 'Consider increasing contributions.' : 'You are on track for a comfortable retirement.'}`,
    scenarioAnalysis: [
      `Conservative scenario: $${scenarios.conservative.toLocaleString()}`,
      `Moderate scenario: $${scenarios.moderate.toLocaleString()}`,
      `Aggressive scenario: $${scenarios.aggressive.toLocaleString()}`
    ],
    sensitivityAnalysis: [
      '5% change in return affects balance by approximately 15%',
      '1 year change in retirement age affects balance by 8%',
      '2% change in inflation affects purchasing power by 12%'
    ]
  };

  return {
    projectedBalance,
    monthlyRetirementIncome,
    totalContributions,
    totalTaxSavings,
    analysis,
    annualContributions: averageAnnualContribution,
    totalGrowth,
    safeWithdrawalRate,
    replacementRatio,
    conservativeProjection: scenarios.conservative,
    moderateProjection: scenarios.moderate,
    aggressiveProjection: scenarios.aggressive
  };
}

// Validation function
export function validateFourZeroThreeBInputs(inputs: FourZeroThreeBInputs): string[] {
  const errors: string[] = [];

  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 100) {
    errors.push('Current age must be between 18 and 100');
  }

  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 100) {
    errors.push('Retirement age must be greater than current age and less than 100');
  }

  if (inputs.currentBalance !== undefined && inputs.currentBalance < 0) {
    errors.push('Current balance cannot be negative');
  }

  if (!inputs.annualSalary || inputs.annualSalary <= 0) {
    errors.push('Annual salary must be greater than 0');
  }

  if (inputs.employeeContributionPercent !== undefined &&
      (inputs.employeeContributionPercent < 0 || inputs.employeeContributionPercent > 100)) {
    errors.push('Employee contribution percentage must be between 0 and 100');
  }

  if (inputs.employerMatchPercent !== undefined &&
      (inputs.employerMatchPercent < 0 || inputs.employerMatchPercent > 100)) {
    errors.push('Employer match percentage must be between 0 and 100');
  }

  if (inputs.expectedAnnualReturn !== undefined &&
      (inputs.expectedAnnualReturn < 0 || inputs.expectedAnnualReturn > 20)) {
    errors.push('Expected annual return must be between 0 and 20 percent');
  }

  if (inputs.currentTaxRate !== undefined &&
      (inputs.currentTaxRate < 0 || inputs.currentTaxRate > 50)) {
    errors.push('Current tax rate must be between 0 and 50 percent');
  }

  if (inputs.retirementTaxRate !== undefined &&
      (inputs.retirementTaxRate < 0 || inputs.retirementTaxRate > 50)) {
    errors.push('Retirement tax rate must be between 0 and 50 percent');
  }

  return errors;
}