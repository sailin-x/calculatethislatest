import { MortgagePaymentInputs, MortgagePaymentOutputs } from './types';


// Mortgage Payment Calculator - Standard loan amortization formula
export function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateTotalInterest(principal: number, monthlyPayment: number, numPayments: number): number {
  return (monthlyPayment * numPayments) - principal;
}

// Additional calculation functions for mortgage payment analysis
export function calculatePrincipalPayment(inputs: MortgagePaymentInputs): number {
  if (inputs.paymentType === 'interest_only') {
    return 0;
  }
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const monthlyRate = inputs.interestRate / 100 / 12;
  const balance = inputs.loanAmount; // Simplified - would need amortization schedule for accuracy
  return monthlyPayment - (balance * monthlyRate);
}

export function calculateInterestPayment(inputs: MortgagePaymentInputs): number {
  const monthlyRate = inputs.interestRate / 100 / 12;
  return inputs.loanAmount * monthlyRate;
}

export function calculateTotalPayment(inputs: MortgagePaymentInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const taxes = (inputs.propertyTaxes || 0) / 12;
  const insurance = (inputs.propertyInsurance || 0) / 12;
  const hoa = inputs.hoaFees || 0;
  const flood = (inputs.floodInsurance || 0) / 12;
  const pmi = (inputs.mortgageInsurance || 0) / 12;
  return monthlyPayment + taxes + insurance + hoa + flood + pmi;
}

export function calculateTotalPayments(inputs: MortgagePaymentInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  return monthlyPayment * inputs.loanTerm * 12;
}

export function calculateTotalInterestPaid(inputs: MortgagePaymentInputs): number {
  const totalPayments = calculateTotalPayments(inputs);
  return totalPayments - inputs.loanAmount;
}

export function calculateEffectiveInterestRate(inputs: MortgagePaymentInputs): number {
  return inputs.interestRate; // Simplified - APR calculation would be more complex
}

export function calculateBreakEvenPoint(inputs: MortgagePaymentInputs): number {
  const monthlyPayment = calculateTotalPayment(inputs);
  const monthlyIncome = inputs.borrowerIncome / 12;
  return (monthlyPayment / monthlyIncome) * 100;
}

export function calculateBreakEvenMonths(inputs: MortgagePaymentInputs): number {
  return inputs.loanTerm * 12; // Simplified
}

export function calculateBreakEvenYears(inputs: MortgagePaymentInputs): number {
  return inputs.loanTerm;
}

export function calculateEquityPosition(inputs: MortgagePaymentInputs): number {
  return inputs.propertyValue - inputs.loanAmount;
}

export function calculateEquityPercentage(inputs: MortgagePaymentInputs): number {
  const equity = calculateEquityPosition(inputs);
  return (equity / inputs.propertyValue) * 100;
}

export function calculateLoanToValueRatio(inputs: MortgagePaymentInputs): number {
  return (inputs.loanAmount / inputs.propertyValue) * 100;
}

export function calculateMonthlyCashFlow(inputs: MortgagePaymentInputs): number {
  const monthlyIncome = inputs.borrowerIncome / 12;
  const monthlyExpenses = calculateTotalPayment(inputs);
  return monthlyIncome - monthlyExpenses;
}

export function calculateAnnualCashFlow(inputs: MortgagePaymentInputs): number {
  return calculateMonthlyCashFlow(inputs) * 12;
}

export function calculateTotalCashFlow(inputs: MortgagePaymentInputs): number {
  return calculateAnnualCashFlow(inputs) * inputs.loanTerm;
}

export function calculateRiskScore(inputs: MortgagePaymentInputs): number {
  let score = 0;
  if (inputs.borrowerCreditScore < 620) score += 30;
  if (calculateLoanToValueRatio(inputs) > 90) score += 20;
  if (inputs.borrowerDebtToIncomeRatio && inputs.borrowerDebtToIncomeRatio > 43) score += 25;
  if (inputs.interestRate > 8) score += 15;
  return Math.min(score, 100);
}

export function calculateAmortizationSchedule(inputs: MortgagePaymentInputs): any[] {
  // Simplified amortization schedule
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const monthlyRate = inputs.interestRate / 100 / 12;
  const schedule = [];
  let balance = inputs.loanAmount;

  for (let month = 1; month <= inputs.loanTerm * 12; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance)
    });

    if (balance <= 0) break;
  }

  return schedule;
}

export function calculateARMSchedule(inputs: MortgagePaymentInputs): any[] {
  // Simplified ARM schedule - would need more complex logic for actual ARM calculations
  return calculateAmortizationSchedule(inputs);
}

export function calculateProbabilityOfDefault(inputs: MortgagePaymentInputs): number {
  const riskScore = calculateRiskScore(inputs);
  return riskScore / 100 * 0.5; // Max 50% probability
}

export function calculatePaymentShockRisk(inputs: MortgagePaymentInputs): number {
  if (inputs.paymentType === 'arm') {
    return 0.3; // ARM loans have higher payment shock risk
  }
  return 0.1;
}

export function calculateInterestRateRisk(inputs: MortgagePaymentInputs): number {
  if (inputs.paymentType === 'arm') {
    return 0.4; // ARM loans have higher interest rate risk
  }
  return 0.1;
}

export function calculateSensitivityMatrix(inputs: MortgagePaymentInputs): any {
  // Simplified sensitivity analysis
  const basePayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  return {
    rateIncrease1Percent: calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate + 1, inputs.loanTerm) - basePayment,
    rateDecrease1Percent: basePayment - calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate - 1, inputs.loanTerm)
  };
}

export function calculateScenarios(inputs: MortgagePaymentInputs): any {
  return {
    bestCase: calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate - 1, inputs.loanTerm),
    worstCase: calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate + 2, inputs.loanTerm),
    baseCase: calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm)
  };
}

export function calculateComparisonAnalysis(inputs: MortgagePaymentInputs): any {
  const fixedRate = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const armRate = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate - 1, inputs.loanTerm);
  return {
    fixedVsArm: fixedRate - armRate,
    savingsWithArm: (fixedRate - armRate) * 12 * 5 // 5-year savings
  };
}

export function generateMortgagePaymentAnalysis(inputs: MortgagePaymentInputs): any {
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const totalCost = calculateTotalPayments(inputs);
  const totalInterest = calculateTotalInterestPaid(inputs);
  const riskScore = calculateRiskScore(inputs);

  let recommendation = 'This mortgage appears affordable based on your inputs.';
  if (riskScore > 70) {
    recommendation = 'High risk - consider improving credit score or reducing loan amount.';
  } else if (riskScore > 40) {
    recommendation = 'Moderate risk - review all terms carefully before proceeding.';
  }

  return {
    monthlyPayment,
    totalCost,
    totalInterest,
    riskScore,
    recommendation,
    affordability: calculateBreakEvenPoint(inputs) < 30 ? 'Good' : 'Needs Review'
  };
}
