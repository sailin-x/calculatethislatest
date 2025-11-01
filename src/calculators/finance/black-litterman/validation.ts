import { BlackLittermanInputs } from './types';

export function validateBlackLittermanInputs(inputs: BlackLittermanInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Market Weights Validation
  if (!inputs.marketWeights || !Array.isArray(inputs.marketWeights)) {
    errors.push({ field: 'marketWeights', message: 'Market weights must be provided as an array' });
  } else {
    if (inputs.marketWeights.length < 2) {
      errors.push({ field: 'marketWeights', message: 'At least 2 market weights are required' });
    }
    if (inputs.marketWeights.length > 10) {
      errors.push({ field: 'marketWeights', message: 'Market weights cannot exceed 10 assets' });
    }
    for (let i = 0; i < inputs.marketWeights.length; i++) {
      if (typeof inputs.marketWeights[i] !== 'number' || !isFinite(inputs.marketWeights[i])) {
        errors.push({ field: 'marketWeights', message: `Market weight at index ${i} must be a valid number` });
        break;
      }
      if (inputs.marketWeights[i] < 0 || inputs.marketWeights[i] > 1) {
        errors.push({ field: 'marketWeights', message: `Market weight at index ${i} must be between 0 and 1` });
        break;
      }
    }
    const sum = inputs.marketWeights.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1) > 0.01) {
      errors.push({ field: 'marketWeights', message: 'Market weights must sum to 1' });
    }
  }

  // Market Returns Validation
  if (!inputs.marketReturns || !Array.isArray(inputs.marketReturns)) {
    errors.push({ field: 'marketReturns', message: 'Market returns must be provided as an array' });
  } else {
    if (inputs.marketReturns.length !== inputs.marketWeights?.length) {
      errors.push({ field: 'marketReturns', message: 'Market returns must have same length as market weights' });
    }
    for (let i = 0; i < inputs.marketReturns.length; i++) {
      if (typeof inputs.marketReturns[i] !== 'number' || !isFinite(inputs.marketReturns[i])) {
        errors.push({ field: 'marketReturns', message: `Market return at index ${i} must be a valid number` });
        break;
      }
      if (Math.abs(inputs.marketReturns[i]) > 1) {
        errors.push({ field: 'marketReturns', message: `Market return at index ${i} cannot exceed ±100%` });
        break;
      }
    }
  }

  // Market Covariance Validation
  if (!inputs.marketCovariance || !Array.isArray(inputs.marketCovariance)) {
    errors.push({ field: 'marketCovariance', message: 'Market covariance matrix must be provided' });
  } else {
    const n = inputs.marketWeights?.length || 0;
    if (inputs.marketCovariance.length !== n) {
      errors.push({ field: 'marketCovariance', message: 'Covariance matrix must be square and match number of assets' });
    }
    for (let i = 0; i < inputs.marketCovariance.length; i++) {
      if (!Array.isArray(inputs.marketCovariance[i]) || inputs.marketCovariance[i].length !== n) {
        errors.push({ field: 'marketCovariance', message: `Covariance matrix row ${i} must be an array of length ${n}` });
        break;
      }
      for (let j = 0; j < inputs.marketCovariance[i].length; j++) {
        if (typeof inputs.marketCovariance[i][j] !== 'number' || !isFinite(inputs.marketCovariance[i][j])) {
          errors.push({ field: 'marketCovariance', message: `Covariance matrix element [${i}][${j}] must be a valid number` });
          break;
        }
      }
    }
  }

  // Investor Views Validation
  if (!inputs.investorViews) {
    errors.push({ field: 'investorViews', message: 'Investor views must be provided' });
  } else {
    const { assets, returns, confidences } = inputs.investorViews;

    if (!Array.isArray(assets) || !Array.isArray(returns) || !Array.isArray(confidences)) {
      errors.push({ field: 'investorViews', message: 'All investor view arrays must be provided' });
    } else if (assets.length !== returns.length || assets.length !== confidences.length) {
      errors.push({ field: 'investorViews', message: 'All investor view arrays must have equal length' });
    } else {
      for (let i = 0; i < assets.length; i++) {
        if (!Number.isInteger(assets[i]) || assets[i] < 0 || assets[i] >= (inputs.marketWeights?.length || 0)) {
          errors.push({ field: 'investorViews', message: `Asset index ${assets[i]} is invalid` });
          break;
        }
        if (typeof returns[i] !== 'number' || !isFinite(returns[i])) {
          errors.push({ field: 'investorViews', message: `View return at index ${i} must be a valid number` });
          break;
        }
        if (typeof confidences[i] !== 'number' || confidences[i] < 0 || confidences[i] > 1) {
          errors.push({ field: 'investorViews', message: `Confidence at index ${i} must be between 0 and 1` });
          break;
        }
      }
    }
  }

  // Risk Aversion Validation
  if (typeof inputs.riskAversion !== 'number' || !isFinite(inputs.riskAversion)) {
    errors.push({ field: 'riskAversion', message: 'Risk aversion must be a valid number' });
  } else if (inputs.riskAversion <= 0) {
    errors.push({ field: 'riskAversion', message: 'Risk aversion must be positive' });
  }

  // Tau Validation
  if (typeof inputs.tau !== 'number' || !isFinite(inputs.tau)) {
    errors.push({ field: 'tau', message: 'Tau must be a valid number' });
  } else if (inputs.tau <= 0) {
    errors.push({ field: 'tau', message: 'Tau must be positive' });
  }

  return errors;
}

export function validateBlackLittermanBusinessRules(inputs: BlackLittermanInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Data Quality Warnings
  if (inputs.marketWeights && inputs.marketWeights.length < 5) {
    warnings.push({ field: 'marketWeights', message: 'Small number of assets may lead to unreliable optimization' });
  }

  // Covariance Matrix Warnings
  if (inputs.marketCovariance) {
    // Check for positive definiteness (simplified check)
    for (let i = 0; i < inputs.marketCovariance.length; i++) {
      if (inputs.marketCovariance[i][i] <= 0) {
        warnings.push({ field: 'marketCovariance', message: 'Covariance matrix may not be positive definite' });
        break;
      }
    }
  }

  // View Confidence Warnings
  if (inputs.investorViews) {
    const avgConfidence = inputs.investorViews.confidences.reduce((a, b) => a + b, 0) / inputs.investorViews.confidences.length;
    if (avgConfidence < 0.3) {
      warnings.push({ field: 'investorViews', message: 'Low average confidence in views may reduce their impact' });
    }
    if (avgConfidence > 0.9) {
      warnings.push({ field: 'investorViews', message: 'Very high confidence in views may lead to overfitting' });
    }
  }

  // Risk Aversion Warnings
  if (inputs.riskAversion < 1) {
    warnings.push({ field: 'riskAversion', message: 'Very low risk aversion may result in highly concentrated portfolios' });
  }
  if (inputs.riskAversion > 10) {
    warnings.push({ field: 'riskAversion', message: 'Very high risk aversion may result in overly conservative portfolios' });
  }

  return warnings;
}