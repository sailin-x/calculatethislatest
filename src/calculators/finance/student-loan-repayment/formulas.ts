import { StudentLoanRepaymentInputs, StudentLoanRepaymentOutputs, StudentLoanRepaymentMetrics, StudentLoanRepaymentAnalysis } from './types';

// Federal poverty guidelines (2024) - simplified for calculation
const POVERTY_GUIDELINES = {
  contiguous: [13880, 18820, 23760, 28700, 33640, 38580, 43520, 48460],
  hawaii: [15990, 21670, 27350, 33030, 38710, 44390, 50070, 55750],
  alaska: [17430, 23630, 29830, 36030, 42230, 48430, 54630, 60830]
};

// Calculate standard repayment amount
export function calculateStandardPayment(principal: number, rate: number, years: number): number {
  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

// Calculate graduated payment (starts lower, increases by 1/6 each year)
export function calculateGraduatedPayment(principal: number, rate: number, years: number): number {
  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  let totalPayments = 0;
  let remainingBalance = principal;

  for (let year = 0; year < years; year++) {
    const yearPayments = Math.min(6, numPayments - year * 12); // Up to 6 payments per year
    const yearPayment = calculateStandardPayment(remainingBalance, rate, years - year);
    const monthlyPayment = yearPayment * (1 + year * 1/6); // Increase by 1/6 each year
    totalPayments += monthlyPayment * yearPayments;
    remainingBalance -= monthlyPayment * yearPayments;
  }

  return totalPayments / numPayments; // Average monthly payment
}

// Calculate extended repayment (up to 25 years)
export function calculateExtendedPayment(principal: number, rate: number): number {
  return calculateStandardPayment(principal, rate, 25);
}

// Calculate income-based repayment (IBR) - 15% of discretionary income
export function calculateIBRPayment(inputs: StudentLoanRepaymentInputs): number {
  const annualIncome = inputs.monthlyIncome * 12;
  const povertyGuideline = POVERTY_GUIDELINES.contiguous[Math.min(inputs.familySize - 1, 7)];
  const discretionaryIncome = Math.max(0, annualIncome - povertyGuideline);
  const annualPayment = discretionaryIncome * 0.15;
  return Math.min(annualPayment / 12, calculateStandardPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears));
}

// Calculate PAYE (Pay As You Earn) - 10% of discretionary income
export function calculatePAYEPayment(inputs: StudentLoanRepaymentInputs): number {
  const annualIncome = inputs.monthlyIncome * 12;
  const povertyGuideline = POVERTY_GUIDELINES.contiguous[Math.min(inputs.familySize - 1, 7)];
  const discretionaryIncome = Math.max(0, annualIncome - povertyGuideline);
  const annualPayment = discretionaryIncome * 0.10;
  return Math.min(annualPayment / 12, calculateStandardPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears));
}

// Calculate REPAYE (Revised PAYE) - 10% of discretionary income, includes spouse income
export function calculateREPAYEPayment(inputs: StudentLoanRepaymentInputs): number {
  const annualIncome = inputs.monthlyIncome * 12 + (inputs.spouseIncome || 0);
  const povertyGuideline = POVERTY_GUIDELINES.contiguous[Math.min(inputs.familySize - 1, 7)];
  const discretionaryIncome = Math.max(0, annualIncome - povertyGuideline);
  const annualPayment = discretionaryIncome * 0.10;
  return Math.min(annualPayment / 12, calculateStandardPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears));
}

// Calculate Income Contingent Repayment (ICR) - 20% of discretionary income
export function calculateICRPayment(inputs: StudentLoanRepaymentInputs): number {
  const annualIncome = inputs.monthlyIncome * 12;
  const povertyGuideline = POVERTY_GUIDELINES.contiguous[Math.min(inputs.familySize - 1, 7)];
  const discretionaryIncome = Math.max(0, annualIncome - povertyGuideline);
  const annualPayment = discretionaryIncome * 0.20;
  return Math.min(annualPayment / 12, calculateStandardPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears));
}

// Calculate Income Sensitive Repayment (ISR) - varies by lender
export function calculateISRPayment(inputs: StudentLoanRepaymentInputs): number {
  // Simplified: assume 4-6% of income based on credit and income
  const incomePercentage = inputs.monthlyIncome * 12 < 30000 ? 0.04 :
                          inputs.monthlyIncome * 12 < 50000 ? 0.05 : 0.06;
  return Math.min(inputs.monthlyIncome * incomePercentage, calculateStandardPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears));
}

// Calculate affordability score (0-100)
export function calculateAffordabilityScore(inputs: StudentLoanRepaymentInputs, monthlyPayment: number): number {
  const disposableIncome = inputs.monthlyIncome - inputs.monthlyExpenses;
  const paymentRatio = monthlyPayment / inputs.monthlyIncome;
  const debtRatio = (inputs.monthlyExpenses + monthlyPayment) / inputs.monthlyIncome;

  let score = 100;

  if (paymentRatio > 0.15) score -= 30;
  else if (paymentRatio > 0.10) score -= 15;

  if (debtRatio > 0.50) score -= 25;
  else if (debtRatio > 0.43) score -= 10;

  if (disposableIncome < 500) score -= 20;
  else if (disposableIncome < 1000) score -= 10;

  return Math.max(0, Math.min(100, score));
}

// Calculate payoff date
export function calculatePayoffDate(principal: number, monthlyPayment: number, rate: number): string {
  const monthlyRate = rate / 100 / 12;
  let balance = principal;
  let months = 0;
  const maxMonths = 360; // 30 years max

  while (balance > 0 && months < maxMonths) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    balance -= principalPayment;
    months++;
  }

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + months);
  return payoffDate.toISOString().split('T')[0];
}

// Main calculation function
export function calculateStudentLoanRepayment(inputs: StudentLoanRepaymentInputs): StudentLoanRepaymentOutputs {
  let monthlyPayment: number;

  switch (inputs.repaymentPlan) {
    case 'standard':
      monthlyPayment = calculateStandardPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears);
      break;
    case 'graduated':
      monthlyPayment = calculateGraduatedPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears);
      break;
    case 'extended':
      monthlyPayment = calculateExtendedPayment(inputs.loanBalance, inputs.interestRate);
      break;
    case 'income_based':
      monthlyPayment = calculateIBRPayment(inputs);
      break;
    case 'pay_as_you_earn':
      monthlyPayment = calculatePAYEPayment(inputs);
      break;
    case 'revised_pay_as_you_earn':
      monthlyPayment = calculateREPAYEPayment(inputs);
      break;
    case 'income_contingent':
      monthlyPayment = calculateICRPayment(inputs);
      break;
    case 'income_sensitive':
      monthlyPayment = calculateISRPayment(inputs);
      break;
    default:
      monthlyPayment = calculateStandardPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears);
  }

  const totalPayments = monthlyPayment * inputs.loanTermYears * 12;
  const totalInterest = totalPayments - inputs.loanBalance;
  const payoffDate = calculatePayoffDate(inputs.loanBalance, monthlyPayment, inputs.interestRate);

  const debtToIncomeRatio = ((inputs.monthlyExpenses + monthlyPayment) / inputs.monthlyIncome) * 100;
  const paymentToIncomeRatio = (monthlyPayment / inputs.monthlyIncome) * 100;
  const affordabilityScore = calculateAffordabilityScore(inputs, monthlyPayment);

  // Recommend best plan based on income and debt ratios
  let recommendedPlan = 'standard';
  if (debtToIncomeRatio > 50 || paymentToIncomeRatio > 15) {
    if (inputs.loanBalance > 30000) {
      recommendedPlan = 'income_based';
    } else {
      recommendedPlan = 'graduated';
    }
  }

  const standardPayment = calculateStandardPayment(inputs.loanBalance, inputs.interestRate, inputs.loanTermYears);
  const estimatedMonthlySavings = Math.max(0, standardPayment - monthlyPayment);

  const yearsToPayoff = inputs.loanTermYears;
  const totalCost = totalPayments;

  return {
    monthlyPayment,
    totalPayments,
    totalInterest,
    payoffDate,
    debtToIncomeRatio,
    paymentToIncomeRatio,
    affordabilityScore,
    recommendedPlan,
    estimatedMonthlySavings,
    yearsToPayoff,
    totalCost
  };
}

// Generate analysis and recommendations
export function generateStudentLoanRepaymentAnalysis(
  inputs: StudentLoanRepaymentInputs,
  outputs: StudentLoanRepaymentOutputs
): StudentLoanRepaymentAnalysis {
  let recommendation = '';
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

  if (outputs.affordabilityScore < 30) {
    riskLevel = 'High';
    recommendation = 'Your current plan may not be affordable. Consider income-driven repayment options or contacting your loan servicer for hardship assistance.';
  } else if (outputs.affordabilityScore < 60) {
    riskLevel = 'Medium';
    recommendation = 'Your payment plan is moderately affordable. Consider reviewing income-driven options to potentially lower payments.';
  } else {
    recommendation = `Your ${inputs.repaymentPlan} plan appears affordable. Continue monitoring your financial situation and consider making extra payments when possible.`;
  }

  if (outputs.recommendedPlan !== inputs.repaymentPlan) {
    recommendation += ` Based on your income and debt levels, ${outputs.recommendedPlan} repayment may be more suitable.`;
  }

  return { recommendation, riskLevel };
}

// Calculate result for metrics
export function calculateResult(inputs: StudentLoanRepaymentInputs): number {
  const outputs = calculateStudentLoanRepayment(inputs);
  return outputs.affordabilityScore;
}

// Generate metrics
export function generateMetrics(inputs: StudentLoanRepaymentInputs): StudentLoanRepaymentMetrics {
  return {
    result: calculateResult(inputs)
  };
}

// Generate analysis
export function generateAnalysis(inputs: StudentLoanRepaymentInputs): StudentLoanRepaymentAnalysis {
  const outputs = calculateStudentLoanRepayment(inputs);
  return generateStudentLoanRepaymentAnalysis(inputs, outputs);
}