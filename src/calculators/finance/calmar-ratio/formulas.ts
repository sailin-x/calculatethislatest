import { CalmarRatioInputs, CalmarRatioMetrics, CalmarRatioAnalysis } from './types';

export function calculateAnnualizedReturn(inputs: CalmarRatioInputs): number {
  const { portfolioValues, timePeriod } = inputs;
  if (portfolioValues.length < 2) return 0;

  const totalReturn = (portfolioValues[portfolioValues.length - 1] - portfolioValues[0]) / portfolioValues[0];
  const periodsPerYear = getPeriodsPerYear(timePeriod);
  const totalPeriods = portfolioValues.length - 1;

  return (Math.pow(1 + totalReturn, periodsPerYear / totalPeriods) - 1) * 100;
}

export function calculateMaximumDrawdown(inputs: CalmarRatioInputs): number {
  const { portfolioValues } = inputs;
  if (portfolioValues.length < 2) return 0;

  let peak = portfolioValues[0];
  let maxDrawdown = 0;

  for (const value of portfolioValues) {
    if (value > peak) {
      peak = value;
    }
    const drawdown = (peak - value) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return maxDrawdown * 100; // Convert to percentage
}

export function calculateCalmarRatio(inputs: CalmarRatioInputs): number {
  const annualizedReturn = calculateAnnualizedReturn(inputs);
  const maxDrawdown = calculateMaximumDrawdown(inputs);

  if (maxDrawdown === 0) return 0;
  return annualizedReturn / maxDrawdown;
}

export function calculateSharpeRatio(inputs: CalmarRatioInputs): number {
  const { portfolioValues, timePeriod, riskFreeRate } = inputs;
  if (portfolioValues.length < 2) return 0;

  // Calculate returns
  const returns: number[] = [];
  for (let i = 1; i < portfolioValues.length; i++) {
    returns.push((portfolioValues[i] - portfolioValues[i - 1]) / portfolioValues[i - 1]);
  }

  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const volatility = Math.sqrt(returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / (returns.length - 1));

  const periodsPerYear = getPeriodsPerYear(timePeriod);
  const annualizedVolatility = volatility * Math.sqrt(periodsPerYear);
  const annualizedReturn = avgReturn * periodsPerYear;

  return (annualizedReturn - riskFreeRate / 100) / annualizedVolatility;
}

export function calculateSortinoRatio(inputs: CalmarRatioInputs): number {
  const { portfolioValues, timePeriod, riskFreeRate } = inputs;
  if (portfolioValues.length < 2) return 0;

  // Calculate returns
  const returns: number[] = [];
  for (let i = 1; i < portfolioValues.length; i++) {
    returns.push((portfolioValues[i] - portfolioValues[i - 1]) / portfolioValues[i - 1]);
  }

  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;

  // Calculate downside deviation
  const downsideReturns = returns.filter(ret => ret < riskFreeRate / 100);
  const downsideDeviation = downsideReturns.length > 0
    ? Math.sqrt(downsideReturns.reduce((sum, ret) => sum + Math.pow(ret - riskFreeRate / 100, 2), 0) / downsideReturns.length)
    : 0;

  const periodsPerYear = getPeriodsPerYear(timePeriod);
  const annualizedReturn = avgReturn * periodsPerYear;

  return downsideDeviation > 0 ? (annualizedReturn - riskFreeRate / 100) / downsideDeviation : 0;
}

export function calculateRecoveryTime(inputs: CalmarRatioInputs): number {
  const { portfolioValues, timePeriod } = inputs;
  if (portfolioValues.length < 2) return 0;

  let peak = portfolioValues[0];
  let peakIndex = 0;
  let maxRecoveryTime = 0;

  for (let i = 0; i < portfolioValues.length; i++) {
    if (portfolioValues[i] > peak) {
      peak = portfolioValues[i];
      peakIndex = i;
    } else {
      const drawdown = (peak - portfolioValues[i]) / peak;
      if (drawdown > 0.1) { // Significant drawdown threshold
        const recoveryTime = i - peakIndex;
        if (recoveryTime > maxRecoveryTime) {
          maxRecoveryTime = recoveryTime;
        }
      }
    }
  }

  return maxRecoveryTime / getPeriodsPerYear(timePeriod); // Convert to years
}

export function calculateVolatility(inputs: CalmarRatioInputs): number {
  const { portfolioValues, timePeriod } = inputs;
  if (portfolioValues.length < 2) return 0;

  // Calculate returns
  const returns: number[] = [];
  for (let i = 1; i < portfolioValues.length; i++) {
    returns.push((portfolioValues[i] - portfolioValues[i - 1]) / portfolioValues[i - 1]);
  }

  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / (returns.length - 1);

  const periodsPerYear = getPeriodsPerYear(timePeriod);
  return Math.sqrt(variance * periodsPerYear) * 100; // Annualized volatility as percentage
}

export function calculateDownsideDeviation(inputs: CalmarRatioInputs): number {
  const { portfolioValues, riskFreeRate } = inputs;
  if (portfolioValues.length < 2) return 0;

  // Calculate returns
  const returns: number[] = [];
  for (let i = 1; i < portfolioValues.length; i++) {
    returns.push((portfolioValues[i] - portfolioValues[i - 1]) / portfolioValues[i - 1]);
  }

  const downsideReturns = returns.filter(ret => ret < riskFreeRate / 100);
  if (downsideReturns.length === 0) return 0;

  const avgDownside = downsideReturns.reduce((sum, ret) => sum + ret, 0) / downsideReturns.length;
  return Math.sqrt(downsideReturns.reduce((sum, ret) => sum + Math.pow(ret - avgDownside, 2), 0) / downsideReturns.length) * 100;
}

function getPeriodsPerYear(timePeriod: string): number {
  switch (timePeriod) {
    case 'daily': return 252;
    case 'weekly': return 52;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'yearly': return 1;
    default: return 12;
  }
}

export function calculateResult(inputs: CalmarRatioInputs): number {
  return calculateCalmarRatio(inputs);
}

export function generateAnalysis(inputs: CalmarRatioInputs, metrics: CalmarRatioMetrics): CalmarRatioAnalysis {
  const calmarRatio = metrics.calmarRatio;
  const maxDrawdown = metrics.maximumDrawdown;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (maxDrawdown > 20) riskLevel = 'High';
  else if (maxDrawdown > 10) riskLevel = 'Medium';

  let performanceRating = '';
  if (calmarRatio > 1.5) {
    performanceRating = 'Excellent risk-adjusted performance';
  } else if (calmarRatio > 1.0) {
    performanceRating = 'Good risk-adjusted performance';
  } else if (calmarRatio > 0.5) {
    performanceRating = 'Moderate risk-adjusted performance';
  } else {
    performanceRating = 'Poor risk-adjusted performance';
  }

  const drawdownSeverity = maxDrawdown;
  const consistencyScore = Math.min(100, Math.max(0, (calmarRatio + 1) * 50));

  let recommendation = '';
  if (calmarRatio > 1.0) {
    recommendation = 'Strong performance with manageable drawdowns. Consider maintaining or increasing allocation.';
  } else if (calmarRatio > 0.5) {
    recommendation = 'Acceptable performance but monitor drawdown risk. Consider risk management strategies.';
  } else {
    recommendation = 'High drawdown risk relative to returns. Consider portfolio rebalancing or risk reduction.';
  }

  return { recommendation, riskLevel, performanceRating, drawdownSeverity, consistencyScore };
}