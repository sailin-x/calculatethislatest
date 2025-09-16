import { ReverseMortgageInputs, ReverseMortgageResults } from './types';

/**
 * Calculate reverse mortgage loan details and financial impact
 */
export function calculateReverseMortgage(inputs: ReverseMortgageInputs): ReverseMortgageResults {
  const {
    homeValue,
    borrowerAge,
    youngestBorrowerAge,
    interestRate,
    expectedAppreciation,
    counselingFee,
    originationFee,
    servicingFeeSetAside,
    mortgageInsurancePremium,
    propertyTaxes,
    homeownersInsurance,
    hoaFees,
    maintenanceCost,
    repairSetAside,
    lifeExpectancy,
    paymentPlan,
    termYears,
    monthlyIncome,
    monthlyExpenses,
    existingMortgageBalance
  } = inputs;

  // Calculate Principal Limit Factor (PLF) based on age
  const age = Math.min(borrowerAge, youngestBorrowerAge);
  const principalLimitFactor = calculatePrincipalLimitFactor(age);

  // Calculate initial principal limit
  const principalLimit = homeValue * principalLimitFactor;

  // Calculate net principal limit after fees and existing mortgage
  const upfrontFees = counselingFee + originationFee + servicingFeeSetAside + mortgageInsurancePremium;
  const netPrincipalLimit = Math.max(0, principalLimit - upfrontFees - existingMortgageBalance);

  // Calculate available loan amount based on payment plan
  let availableLoanAmount = 0;
  let monthlyLoanAdvance = 0;
  let totalLoanAdvances = 0;

  switch (paymentPlan) {
    case 'tenure':
      // Tenure plan: monthly payments for as long as borrower lives in home
      monthlyLoanAdvance = calculateMonthlyAdvance(netPrincipalLimit, interestRate, lifeExpectancy);
      totalLoanAdvances = monthlyLoanAdvance * 12 * lifeExpectancy;
      availableLoanAmount = netPrincipalLimit;
      break;
    case 'term':
      // Term plan: monthly payments for fixed period
      monthlyLoanAdvance = calculateMonthlyAdvance(netPrincipalLimit, interestRate, termYears);
      totalLoanAdvances = monthlyLoanAdvance * 12 * termYears;
      availableLoanAmount = netPrincipalLimit;
      break;
    case 'line-of-credit':
      // Line of credit: access to funds as needed
      availableLoanAmount = netPrincipalLimit;
      monthlyLoanAdvance = 0; // No monthly advances
      totalLoanAdvances = 0;
      break;
  }

  // Calculate interest accumulation
  const totalInterestPaid = calculateTotalInterest(availableLoanAmount, interestRate, lifeExpectancy);

  // Calculate total fees
  const annualFees = propertyTaxes + homeownersInsurance + hoaFees + maintenanceCost;
  const totalFeesPaid = upfrontFees + (annualFees * lifeExpectancy);

  // Calculate final loan balance
  const totalLoanBalance = availableLoanAmount + totalInterestPaid;

  // Calculate remaining equity
  const futureHomeValue = homeValue * Math.pow(1 + expectedAppreciation / 100, lifeExpectancy);
  const remainingEquity = Math.max(0, futureHomeValue - totalLoanBalance);

  // Calculate loan-to-value ratio
  const loanToValueRatio = (totalLoanBalance / futureHomeValue) * 100;

  // Calculate break-even years (when loan balance exceeds home value)
  const breakEvenYears = calculateBreakEvenYears(homeValue, availableLoanAmount, interestRate, expectedAppreciation);

  // Calculate monthly cash flow
  const monthlyCashFlow = monthlyIncome - monthlyExpenses + monthlyLoanAdvance;

  // Calculate total cash received
  const totalCashReceived = totalLoanAdvances + availableLoanAmount;

  // Calculate net worth impact
  const netWorthImpact = remainingEquity - totalFeesPaid;

  // Calculate sustainability years
  const sustainabilityYears = calculateSustainabilityYears(monthlyCashFlow, availableLoanAmount);

  // Generate risk assessment and recommendation
  const riskAssessment = generateRiskAssessment(inputs, loanToValueRatio, breakEvenYears);
  const recommendation = generateRecommendation(inputs, monthlyCashFlow, remainingEquity);

  return {
    principalLimit,
    netPrincipalLimit,
    availableLoanAmount,
    monthlyLoanAdvance,
    totalLoanAdvances,
    totalInterestPaid,
    totalFeesPaid,
    totalLoanBalance,
    remainingEquity,
    loanToValueRatio,
    breakEvenYears,
    monthlyCashFlow,
    totalCashReceived,
    netWorthImpact,
    sustainabilityYears,
    riskAssessment,
    recommendation
  };
}

/**
 * Calculate Principal Limit Factor based on borrower age
 */
function calculatePrincipalLimitFactor(age: number): number {
  // FHA Principal Limit Factors (simplified)
  if (age >= 90) return 0.70;
  if (age >= 85) return 0.65;
  if (age >= 80) return 0.60;
  if (age >= 75) return 0.55;
  if (age >= 70) return 0.50;
  if (age >= 65) return 0.45;
  if (age >= 62) return 0.40;
  return 0.30; // Minimum age requirement
}

/**
 * Calculate monthly loan advance
 */
function calculateMonthlyAdvance(principalLimit: number, interestRate: number, years: number): number {
  if (years <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = years * 12;

  // Calculate monthly payment using annuity formula
  const monthlyPayment = principalLimit * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  return monthlyPayment;
}

/**
 * Calculate total interest paid over life expectancy
 */
function calculateTotalInterest(principalLimit: number, interestRate: number, years: number): number {
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = years * 12;
  const monthlyPayment = calculateMonthlyAdvance(principalLimit, interestRate, years);

  const totalPaid = monthlyPayment * numPayments;
  return totalPaid - principalLimit;
}

/**
 * Calculate break-even years
 */
function calculateBreakEvenYears(
  homeValue: number,
  loanAmount: number,
  interestRate: number,
  appreciationRate: number
): number {
  let years = 0;
  let loanBalance = loanAmount;
  let currentHomeValue = homeValue;

  const monthlyRate = interestRate / 100 / 12;

  while (years < 50) { // Max 50 years
    // Add monthly interest
    loanBalance += loanBalance * monthlyRate;

    // Appreciate home value
    currentHomeValue *= (1 + appreciationRate / 100 / 12);

    // Check if loan balance exceeds home value
    if (loanBalance >= currentHomeValue) {
      return years / 12;
    }

    years++;
  }

  return 50; // No break-even within 50 years
}

/**
 * Calculate sustainability years
 */
function calculateSustainabilityYears(monthlyCashFlow: number, availableLoanAmount: number): number {
  if (monthlyCashFlow >= 0) return 50; // Sustainable indefinitely

  // Calculate how many years the loan advances can support negative cash flow
  const monthlyShortfall = Math.abs(monthlyCashFlow);
  const monthsSupported = availableLoanAmount / monthlyShortfall;

  return monthsSupported / 12;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(
  inputs: ReverseMortgageInputs,
  ltvRatio: number,
  breakEvenYears: number
): string {
  let riskLevel = 'Low';
  let concerns: string[] = [];

  if (ltvRatio > 90) {
    riskLevel = 'High';
    concerns.push('High loan-to-value ratio increases risk of negative equity');
  } else if (ltvRatio > 70) {
    riskLevel = 'Medium';
    concerns.push('Moderate loan-to-value ratio');
  }

  if (breakEvenYears < 10) {
    riskLevel = riskLevel === 'Low' ? 'Medium' : 'High';
    concerns.push('Short break-even period increases risk of outliving equity');
  }

  if (inputs.borrowerAge < 65) {
    riskLevel = riskLevel === 'Low' ? 'Medium' : 'High';
    concerns.push('Younger age may result in lower loan amounts');
  }

  if (concerns.length === 0) {
    concerns.push('Generally favorable risk profile');
  }

  return `${riskLevel} Risk: ${concerns.join(', ')}`;
}

/**
 * Generate recommendation
 */
function generateRecommendation(
  inputs: ReverseMortgageInputs,
  monthlyCashFlow: number,
  remainingEquity: number
): string {
  if (monthlyCashFlow < 0 && remainingEquity < inputs.homeValue * 0.2) {
    return 'Consider carefully - may not be suitable for your financial situation';
  }

  if (inputs.borrowerAge >= 75 && monthlyCashFlow > 0) {
    return 'Good option - provides additional income while preserving home equity';
  }

  if (remainingEquity > inputs.homeValue * 0.5) {
    return 'Excellent option - maintains significant equity for heirs';
  }

  return 'Moderate option - consult with financial advisor for personalized advice';
}

/**
 * Validate reverse mortgage inputs
 */
export function validateReverseMortgageInputs(inputs: ReverseMortgageInputs): string[] {
  const errors: string[] = [];

  if (inputs.homeValue <= 0) {
    errors.push('Home value must be greater than 0');
  }

  if (inputs.borrowerAge < 62) {
    errors.push('Borrower must be at least 62 years old');
  }

  if (inputs.youngestBorrowerAge < 62) {
    errors.push('Youngest borrower must be at least 62 years old');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 15) {
    errors.push('Interest rate must be between 0% and 15%');
  }

  if (inputs.expectedAppreciation < -10 || inputs.expectedAppreciation > 20) {
    errors.push('Expected appreciation must be between -10% and 20%');
  }

  if (inputs.lifeExpectancy < 1 || inputs.lifeExpectancy > 50) {
    errors.push('Life expectancy must be between 1 and 50 years');
  }

  if (inputs.paymentPlan === 'term' && (inputs.termYears < 1 || inputs.termYears > 30)) {
    errors.push('Term years must be between 1 and 30 for term payment plan');
  }

  if (inputs.existingMortgageBalance < 0) {
    errors.push('Existing mortgage balance cannot be negative');
  }

  return errors;
}