import { AmortizationScheduleInputs, AmortizationScheduleEntry, AmortizationScheduleMetrics, AmortizationScheduleAnalysis } from './types';

// Calculate monthly payment using standard amortization formula
export function calculateMonthlyPayment(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  const monthlyRate = annualInterestRate / 12 / 100;
  const numberOfPayments = loanTermYears * 12;

  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }

  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return payment;
}

// Generate full amortization schedule
export function generateAmortizationSchedule(
  inputs: AmortizationScheduleInputs
): AmortizationScheduleEntry[] {
  const { loanAmount, annualInterestRate, loanTermYears, startDate, extraPayment = 0 } = inputs;

  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTermYears);
  const monthlyRate = annualInterestRate / 12 / 100;
  const totalPayments = loanTermYears * 12;

  const schedule: AmortizationScheduleEntry[] = [];
  let balance = loanAmount;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;

  // Use start date or default to current date
  const startDateObj = startDate ? new Date(startDate) : new Date();

  for (let period = 1; period <= totalPayments && balance > 0.01; period++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interestPayment + extraPayment, balance);

    const endingBalance = balance - principalPayment;

    cumulativeInterest += interestPayment;
    cumulativePrincipal += principalPayment;

    // Calculate payment date
    const paymentDate = new Date(startDateObj);
    paymentDate.setMonth(startDateObj.getMonth() + period - 1);

    const entry: AmortizationScheduleEntry = {
      period,
      paymentDate: paymentDate.toISOString().split('T')[0],
      beginningBalance: balance,
      scheduledPayment: monthlyPayment,
      extraPayment,
      totalPayment: monthlyPayment + extraPayment,
      principalPayment,
      interestPayment,
      endingBalance,
      cumulativeInterest,
      cumulativePrincipal
    };

    schedule.push(entry);
    balance = endingBalance;

    // Break if balance is essentially zero
    if (balance < 0.01) break;
  }

  return schedule;
}

// Calculate amortization metrics
export function calculateAmortizationMetrics(
  schedule: AmortizationScheduleEntry[],
  inputs: AmortizationScheduleInputs
): AmortizationScheduleMetrics {
  if (schedule.length === 0) {
    return {
      totalPayments: 0,
      totalInterest: 0,
      totalPrincipal: 0,
      numberOfPayments: 0,
      lastPaymentDate: '',
      payoffDate: '',
      totalAmountPaid: 0,
      interestToPrincipalRatio: 0
    };
  }

  const lastEntry = schedule[schedule.length - 1];
  const totalPayments = schedule.reduce((sum, entry) => sum + entry.totalPayment, 0);
  const totalInterest = lastEntry.cumulativeInterest;
  const totalPrincipal = lastEntry.cumulativePrincipal;

  return {
    totalPayments,
    totalInterest,
    totalPrincipal,
    numberOfPayments: schedule.length,
    lastPaymentDate: lastEntry.paymentDate,
    payoffDate: lastEntry.paymentDate,
    totalAmountPaid: totalPayments,
    interestToPrincipalRatio: totalInterest / totalPrincipal
  };
}

// Generate analysis
export function generateAmortizationAnalysis(
  schedule: AmortizationScheduleEntry[],
  metrics: AmortizationScheduleMetrics,
  inputs: AmortizationScheduleInputs
): AmortizationScheduleAnalysis {
  const { loanAmount, annualInterestRate, loanTermYears, extraPayment = 0 } = inputs;

  // Determine efficiency
  let efficiency = 'Standard';
  if (extraPayment > 0) efficiency = 'Accelerated';
  if (metrics.interestToPrincipalRatio < 0.3) efficiency = 'Very Efficient';
  else if (metrics.interestToPrincipalRatio < 0.5) efficiency = 'Efficient';
  else if (metrics.interestToPrincipalRatio > 0.8) efficiency = 'Inefficient';

  const recommendations = [];
  if (extraPayment === 0 && annualInterestRate > 5) {
    recommendations.push('Consider making extra payments to reduce total interest');
  }
  if (metrics.interestToPrincipalRatio > 0.7) {
    recommendations.push('High interest portion suggests reviewing loan terms');
  }
  if (loanTermYears > 20) {
    recommendations.push('Long loan term increases total interest paid');
  }

  // Analyze payment breakdown
  const totalPeriods = schedule.length;
  const earlyPayments = Math.floor(totalPeriods * 0.3);
  const midPayments = Math.floor(totalPeriods * 0.4);
  const latePayments = totalPeriods - earlyPayments - midPayments;

  const paymentBreakdown = {
    earlyPayments: schedule.slice(0, earlyPayments).reduce((sum, entry) => sum + entry.interestPayment, 0),
    midPayments: schedule.slice(earlyPayments, earlyPayments + midPayments).reduce((sum, entry) => sum + entry.interestPayment, 0),
    latePayments: schedule.slice(earlyPayments + midPayments).reduce((sum, entry) => sum + entry.interestPayment, 0)
  };

  const interestAnalysis = metrics.interestToPrincipalRatio > 0.5
    ? 'High proportion of payments going to interest - consider refinancing or extra payments'
    : 'Good balance between principal and interest payments';

  return {
    efficiency,
    recommendations,
    paymentBreakdown,
    interestAnalysis
  };
}