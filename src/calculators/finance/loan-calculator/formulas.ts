import {
  LoanCalculatorInputs,
  LoanCalculatorOutputs,
  AmortizationPayment,
  EarlyPayoffAnalysis,
  LoanCalculatorMetrics,
  LoanCalculatorAnalysis
} from './types';

/**
 * Get the number of payments per year based on payment frequency
 */
function getPaymentsPerYear(frequency: string): number {
  switch (frequency) {
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'semi-annually': return 2;
    case 'annually': return 1;
    default: return 12;
  }
}

/**
 * Calculate the periodic interest rate
 */
function getPeriodicRate(annualRate: number, frequency: string): number {
  const paymentsPerYear = getPaymentsPerYear(frequency);
  return (annualRate / 100) / paymentsPerYear;
}

/**
 * Calculate the Equated Monthly Installment (EMI) for a loan
 */
export function calculateLoanPayment(inputs: LoanCalculatorInputs): number {
  const { loanAmount, interestRate, loanTerm, paymentFrequency } = inputs;

  const periodicRate = getPeriodicRate(interestRate, paymentFrequency);
  const paymentsPerYear = getPaymentsPerYear(paymentFrequency);
  const totalPayments = loanTerm * paymentsPerYear;

  if (periodicRate === 0) {
    return loanAmount / totalPayments;
  }

  const payment = loanAmount *
    (periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
    (Math.pow(1 + periodicRate, totalPayments) - 1);

  return Math.round(payment * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate total interest paid over the life of the loan
 */
export function calculateTotalInterestPaid(
  loanAmount: number,
  monthlyPayment: number,
  numberOfPayments: number
): number {
  const totalPaid = monthlyPayment * numberOfPayments;
  return Math.round((totalPaid - loanAmount) * 100) / 100;
}

/**
 * Calculate total amount paid (principal + interest)
 */
export function calculateTotalAmountPaid(
  monthlyPayment: number,
  numberOfPayments: number
): number {
  return Math.round(monthlyPayment * numberOfPayments * 100) / 100;
}

/**
 * Generate amortization schedule
 */
export function calculateAmortizationSchedule(inputs: LoanCalculatorInputs): AmortizationPayment[] {
  const { loanAmount, interestRate, loanTerm, paymentFrequency, extraPayment = 0 } = inputs;

  const periodicRate = getPeriodicRate(interestRate, paymentFrequency);
  const paymentsPerYear = getPaymentsPerYear(paymentFrequency);
  const totalPayments = loanTerm * paymentsPerYear;
  const monthlyPayment = calculateLoanPayment(inputs);

  const schedule: AmortizationPayment[] = [];
  let balance = loanAmount;
  let cumulativeInterest = 0;

  for (let period = 1; period <= totalPayments && balance > 0.01; period++) {
    const interestPayment = balance * periodicRate;
    const principalPayment = Math.min(monthlyPayment - interestPayment + extraPayment, balance);
    balance -= principalPayment;
    cumulativeInterest += interestPayment;

    schedule.push({
      period,
      payment: Math.round((principalPayment + interestPayment) * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.round(balance * 100) / 100,
      cumulativeInterest: Math.round(cumulativeInterest * 100) / 100
    });

    if (balance <= 0.01) break;
  }

  return schedule;
}

/**
 * Calculate early payoff analysis with extra payments
 */
export function calculateEarlyPayoffAnalysis(inputs: LoanCalculatorInputs): EarlyPayoffAnalysis {
  const originalSchedule = calculateAmortizationSchedule({ ...inputs, extraPayment: 0 });
  const newSchedule = calculateAmortizationSchedule(inputs);

  const originalTerm = originalSchedule.length;
  const newTerm = newSchedule.length;
  const originalTotalInterest = originalSchedule[originalSchedule.length - 1]?.cumulativeInterest || 0;
  const newTotalInterest = newSchedule[newSchedule.length - 1]?.cumulativeInterest || 0;
  const totalSavings = originalTotalInterest - newTotalInterest;
  const timeSaved = originalTerm - newTerm;

  return {
    originalTerm,
    newTerm,
    totalSavings: Math.round(totalSavings * 100) / 100,
    timeSaved,
    originalTotalInterest: Math.round(originalTotalInterest * 100) / 100,
    newTotalInterest: Math.round(newTotalInterest * 100) / 100
  };
}

/**
 * Calculate estimated payoff date
 */
export function calculatePayoffDate(inputs: LoanCalculatorInputs): string {
  const schedule = calculateAmortizationSchedule(inputs);
  const lastPayment = schedule[schedule.length - 1];

  if (!lastPayment) return new Date().toISOString().split('T')[0];

  const paymentsPerYear = getPaymentsPerYear(inputs.paymentFrequency);
  const years = Math.floor(lastPayment.period / paymentsPerYear);
  const remainingMonths = lastPayment.period % paymentsPerYear;

  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + years);
  payoffDate.setMonth(payoffDate.getMonth() + remainingMonths);

  return payoffDate.toISOString().split('T')[0];
}

/**
 * Main calculation function
 */
export function calculateLoanResult(inputs: LoanCalculatorInputs): LoanCalculatorOutputs {
  const monthlyPayment = calculateLoanPayment(inputs);
  const paymentsPerYear = getPaymentsPerYear(inputs.paymentFrequency);
  const numberOfPayments = inputs.loanTerm * paymentsPerYear;
  const totalInterestPaid = calculateTotalInterestPaid(inputs.loanAmount, monthlyPayment, numberOfPayments);
  const totalAmountPaid = calculateTotalAmountPaid(monthlyPayment, numberOfPayments);
  const amortizationSchedule = calculateAmortizationSchedule(inputs);
  const payoffDate = calculatePayoffDate(inputs);

  let earlyPayoffAnalysis: EarlyPayoffAnalysis | undefined;
  if (inputs.extraPayment && inputs.extraPayment > 0) {
    earlyPayoffAnalysis = calculateEarlyPayoffAnalysis(inputs);
  }

  return {
    monthlyPayment,
    totalInterestPaid,
    totalAmountPaid,
    numberOfPayments: amortizationSchedule.length,
    payoffDate,
    amortizationSchedule,
    earlyPayoffAnalysis
  };
}

/**
 * Generate analysis and recommendations
 */
export function generateLoanAnalysis(
  inputs: LoanCalculatorInputs,
  outputs: LoanCalculatorOutputs
): LoanCalculatorAnalysis {
  const { monthlyPayment, totalInterestPaid, totalAmountPaid } = outputs;
  const interestToPrincipalRatio = totalInterestPaid / inputs.loanAmount;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let insights: string[] = [];
  let warnings: string[] = [];

  // Risk assessment based on interest ratio
  if (interestToPrincipalRatio > 1) {
    riskLevel = 'High';
    warnings.push('High interest burden - consider refinancing or extra payments');
  } else if (interestToPrincipalRatio > 0.5) {
    riskLevel = 'Medium';
    warnings.push('Moderate interest burden - review payment terms');
  } else {
    insights.push('Favorable interest terms');
  }

  // Payment frequency insights
  if (inputs.paymentFrequency === 'monthly') {
    insights.push('Monthly payments help with cash flow management');
  } else if (inputs.paymentFrequency === 'annually') {
    warnings.push('Annual payments may create cash flow challenges');
  }

  // Extra payment analysis
  if (inputs.extraPayment && inputs.extraPayment > 0) {
    insights.push(`Extra payments of $${inputs.extraPayment} could save $${outputs.earlyPayoffAnalysis?.totalSavings || 0} in interest`);
  }

  const recommendation = riskLevel === 'High'
    ? 'Consider negotiating better terms or exploring alternative financing options'
    : riskLevel === 'Medium'
    ? 'Monitor payment progress and consider extra payments when possible'
    : 'Loan terms appear favorable - maintain regular payments';

  return {
    recommendation,
    riskLevel,
    insights,
    warnings
  };
}
