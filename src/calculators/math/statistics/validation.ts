import { StatisticsInputs } from './types';

export function validateStatisticsInputs(inputs: StatisticsInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.data || !Array.isArray(inputs.data)) {
    errors.push('Data must be an array');
  } else if (inputs.data.length === 0) {
    errors.push('Data array cannot be empty');
  } else if (inputs.data.length > 10000) {
    errors.push('Data array is too large');
  } else {
    for (let i = 0; i < inputs.data.length; i++) {
      if (typeof inputs.data[i] !== 'number' || isNaN(inputs.data[i])) {
        errors.push(`Data element at index ${i} must be a valid number`);
      } else if (!isFinite(inputs.data[i])) {
        errors.push(`Data element at index ${i} must be finite`);
      }
    }
  }

  if (inputs.confidenceLevel === undefined || inputs.confidenceLevel === null) {
    errors.push('Confidence level is required');
  } else if (inputs.confidenceLevel <= 0 || inputs.confidenceLevel >= 1) {
    errors.push('Confidence level must be between 0 and 1');
  } else if (inputs.confidenceLevel < 0.5) {
    errors.push('Confidence level should typically be at least 0.5');
  } else if (inputs.confidenceLevel > 0.999) {
    errors.push('Confidence level should typically be less than 0.999');
  }

  // Optional field validation
  if (inputs.weights !== undefined && inputs.weights !== null) {
    if (!Array.isArray(inputs.weights)) {
      errors.push('Weights must be an array');
    } else if (inputs.weights.length === 0) {
      errors.push('Weights array cannot be empty');
    } else {
      for (let i = 0; i < inputs.weights.length; i++) {
        if (typeof inputs.weights[i] !== 'number' || isNaN(inputs.weights[i])) {
          errors.push(`Weight element at index ${i} must be a valid number`);
        } else if (inputs.weights[i] < 0) {
          errors.push(`Weight element at index ${i} must be non-negative`);
        }
      }
      
      if (inputs.data && inputs.weights.length !== inputs.data.length) {
        errors.push('Weights array length must match data array length');
      }
    }
  }

  if (inputs.populationSize !== undefined && inputs.populationSize !== null) {
    if (inputs.populationSize <= 0) {
      errors.push('Population size must be positive');
    } else if (!Number.isInteger(inputs.populationSize)) {
      errors.push('Population size must be an integer');
    } else if (inputs.populationSize > 1e9) {
      errors.push('Population size seems unusually large');
    }
  }

  if (inputs.sampleSize !== undefined && inputs.sampleSize !== null) {
    if (inputs.sampleSize <= 0) {
      errors.push('Sample size must be positive');
    } else if (!Number.isInteger(inputs.sampleSize)) {
      errors.push('Sample size must be an integer');
    } else if (inputs.sampleSize > 1e6) {
      errors.push('Sample size seems unusually large');
    }
    
    if (inputs.populationSize && inputs.sampleSize > inputs.populationSize) {
      errors.push('Sample size cannot exceed population size');
    }
  }

  // Hypothesis test validation
  if (inputs.hypothesisTest) {
    if (inputs.hypothesisTest.nullValue === undefined || inputs.hypothesisTest.nullValue === null) {
      errors.push('Null value is required for hypothesis test');
    } else if (typeof inputs.hypothesisTest.nullValue !== 'number' || isNaN(inputs.hypothesisTest.nullValue)) {
      errors.push('Null value must be a valid number');
    } else if (!isFinite(inputs.hypothesisTest.nullValue)) {
      errors.push('Null value must be finite');
    }

    if (!inputs.hypothesisTest.alternative) {
      errors.push('Alternative hypothesis is required');
    } else {
      const validAlternatives = ['two-tailed', 'left-tailed', 'right-tailed'];
      if (!validAlternatives.includes(inputs.hypothesisTest.alternative)) {
        errors.push('Alternative must be one of: two-tailed, left-tailed, right-tailed');
      }
    }

    if (inputs.hypothesisTest.significanceLevel === undefined || inputs.hypothesisTest.significanceLevel === null) {
      errors.push('Significance level is required for hypothesis test');
    } else if (inputs.hypothesisTest.significanceLevel <= 0 || inputs.hypothesisTest.significanceLevel >= 1) {
      errors.push('Significance level must be between 0 and 1');
    } else if (inputs.hypothesisTest.significanceLevel > 0.5) {
      errors.push('Significance level should typically be less than 0.5');
    }
  }

  // Regression validation
  if (inputs.regression) {
    if (!inputs.regression.xValues || !Array.isArray(inputs.regression.xValues)) {
      errors.push('X values must be an array for regression');
    } else if (inputs.regression.xValues.length === 0) {
      errors.push('X values array cannot be empty');
    } else if (inputs.regression.xValues.length > 10000) {
      errors.push('X values array is too large');
    } else {
      for (let i = 0; i < inputs.regression.xValues.length; i++) {
        if (typeof inputs.regression.xValues[i] !== 'number' || isNaN(inputs.regression.xValues[i])) {
          errors.push(`X value at index ${i} must be a valid number`);
        } else if (!isFinite(inputs.regression.xValues[i])) {
          errors.push(`X value at index ${i} must be finite`);
        }
      }
    }

    if (!inputs.regression.yValues || !Array.isArray(inputs.regression.yValues)) {
      errors.push('Y values must be an array for regression');
    } else if (inputs.regression.yValues.length === 0) {
      errors.push('Y values array cannot be empty');
    } else if (inputs.regression.yValues.length > 10000) {
      errors.push('Y values array is too large');
    } else {
      for (let i = 0; i < inputs.regression.yValues.length; i++) {
        if (typeof inputs.regression.yValues[i] !== 'number' || isNaN(inputs.regression.yValues[i])) {
          errors.push(`Y value at index ${i} must be a valid number`);
        } else if (!isFinite(inputs.regression.yValues[i])) {
          errors.push(`Y value at index ${i} must be finite`);
        }
      }
    }

    if (inputs.regression.xValues && inputs.regression.yValues && 
        inputs.regression.xValues.length !== inputs.regression.yValues.length) {
      errors.push('X values array length must match Y values array length');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
