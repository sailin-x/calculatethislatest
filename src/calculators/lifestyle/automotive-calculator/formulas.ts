import { automotive-calculatorInputs, automotive-calculatorMetrics, automotive-calculatorAnalysis } from './types';

// Automotive Calculator
export function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
         (Math.pow(1 + monthlyRate, months) - 1);
}

export function calculateTotalCost(monthlyPayment: number, months: number): number {
  return monthlyPayment * months;
}

export function calculateResult(inputs: automotive-calculatorInputs): number {
  if ('loanAmount' in inputs && 'interestRate' in inputs && 'loanTermMonths' in inputs) {
    return calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTermMonths);
  }
  return 0;
}

export function generateAnalysis(inputs: automotive-calculatorInputs, metrics: automotive-calculatorMetrics): automotive-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 1000) riskLevel = 'High';
  else if (result > 500) riskLevel = 'Medium';

  const recommendation = 'Monthly car payment calculated. Consider total cost including insurance and maintenance.';

  return { recommendation, riskLevel };
}