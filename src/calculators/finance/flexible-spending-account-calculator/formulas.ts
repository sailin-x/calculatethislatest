import { FlexibleSpendingAccountInputs, FlexibleSpendingAccountResults } from './types';

/**
 * Calculate comprehensive flexible spending account analysis
 */
export function calculateFlexibleSpendingAccount(inputs: FlexibleSpendingAccountInputs): FlexibleSpendingAccountResults {
  const {
    accountType,
    annualContributionLimit,
    currentBalance,
    contributionFrequency,
    filingStatus,
    numberOfDependents,
    hasSpouse,
    spouseHasCoverage,
    hasHealthInsurance,
    insuranceType,
    expectedMedicalExpenses,
    preventiveCareExpenses,
    prescriptionExpenses,
    dentalExpenses,
    visionExpenses,
    childcareExpenses,
    eldercareExpenses,
    dependentAges,
    childcareProvider,
    monthlyParkingCost,
    monthlyTransitCost,
    workDaysPerMonth,
    distanceToWork,
    marginalTaxRate,
    stateTaxRate,
    employerMatch,
    planYearStart,
    planYearEnd,
    gracePeriodDays,
    carryoverAllowed,
    maxCarryoverAmount,
    usedToDate,
    projectedUsage,
    lastReimbursementDate
  } = inputs;

  // Calculate recommended contribution based on account type
  const recommendedContribution = calculateRecommendedContribution(inputs);
  const maximumContribution = annualContributionLimit;

  // Calculate tax savings
  const taxSavings = calculateTaxSavings(recommendedContribution, inputs);
  const netCost = recommendedContribution - taxSavings;

  // Calculate expense analysis
  const totalExpectedExpenses = calculateTotalExpectedExpenses(inputs);
  const coveredExpenses = Math.min(recommendedContribution, totalExpectedExpenses);
  const uncoveredExpenses = Math.max(0, totalExpectedExpenses - recommendedContribution);
  const utilizationRate = recommendedContribution > 0 ? (coveredExpenses / recommendedContribution) * 100 : 0;

  // Calculate savings analysis
  const annualSavings = taxSavings;
  const lifetimeSavings = taxSavings * 10; // Assuming 10-year career
  const breakEvenPoint = recommendedContribution / (marginalTaxRate / 100);

  // Calculate risk analysis
  const riskAnalysis = calculateRiskAnalysis(inputs, recommendedContribution);
  const { underContributionRisk, overContributionRisk, forfeitureRisk } = riskAnalysis;

  // Calculate cash flow analysis
  const monthlyContribution = calculateMonthlyContribution(recommendedContribution, contributionFrequency);
  const reimbursementSchedule = generateReimbursementSchedule(inputs, recommendedContribution);

  // Calculate tax analysis
  const federalTaxSavings = recommendedContribution * (marginalTaxRate / 100);
  const stateTaxSavings = recommendedContribution * (stateTaxRate / 100);
  const ficaSavings = 0; // FSA contributions are pre-tax, so no FICA savings
  const totalTaxAdvantage = federalTaxSavings + stateTaxSavings;

  // Calculate employer benefits
  const employerContribution = recommendedContribution * (employerMatch / 100);
  const totalEmployerCost = employerContribution;
  const employeeSavings = taxSavings;

  // Generate recommendations
  const optimalContribution = calculateOptimalContribution(inputs);
  const riskLevel = determineRiskLevel(inputs);
  const strategyRecommendations = generateStrategyRecommendations(inputs);
  const alternativeOptions = generateAlternativeOptions(inputs);

  // Calculate compliance
  const gracePeriodUtilization = calculateGracePeriodUtilization(inputs);
  const carryoverUtilization = calculateCarryoverUtilization(inputs);
  const complianceScore = calculateComplianceScore(inputs);

  return {
    recommendedContribution,
    maximumContribution,
    taxSavings,
    netCost,
    totalExpectedExpenses,
    coveredExpenses,
    uncoveredExpenses,
    utilizationRate,
    annualSavings,
    lifetimeSavings,
    breakEvenPoint,
    underContributionRisk,
    overContributionRisk,
    forfeitureRisk,
    monthlyContribution,
    reimbursementSchedule,
    federalTaxSavings,
    stateTaxSavings,
    ficaSavings,
    totalTaxAdvantage,
    employerContribution,
    totalEmployerCost,
    employeeSavings,
    optimalContribution,
    riskLevel,
    strategyRecommendations,
    alternativeOptions,
    gracePeriodUtilization,
    carryoverUtilization,
    complianceScore
  };
}

/**
 * Calculate recommended contribution based on account type and expenses
 */
function calculateRecommendedContribution(inputs: FlexibleSpendingAccountInputs): number {
  const { accountType, annualContributionLimit } = inputs;

  switch (accountType) {
    case 'health':
      return calculateHealthFSAContribution(inputs);
    case 'dependent':
      return calculateDependentCareFSAContribution(inputs);
    case 'parking':
      return calculateParkingFSAContribution(inputs);
    case 'transit':
      return calculateTransitFSAContribution(inputs);
    default:
      return 0;
  }
}

/**
 * Calculate health FSA contribution recommendation
 */
function calculateHealthFSAContribution(inputs: FlexibleSpendingAccountInputs): number {
  const {
    expectedMedicalExpenses,
    preventiveCareExpenses,
    prescriptionExpenses,
    dentalExpenses,
    visionExpenses,
    annualContributionLimit,
    hasSpouse,
    numberOfDependents
  } = inputs;

  const totalExpenses = expectedMedicalExpenses + preventiveCareExpenses +
                       prescriptionExpenses + dentalExpenses + visionExpenses;

  // Adjust for family size
  const familyMultiplier = hasSpouse || numberOfDependents > 0 ? 1.2 : 1.0;

  // Recommend 80-90% of expected expenses, capped by limit
  const recommended = Math.min(totalExpenses * familyMultiplier * 0.85, annualContributionLimit);

  return Math.max(0, recommended);
}

/**
 * Calculate dependent care FSA contribution recommendation
 */
function calculateDependentCareFSAContribution(inputs: FlexibleSpendingAccountInputs): number {
  const { childcareExpenses, eldercareExpenses, annualContributionLimit } = inputs;

  const totalExpenses = childcareExpenses + eldercareExpenses;

  // Recommend 90% of expected expenses, capped by limit
  const recommended = Math.min(totalExpenses * 0.9, annualContributionLimit);

  return Math.max(0, recommended);
}

/**
 * Calculate parking FSA contribution recommendation
 */
function calculateParkingFSAContribution(inputs: FlexibleSpendingAccountInputs): number {
  const { monthlyParkingCost, workDaysPerMonth } = inputs;

  const annualParkingCost = monthlyParkingCost * 12;
  const eligibleAmount = Math.min(annualParkingCost, 280); // 2024 IRS limit

  return eligibleAmount;
}

/**
 * Calculate transit FSA contribution recommendation
 */
function calculateTransitFSAContribution(inputs: FlexibleSpendingAccountInputs): number {
  const { monthlyTransitCost, workDaysPerMonth } = inputs;

  const annualTransitCost = monthlyTransitCost * 12;
  const eligibleAmount = Math.min(annualTransitCost, 315); // 2024 IRS limit

  return eligibleAmount;
}

/**
 * Calculate total expected expenses
 */
function calculateTotalExpectedExpenses(inputs: FlexibleSpendingAccountInputs): number {
  const { accountType } = inputs;

  switch (accountType) {
    case 'health':
      return inputs.expectedMedicalExpenses + inputs.preventiveCareExpenses +
             inputs.prescriptionExpenses + inputs.dentalExpenses + inputs.visionExpenses;
    case 'dependent':
      return inputs.childcareExpenses + inputs.eldercareExpenses;
    case 'parking':
      return inputs.monthlyParkingCost * 12;
    case 'transit':
      return inputs.monthlyTransitCost * 12;
    default:
      return 0;
  }
}

/**
 * Calculate tax savings
 */
function calculateTaxSavings(contribution: number, inputs: FlexibleSpendingAccountInputs): number {
  const { marginalTaxRate, stateTaxRate } = inputs;

  const federalSavings = contribution * (marginalTaxRate / 100);
  const stateSavings = contribution * (stateTaxRate / 100);

  return federalSavings + stateSavings;
}

/**
 * Calculate monthly contribution amount
 */
function calculateMonthlyContribution(annualContribution: number, frequency: string): number {
  switch (frequency) {
    case 'monthly':
      return annualContribution / 12;
    case 'bi-weekly':
      return annualContribution / 26;
    case 'weekly':
      return annualContribution / 52;
    default:
      return annualContribution / 12;
  }
}

/**
 * Generate reimbursement schedule
 */
function generateReimbursementSchedule(inputs: FlexibleSpendingAccountInputs, annualContribution: number): Array<{
  month: string;
  contribution: number;
  expenses: number;
  reimbursement: number;
  balance: number;
}> {
  const schedule = [];
  const monthlyContribution = annualContribution / 12;
  const monthlyExpenses = calculateTotalExpectedExpenses(inputs) / 12;

  let balance = 0;

  for (let month = 1; month <= 12; month++) {
    balance += monthlyContribution;
    const reimbursement = Math.min(balance, monthlyExpenses);
    balance -= reimbursement;

    schedule.push({
      month: `Month ${month}`,
      contribution: monthlyContribution,
      expenses: monthlyExpenses,
      reimbursement,
      balance
    });
  }

  return schedule;
}

/**
 * Calculate risk analysis
 */
function calculateRiskAnalysis(inputs: FlexibleSpendingAccountInputs, contribution: number): {
  underContributionRisk: number;
  overContributionRisk: number;
  forfeitureRisk: number;
} {
  const totalExpenses = calculateTotalExpectedExpenses(inputs);

  const underContributionRisk = Math.max(0, totalExpenses - contribution);
  const overContributionRisk = Math.max(0, contribution - totalExpenses);
  const forfeitureRisk = inputs.carryoverAllowed ? 0 : overContributionRisk;

  return {
    underContributionRisk,
    overContributionRisk,
    forfeitureRisk
  };
}

/**
 * Calculate optimal contribution
 */
function calculateOptimalContribution(inputs: FlexibleSpendingAccountInputs): number {
  const recommended = calculateRecommendedContribution(inputs);
  const totalExpenses = calculateTotalExpectedExpenses(inputs);

  // Optimal is the minimum of recommended and total expenses
  return Math.min(recommended, totalExpenses);
}

/**
 * Determine risk level
 */
function determineRiskLevel(inputs: FlexibleSpendingAccountInputs): 'low' | 'medium' | 'high' {
  const contribution = calculateRecommendedContribution(inputs);
  const totalExpenses = calculateTotalExpectedExpenses(inputs);
  const utilizationRate = contribution > 0 ? (totalExpenses / contribution) : 0;

  if (utilizationRate >= 0.9) return 'low';
  if (utilizationRate >= 0.7) return 'medium';
  return 'high';
}

/**
 * Generate strategy recommendations
 */
function generateStrategyRecommendations(inputs: FlexibleSpendingAccountInputs): string[] {
  const recommendations: string[] = [];
  const contribution = calculateRecommendedContribution(inputs);
  const totalExpenses = calculateTotalExpectedExpenses(inputs);

  if (contribution > totalExpenses) {
    recommendations.push('Consider reducing contribution to avoid forfeiture');
    if (inputs.carryoverAllowed) {
      recommendations.push('Utilize carryover option to minimize risk');
    }
  } else if (contribution < totalExpenses) {
    recommendations.push('Consider increasing contribution to maximize tax savings');
  }

  if (inputs.accountType === 'health') {
    recommendations.push('Include preventive care expenses for maximum benefit');
    recommendations.push('Keep detailed records of all medical expenses');
  }

  if (inputs.accountType === 'dependent') {
    recommendations.push('Ensure childcare provider meets IRS requirements');
    recommendations.push('Keep provider invoices and payment records');
  }

  recommendations.push('Submit reimbursement requests promptly');
  recommendations.push('Review contribution annually based on actual expenses');

  return recommendations;
}

/**
 * Generate alternative options
 */
function generateAlternativeOptions(inputs: FlexibleSpendingAccountInputs): string[] {
  const options: string[] = [];

  if (inputs.accountType === 'health') {
    options.push('Health Savings Account (HSA) if eligible');
    options.push('High-deductible health plan with HSA');
  }

  options.push('Traditional savings account (after-tax)');
  options.push('Roth IRA for retirement savings');
  options.push('529 Plan for education expenses');

  return options;
}

/**
 * Calculate grace period utilization
 */
function calculateGracePeriodUtilization(inputs: FlexibleSpendingAccountInputs): number {
  const { gracePeriodDays, usedToDate, annualContributionLimit } = inputs;

  if (gracePeriodDays === 0) return 0;

  const gracePeriodUtilization = (usedToDate / annualContributionLimit) * 100;
  return Math.min(100, gracePeriodUtilization);
}

/**
 * Calculate carryover utilization
 */
function calculateCarryoverUtilization(inputs: FlexibleSpendingAccountInputs): number {
  const { carryoverAllowed, maxCarryoverAmount, currentBalance } = inputs;

  if (!carryoverAllowed) return 0;

  const carryoverUtilization = (currentBalance / maxCarryoverAmount) * 100;
  return Math.min(100, carryoverUtilization);
}

/**
 * Calculate compliance score
 */
function calculateComplianceScore(inputs: FlexibleSpendingAccountInputs): number {
  let score = 100;

  // Reduce score for high forfeiture risk
  const contribution = calculateRecommendedContribution(inputs);
  const totalExpenses = calculateTotalExpectedExpenses(inputs);
  const overContribution = Math.max(0, contribution - totalExpenses);

  if (overContribution > 0) {
    score -= Math.min(30, (overContribution / contribution) * 100);
  }

  // Reduce score if not using grace period effectively
  if (inputs.gracePeriodDays > 0 && inputs.usedToDate === 0) {
    score -= 10;
  }

  return Math.max(0, score);
}

/**
 * Validate flexible spending account inputs
 */
export function validateFlexibleSpendingAccountInputs(inputs: FlexibleSpendingAccountInputs): string[] {
  const errors: string[] = [];

  if (inputs.annualContributionLimit < 0) {
    errors.push('Annual contribution limit cannot be negative');
  }

  if (inputs.currentBalance < 0) {
    errors.push('Current balance cannot be negative');
  }

  if (inputs.numberOfDependents < 0) {
    errors.push('Number of dependents cannot be negative');
  }

  if (inputs.expectedMedicalExpenses < 0) {
    errors.push('Expected medical expenses cannot be negative');
  }

  if (inputs.preventiveCareExpenses < 0) {
    errors.push('Preventive care expenses cannot be negative');
  }

  if (inputs.prescriptionExpenses < 0) {
    errors.push('Prescription expenses cannot be negative');
  }

  if (inputs.dentalExpenses < 0) {
    errors.push('Dental expenses cannot be negative');
  }

  if (inputs.visionExpenses < 0) {
    errors.push('Vision expenses cannot be negative');
  }

  if (inputs.childcareExpenses < 0) {
    errors.push('Childcare expenses cannot be negative');
  }

  if (inputs.eldercareExpenses < 0) {
    errors.push('Eldercare expenses cannot be negative');
  }

  if (inputs.monthlyParkingCost < 0) {
    errors.push('Monthly parking cost cannot be negative');
  }

  if (inputs.monthlyTransitCost < 0) {
    errors.push('Monthly transit cost cannot be negative');
  }

  if (inputs.workDaysPerMonth < 1 || inputs.workDaysPerMonth > 31) {
    errors.push('Work days per month must be between 1 and 31');
  }

  if (inputs.distanceToWork < 0) {
    errors.push('Distance to work cannot be negative');
  }

  if (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50) {
    errors.push('Marginal tax rate must be between 0% and 50%');
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 20) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  if (inputs.employerMatch < 0 || inputs.employerMatch > 100) {
    errors.push('Employer match must be between 0% and 100%');
  }

  if (inputs.gracePeriodDays < 0 || inputs.gracePeriodDays > 365) {
    errors.push('Grace period days must be between 0 and 365');
  }

  if (inputs.maxCarryoverAmount < 0) {
    errors.push('Maximum carryover amount cannot be negative');
  }

  if (inputs.usedToDate < 0) {
    errors.push('Used to date cannot be negative');
  }

  if (inputs.projectedUsage < 0) {
    errors.push('Projected usage cannot be negative');
  }

  return errors;
}