import { board-game-investment-calculatorInputs, board-game-investment-calculatorMetrics, board-game-investment-calculatorAnalysis } from './types';

// Investment Calculator - Compound Interest
export function calculateFutureValue(principal: number, annualRate: number, years: number, compoundingFrequency: number = 12): number {
  const rate = annualRate / 100 / compoundingFrequency;
  const periods = years * compoundingFrequency;
  return principal * Math.pow(1 + rate, periods);
}

export function calculateTotalContributions(monthlyContribution: number, years: number): number {
  return monthlyContribution * years * 12;
}

export function calculateTotalInterest(futureValue: number, principal: number, totalContributions: number): number {
  return futureValue - principal - totalContributions;
}

export function calculateResult(inputs: board-game-investment-calculatorInputs): number {
  if ('initialInvestment' in inputs && 'annualReturn' in inputs && 'investmentPeriod' in inputs) {
    return calculateFutureValue(
      inputs.initialInvestment,
      inputs.annualReturn,
      inputs.investmentPeriod,
      inputs.compoundingFrequency || 12
    );
  }
  return 0;
}

export function generateAnalysis(inputs: board-game-investment-calculatorInputs, metrics: board-game-investment-calculatorMetrics): board-game-investment-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 1000000) riskLevel = 'High';
  else if (result > 100000) riskLevel = 'Medium';

  const recommendation = 'Investment growth calculated using compound interest. Past performance does not guarantee future results.';

  return { recommendation, riskLevel };
}