import { MortgageEquityInputs, MortgageEquityOutputs } from './types';

// Calculate remaining loan balance using amortization formula
export function calculateRemainingBalance(
  originalLoanAmount: number,
  monthlyPayment: number,
  interestRate: number,
  loanTerm: number,
  monthsPaid: number
): number {
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  if (monthlyRate === 0) {
    return originalLoanAmount - (monthlyPayment * monthsPaid);
  }

  // Calculate remaining balance using the loan balance formula
  const remainingBalance = (monthlyPayment * (1 - Math.pow(1 + monthlyRate, -(totalPayments - monthsPaid)))) / monthlyRate;
  return Math.max(0, remainingBalance);
}

// Calculate current equity
export function calculateCurrentEquity(propertyValue: number, loanBalance: number): number {
  return Math.max(0, propertyValue - loanBalance);
}

// Calculate equity percentage
export function calculateEquityPercentage(propertyValue: number, loanBalance: number): number {
  if (propertyValue <= 0) return 0;
  return ((propertyValue - loanBalance) / propertyValue) * 100;
}

// Calculate loan-to-value ratio
export function calculateLoanToValueRatio(loanBalance: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return (loanBalance / propertyValue) * 100;
}

// Calculate principal paid so far
export function calculatePrincipalPaid(
  originalLoanAmount: number,
  monthlyPayment: number,
  interestRate: number,
  monthsPaid: number
): number {
  const currentBalance = calculateRemainingBalance(originalLoanAmount, monthlyPayment, interestRate, originalLoanAmount / monthlyPayment * 12, monthsPaid);
  return originalLoanAmount - currentBalance;
}

// Project equity growth over time
export function calculateEquityGrowth(
  inputs: MortgageEquityInputs
): MortgageEquityOutputs['equityGrowth'] {
  const growth: MortgageEquityOutputs['equityGrowth'] = [];
  const periods = Math.min(inputs.analysisPeriod, 30); // Max 30 years

  for (let year = 1; year <= periods; year++) {
    const months = year * 12;
    const currentBalance = calculateRemainingBalance(
      inputs.originalLoanAmount,
      inputs.monthlyPayment,
      inputs.interestRate,
      inputs.loanTerm,
      Math.min(months, inputs.loanTerm * 12)
    );

    const appreciatedValue = inputs.propertyValue * Math.pow(1 + inputs.propertyAppreciationRate / 100, year);
    const equityAmount = calculateCurrentEquity(appreciatedValue, currentBalance);
    const equityPercentage = calculateEquityPercentage(appreciatedValue, currentBalance);

    growth.push({
      period: year,
      equityAmount,
      equityPercentage,
      propertyValue: appreciatedValue,
      loanBalance: currentBalance
    });
  }

  return growth;
}

// Calculate equity build-up components
export function calculateEquityBuildUp(inputs: MortgageEquityInputs): MortgageEquityOutputs['equityBuildUp'] {
  const principalPaid = calculatePrincipalPaid(
    inputs.originalLoanAmount,
    inputs.monthlyPayment,
    inputs.interestRate,
    inputs.monthsPaid
  );

  const appreciation = inputs.propertyValue * (Math.pow(1 + inputs.propertyAppreciationRate / 100, inputs.monthsPaid / 12) - 1);

  return {
    principalPaid,
    appreciation,
    totalEquity: principalPaid + appreciation
  };
}

// Calculate cash flow analysis
export function calculateCashFlowAnalysis(inputs: MortgageEquityInputs): MortgageEquityOutputs['cashFlowAnalysis'] {
  const monthlyIncome = inputs.rentalIncome;
  const monthlyExpenses = inputs.monthlyPayment +
                         (inputs.propertyTaxes / 12) +
                         (inputs.homeownersInsurance / 12) +
                         inputs.hoaFees +
                         inputs.maintenanceCosts +
                         (inputs.rentalIncome * inputs.vacancyRate / 100) +
                         (inputs.rentalIncome * inputs.propertyManagementFee / 100);

  const monthlyCashFlow = monthlyIncome - monthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const totalInvestment = inputs.originalLoanAmount - inputs.loanBalance + (inputs.propertyValue - inputs.originalLoanAmount);
  const cashOnCashReturn = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlyCashFlow,
    annualCashFlow,
    cashOnCashReturn
  };
}

// Calculate breakeven analysis
export function calculateBreakevenAnalysis(inputs: MortgageEquityInputs): MortgageEquityOutputs['breakevenAnalysis'] {
  const totalInvestment = inputs.originalLoanAmount - inputs.loanBalance + (inputs.propertyValue - inputs.originalLoanAmount);
  const monthlyCashFlow = calculateCashFlowAnalysis(inputs).monthlyCashFlow;

  let breakevenMonths = Infinity;
  if (monthlyCashFlow > 0) {
    breakevenMonths = Math.ceil(totalInvestment / monthlyCashFlow);
  }

  const breakevenYears = breakevenMonths / 12;
  const totalReturn = monthlyCashFlow * breakevenMonths;

  return {
    breakevenMonths,
    breakevenYears,
    totalInvestment,
    totalReturn
  };
}

// Assess risk levels
export function calculateRiskAssessment(inputs: MortgageEquityInputs): MortgageEquityOutputs['riskAssessment'] {
  const equityPercentage = calculateEquityPercentage(inputs.propertyValue, inputs.loanBalance);
  const ltvRatio = calculateLoanToValueRatio(inputs.loanBalance, inputs.propertyValue);
  const cashFlow = calculateCashFlowAnalysis(inputs);

  // Equity risk assessment
  let equityRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (ltvRatio > 80) equityRisk = 'High';
  else if (ltvRatio > 75) equityRisk = 'Medium';

  // Market risk assessment
  let marketRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.propertyAppreciationRate < 1) marketRisk = 'High';
  else if (inputs.propertyAppreciationRate < 3) marketRisk = 'Medium';

  // Cash flow risk assessment
  let cashFlowRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (cashFlow.cashOnCashReturn < 4) cashFlowRisk = 'High';
  else if (cashFlow.cashOnCashReturn < 6) cashFlowRisk = 'Medium';

  // Overall risk
  const riskScores = { Low: 1, Medium: 2, High: 3 };
  const overallScore = (riskScores[equityRisk] + riskScores[marketRisk] + riskScores[cashFlowRisk]) / 3;
  let overallRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (overallScore > 2.5) overallRisk = 'High';
  else if (overallScore > 1.5) overallRisk = 'Medium';

  // Generate recommendations
  const recommendations: string[] = [];
  if (equityRisk === 'High') {
    recommendations.push('Consider paying down the loan balance to reduce LTV ratio');
  }
  if (marketRisk === 'High') {
    recommendations.push('Diversify investments to reduce market risk exposure');
  }
  if (cashFlowRisk === 'High') {
    recommendations.push('Review expenses and consider increasing rental income');
  }
  if (overallRisk === 'High') {
    recommendations.push('Consult with a financial advisor for risk mitigation strategies');
  }

  return {
    equityRisk,
    marketRisk,
    cashFlowRisk,
    overallRisk,
    recommendations
  };
}

// Main calculation function
export function calculateMortgageEquity(inputs: MortgageEquityInputs): MortgageEquityOutputs {
  const currentEquity = calculateCurrentEquity(inputs.propertyValue, inputs.loanBalance);
  const equityPercentage = calculateEquityPercentage(inputs.propertyValue, inputs.loanBalance);
  const loanToValueRatio = calculateLoanToValueRatio(inputs.loanBalance, inputs.propertyValue);
  const equityGrowth = calculateEquityGrowth(inputs);
  const equityBuildUp = calculateEquityBuildUp(inputs);
  const cashFlowAnalysis = calculateCashFlowAnalysis(inputs);
  const breakevenAnalysis = calculateBreakevenAnalysis(inputs);
  const riskAssessment = calculateRiskAssessment(inputs);

  return {
    currentEquity,
    equityPercentage,
    loanToValueRatio,
    equityGrowth,
    equityBuildUp,
    cashFlowAnalysis,
    breakevenAnalysis,
    riskAssessment
  };
}