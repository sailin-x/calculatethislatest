interface BiweeklyMetrics {
  monthlyPayment: number;
  biweeklyPayment: number;
  totalMonthlyPayment: number;
  totalBiweeklyPayment: number;
  monthlyPaymentWithEscrow: number;
  biweeklyPaymentWithEscrow: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;
}

interface SavingsMetrics {
  interestSavings: number;
  timeSaved: number;
  payoffDate: string;
  totalPaymentsSaved: number;
  annualSavings: number;
  comparison: string;
}

interface AmortizationEntry {
  paymentNumber: number;
  paymentDate: string;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  cumulativeInterest: number;
}

/**
 * Calculate biweekly mortgage payment and related metrics
 */
export function calculateBiweeklyMortgage(inputs: Record<string, any>): BiweeklyMetrics {
  const {
    loanAmount,
    interestRate,
    loanTerm,
    propertyTax = 0,
    homeInsurance = 0,
    pmi = 0,
    hoaFees = 0
  } = inputs;

  // Convert annual interest rate to monthly
  const monthlyInterestRate = interestRate / 100 / 12;
  
  // Calculate total number of payments
  const totalPayments = loanTerm * 12;
  
  // Calculate monthly payment using standard mortgage formula
  const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyInterestRate, totalPayments);
  
  // Biweekly payment is exactly half of monthly payment
  const biweeklyPayment = monthlyPayment / 2;
  
  // Calculate escrow amounts
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;
  
  // Calculate total payments
  const monthlyPaymentWithEscrow = monthlyPayment + monthlyPropertyTax + monthlyHomeInsurance + pmi + hoaFees;
  const biweeklyPaymentWithEscrow = monthlyPaymentWithEscrow / 2;
  
  // Calculate total cost over loan term
  const totalInterest = calculateTotalInterest(loanAmount, monthlyPayment, totalPayments, monthlyInterestRate);
  const totalCost = loanAmount + totalInterest + (propertyTax * loanTerm) + (homeInsurance * loanTerm) + (pmi * totalPayments) + (hoaFees * totalPayments);
  
  return {
    monthlyPayment,
    biweeklyPayment,
    totalMonthlyPayment: monthlyPaymentWithEscrow,
    totalBiweeklyPayment: biweeklyPaymentWithEscrow,
    monthlyPaymentWithEscrow,
    biweeklyPaymentWithEscrow,
    totalPayments,
    totalInterest,
    totalCost
  };
}

/**
 * Calculate monthly mortgage payment using standard formula
 */
function calculateMonthlyPayment(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, totalPayments);
  return principal * (monthlyRate * rateFactor) / (rateFactor - 1);
}

/**
 * Calculate total interest paid over loan term
 */
function calculateTotalInterest(principal: number, monthlyPayment: number, totalPayments: number, monthlyRate: number): number {
  let remainingBalance = principal;
  let totalInterest = 0;
  
  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    totalInterest += interestPayment;
    remainingBalance -= principalPayment;
    
    if (remainingBalance <= 0) break;
  }
  
  return totalInterest;
}

/**
 * Calculate savings from biweekly payments
 */
export function calculateSavings(inputs: Record<string, any>, biweeklyMetrics: BiweeklyMetrics): SavingsMetrics {
  const { loanAmount, interestRate, loanTerm, startDate } = inputs;
  
  // Calculate biweekly loan term (how long it takes to pay off with biweekly payments)
  const biweeklyTerm = calculateBiweeklyLoanTerm(loanAmount, biweeklyMetrics.monthlyPayment, interestRate);
  
  // Calculate total interest with biweekly payments
  const biweeklyTotalInterest = calculateBiweeklyTotalInterest(loanAmount, biweeklyMetrics.monthlyPayment, interestRate, biweeklyTerm);
  
  // Calculate savings
  const interestSavings = biweeklyMetrics.totalInterest - biweeklyTotalInterest;
  const timeSaved = loanTerm - biweeklyTerm;
  const totalPaymentsSaved = Math.round(timeSaved * 12);
  
  // Calculate payoff date
  const payoffDate = calculatePayoffDate(startDate, biweeklyTerm);
  
  // Calculate annual savings
  const annualSavings = interestSavings / loanTerm;
  
  // Generate comparison summary
  const comparison = generateComparisonSummary(biweeklyMetrics, timeSaved, interestSavings, totalPaymentsSaved);
  
  return {
    interestSavings,
    timeSaved,
    payoffDate,
    totalPaymentsSaved,
    annualSavings,
    comparison
  };
}

/**
 * Calculate how long it takes to pay off loan with biweekly payments
 */
function calculateBiweeklyLoanTerm(principal: number, monthlyPayment: number, annualRate: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const biweeklyPayment = monthlyPayment / 2;
  
  // With biweekly payments, you make 26 payments per year instead of 12
  // This is equivalent to making 13 monthly payments per year
  const effectiveMonthlyPayment = monthlyPayment * 13 / 12;
  
  // Calculate new loan term
  if (monthlyRate === 0) {
    return principal / effectiveMonthlyPayment / 12;
  }
  
  const rateFactor = 1 + monthlyRate;
  const termInMonths = Math.log(effectiveMonthlyPayment / (effectiveMonthlyPayment - principal * monthlyRate)) / Math.log(rateFactor);
  
  return Math.max(0, termInMonths / 12);
}

/**
 * Calculate total interest paid with biweekly payments
 */
function calculateBiweeklyTotalInterest(principal: number, monthlyPayment: number, annualRate: number, biweeklyTerm: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const effectiveMonthlyPayment = monthlyPayment * 13 / 12;
  
  let remainingBalance = principal;
  let totalInterest = 0;
  const totalPayments = Math.ceil(biweeklyTerm * 12);
  
  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = effectiveMonthlyPayment - interestPayment;
    
    totalInterest += interestPayment;
    remainingBalance -= principalPayment;
    
    if (remainingBalance <= 0) break;
  }
  
  return totalInterest;
}

/**
 * Calculate payoff date based on start date and loan term
 */
function calculatePayoffDate(startDate: string, loanTerm: number): string {
  const start = new Date(startDate);
  const payoffDate = new Date(start);
  payoffDate.setFullYear(payoffDate.getFullYear() + Math.floor(loanTerm));
  payoffDate.setMonth(payoffDate.getMonth() + Math.round((loanTerm % 1) * 12));
  
  return payoffDate.toISOString().split('T')[0];
}

/**
 * Generate comparison summary
 */
function generateComparisonSummary(metrics: BiweeklyMetrics, timeSaved: number, interestSavings: number, paymentsSaved: number): string {
  const savingsPercentage = ((interestSavings / metrics.totalInterest) * 100).toFixed(1);
  
  return `Biweekly payments save you $${interestSavings.toLocaleString()} in interest and ${timeSaved.toFixed(1)} years off your loan. You'll make ${paymentsSaved} fewer payments, saving ${savingsPercentage}% in total interest costs.`;
}

/**
 * Generate amortization schedule for biweekly payments
 */
export function generateAmortizationSchedule(inputs: Record<string, any>, biweeklyMetrics: BiweeklyMetrics): AmortizationEntry[] {
  const { loanAmount, interestRate, startDate } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  const biweeklyPayment = biweeklyMetrics.biweeklyPayment;
  
  const schedule: AmortizationEntry[] = [];
  let remainingBalance = loanAmount;
  let cumulativeInterest = 0;
  let paymentDate = new Date(startDate);
  
  let paymentNumber = 1;
  while (remainingBalance > 0.01 && paymentNumber <= 1000) { // Safety limit
    const interestPayment = remainingBalance * monthlyRate * (14/30); // Biweekly interest
    const principalPayment = Math.min(biweeklyPayment - interestPayment, remainingBalance);
    
    remainingBalance -= principalPayment;
    cumulativeInterest += interestPayment;
    
    schedule.push({
      paymentNumber,
      paymentDate: paymentDate.toISOString().split('T')[0],
      payment: biweeklyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, remainingBalance),
      cumulativeInterest
    });
    
    // Move to next biweekly payment date
    paymentDate.setDate(paymentDate.getDate() + 14);
    paymentNumber++;
  }
  
  return schedule;
}

/**
 * Calculate extra payment impact
 */
export function calculateExtraPaymentImpact(
  loanAmount: number,
  monthlyPayment: number,
  interestRate: number,
  extraPayment: number
): {
  timeSaved: number;
  interestSavings: number;
  payoffDate: string;
} {
  const monthlyRate = interestRate / 100 / 12;
  const totalPayment = monthlyPayment + extraPayment;
  
  // Calculate new loan term
  const newTerm = calculateLoanTermWithExtraPayment(loanAmount, totalPayment, monthlyRate);
  const originalTerm = calculateLoanTermWithExtraPayment(loanAmount, monthlyPayment, monthlyRate);
  
  const timeSaved = originalTerm - newTerm;
  const interestSavings = calculateInterestSavings(loanAmount, monthlyPayment, totalPayment, monthlyRate, originalTerm, newTerm);
  
  return {
    timeSaved,
    interestSavings,
    payoffDate: calculatePayoffDate(new Date().toISOString().split('T')[0], newTerm)
  };
}

/**
 * Calculate loan term with extra payments
 */
function calculateLoanTermWithExtraPayment(principal: number, monthlyPayment: number, monthlyRate: number): number {
  if (monthlyRate === 0) {
    return principal / monthlyPayment / 12;
  }
  
  const rateFactor = 1 + monthlyRate;
  const termInMonths = Math.log(monthlyPayment / (monthlyPayment - principal * monthlyRate)) / Math.log(rateFactor);
  
  return Math.max(0, termInMonths / 12);
}

/**
 * Calculate interest savings from extra payments
 */
function calculateInterestSavings(
  principal: number,
  originalPayment: number,
  newPayment: number,
  monthlyRate: number,
  originalTerm: number,
  newTerm: number
): number {
  const originalInterest = calculateTotalInterest(principal, originalPayment, originalTerm * 12, monthlyRate);
  const newInterest = calculateTotalInterest(principal, newPayment, newTerm * 12, monthlyRate);
  
  return originalInterest - newInterest;
}

/**
 * Calculate payment frequency comparison
 */
export function calculatePaymentFrequencyComparison(
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): {
  monthly: { payment: number; totalInterest: number; totalCost: number };
  biweekly: { payment: number; totalInterest: number; totalCost: number; timeSaved: number };
  weekly: { payment: number; totalInterest: number; totalCost: number; timeSaved: number };
} {
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  
  // Monthly payment
  const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, totalPayments);
  const monthlyInterest = calculateTotalInterest(loanAmount, monthlyPayment, totalPayments, monthlyRate);
  
  // Biweekly payment
  const biweeklyPayment = monthlyPayment / 2;
  const biweeklyTerm = calculateBiweeklyLoanTerm(loanAmount, monthlyPayment, interestRate);
  const biweeklyInterest = calculateBiweeklyTotalInterest(loanAmount, monthlyPayment, interestRate, biweeklyTerm);
  
  // Weekly payment
  const weeklyPayment = monthlyPayment / 4;
  const weeklyTerm = calculateBiweeklyLoanTerm(loanAmount, monthlyPayment, interestRate) * 0.5; // Rough estimate
  const weeklyInterest = biweeklyInterest * 0.95; // Rough estimate
  
  return {
    monthly: {
      payment: monthlyPayment,
      totalInterest: monthlyInterest,
      totalCost: loanAmount + monthlyInterest
    },
    biweekly: {
      payment: biweeklyPayment,
      totalInterest: biweeklyInterest,
      totalCost: loanAmount + biweeklyInterest,
      timeSaved: loanTerm - biweeklyTerm
    },
    weekly: {
      payment: weeklyPayment,
      totalInterest: weeklyInterest,
      totalCost: loanAmount + weeklyInterest,
      timeSaved: loanTerm - weeklyTerm
    }
  };
}
