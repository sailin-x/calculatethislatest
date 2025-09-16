import { USDALoanInputs, USDALoanResults } from './types';

/**
 * Calculate USDA loan eligibility and payments
 */
export function calculateUSDALoan(inputs: USDALoanInputs): USDALoanResults {
  const {
    propertyValue,
    purchasePrice,
    location,
    householdIncome,
    householdSize,
    creditScore,
    debtToIncomeRatio,
    downPayment,
    loanTerm,
    interestRate,
    isPrimaryResidence,
    isModestHousing,
    meetsIncomeLimits,
    meetsLocationRequirements,
    closingCosts,
    propertyTaxes,
    homeownersInsurance,
    hoaFees,
    includeTaxesInsurance,
    analysisPeriod
  } = inputs;

  // Check eligibility
  const eligibilityCheck = checkUSDAEligibility(inputs);
  const isEligible = eligibilityCheck.isEligible;
  const eligibilityReasons = eligibilityCheck.reasons;

  // Calculate maximum loan amount
  const maximumLoanAmount = calculateMaximumUSDALoanAmount(inputs);

  // Calculate loan amount
  const loanAmount = Math.min(purchasePrice - downPayment, maximumLoanAmount);

  // Calculate monthly payments
  const monthlyPrincipalInterest = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const monthlyTaxesInsurance = includeTaxesInsurance ?
    (propertyTaxes + homeownersInsurance + hoaFees) / 12 : 0;
  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTaxesInsurance;

  // Calculate ratios
  const loanToValueRatio = (loanAmount / propertyValue) * 100;
  const frontEndRatio = ((monthlyPrincipalInterest + monthlyTaxesInsurance) / (householdIncome / 12)) * 100;
  const backEndRatio = debtToIncomeRatio; // This is provided as input

  // Calculate costs
  const totalClosingCosts = closingCosts;
  const totalMonthlyCosts = totalMonthlyPayment;
  const breakEvenPeriod = calculateBreakEvenPeriod(inputs, totalClosingCosts, totalMonthlyPayment);

  // Calculate USDA benefits
  const guaranteedLoanFee = loanAmount * 0.02; // 2% guarantee fee
  const annualSubsidy = calculateAnnualSubsidy(loanAmount, interestRate);
  const totalSubsidyOverTerm = annualSubsidy * loanTerm;

  // Generate recommendations
  const recommendation = generateRecommendation(inputs, isEligible, loanAmount);
  const nextSteps = generateNextSteps(inputs, isEligible);
  const alternativeOptions = generateAlternativeOptions(inputs, isEligible);

  return {
    isEligible,
    eligibilityReasons,
    maximumLoanAmount,
    requiredDownPayment: downPayment,
    loanAmount,
    monthlyPrincipalInterest,
    monthlyTaxesInsurance,
    totalMonthlyPayment,
    loanToValueRatio,
    debtToIncomeRatio,
    frontEndRatio,
    backEndRatio,
    totalClosingCosts,
    totalMonthlyCosts,
    breakEvenPeriod,
    guaranteedLoanFee,
    annualSubsidy,
    totalSubsidyOverTerm,
    recommendation,
    nextSteps,
    alternativeOptions
  };
}

/**
 * Check USDA loan eligibility
 */
function checkUSDAEligibility(inputs: USDALoanInputs): { isEligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  let isEligible = true;

  // Primary residence requirement
  if (!inputs.isPrimaryResidence) {
    isEligible = false;
    reasons.push('Property must be primary residence');
  }

  // Income limits
  if (!inputs.meetsIncomeLimits) {
    isEligible = false;
    reasons.push('Household income exceeds USDA limits for area');
  }

  // Location requirements
  if (!inputs.meetsLocationRequirements) {
    isEligible = false;
    reasons.push('Property location does not meet USDA rural development requirements');
  }

  // Credit score requirements
  if (inputs.creditScore < 620) {
    isEligible = false;
    reasons.push('Credit score must be at least 620');
  }

  // Debt-to-income ratio
  if (inputs.debtToIncomeRatio > 43) {
    isEligible = false;
    reasons.push('Debt-to-income ratio cannot exceed 43%');
  }

  // Modest housing requirement
  if (!inputs.isModestHousing) {
    isEligible = false;
    reasons.push('Property must meet modest housing requirements');
  }

  if (isEligible) {
    reasons.push('Eligible for USDA loan program');
  }

  return { isEligible, reasons };
}

/**
 * Calculate maximum USDA loan amount
 */
function calculateMaximumUSDALoanAmount(inputs: USDALoanInputs): number {
  const { propertyValue, householdIncome, householdSize } = inputs;

  // USDA loan limits are based on area median income and family size
  // Simplified calculation - in reality this would use specific AMI limits
  const amiMultiplier = Math.min(householdSize * 0.5 + 1, 2.5);
  const incomeBasedLimit = householdIncome * amiMultiplier;

  // Property value based limit (typically 115% of area median price)
  const valueBasedLimit = propertyValue * 1.15;

  return Math.min(incomeBasedLimit, valueBasedLimit);
}

/**
 * Calculate monthly mortgage payment
 */
function calculateMonthlyPayment(loanAmount: number, interestRate: number, loanTerm: number): number {
  if (loanAmount <= 0 || loanTerm <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  return monthlyPayment;
}

/**
 * Calculate break-even period
 */
function calculateBreakEvenPeriod(
  inputs: USDALoanInputs,
  totalClosingCosts: number,
  monthlyPayment: number
): number {
  if (monthlyPayment <= 0) return 0;

  // Assume refinance scenario where closing costs are financed
  // Break-even is when savings from lower payment offset the costs
  return Math.ceil(totalClosingCosts / monthlyPayment);
}

/**
 * Calculate annual USDA subsidy
 */
function calculateAnnualSubsidy(loanAmount: number, interestRate: number): number {
  // USDA provides subsidy to bring effective rate to 1%
  // Simplified calculation
  const targetRate = 1.0; // 1%
  const actualRate = interestRate;
  const rateDifference = Math.max(0, actualRate - targetRate);

  return loanAmount * (rateDifference / 100);
}

/**
 * Generate recommendation
 */
function generateRecommendation(
  inputs: USDALoanInputs,
  isEligible: boolean,
  loanAmount: number
): string {
  if (!isEligible) {
    return 'Not eligible for USDA loan. Consider FHA loan or conventional financing with lower down payment requirements.';
  }

  if (loanAmount > 0) {
    return 'Eligible for USDA loan! This program offers 100% financing with no down payment, making homeownership more accessible.';
  }

  return 'May be eligible for USDA loan, but loan amount calculation suggests reviewing property value or income limits.';
}

/**
 * Generate next steps
 */
function generateNextSteps(inputs: USDALoanInputs, isEligible: boolean): string[] {
  const steps: string[] = [];

  if (isEligible) {
    steps.push('Contact USDA-approved lender to verify eligibility');
    steps.push('Get pre-approved for USDA loan');
    steps.push('Find USDA-eligible property in approved area');
    steps.push('Complete required homebuyer education course');
    steps.push('Submit loan application with lender');
  } else {
    steps.push('Review specific ineligibility reasons');
    steps.push('Consider FHA loan as alternative (3.5% down payment)');
    steps.push('Explore conventional loan options');
    steps.push('Check credit score improvement options');
  }

  return steps;
}

/**
 * Generate alternative options
 */
function generateAlternativeOptions(inputs: USDALoanInputs, isEligible: boolean): string[] {
  const options: string[] = [];

  if (!isEligible) {
    options.push('FHA Loan (3.5% down payment minimum)');
    options.push('VA Loan (if veteran - 0% down payment)');
    options.push('Conventional Loan (3-20% down payment)');
    options.push('FHA 203(k) Loan (for purchase and rehab)');
  } else {
    options.push('USDA 502 Direct Loan (if income too low for guaranteed loan)');
    options.push('USDA 538 Guaranteed Rural Rental Housing Loan');
    options.push('FHA Loan (if prefer lower mortgage insurance)');
  }

  return options;
}

/**
 * Validate USDA loan inputs
 */
export function validateUSDALoanInputs(inputs: USDALoanInputs): string[] {
  const errors: string[] = [];

  if (inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  }

  if (inputs.householdIncome <= 0) {
    errors.push('Household income must be greater than 0');
  }

  if (inputs.householdSize < 1) {
    errors.push('Household size must be at least 1');
  }

  if (inputs.creditScore < 300 || inputs.creditScore > 850) {
    errors.push('Credit score must be between 300 and 850');
  }

  if (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 100) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  }

  if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (inputs.loanTerm !== 30) {
    errors.push('USDA loans are only available for 30-year terms');
  }

  if (inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  }

  if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }

  if (inputs.homeownersInsurance < 0) {
    errors.push('Homeowners insurance cannot be negative');
  }

  if (inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }

  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  return errors;
}