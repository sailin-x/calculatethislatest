import { BetaInputs } from './types';

export function validateBetaInputs(inputs: BetaInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Stock Returns Validation
  if (!inputs.stockReturns || !Array.isArray(inputs.stockReturns)) {
    errors.push({ field: 'stockReturns', message: 'Stock returns must be provided as an array' });
  } else {
    if (inputs.stockReturns.length < 2) {
      errors.push({ field: 'stockReturns', message: 'At least 2 stock return data points are required' });
    }
    if (inputs.stockReturns.length > 10000) {
      errors.push({ field: 'stockReturns', message: 'Stock returns cannot exceed 10,000 data points' });
    }
    for (let i = 0; i < inputs.stockReturns.length; i++) {
      if (typeof inputs.stockReturns[i] !== 'number' || !isFinite(inputs.stockReturns[i])) {
        errors.push({ field: 'stockReturns', message: `Stock return at index ${i} must be a valid number` });
        break; // Only report first invalid value
      }
      if (Math.abs(inputs.stockReturns[i]) > 100) {
        errors.push({ field: 'stockReturns', message: `Stock return at index ${i} cannot exceed ±100%` });
        break;
      }
    }
  }

  // Market Returns Validation
  if (!inputs.marketReturns || !Array.isArray(inputs.marketReturns)) {
    errors.push({ field: 'marketReturns', message: 'Market returns must be provided as an array' });
  } else {
    if (inputs.marketReturns.length < 2) {
      errors.push({ field: 'marketReturns', message: 'At least 2 market return data points are required' });
    }
    if (inputs.marketReturns.length > 10000) {
      errors.push({ field: 'marketReturns', message: 'Market returns cannot exceed 10,000 data points' });
    }
    if (inputs.stockReturns && inputs.marketReturns.length !== inputs.stockReturns.length) {
      errors.push({ field: 'marketReturns', message: 'Stock and market returns must have equal length' });
    }
    for (let i = 0; i < inputs.marketReturns.length; i++) {
      if (typeof inputs.marketReturns[i] !== 'number' || !isFinite(inputs.marketReturns[i])) {
        errors.push({ field: 'marketReturns', message: `Market return at index ${i} must be a valid number` });
        break;
      }
      if (Math.abs(inputs.marketReturns[i]) > 100) {
        errors.push({ field: 'marketReturns', message: `Market return at index ${i} cannot exceed ±100%` });
        break;
      }
    }
  }

  // Risk Free Rate Validation
  if (inputs.riskFreeRate < -10 || inputs.riskFreeRate > 20) {
    errors.push({ field: 'riskFreeRate', message: 'Risk-free rate must be between -10% and 20%' });
  }

  // Time Period Validation
  if (!inputs.timePeriod || !['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].includes(inputs.timePeriod)) {
    errors.push({ field: 'timePeriod', message: 'Time period must be daily, weekly, monthly, quarterly, or yearly' });
  }

  // Benchmark Index Validation
  if (!inputs.benchmarkIndex || inputs.benchmarkIndex.trim().length === 0) {
    errors.push({ field: 'benchmarkIndex', message: 'Benchmark index must be specified' });
  }

  // Confidence Level Validation
  if (inputs.confidenceLevel < 0.8 || inputs.confidenceLevel > 0.99) {
    errors.push({ field: 'confidenceLevel', message: 'Confidence level must be between 80% and 99%' });
  }

  return errors;
}

export function validateBetaBusinessRules(inputs: BetaInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Data Quality Warnings
  if (inputs.stockReturns && inputs.stockReturns.length < 30) {
    warnings.push({ field: 'stockReturns', message: 'Small sample size may lead to unreliable beta estimates' });
  }

  // Volatility Warnings
  const stockVolatility = Math.sqrt(inputs.stockReturns ? calculateVariance(inputs.stockReturns) : 0);
  if (stockVolatility > 0.1) { // 10% volatility
    warnings.push({ field: 'stockReturns', message: 'High stock volatility detected' });
  }

  // Beta Range Warnings
  if (inputs.stockReturns && inputs.marketReturns) {
    try {
      const beta = calculateBeta(inputs.stockReturns, inputs.marketReturns);
      if (Math.abs(beta) > 3) {
        warnings.push({ field: 'stockReturns', message: 'Extreme beta value may indicate data issues or special circumstances' });
      }
    } catch (e) {
      // Skip beta calculation warning if data is invalid
    }
  }

  // Time Period Warnings
  if (inputs.timePeriod === 'daily' && (!inputs.stockReturns || inputs.stockReturns.length < 60)) {
    warnings.push({ field: 'timePeriod', message: 'Daily data requires more observations for reliable beta calculation' });
  }

  // Risk Free Rate Warnings
  if (inputs.riskFreeRate < 0) {
    warnings.push({ field: 'riskFreeRate', message: 'Negative risk-free rate is unusual and may affect calculations' });
  }

  return warnings;
}

// Helper function for variance calculation (used in validation)
function calculateVariance(values: number[]): number {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (values.length - 1);
}

// Helper function for beta calculation (used in validation)
function calculateBeta(stockReturns: number[], marketReturns: number[]): number {
  const covariance = calculateCovariance(stockReturns, marketReturns);
  const marketVariance = calculateVariance(marketReturns);
  return covariance / marketVariance;
}

function calculateCovariance(x: number[], y: number[]): number {
  const xMean = x.reduce((sum, value) => sum + value, 0) / x.length;
  const yMean = y.reduce((sum, value) => sum + value, 0) / y.length;

  let covariance = 0;
  for (let i = 0; i < x.length; i++) {
    covariance += (x[i] - xMean) * (y[i] - yMean);
  }

  return covariance / (x.length - 1);
}