import { RetirementPlanningCalculatorinputs, RetirementPlanningCalculatormetrics, RetirementPlanningCalculatoranalysis } from './types';

// Retirement Calculator
export function calculateRetirementSavings(currentSavings: number, monthlyContribution: number, annualReturn: number, years: number): number {
  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;

  // Future value of current savings
  const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);

  // Future value of monthly contributions
  const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return futureValueCurrent + futureValueContributions;
}

export function calculateRequiredMonthlyContribution(targetAmount: number, currentSavings: number, annualReturn: number, years: number): number {
  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;

  const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
  const remainingAmount = targetAmount - futureValueCurrent;

  if (remainingAmount <= 0) return 0;

  return remainingAmount / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

export function calculateResult(inputs: RetirementPlanningCalculatorinputs): number {
  if ('currentSavings' in inputs && 'monthlyContribution' in inputs && 'expectedReturn' in inputs && 'yearsToRetirement' in inputs) {
    return calculateRetirementSavings(
      inputs.currentSavings,
      inputs.monthlyContribution,
      inputs.expectedReturn,
      inputs.yearsToRetirement
    );
  }
  return 0;
}

export function generateAnalysis(inputs: RetirementPlanningCalculatorinputs, metrics: RetirementPlanningCalculatormetrics): RetirementPlanningCalculatoranalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result < 500000) riskLevel = 'High';
  else if (result < 1000000) riskLevel = 'Medium';

  const recommendation = result >= 1000000 ?
    'On track for comfortable retirement' :
    'Consider increasing contributions or extending retirement age';

  return { recommendation, riskLevel };
}