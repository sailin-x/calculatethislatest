import { CorrelationInputs } from './types';

export function validateCorrelationInputs(inputs: CorrelationInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Asset returns validation
  if (!inputs.asset1Returns || !Array.isArray(inputs.asset1Returns)) {
    errors.push({ field: 'asset1Returns', message: 'Asset 1 returns must be a non-empty array' });
  } else if (inputs.asset1Returns.length < 2) {
    errors.push({ field: 'asset1Returns', message: 'Asset 1 returns must have at least 2 data points' });
  } else if (inputs.asset1Returns.some(isNaN)) {
    errors.push({ field: 'asset1Returns', message: 'Asset 1 returns must contain only valid numbers' });
  }

  if (!inputs.asset2Returns || !Array.isArray(inputs.asset2Returns)) {
    errors.push({ field: 'asset2Returns', message: 'Asset 2 returns must be a non-empty array' });
  } else if (inputs.asset2Returns.length < 2) {
    errors.push({ field: 'asset2Returns', message: 'Asset 2 returns must have at least 2 data points' });
  } else if (inputs.asset2Returns.some(isNaN)) {
    errors.push({ field: 'asset2Returns', message: 'Asset 2 returns must contain only valid numbers' });
  }

  // Array length match validation
  if (inputs.asset1Returns && inputs.asset2Returns &&
      inputs.asset1Returns.length !== inputs.asset2Returns.length) {
    errors.push({ field: 'asset2Returns', message: 'Asset 1 and Asset 2 returns must have the same number of data points' });
  }

  // Asset names validation
  if (!inputs.asset1Name || inputs.asset1Name.trim().length === 0) {
    errors.push({ field: 'asset1Name', message: 'Asset 1 name is required' });
  }

  if (!inputs.asset2Name || inputs.asset2Name.trim().length === 0) {
    errors.push({ field: 'asset2Name', message: 'Asset 2 name is required' });
  }

  // Confidence level validation
  if (!inputs.confidenceLevel || inputs.confidenceLevel < 80 || inputs.confidenceLevel > 99) {
    errors.push({ field: 'confidenceLevel', message: 'Confidence level must be between 80 and 99' });
  }

  // Time period validation
  if (!inputs.timePeriod || inputs.timePeriod.trim().length === 0) {
    errors.push({ field: 'timePeriod', message: 'Time period is required' });
  }

  // Calculation method validation
  const validMethods = ['pearson', 'spearman', 'kendall'];
  if (!inputs.calculationMethod || !validMethods.includes(inputs.calculationMethod)) {
    errors.push({ field: 'calculationMethod', message: 'Calculation method must be pearson, spearman, or kendall' });
  }

  // Risk free rate validation
  if (inputs.riskFreeRate === null || inputs.riskFreeRate === undefined || inputs.riskFreeRate < -0.1 || inputs.riskFreeRate > 0.2) {
    errors.push({ field: 'riskFreeRate', message: 'Risk free rate must be between -10% and 20%' });
  }

  // Benchmark returns validation (if provided)
  if (inputs.benchmarkReturns) {
    if (!Array.isArray(inputs.benchmarkReturns)) {
      errors.push({ field: 'benchmarkReturns', message: 'Benchmark returns must be an array' });
    } else if (inputs.benchmarkReturns.length !== inputs.asset1Returns?.length) {
      errors.push({ field: 'benchmarkReturns', message: 'Benchmark returns must have the same length as asset returns' });
    } else if (inputs.benchmarkReturns.some(isNaN)) {
      errors.push({ field: 'benchmarkReturns', message: 'Benchmark returns must contain only valid numbers' });
    }
  }

  // Benchmark name validation (if benchmark returns provided)
  if (inputs.benchmarkReturns && (!inputs.benchmarkName || inputs.benchmarkName.trim().length === 0)) {
    errors.push({ field: 'benchmarkName', message: 'Benchmark name is required when benchmark returns are provided' });
  }

  // Data quality checks
  if (inputs.asset1Returns && inputs.asset1Returns.length > 0) {
    const asset1Variance = calculateVariance(inputs.asset1Returns);
    if (asset1Variance === 0) {
      errors.push({ field: 'asset1Returns', message: 'Asset 1 returns have no variance (all values are identical)' });
    }
  }

  if (inputs.asset2Returns && inputs.asset2Returns.length > 0) {
    const asset2Variance = calculateVariance(inputs.asset2Returns);
    if (asset2Variance === 0) {
      errors.push({ field: 'asset2Returns', message: 'Asset 2 returns have no variance (all values are identical)' });
    }
  }

  return errors;
}

export function validateCorrelationBusinessRules(inputs: CorrelationInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Sample size warnings
  if (inputs.asset1Returns && inputs.asset1Returns.length < 30) {
    warnings.push({ field: 'asset1Returns', message: 'Small sample size (< 30) may lead to unreliable correlation estimates' });
  }

  // Outlier detection
  if (inputs.asset1Returns) {
    const asset1Stats = calculateBasicStats(inputs.asset1Returns);
    const asset1Outliers = detectOutliers(inputs.asset1Returns, asset1Stats);
    if (asset1Outliers.length > inputs.asset1Returns.length * 0.1) {
      warnings.push({ field: 'asset1Returns', message: 'Asset 1 returns contain many outliers that may affect correlation' });
    }
  }

  if (inputs.asset2Returns) {
    const asset2Stats = calculateBasicStats(inputs.asset2Returns);
    const asset2Outliers = detectOutliers(inputs.asset2Returns, asset2Stats);
    if (asset2Outliers.length > inputs.asset2Returns.length * 0.1) {
      warnings.push({ field: 'asset2Returns', message: 'Asset 2 returns contain many outliers that may affect correlation' });
    }
  }

  // Non-stationarity warning
  if (inputs.asset1Returns && inputs.asset2Returns) {
    const asset1Trend = detectTrend(inputs.asset1Returns);
    const asset2Trend = detectTrend(inputs.asset2Returns);

    if (Math.abs(asset1Trend) > 0.001 || Math.abs(asset2Trend) > 0.001) {
      warnings.push({ field: 'asset1Returns', message: 'Data appears to have trends that may violate stationarity assumptions' });
    }
  }

  // High volatility warning
  if (inputs.asset1Returns) {
    const asset1Volatility = calculateVolatility(inputs.asset1Returns);
    if (asset1Volatility > 0.05) { // 5% daily volatility threshold
      warnings.push({ field: 'asset1Returns', message: 'Asset 1 shows high volatility that may affect correlation stability' });
    }
  }

  if (inputs.asset2Returns) {
    const asset2Volatility = calculateVolatility(inputs.asset2Returns);
    if (asset2Volatility > 0.05) {
      warnings.push({ field: 'asset2Returns', message: 'Asset 2 shows high volatility that may affect correlation stability' });
    }
  }

  // Autocorrelation warning
  if (inputs.asset1Returns && inputs.asset1Returns.length > 10) {
    const asset1Autocorr = calculateAutocorrelation(inputs.asset1Returns, 1);
    if (Math.abs(asset1Autocorr) > 0.3) {
      warnings.push({ field: 'asset1Returns', message: 'Asset 1 returns show significant autocorrelation' });
    }
  }

  if (inputs.asset2Returns && inputs.asset2Returns.length > 10) {
    const asset2Autocorr = calculateAutocorrelation(inputs.asset2Returns, 1);
    if (Math.abs(asset2Autocorr) > 0.3) {
      warnings.push({ field: 'asset2Returns', message: 'Asset 2 returns show significant autocorrelation' });
    }
  }

  // Data frequency mismatch warning
  if (inputs.timePeriod) {
    const expectedLength = getExpectedDataPoints(inputs.timePeriod);
    if (inputs.asset1Returns && Math.abs(inputs.asset1Returns.length - expectedLength) > expectedLength * 0.2) {
      warnings.push({ field: 'timePeriod', message: 'Data length does not match expected length for selected time period' });
    }
  }

  return warnings;
}

function calculateVariance(arr: number[]): number {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return arr.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (arr.length - 1);
}

function calculateBasicStats(arr: number[]): { mean: number; std: number } {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (arr.length - 1);
  return { mean, std: Math.sqrt(variance) };
}

function detectOutliers(arr: number[], stats: { mean: number; std: number }): number[] {
  const threshold = 3; // 3 standard deviations
  return arr.filter(value => Math.abs(value - stats.mean) > threshold * stats.std);
}

function detectTrend(arr: number[]): number {
  // Simple linear regression slope as trend indicator
  const n = arr.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = arr.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * arr[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

  return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
}

function calculateVolatility(arr: number[]): number {
  const returns = [];
  for (let i = 1; i < arr.length; i++) {
    returns.push(Math.log(arr[i] / arr[i - 1]));
  }
  return calculateBasicStats(returns).std * Math.sqrt(252); // Annualized
}

function calculateAutocorrelation(arr: number[], lag: number): number {
  const n = arr.length - lag;
  let sum1 = 0, sum2 = 0, sum3 = 0;

  for (let i = 0; i < n; i++) {
    sum1 += arr[i] * arr[i + lag];
    sum2 += arr[i];
    sum3 += arr[i + lag];
  }

  const mean1 = sum2 / n;
  const mean2 = sum3 / n;

  let numerator = 0, denom1 = 0, denom2 = 0;
  for (let i = 0; i < n; i++) {
    numerator += (arr[i] - mean1) * (arr[i + lag] - mean2);
    denom1 += Math.pow(arr[i] - mean1, 2);
    denom2 += Math.pow(arr[i + lag] - mean2, 2);
  }

  return numerator / Math.sqrt(denom1 * denom2);
}

function getExpectedDataPoints(timePeriod: string): number {
  const periods: { [key: string]: number } = {
    '1M': 21,
    '3M': 63,
    '6M': 126,
    '1Y': 252,
    '2Y': 504,
    '3Y': 756,
    '5Y': 1260,
    '10Y': 2520
  };
  return periods[timePeriod] || 252;
}