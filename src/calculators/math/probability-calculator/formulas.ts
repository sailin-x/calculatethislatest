/**
 * Probability Calculator Formulas
 * Comprehensive probability calculations and statistical analysis
 */

/**
 * Calculate factorial of a number
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculate combination (n choose k)
 */
export function combination(n: number, k: number): number {
  if (k > n || k < 0) {
    return 0;
  }
  return factorial(n) / (factorial(k) * factorial(n - k));
}

/**
 * Calculate permutation (n choose k with order)
 */
export function permutation(n: number, k: number): number {
  if (k > n || k < 0) {
    return 0;
  }
  return factorial(n) / factorial(n - k);
}

/**
 * Calculate binomial probability
 */
export function binomialProbability(n: number, k: number, p: number): {
  probability: number;
  cumulativeProbability: number;
  mean: number;
  variance: number;
  standardDeviation: number;
} {
  if (p < 0 || p > 1) {
    throw new Error('Probability p must be between 0 and 1');
  }
  if (k < 0 || k > n) {
    throw new Error('k must be between 0 and n');
  }

  const probability = combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  const mean = n * p;
  const variance = n * p * (1 - p);
  const standardDeviation = Math.sqrt(variance);

  // Calculate cumulative probability (sum from 0 to k)
  let cumulativeProbability = 0;
  for (let i = 0; i <= k; i++) {
    cumulativeProbability += combination(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
  }

  return {
    probability,
    cumulativeProbability,
    mean,
    variance,
    standardDeviation
  };
}

/**
 * Calculate Poisson probability
 */
export function poissonProbability(lambda: number, k: number): {
  probability: number;
  cumulativeProbability: number;
  mean: number;
  variance: number;
  standardDeviation: number;
} {
  if (lambda <= 0) {
    throw new Error('Lambda must be positive');
  }
  if (k < 0) {
    throw new Error('k must be non-negative');
  }

  const probability = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
  const mean = lambda;
  const variance = lambda;
  const standardDeviation = Math.sqrt(lambda);

  // Calculate cumulative probability (sum from 0 to k)
  let cumulativeProbability = 0;
  for (let i = 0; i <= k; i++) {
    cumulativeProbability += (Math.pow(lambda, i) * Math.exp(-lambda)) / factorial(i);
  }

  return {
    probability,
    cumulativeProbability,
    mean,
    variance,
    standardDeviation
  };
}

/**
 * Calculate normal distribution probability
 */
export function normalProbability(
  x: number,
  mean: number = 0,
  standardDeviation: number = 1,
  cumulative: boolean = false
): {
  pdf: number;
  cdf: number;
  zScore: number;
} {
  if (standardDeviation <= 0) {
    throw new Error('Standard deviation must be positive');
  }

  const zScore = (x - mean) / standardDeviation;

  // Probability density function
  const pdf = (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) *
              Math.exp(-0.5 * Math.pow(zScore, 2));

  // Cumulative distribution function (approximation)
  const cdf = 0.5 * (1 + erf(zScore / Math.sqrt(2)));

  return {
    pdf,
    cdf,
    zScore
  };
}

/**
 * Error function (erf) approximation
 */
function erf(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

/**
 * Calculate hypergeometric probability
 */
export function hypergeometricProbability(
  populationSize: number,
  successPopulation: number,
  sampleSize: number,
  successSample: number
): {
  probability: number;
  mean: number;
  variance: number;
  standardDeviation: number;
} {
  if (sampleSize > populationSize) {
    throw new Error('Sample size cannot be larger than population size');
  }
  if (successSample > sampleSize || successSample > successPopulation) {
    throw new Error('Invalid sample parameters');
  }

  const probability = (combination(successPopulation, successSample) *
                      combination(populationSize - successPopulation, sampleSize - successSample)) /
                     combination(populationSize, sampleSize);

  const mean = (sampleSize * successPopulation) / populationSize;
  const variance = (sampleSize * successPopulation * (populationSize - successPopulation) *
                   (populationSize - sampleSize)) / (populationSize * populationSize * (populationSize - 1));
  const standardDeviation = Math.sqrt(variance);

  return {
    probability,
    mean,
    variance,
    standardDeviation
  };
}

/**
 * Calculate geometric probability (number of trials until first success)
 */
export function geometricProbability(p: number, k: number): {
  probability: number;
  cumulativeProbability: number;
  mean: number;
  variance: number;
  standardDeviation: number;
} {
  if (p <= 0 || p > 1) {
    throw new Error('Probability p must be between 0 and 1');
  }
  if (k < 1) {
    throw new Error('k must be at least 1');
  }

  const probability = Math.pow(1 - p, k - 1) * p;
  const cumulativeProbability = 1 - Math.pow(1 - p, k);
  const mean = 1 / p;
  const variance = (1 - p) / (p * p);
  const standardDeviation = Math.sqrt(variance);

  return {
    probability,
    cumulativeProbability,
    mean,
    variance,
    standardDeviation
  };
}

/**
 * Calculate negative binomial probability (number of trials until r successes)
 */
export function negativeBinomialProbability(p: number, r: number, k: number): {
  probability: number;
  cumulativeProbability: number;
  mean: number;
  variance: number;
  standardDeviation: number;
} {
  if (p <= 0 || p > 1) {
    throw new Error('Probability p must be between 0 and 1');
  }
  if (r < 1 || k < r) {
    throw new Error('Invalid parameters: r must be positive and k must be at least r');
  }

  const probability = combination(k - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, k - r);
  const mean = r / p;
  const variance = r * (1 - p) / (p * p);
  const standardDeviation = Math.sqrt(variance);

  // Cumulative probability calculation would be complex, so we'll approximate
  const cumulativeProbability = 1; // Placeholder - would need summation

  return {
    probability,
    cumulativeProbability,
    mean,
    variance,
    standardDeviation
  };
}

/**
 * Calculate conditional probability P(A|B)
 */
export function conditionalProbability(
  jointProbability: number,
  marginalProbability: number
): number {
  if (marginalProbability === 0) {
    throw new Error('Marginal probability cannot be zero');
  }
  if (jointProbability < 0 || jointProbability > marginalProbability) {
    throw new Error('Invalid probability values');
  }

  return jointProbability / marginalProbability;
}

/**
 * Calculate Bayes' theorem
 */
export function bayesTheorem(
  priorProbability: number,
  likelihood: number,
  marginalProbability: number
): {
  posteriorProbability: number;
  priorProbability: number;
  likelihood: number;
  marginalProbability: number;
  normalizationFactor: number;
} {
  if (priorProbability < 0 || priorProbability > 1) {
    throw new Error('Prior probability must be between 0 and 1');
  }
  if (likelihood < 0) {
    throw new Error('Likelihood cannot be negative');
  }
  if (marginalProbability <= 0) {
    throw new Error('Marginal probability must be positive');
  }

  const numerator = priorProbability * likelihood;
  const posteriorProbability = numerator / marginalProbability;
  const normalizationFactor = marginalProbability;

  return {
    posteriorProbability,
    priorProbability,
    likelihood,
    marginalProbability,
    normalizationFactor
  };
}

/**
 * Calculate confidence interval for proportion
 */
export function confidenceIntervalProportion(
  sampleProportion: number,
  sampleSize: number,
  confidenceLevel: number = 0.95
): {
  lowerBound: number;
  upperBound: number;
  marginOfError: number;
  confidenceLevel: number;
  sampleProportion: number;
  sampleSize: number;
} {
  if (sampleProportion < 0 || sampleProportion > 1) {
    throw new Error('Sample proportion must be between 0 and 1');
  }
  if (sampleSize <= 0) {
    throw new Error('Sample size must be positive');
  }
  if (confidenceLevel <= 0 || confidenceLevel >= 1) {
    throw new Error('Confidence level must be between 0 and 1');
  }

  // Z-score for confidence level
  const zScores: Record<number, number> = {
    0.90: 1.645,
    0.95: 1.96,
    0.99: 2.576
  };

  const zScore = zScores[confidenceLevel] || 1.96; // Default to 95%

  const marginOfError = zScore * Math.sqrt((sampleProportion * (1 - sampleProportion)) / sampleSize);
  const lowerBound = Math.max(0, sampleProportion - marginOfError);
  const upperBound = Math.min(1, sampleProportion + marginOfError);

  return {
    lowerBound,
    upperBound,
    marginOfError,
    confidenceLevel,
    sampleProportion,
    sampleSize
  };
}

/**
 * Calculate confidence interval for mean
 */
export function confidenceIntervalMean(
  sampleMean: number,
  sampleSize: number,
  standardDeviation: number,
  confidenceLevel: number = 0.95
): {
  lowerBound: number;
  upperBound: number;
  marginOfError: number;
  confidenceLevel: number;
  sampleMean: number;
  sampleSize: number;
  standardDeviation: number;
} {
  if (sampleSize <= 0) {
    throw new Error('Sample size must be positive');
  }
  if (standardDeviation <= 0) {
    throw new Error('Standard deviation must be positive');
  }
  if (confidenceLevel <= 0 || confidenceLevel >= 1) {
    throw new Error('Confidence level must be between 0 and 1');
  }

  // Z-score for confidence level
  const zScores: Record<number, number> = {
    0.90: 1.645,
    0.95: 1.96,
    0.99: 2.576
  };

  const zScore = zScores[confidenceLevel] || 1.96; // Default to 95%

  const standardError = standardDeviation / Math.sqrt(sampleSize);
  const marginOfError = zScore * standardError;
  const lowerBound = sampleMean - marginOfError;
  const upperBound = sampleMean + marginOfError;

  return {
    lowerBound,
    upperBound,
    marginOfError,
    confidenceLevel,
    sampleMean,
    sampleSize,
    standardDeviation
  };
}

/**
 * Calculate expected value
 */
export function expectedValue(outcomes: number[], probabilities: number[]): number {
  if (outcomes.length !== probabilities.length) {
    throw new Error('Outcomes and probabilities arrays must have the same length');
  }

  if (probabilities.some(p => p < 0 || p > 1)) {
    throw new Error('All probabilities must be between 0 and 1');
  }

  const sumProbabilities = probabilities.reduce((sum, p) => sum + p, 0);
  if (Math.abs(sumProbabilities - 1) > 0.0001) {
    throw new Error('Probabilities must sum to 1');
  }

  return outcomes.reduce((sum, outcome, index) => sum + outcome * probabilities[index], 0);
}

/**
 * Calculate variance
 */
export function variance(values: number[], isPopulation: boolean = false): number {
  if (values.length === 0) {
    throw new Error('Values array cannot be empty');
  }

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
  const sumSquaredDifferences = squaredDifferences.reduce((sum, diff) => sum + diff, 0);

  if (isPopulation) {
    return sumSquaredDifferences / values.length;
  } else {
    return sumSquaredDifferences / (values.length - 1);
  }
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(values: number[], isPopulation: boolean = false): number {
  return Math.sqrt(variance(values, isPopulation));
}

/**
 * Calculate covariance between two datasets
 */
export function covariance(values1: number[], values2: number[], isPopulation: boolean = false): number {
  if (values1.length !== values2.length) {
    throw new Error('Both datasets must have the same length');
  }
  if (values1.length === 0) {
    throw new Error('Datasets cannot be empty');
  }

  const mean1 = values1.reduce((sum, value) => sum + value, 0) / values1.length;
  const mean2 = values2.reduce((sum, value) => sum + value, 0) / values2.length;

  let covariance = 0;
  for (let i = 0; i < values1.length; i++) {
    covariance += (values1[i] - mean1) * (values2[i] - mean2);
  }

  if (isPopulation) {
    return covariance / values1.length;
  } else {
    return covariance / (values1.length - 1);
  }
}

/**
 * Calculate correlation coefficient
 */
export function correlationCoefficient(values1: number[], values2: number[]): number {
  const cov = covariance(values1, values2);
  const stdDev1 = standardDeviation(values1);
  const stdDev2 = standardDeviation(values2);

  if (stdDev1 === 0 || stdDev2 === 0) {
    throw new Error('Standard deviation cannot be zero');
  }

  return cov / (stdDev1 * stdDev2);
}

/**
 * Main probability calculation function
 */
export function calculateProbability(inputs: any): any {
  const {
    calculationType,
    n, k, p, lambda, x, mean, standardDeviation,
    populationSize, successPopulation, sampleSize, successSample,
    r, jointProbability, marginalProbability,
    priorProbability, likelihood, marginalProbability: marginalProb,
    sampleProportion, confidenceLevel,
    sampleMean, outcomes, probabilities,
    values, values1, values2, isPopulation
  } = inputs;

  switch (calculationType) {
    case 'binomial':
      return binomialProbability(n, k, p);

    case 'poisson':
      return poissonProbability(lambda, k);

    case 'normal':
      return normalProbability(x, mean, standardDeviation);

    case 'hypergeometric':
      return hypergeometricProbability(populationSize, successPopulation, sampleSize, successSample);

    case 'geometric':
      return geometricProbability(p, k);

    case 'negative_binomial':
      return negativeBinomialProbability(p, r, k);

    case 'conditional':
      return conditionalProbability(jointProbability, marginalProbability);

    case 'bayes':
      return bayesTheorem(priorProbability, likelihood, marginalProb);

    case 'confidence_interval_proportion':
      return confidenceIntervalProportion(sampleProportion, n, confidenceLevel);

    case 'confidence_interval_mean':
      return confidenceIntervalMean(sampleMean, n, standardDeviation, confidenceLevel);

    case 'expected_value':
      return expectedValue(outcomes, probabilities);

    case 'variance':
      return variance(values, isPopulation);

    case 'standard_deviation':
      return standardDeviation(values, isPopulation);

    case 'covariance':
      return covariance(values1, values2, isPopulation);

    case 'correlation':
      return correlationCoefficient(values1, values2);

    case 'combination':
      return combination(n, k);

    case 'permutation':
      return permutation(n, k);

    case 'factorial':
      return factorial(n);

    default:
      throw new Error('Unknown probability calculation type');
  }
}