import { HelocInputs, HelocMetrics, HelocAnalysis } from './types';

// Calculate available home equity
export function calculateHomeEquity(homeValue: number, outstandingMortgageBalance: number): number {
  return Math.max(0, homeValue - outstandingMortgageBalance);
}

// Calculate maximum HELOC credit limit
export function calculateMaximumCreditLimit(homeEquity: number, creditLimitPercentage: number): number {
  return homeEquity * (creditLimitPercentage / 100);
}

// Calculate monthly payment during draw period (interest-only)
export function calculateMonthlyPaymentDuringDraw(drawnAmount: number, annualInterestRate: number): number {
  const monthlyRate = annualInterestRate / 100 / 12;
  return drawnAmount * monthlyRate;
}

// Calculate monthly payment during repayment period (amortizing)
export function calculateMonthlyPaymentDuringRepayment(
  drawnAmount: number,
  annualInterestRate: number,
  repaymentPeriodYears: number
): number {
  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = repaymentPeriodYears * 12;

  if (monthlyRate === 0) {
    return drawnAmount / numberOfPayments;
  }

  return drawnAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// Calculate total interest paid over the life of the HELOC
export function calculateTotalInterestPaid(
  drawnAmount: number,
  monthlyPaymentDuringDraw: number,
  monthlyPaymentDuringRepayment: number,
  drawPeriodYears: number,
  repaymentPeriodYears: number
): number {
  const drawPeriodMonths = drawPeriodYears * 12;
  const repaymentPeriodMonths = repaymentPeriodYears * 12;

  const interestDuringDraw = drawPeriodMonths * monthlyPaymentDuringDraw;
  const totalPaymentsDuringRepayment = repaymentPeriodMonths * monthlyPaymentDuringRepayment;
  const principalRepaid = drawnAmount;
  const interestDuringRepayment = totalPaymentsDuringRepayment - principalRepaid;

  return interestDuringDraw + interestDuringRepayment;
}

// Calculate total payments
export function calculateTotalPayments(
  monthlyPaymentDuringDraw: number,
  monthlyPaymentDuringRepayment: number,
  drawPeriodYears: number,
  repaymentPeriodYears: number
): number {
  const drawPeriodMonths = drawPeriodYears * 12;
  const repaymentPeriodMonths = repaymentPeriodYears * 12;

  return (drawPeriodMonths * monthlyPaymentDuringDraw) +
         (repaymentPeriodMonths * monthlyPaymentDuringRepayment);
}

// Calculate payoff date
export function calculatePayoffDate(drawPeriodYears: number, repaymentPeriodYears: number): string {
  const totalYears = drawPeriodYears + repaymentPeriodYears;
  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + totalYears);
  return payoffDate.toISOString().split('T')[0];
}

// Generate HELOC analysis
export function generateHelocAnalysis(
  inputs: HelocInputs,
  metrics: HelocMetrics
): HelocAnalysis {
  const { homeValue, outstandingMortgageBalance, creditLimitPercentage } = inputs;
  const { availableCredit, totalInterestPaid, totalPayments } = metrics;

  // Determine equity position
  const loanToValueRatio = (outstandingMortgageBalance / homeValue) * 100;
  let equityPosition = 'Strong';
  if (loanToValueRatio > 80) equityPosition = 'Moderate';
  if (loanToValueRatio > 90) equityPosition = 'Weak';

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' = 'low';
  if (creditLimitPercentage > 85) riskLevel = 'high';
  else if (creditLimitPercentage > 75) riskLevel = 'moderate';

  const recommendations = [];
  if (riskLevel === 'high') {
    recommendations.push('Consider lower credit limit percentage to reduce risk');
  }
  if (equityPosition === 'Weak') {
    recommendations.push('Consider building more equity before taking HELOC');
  }
  recommendations.push('HELOC rates are variable - monitor rate changes');
  recommendations.push('Only borrow what you need and can repay');

  const costComparison = {
    vsTraditionalLoan: totalInterestPaid > (availableCredit * 0.08) ?
      'More expensive than fixed-rate loan' : 'Potentially cheaper than personal loan',
    vsCreditCard: 'Much lower interest rate than credit cards',
    vsPersonalLoan: totalInterestPaid < (availableCredit * 0.15) ?
      'Potentially cheaper than unsecured personal loans' : 'May be more expensive than secured loans'
  };

  return {
    equityPosition,
    riskLevel,
    recommendations,
    costComparison
  };
}