import { ExecutiveDeferredCompensationInputs, ExecutiveDeferredCompensationResults } from './types';

/**
 * Calculate comprehensive executive deferred compensation analysis
 */
export function calculateExecutiveDeferredCompensation(inputs: ExecutiveDeferredCompensationInputs): ExecutiveDeferredCompensationResults {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    expectedSalaryGrowth,
    annualDeferralAmount,
    deferralPercentage,
    vestingPeriod,
    cliffVesting,
    expectedReturn,
    companyMatch,
    companyMatchLimit,
    currentTaxRate,
    deferredTaxRate,
    capitalGainsTaxRate,
    employerContribution,
    vestingSchedule,
    distributionOptions,
    companyRisk,
    marketRisk,
    analysisYears,
    inflationRate
  } = inputs;

  // Calculate working years
  const workingYears = retirementAge - currentAge;
  const vestingYears = Math.min(workingYears, vestingPeriod);

  // Calculate deferral amounts
  const calculatedDeferralAmount = deferralPercentage > 0
    ? (currentSalary * deferralPercentage / 100)
    : annualDeferralAmount;

  // Calculate vesting schedule
  const vestingPercentage = calculateVestingPercentage(vestingSchedule, vestingYears, vestingPeriod, cliffVesting);

  // Calculate current balances
  const currentAccountBalance = calculatedDeferralAmount * vestingPercentage;
  const vestedBalance = currentAccountBalance;
  const unvestedBalance = calculatedDeferralAmount - vestedBalance;

  // Calculate future value projections
  const projectedValueAtRetirement = calculateFutureValue(
    calculatedDeferralAmount,
    workingYears,
    expectedReturn,
    expectedSalaryGrowth,
    companyMatch,
    companyMatchLimit,
    employerContribution
  );

  // Calculate tax analysis
  const taxDeferredGrowth = calculateTaxDeferredGrowth(
    calculatedDeferralAmount,
    workingYears,
    expectedReturn,
    currentTaxRate,
    deferredTaxRate
  );

  const totalTaxSavings = taxDeferredGrowth;

  // Calculate after-tax value
  const projectedValueAfterTaxes = projectedValueAtRetirement * (1 - deferredTaxRate / 100);

  // Calculate inflation-adjusted value
  const projectedValueAfterInflation = projectedValueAfterTaxes / Math.pow(1 + inflationRate / 100, workingYears);

  // Calculate risk assessment
  const riskAdjustedValue = calculateRiskAdjustedValue(projectedValueAtRetirement, companyRisk, marketRisk);
  const worstCaseScenario = projectedValueAtRetirement * 0.7; // 30% downside
  const bestCaseScenario = projectedValueAtRetirement * 1.5; // 50% upside

  // Calculate comparison analysis
  const traditionalSavingsComparison = calculateTraditionalSavings(
    calculatedDeferralAmount,
    workingYears,
    expectedReturn * 0.8, // Lower return for traditional savings
    currentTaxRate
  );

  const netAdvantage = projectedValueAfterTaxes - traditionalSavingsComparison;
  const breakEvenYears = calculateBreakEvenYears(
    calculatedDeferralAmount,
    expectedReturn,
    currentTaxRate,
    deferredTaxRate
  );

  // Calculate distribution analysis
  const lumpSumValue = projectedValueAfterTaxes;
  const annuityValue = calculateAnnuityValue(projectedValueAfterTaxes, retirementAge, 85); // Assume 85 year life expectancy
  const installmentValue = calculateInstallmentValue(projectedValueAfterTaxes, 10); // 10-year installments

  // Calculate tax analysis details
  const deferredTaxLiability = projectedValueAtRetirement * (deferredTaxRate / 100);
  const capitalGainsTax = 0; // Deferred compensation typically not subject to capital gains
  const totalTaxEfficiency = ((projectedValueAfterTaxes - traditionalSavingsComparison) / traditionalSavingsComparison) * 100;

  // Generate recommendations
  const recommendedDeferralAmount = Math.min(currentSalary * 0.1, 22000); // Max 401(k) limit or 10% of salary
  const optimalVestingStrategy = determineOptimalVestingStrategy(inputs);
  const riskMitigationStrategies = generateRiskMitigationStrategies(inputs);

  // Calculate annual deferral savings
  const annualDeferralSavings = calculatedDeferralAmount * (currentTaxRate / 100);

  return {
    currentAccountBalance,
    vestedBalance,
    unvestedBalance,
    projectedValueAtRetirement,
    projectedValueAfterTaxes,
    projectedValueAfterInflation,
    annualDeferralSavings,
    taxDeferredGrowth,
    totalTaxSavings,
    riskAdjustedValue,
    worstCaseScenario,
    bestCaseScenario,
    traditionalSavingsComparison,
    netAdvantage,
    breakEvenYears,
    lumpSumValue,
    annuityValue,
    installmentValue,
    deferredTaxLiability,
    capitalGainsTax,
    totalTaxEfficiency,
    recommendedDeferralAmount,
    optimalVestingStrategy,
    riskMitigationStrategies
  };
}

/**
 * Calculate vesting percentage based on schedule
 */
function calculateVestingPercentage(
  schedule: string,
  years: number,
  totalYears: number,
  isCliff: boolean
): number {
  if (schedule === 'immediate') return 1.0;
  if (isCliff) return years >= totalYears ? 1.0 : 0.0;

  // Graded vesting schedule
  if (schedule === 'graded') {
    if (years >= totalYears) return 1.0;
    if (years >= totalYears * 0.8) return 0.8;
    if (years >= totalYears * 0.6) return 0.6;
    if (years >= totalYears * 0.4) return 0.4;
    if (years >= totalYears * 0.2) return 0.2;
    return 0.0;
  }

  return years / totalYears; // Linear vesting
}

/**
 * Calculate future value of deferred compensation
 */
function calculateFutureValue(
  deferralAmount: number,
  years: number,
  returnRate: number,
  salaryGrowth: number,
  companyMatch: number,
  matchLimit: number,
  employerContribution: number
): number {
  let totalValue = 0;
  let currentDeferral = deferralAmount;

  for (let year = 1; year <= years; year++) {
    // Add current year contributions
    const employerMatch = Math.min(currentDeferral * (companyMatch / 100), matchLimit);
    const totalContribution = currentDeferral + employerMatch + employerContribution;

    // Grow existing balance
    totalValue *= (1 + returnRate / 100);

    // Add new contributions
    totalValue += totalContribution;

    // Grow salary for next year
    currentDeferral *= (1 + salaryGrowth / 100);
  }

  return totalValue;
}

/**
 * Calculate tax-deferred growth benefit
 */
function calculateTaxDeferredGrowth(
  deferralAmount: number,
  years: number,
  returnRate: number,
  currentTaxRate: number,
  deferredTaxRate: number
): number {
  const futureValue = deferralAmount * Math.pow(1 + returnRate / 100, years);
  const taxSavings = futureValue * (currentTaxRate - deferredTaxRate) / 100;
  return taxSavings;
}

/**
 * Calculate risk-adjusted value
 */
function calculateRiskAdjustedValue(value: number, companyRisk: string, marketRisk: string): number {
  let riskMultiplier = 1.0;

  // Company risk adjustment
  switch (companyRisk) {
    case 'low': riskMultiplier *= 0.95; break;
    case 'medium': riskMultiplier *= 0.85; break;
    case 'high': riskMultiplier *= 0.7; break;
  }

  // Market risk adjustment
  switch (marketRisk) {
    case 'conservative': riskMultiplier *= 0.9; break;
    case 'moderate': riskMultiplier *= 0.8; break;
    case 'aggressive': riskMultiplier *= 0.6; break;
  }

  return value * riskMultiplier;
}

/**
 * Calculate traditional savings comparison
 */
function calculateTraditionalSavings(
  deferralAmount: number,
  years: number,
  returnRate: number,
  taxRate: number
): number {
  let balance = 0;
  for (let year = 1; year <= years; year++) {
    balance *= (1 + returnRate / 100);
    balance += deferralAmount * (1 - taxRate / 100);
  }
  return balance;
}

/**
 * Calculate break-even years
 */
function calculateBreakEvenYears(
  deferralAmount: number,
  returnRate: number,
  currentTaxRate: number,
  deferredTaxRate: number
): number {
  const taxSavingsPerYear = deferralAmount * (currentTaxRate - deferredTaxRate) / 100;
  const annualGrowth = deferralAmount * (returnRate / 100);

  if (annualGrowth <= 0) return 999; // Never breaks even

  return taxSavingsPerYear / annualGrowth;
}

/**
 * Calculate annuity value
 */
function calculateAnnuityValue(principal: number, retirementAge: number, lifeExpectancy: number): number {
  const years = Math.max(1, lifeExpectancy - retirementAge);
  const annualPayment = principal / years;
  return annualPayment * years; // Simplified - in reality would use present value
}

/**
 * Calculate installment value
 */
function calculateInstallmentValue(principal: number, years: number): number {
  return principal / years;
}

/**
 * Determine optimal vesting strategy
 */
function determineOptimalVestingStrategy(inputs: ExecutiveDeferredCompensationInputs): string {
  const { vestingSchedule, cliffVesting, vestingPeriod, currentAge, retirementAge } = inputs;

  if (cliffVesting && vestingPeriod > (retirementAge - currentAge)) {
    return 'Consider graded vesting to ensure partial vesting before retirement';
  }

  if (vestingSchedule === 'immediate') {
    return 'Immediate vesting provides maximum flexibility';
  }

  return `${vestingSchedule} vesting with ${vestingPeriod}-year schedule is appropriate for your situation`;
}

/**
 * Generate risk mitigation strategies
 */
function generateRiskMitigationStrategies(inputs: ExecutiveDeferredCompensationInputs): string[] {
  const strategies: string[] = [];

  if (inputs.companyRisk === 'high') {
    strategies.push('Diversify investments across multiple asset classes');
    strategies.push('Consider guaranteed investment options');
  }

  if (inputs.marketRisk === 'aggressive') {
    strategies.push('Implement dollar-cost averaging strategy');
    strategies.push('Consider balanced investment allocation');
  }

  strategies.push('Maintain emergency fund outside deferred compensation plan');
  strategies.push('Review plan documents annually for changes');
  strategies.push('Consider professional financial advice for complex situations');

  return strategies;
}

/**
 * Validate executive deferred compensation inputs
 */
export function validateExecutiveDeferredCompensationInputs(inputs: ExecutiveDeferredCompensationInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentAge < 18 || inputs.currentAge > 70) {
    errors.push('Current age must be between 18 and 70');
  }

  if (inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 75) {
    errors.push('Retirement age must be greater than current age and less than or equal to 75');
  }

  if (inputs.currentSalary < 0) {
    errors.push('Current salary cannot be negative');
  }

  if (inputs.expectedSalaryGrowth < -10 || inputs.expectedSalaryGrowth > 20) {
    errors.push('Expected salary growth must be between -10% and 20%');
  }

  if (inputs.annualDeferralAmount < 0) {
    errors.push('Annual deferral amount cannot be negative');
  }

  if (inputs.deferralPercentage < 0 || inputs.deferralPercentage > 100) {
    errors.push('Deferral percentage must be between 0% and 100%');
  }

  if (inputs.vestingPeriod < 0 || inputs.vestingPeriod > 10) {
    errors.push('Vesting period must be between 0 and 10 years');
  }

  if (inputs.expectedReturn < -10 || inputs.expectedReturn > 30) {
    errors.push('Expected return must be between -10% and 30%');
  }

  if (inputs.companyMatch < 0 || inputs.companyMatch > 200) {
    errors.push('Company match must be between 0% and 200%');
  }

  if (inputs.currentTaxRate < 0 || inputs.currentTaxRate > 50) {
    errors.push('Current tax rate must be between 0% and 50%');
  }

  if (inputs.deferredTaxRate < 0 || inputs.deferredTaxRate > 50) {
    errors.push('Deferred tax rate must be between 0% and 50%');
  }

  if (inputs.capitalGainsTaxRate < 0 || inputs.capitalGainsTaxRate > 30) {
    errors.push('Capital gains tax rate must be between 0% and 30%');
  }

  if (inputs.analysisYears < 1 || inputs.analysisYears > 50) {
    errors.push('Analysis years must be between 1 and 50');
  }

  if (inputs.inflationRate < 0 || inputs.inflationRate > 10) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  return errors;
}