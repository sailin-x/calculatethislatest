import { MortgagePaymentCalculatorinputs, MortgagePaymentCalculatormetrics, MortgagePaymentCalculatoranalysis } from './types';

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

export function calculatePrincipalPayment(monthlyPayment: number, interestPayment: number): number {
  return monthlyPayment - interestPayment;
}

export function calculateInterestPayment(principal: number, annualRate: number): number {
  return (principal * annualRate / 100) / 12;
}

export function calculateResult(inputs: MortgagePaymentCalculatorinputs): number {
  if ('loanAmount' in inputs && 'interestRate' in inputs && 'loanTerm' in inputs) {
    return calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  }
  return 0;
}

export function generateAnalysis(inputs: MortgagePaymentCalculatorinputs, metrics: MortgagePaymentCalculatormetrics): MortgagePaymentCalculatoranalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 5000) riskLevel = 'High';
  else if (result > 2000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Monthly mortgage payment calculated. Consider DebtToIncome ratio.' :
    'Review loan terms and interest rates';

  return { recommendation, riskLevel };
}