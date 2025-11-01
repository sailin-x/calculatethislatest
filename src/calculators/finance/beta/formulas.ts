import { BetaInputs, BetaMetrics, BetaAnalysis } from './types';

// Statistical helper functions
function calculateMean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function calculateVariance(values: number[], mean?: number): number {
  const avg = mean ?? calculateMean(values);
  return values.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0) / (values.length - 1);
}

function calculateCovariance(x: number[], y: number[]): number {
  if (x.length !== y.length) throw new Error('Arrays must have equal length');

  const xMean = calculateMean(x);
  const yMean = calculateMean(y);

  let covariance = 0;
  for (let i = 0; i < x.length; i++) {
    covariance += (x[i] - xMean) * (y[i] - yMean);
  }

  return covariance / (x.length - 1);
}

function calculateCorrelation(x: number[], y: number[]): number {
  const covariance = calculateCovariance(x, y);
  const xStd = Math.sqrt(calculateVariance(x));
  const yStd = Math.sqrt(calculateVariance(y));

  return covariance / (xStd * yStd);
}

function linearRegression(x: number[], y: number[]): { slope: number; intercept: number; rSquared: number } {
  const n = x.length;
  const xMean = calculateMean(x);
  const yMean = calculateMean(y);

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    const xDiff = x[i] - xMean;
    const yDiff = y[i] - yMean;
    numerator += xDiff * yDiff;
    denominator += xDiff * xDiff;
  }

  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;

  // Calculate R-squared
  let ssRes = 0;
  let ssTot = 0;

  for (let i = 0; i < n; i++) {
    const predicted = slope * x[i] + intercept;
    ssRes += Math.pow(y[i] - predicted, 2);
    ssTot += Math.pow(y[i] - yMean, 2);
  }

  const rSquared = 1 - (ssRes / ssTot);

  return { slope, intercept, rSquared };
}

export function calculateBeta(inputs: BetaInputs): number {
  const { stockReturns, marketReturns } = inputs;

  if (stockReturns.length !== marketReturns.length || stockReturns.length < 2) {
    throw new Error('Stock and market returns must have equal length and at least 2 data points');
  }

  const covariance = calculateCovariance(stockReturns, marketReturns);
  const marketVariance = calculateVariance(marketReturns);

  return covariance / marketVariance;
}

export function calculateAlpha(inputs: BetaInputs): number {
  const { stockReturns, marketReturns, riskFreeRate } = inputs;
  const beta = calculateBeta(inputs);

  const stockAvgReturn = calculateMean(stockReturns);
  const marketAvgReturn = calculateMean(marketReturns);

  return stockAvgReturn - riskFreeRate - beta * (marketAvgReturn - riskFreeRate);
}

export function calculateRSquared(inputs: BetaInputs): number {
  const regression = linearRegression(inputs.marketReturns, inputs.stockReturns);
  return regression.rSquared;
}

export function calculateStandardError(inputs: BetaInputs): number {
  const { stockReturns, marketReturns } = inputs;
  const beta = calculateBeta(inputs);
  const n = stockReturns.length;

  let sumSquaredErrors = 0;
  for (let i = 0; i < n; i++) {
    const predicted = beta * marketReturns[i];
    sumSquaredErrors += Math.pow(stockReturns[i] - predicted, 2);
  }

  const variance = sumSquaredErrors / (n - 2);
  const marketVariance = calculateVariance(marketReturns);

  return Math.sqrt(variance / (n * marketVariance));
}

export function calculateCorrelationCoefficient(inputs: BetaInputs): number {
  return calculateCorrelation(inputs.stockReturns, inputs.marketReturns);
}

export function calculateVolatility(inputs: BetaInputs): number {
  return Math.sqrt(calculateVariance(inputs.stockReturns)) * Math.sqrt(getAnnualizationFactor(inputs.timePeriod));
}

export function calculateMarketVolatility(inputs: BetaInputs): number {
  return Math.sqrt(calculateVariance(inputs.marketReturns)) * Math.sqrt(getAnnualizationFactor(inputs.timePeriod));
}

export function calculateSharpeRatio(inputs: BetaInputs): number {
  const { stockReturns, riskFreeRate } = inputs;
  const avgReturn = calculateMean(stockReturns);
  const volatility = calculateVolatility(inputs);

  return (avgReturn - riskFreeRate) / volatility;
}

export function calculateSystematicRisk(inputs: BetaInputs): number {
  const beta = calculateBeta(inputs);
  const marketVolatility = calculateMarketVolatility(inputs);

  return beta * marketVolatility;
}

export function calculateUnsystematicRisk(inputs: BetaInputs): number {
  const totalRisk = calculateVolatility(inputs);
  const systematicRisk = calculateSystematicRisk(inputs);

  return Math.sqrt(Math.max(0, Math.pow(totalRisk, 2) - Math.pow(systematicRisk, 2)));
}

export function calculateTotalRisk(inputs: BetaInputs): number {
  return calculateVolatility(inputs);
}

function getAnnualizationFactor(timePeriod: string): number {
  switch (timePeriod) {
    case 'daily': return 252; // Trading days per year
    case 'weekly': return 52;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'yearly': return 1;
    default: return 12;
  }
}

export function calculateResult(inputs: BetaInputs): number {
  return calculateBeta(inputs);
}

export function generateAnalysis(inputs: BetaInputs, metrics: BetaMetrics): BetaAnalysis {
  const beta = metrics.beta;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(beta) > 1.5) riskLevel = 'High';
  else if (Math.abs(beta) > 1.0) riskLevel = 'Medium';

  const marketSensitivity = Math.abs(beta);
  const correlation = metrics.correlation;
  const diversificationBenefit = Math.max(0, 1 - Math.pow(correlation, 2));
  const stabilityScore = Math.min(100, Math.max(0, (1 - metrics.volatility) * 100));

  let recommendation = '';
  if (beta < 0.5) {
    recommendation = 'Defensive stock with low market sensitivity. Good for risk-averse investors.';
  } else if (beta < 1.0) {
    recommendation = 'Conservative stock with below-average market sensitivity.';
  } else if (beta < 1.5) {
    recommendation = 'Market-sensitive stock. Consider portfolio diversification.';
  } else {
    recommendation = 'Aggressive stock with high market sensitivity. High risk, high potential return.';
  }

  return { recommendation, riskLevel, marketSensitivity, diversificationBenefit, stabilityScore };
}