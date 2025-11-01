import { DividendDiscountModelInputs, DividendDiscountModelMetrics, DividendDiscountModelAnalysis } from './types';

// Gordon Growth Model (Single-stage DDM)
export function calculateGordonGrowthModel(currentDividend: number, growthRate: number, discountRate: number): number {
  if (discountRate <= growthRate) {
    throw new Error('Discount rate must be greater than growth rate for Gordon Growth Model');
  }
  return currentDividend * (1 + growthRate) / (discountRate - growthRate);
}

// Two-stage DDM
export function calculateTwoStageDDM(
  currentDividend: number,
  initialGrowthRate: number,
  terminalGrowthRate: number,
  discountRate: number,
  highGrowthYears: number
): number {
  if (discountRate <= terminalGrowthRate) {
    throw new Error('Discount rate must be greater than terminal growth rate');
  }

  let presentValue = 0;
  let dividend = currentDividend;

  // High growth phase
  for (let year = 1; year <= highGrowthYears; year++) {
    dividend *= (1 + initialGrowthRate);
    presentValue += dividend / Math.pow(1 + discountRate, year);
  }

  // Terminal value
  const terminalDividend = dividend * (1 + terminalGrowthRate);
  const terminalValue = terminalDividend / (discountRate - terminalGrowthRate);
  presentValue += terminalValue / Math.pow(1 + discountRate, highGrowthYears);

  return presentValue;
}

// Calculate dividend yield
export function calculateDividendYield(intrinsicValue: number, currentDividend: number): number {
  return (currentDividend / intrinsicValue) * 100;
}

// Generate analysis
export function generateAnalysis(
  inputs: DividendDiscountModelInputs,
  metrics: DividendDiscountModelMetrics
): DividendDiscountModelAnalysis {
  const { currentDividend, expectedGrowthRate, discountRate } = inputs;
  const { intrinsicValue, dividendYield } = metrics;

  let profitability = 'Neutral';
  if (intrinsicValue > currentDividend * 10) profitability = 'High';
  else if (intrinsicValue > currentDividend * 5) profitability = 'Medium';
  else if (intrinsicValue < currentDividend * 2) profitability = 'Low';

  let riskLevel = 'Medium';
  if (discountRate - expectedGrowthRate < 0.02) riskLevel = 'High';
  else if (discountRate - expectedGrowthRate > 0.05) riskLevel = 'Low';

  const recommendations = [];
  if (dividendYield > 5) recommendations.push('High dividend yield may indicate value opportunity');
  if (expectedGrowthRate > discountRate) recommendations.push('Growth rate exceeds discount rate - review assumptions');
  if (intrinsicValue > currentDividend * 1.2) recommendations.push('Stock appears undervalued based on DDM');

  const modelAssumptions = [
    'Constant dividend growth rate',
    'Discount rate greater than growth rate',
    'All earnings paid as dividends',
    'Perpetual cash flows'
  ];

  return {
    profitability,
    riskLevel,
    recommendations,
    modelAssumptions
  };
}