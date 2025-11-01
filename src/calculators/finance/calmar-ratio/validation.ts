import { CalmarRatioInputs } from './types';

export function validateCalmarRatioInputs(inputs: CalmarRatioInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Portfolio Values Validation
  if (!inputs.portfolioValues || !Array.isArray(inputs.portfolioValues)) {
    errors.push({ field: 'portfolioValues', message: 'Portfolio values must be provided as an array' });
  } else {
    if (inputs.portfolioValues.length < 3) {
      errors.push({ field: 'portfolioValues', message: 'At least 3 portfolio values are required for meaningful analysis' });
    }
    if (inputs.portfolioValues.length > 10000) {
      errors.push({ field: 'portfolioValues', message: 'Portfolio values cannot exceed 10,000 data points' });
    }
    for (let i = 0; i < inputs.portfolioValues.length; i++) {
      if (typeof inputs.portfolioValues[i] !== 'number' || !isFinite(inputs.portfolioValues[i])) {
        errors.push({ field: 'portfolioValues', message: `Portfolio value at index ${i} must be a valid number` });
        break;
      }
      if (inputs.portfolioValues[i] <= 0) {
        errors.push({ field: 'portfolioValues', message: `Portfolio value at index ${i} must be positive` });
        break;
      }
    }
  }

  // Time Period Validation
  if (!inputs.timePeriod || !['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].includes(inputs.timePeriod)) {
    errors.push({ field: 'timePeriod', message: 'Time period must be daily, weekly, monthly, quarterly, or yearly' });
  }

  // Risk Free Rate Validation
  if (inputs.riskFreeRate < -10 || inputs.riskFreeRate > 20) {
    errors.push({ field: 'riskFreeRate', message: 'Risk-free rate must be between -10% and 20%' });
  }

  // Benchmark Values Validation (if provided)
  if (inputs.benchmarkValues) {
    if (!Array.isArray(inputs.benchmarkValues)) {
      errors.push({ field: 'benchmarkValues', message: 'Benchmark values must be an array' });
    } else if (inputs.portfolioValues && inputs.benchmarkValues.length !== inputs.portfolioValues.length) {
      errors.push({ field: 'benchmarkValues', message: 'Benchmark values must have same length as portfolio values' });
    } else {
      for (let i = 0; i < inputs.benchmarkValues.length; i++) {
        if (typeof inputs.benchmarkValues[i] !== 'number' || !isFinite(inputs.benchmarkValues[i])) {
          errors.push({ field: 'benchmarkValues', message: `Benchmark value at index ${i} must be a valid number` });
          break;
        }
        if (inputs.benchmarkValues[i] <= 0) {
          errors.push({ field: 'benchmarkValues', message: `Benchmark value at index ${i} must be positive` });
          break;
        }
      }
    }
  }

  return errors;
}

export function validateCalmarRatioBusinessRules(inputs: CalmarRatioInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Data Quality Warnings
  if (inputs.portfolioValues && inputs.portfolioValues.length < 12) {
    warnings.push({ field: 'portfolioValues', message: 'Small sample size may lead to unreliable risk metrics' });
  }

  // Volatility Warnings
  if (inputs.portfolioValues) {
    const returns = [];
    for (let i = 1; i < inputs.portfolioValues.length; i++) {
      returns.push((inputs.portfolioValues[i] - inputs.portfolioValues[i - 1]) / inputs.portfolioValues[i - 1]);
    }
    const volatility = Math.sqrt(returns.reduce((sum, ret, _, arr) =>
      sum + Math.pow(ret - arr.reduce((a, b) => a + b, 0) / arr.length, 2), 0) / (returns.length - 1));

    if (volatility > 0.1) { // 10% volatility
      warnings.push({ field: 'portfolioValues', message: 'High portfolio volatility detected' });
    }
  }

  // Drawdown Warnings
  if (inputs.portfolioValues) {
    let peak = inputs.portfolioValues[0];
    let maxDrawdown = 0;

    for (const value of inputs.portfolioValues) {
      if (value > peak) peak = value;
      const drawdown = (peak - value) / peak;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    }

    if (maxDrawdown > 0.5) { // 50% drawdown
      warnings.push({ field: 'portfolioValues', message: 'Extreme drawdown detected - review portfolio strategy' });
    } else if (maxDrawdown > 0.2) { // 20% drawdown
      warnings.push({ field: 'portfolioValues', message: 'Significant drawdown detected' });
    }
  }

  // Time Period Warnings
  if (inputs.timePeriod === 'daily' && (!inputs.portfolioValues || inputs.portfolioValues.length < 60)) {
    warnings.push({ field: 'timePeriod', message: 'Daily data requires more observations for reliable annualized metrics' });
  }

  // Risk Free Rate Warnings
  if (inputs.riskFreeRate < 0) {
    warnings.push({ field: 'riskFreeRate', message: 'Negative risk-free rate is unusual and may affect calculations' });
  }

  return warnings;
}