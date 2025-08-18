/**
 * Amortization Schedule Calculation Formulas
 * Based on standard loan amortization mathematics
 */

export interface AmortizationInputs {
  loanAmount: number;
  annualRate: number;
  loanTermYears: number;
  extraPayment: number;
  extraPaymentStart: number;
  oneTimePayment: number;
  oneTimePaymentMonth: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly' | 'quarterly';
  compoundingFrequency: 'monthly' | 'daily' | 'annually';
  startDate: Date;
}

export interface PaymentDetail {
  paymentNumber: number;
  date: Date;
  payment: number;
  principal: number;
  interest: number;
  extraPrincipal: number;
  remainingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface AmortizationResults {
  monthlyPayment: number;
  totalInterest: number;
  totalPayments: number;
  payoffDate: Date;
  interestSavings: number;
  timeSavings: number;
  schedule: PaymentDetail[];
  yearlyTotals: YearlyTotal[];
}

export interface YearlyTotal {
  year: number;
  payments: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

/**
 * Calculate standard loan payment using amortization formula
 */
export function calculateLoanPayment(
  principal: number,
  annualRate: number,
  termYears: number,
  paymentsPerYear: number = 12
): number {
  if (annualRate === 0) {
    return principal / (termYears * paymentsPerYear);
  }
  
  const periodRate = annualRate / paymentsPerYear;
  const totalPayments = termYears * paymentsPerYear;
  
  return principal * 
    (periodRate * Math.pow(1 + periodRate, totalPayments)) /
    (Math.pow(1 + periodRate, totalPayments) - 1);
}

/**
 * Calculate effective annual rate based on compounding frequency
 */
export function calculateEffectiveRate(
  nominalRate: number,
  compoundingFrequency: 'monthly' | 'daily' | 'annually'
): number {
  switch (compoundingFrequency) {
    case 'daily':
      return Math.pow(1 + nominalRate / 365, 365) - 1;
    case 'monthly':
      return Math.pow(1 + nominalRate / 12, 12) - 1;
    case 'annually':
      return nominalRate;
    default:
      return nominalRate;
  }
}

/**
 * Get payment frequency multiplier
 */
export function getPaymentFrequency(frequency: string): number {
  const frequencyMap: Record<string, number> = {
    'monthly': 12,
    'biweekly': 26,
    'weekly': 52,
    'quarterly': 4
  };
  
  return frequencyMap[frequency] || 12;
}

/**
 * Calculate remaining balance after a number of payments
 */
export function calculateRemainingBalance(
  originalPrincipal: number,
  monthlyPayment: number,
  annualRate: number,
  paymentsMade: number,
  paymentsPerYear: number = 12
): number {
  if (annualRate === 0) {
    return Math.max(0, originalPrincipal - (monthlyPayment * paymentsMade));
  }
  
  const periodRate = annualRate / paymentsPerYear;
  const factor = Math.pow(1 + periodRate, paymentsMade);
  
  const remaining = originalPrincipal * factor - monthlyPayment * (factor - 1) / periodRate;
  return Math.max(0, remaining);
}

/**
 * Generate complete amortization schedule
 */
export function generateAmortizationSchedule(inputs: AmortizationInputs): AmortizationResults {
  const {
    loanAmount,
    annualRate,
    loanTermYears,
    extraPayment,
    extraPaymentStart,
    oneTimePayment,
    oneTimePaymentMonth,
    paymentFrequency,
    compoundingFrequency,
    startDate
  } = inputs;

  const paymentsPerYear = getPaymentFrequency(paymentFrequency);
  const effectiveRate = calculateEffectiveRate(annualRate, compoundingFrequency);
  const periodRate = effectiveRate / paymentsPerYear;
  const totalPayments = loanTermYears * paymentsPerYear;

  // Calculate standard monthly payment
  const monthlyPayment = calculateLoanPayment(loanAmount, effectiveRate, loanTermYears, paymentsPerYear);

  // Generate payment schedule
  const schedule: PaymentDetail[] = [];
  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let paymentNumber = 1;
  let currentDate = new Date(startDate);

  while (remainingBalance > 0.01 && paymentNumber <= totalPayments * 2) {
    const interestPayment = remainingBalance * periodRate;
    let principalPayment = monthlyPayment - interestPayment;
    
    // Add extra payments
    let extraPrincipal = 0;
    
    // Regular extra payment
    if (paymentNumber >= extraPaymentStart && extraPayment > 0) {
      extraPrincipal += extraPayment;
    }
    
    // One-time extra payment
    if (paymentNumber === oneTimePaymentMonth && oneTimePayment > 0) {
      extraPrincipal += oneTimePayment;
    }
    
    // Ensure we don't overpay
    const totalPrincipal = Math.min(principalPayment + extraPrincipal, remainingBalance);
    const actualPayment = interestPayment + totalPrincipal;
    
    remainingBalance = Math.max(0, remainingBalance - totalPrincipal);
    totalInterestPaid += interestPayment;
    totalPrincipalPaid += totalPrincipal;

    schedule.push({
      paymentNumber,
      date: new Date(currentDate),
      payment: actualPayment,
      principal: totalPrincipal,
      interest: interestPayment,
      extraPrincipal,
      remainingBalance,
      cumulativeInterest: totalInterestPaid,
      cumulativePrincipal: totalPrincipalPaid
    });

    // Advance date
    advanceDate(currentDate, paymentFrequency);
    paymentNumber++;
    
    if (remainingBalance <= 0.01) break;
  }

  // Calculate totals and savings
  const totalPaymentsAmount = totalInterestPaid + totalPrincipalPaid;
  const payoffDate = schedule[schedule.length - 1]?.date || new Date();
  
  // Calculate what totals would be without extra payments
  const standardTotalInterest = calculateStandardTotalInterest(loanAmount, effectiveRate, loanTermYears, paymentsPerYear);
  const interestSavings = Math.max(0, standardTotalInterest - totalInterestPaid);
  const standardPayments = loanTermYears * paymentsPerYear;
  const timeSavings = Math.max(0, standardPayments - schedule.length);

  // Generate yearly totals
  const yearlyTotals = generateYearlyTotals(schedule, startDate);

  return {
    monthlyPayment,
    totalInterest: totalInterestPaid,
    totalPayments: totalPaymentsAmount,
    payoffDate,
    interestSavings,
    timeSavings,
    schedule,
    yearlyTotals
  };
}

/**
 * Calculate total interest for standard loan without extra payments
 */
function calculateStandardTotalInterest(
  principal: number,
  annualRate: number,
  termYears: number,
  paymentsPerYear: number
): number {
  const monthlyPayment = calculateLoanPayment(principal, annualRate, termYears, paymentsPerYear);
  const totalPayments = termYears * paymentsPerYear;
  return (monthlyPayment * totalPayments) - principal;
}

/**
 * Advance date based on payment frequency
 */
function advanceDate(date: Date, frequency: string): void {
  switch (frequency) {
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'biweekly':
      date.setDate(date.getDate() + 14);
      break;
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    default:
      date.setMonth(date.getMonth() + 1);
  }
}

/**
 * Generate yearly payment totals
 */
function generateYearlyTotals(schedule: PaymentDetail[], startDate: Date): YearlyTotal[] {
  const yearlyTotals: YearlyTotal[] = [];
  let currentYear = startDate.getFullYear();
  let yearlyInterest = 0;
  let yearlyPrincipal = 0;
  let yearlyPayments = 0;

  schedule.forEach((payment, index) => {
    const paymentYear = payment.date.getFullYear();
    
    if (paymentYear !== currentYear) {
      yearlyTotals.push({
        year: currentYear,
        payments: yearlyPayments,
        interest: yearlyInterest,
        principal: yearlyPrincipal,
        endingBalance: schedule[index - 1]?.remainingBalance || 0
      });
      
      currentYear = paymentYear;
      yearlyInterest = 0;
      yearlyPrincipal = 0;
      yearlyPayments = 0;
    }
    
    yearlyInterest += payment.interest;
    yearlyPrincipal += payment.principal;
    yearlyPayments += payment.payment;
  });

  // Add final year
  if (yearlyPayments > 0) {
    yearlyTotals.push({
      year: currentYear,
      payments: yearlyPayments,
      interest: yearlyInterest,
      principal: yearlyPrincipal,
      endingBalance: 0
    });
  }

  return yearlyTotals;
}

/**
 * Calculate payment breakdown for specific payment number
 */
export function calculatePaymentBreakdown(
  remainingBalance: number,
  monthlyPayment: number,
  periodRate: number,
  extraPayment: number = 0
): {
  interest: number;
  principal: number;
  extraPrincipal: number;
  totalPayment: number;
  newBalance: number;
} {
  const interest = remainingBalance * periodRate;
  const basePrincipal = monthlyPayment - interest;
  const totalPrincipal = Math.min(basePrincipal + extraPayment, remainingBalance);
  const extraPrincipal = Math.max(0, totalPrincipal - basePrincipal);
  const totalPayment = interest + totalPrincipal;
  const newBalance = Math.max(0, remainingBalance - totalPrincipal);

  return {
    interest,
    principal: totalPrincipal,
    extraPrincipal,
    totalPayment,
    newBalance
  };
}

/**
 * Calculate biweekly payment equivalent
 */
export function calculateBiweeklyPayment(monthlyPayment: number): number {
  return monthlyPayment / 2;
}

/**
 * Calculate savings from biweekly payments
 */
export function calculateBiweeklySavings(
  loanAmount: number,
  annualRate: number,
  loanTermYears: number
): {
  monthlyPayment: number;
  biweeklyPayment: number;
  interestSavings: number;
  timeSavings: number;
} {
  const monthlyPayment = calculateLoanPayment(loanAmount, annualRate, loanTermYears, 12);
  const biweeklyPayment = monthlyPayment / 2;
  
  // Calculate total interest for monthly payments
  const monthlyTotalInterest = calculateStandardTotalInterest(loanAmount, annualRate, loanTermYears, 12);
  
  // Calculate total interest for biweekly payments
  const biweeklyInputs: AmortizationInputs = {
    loanAmount,
    annualRate,
    loanTermYears,
    extraPayment: 0,
    extraPaymentStart: 1,
    oneTimePayment: 0,
    oneTimePaymentMonth: 1,
    paymentFrequency: 'biweekly',
    compoundingFrequency: 'monthly',
    startDate: new Date()
  };
  
  const biweeklyResults = generateAmortizationSchedule(biweeklyInputs);
  
  const interestSavings = monthlyTotalInterest - biweeklyResults.totalInterest;
  const monthlyPayments = loanTermYears * 12;
  const timeSavings = monthlyPayments - biweeklyResults.schedule.length;

  return {
    monthlyPayment,
    biweeklyPayment,
    interestSavings,
    timeSavings
  };
}

/**
 * Find optimal extra payment amount for target payoff time
 */
export function findOptimalExtraPayment(
  loanAmount: number,
  annualRate: number,
  currentTermYears: number,
  targetTermYears: number
): number {
  if (targetTermYears >= currentTermYears) {
    return 0;
  }

  const standardPayment = calculateLoanPayment(loanAmount, annualRate, currentTermYears);
  const targetPayment = calculateLoanPayment(loanAmount, annualRate, targetTermYears);
  
  return Math.max(0, targetPayment - standardPayment);
}

/**
 * Calculate loan payoff with extra payment
 */
export function calculatePayoffWithExtraPayment(
  loanAmount: number,
  annualRate: number,
  loanTermYears: number,
  extraPayment: number
): {
  monthsToPayoff: number;
  totalInterest: number;
  interestSavings: number;
} {
  const inputs: AmortizationInputs = {
    loanAmount,
    annualRate,
    loanTermYears,
    extraPayment,
    extraPaymentStart: 1,
    oneTimePayment: 0,
    oneTimePaymentMonth: 1,
    paymentFrequency: 'monthly',
    compoundingFrequency: 'monthly',
    startDate: new Date()
  };

  const results = generateAmortizationSchedule(inputs);
  const standardInterest = calculateStandardTotalInterest(loanAmount, annualRate, loanTermYears, 12);

  return {
    monthsToPayoff: results.schedule.length,
    totalInterest: results.totalInterest,
    interestSavings: standardInterest - results.totalInterest
  };
}