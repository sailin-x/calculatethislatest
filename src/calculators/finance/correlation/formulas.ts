import { CorrelationInputs, CorrelationOutputs } from './types';

// Correlation Calculator - Statistical correlation and relationship analysis

export function calculatePearsonCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) {
    throw new Error('Arrays must have equal length and at least 2 elements');
  }

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
}

export function calculateSpearmanCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) {
    throw new Error('Arrays must have equal length and at least 2 elements');
  }

  // Rank the data
  const rankX = getRanks(x);
  const rankY = getRanks(y);

  return calculatePearsonCorrelation(rankX, rankY);
}

export function calculateKendallTau(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) {
    throw new Error('Arrays must have equal length and at least 2 elements');
  }

  let concordant = 0;
  let discordant = 0;

  for (let i = 0; i < x.length - 1; i++) {
    for (let j = i + 1; j < x.length; j++) {
      const signX = Math.sign(x[j] - x[i]);
      const signY = Math.sign(y[j] - y[i]);

      if (signX * signY > 0) concordant++;
      else if (signX * signY < 0) discordant++;
    }
  }

  const totalPairs = (x.length * (x.length - 1)) / 2;
  return (concordant - discordant) / totalPairs;
}

function getRanks(arr: number[]): number[] {
  const sorted = [...arr].sort((a, b) => a - b);
  const ranks: number[] = [];

  for (const value of arr) {
    const rank = sorted.indexOf(value) + 1;
    ranks.push(rank);
  }

  return ranks;
}

export function calculateCovariance(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) {
    throw new Error('Arrays must have equal length and at least 2 elements');
  }

  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let covariance = 0;
  for (let i = 0; i < n; i++) {
    covariance += (x[i] - meanX) * (y[i] - meanY);
  }

  return covariance / (n - 1); // Sample covariance
}

export function calculateCorrelationStrength(correlation: number): 'Very Strong' | 'Strong' | 'Moderate' | 'Weak' | 'Very Weak' | 'None' {
  const absCorr = Math.abs(correlation);
  if (absCorr >= 0.9) return 'Very Strong';
  if (absCorr >= 0.7) return 'Strong';
  if (absCorr >= 0.5) return 'Moderate';
  if (absCorr >= 0.3) return 'Weak';
  if (absCorr >= 0.1) return 'Very Weak';
  return 'None';
}

export function calculateCorrelationDirection(correlation: number): 'Positive' | 'Negative' | 'None' {
  if (correlation > 0.1) return 'Positive';
  if (correlation < -0.1) return 'Negative';
  return 'None';
}

export function calculatePValue(correlation: number, sampleSize: number): number {
  if (sampleSize < 3) return 1;

  const tStatistic = correlation * Math.sqrt((sampleSize - 2) / (1 - correlation * correlation));
  // Using approximation for p-value (two-tailed test)
  const pValue = 2 * (1 - Math.abs(tStatistic) / Math.sqrt(sampleSize));

  return Math.min(pValue, 1);
}

export function calculateConfidenceInterval(correlation: number, sampleSize: number, confidenceLevel: number): { lower: number; upper: number } {
  const z = confidenceLevel === 95 ? 1.96 : confidenceLevel === 99 ? 2.576 : 1.645;
  const se = 1 / Math.sqrt(sampleSize - 3);
  const zCorr = 0.5 * Math.log((1 + correlation) / (1 - correlation));

  const lowerZ = zCorr - z * se;
  const upperZ = zCorr + z * se;

  const lower = (Math.exp(2 * lowerZ) - 1) / (Math.exp(2 * lowerZ) + 1);
  const upper = (Math.exp(2 * upperZ) - 1) / (Math.exp(2 * upperZ) + 1);

  return { lower, upper };
}

export function calculateBetaCoefficient(x: number[], y: number[]): number {
  const covariance = calculateCovariance(x, y);
  const varianceX = calculateVariance(x);
  return varianceX === 0 ? 0 : covariance / varianceX;
}

export function calculateRSquared(correlation: number): number {
  return correlation * correlation;
}

export function calculateAdjustedRSquared(rSquared: number, sampleSize: number, numPredictors: number = 1): number {
  if (sampleSize <= numPredictors + 1) return rSquared;
  return 1 - ((1 - rSquared) * (sampleSize - 1)) / (sampleSize - numPredictors - 1);
}

export function calculateRegressionEquation(x: number[], y: number[]): { intercept: number; slope: number; equation: string } {
  const slope = calculateBetaCoefficient(x, y);
  const meanX = x.reduce((a, b) => a + b, 0) / x.length;
  const meanY = y.reduce((a, b) => a + b, 0) / y.length;
  const intercept = meanY - slope * meanX;

  const equation = `y = ${intercept.toFixed(4)} + ${slope.toFixed(4)}x`;
  return { intercept, slope, equation };
}

function calculateVariance(arr: number[]): number {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return arr.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (arr.length - 1);
}

function calculateMean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calculateStandardDeviation(arr: number[]): number {
  return Math.sqrt(calculateVariance(arr));
}

function calculateSharpeRatio(returns: number[], riskFreeRate: number): number {
  const meanReturn = calculateMean(returns);
  const stdDev = calculateStandardDeviation(returns);
  return stdDev === 0 ? 0 : (meanReturn - riskFreeRate) / stdDev;
}

function calculateMaximumDrawdown(returns: number[]): number {
  let peak = returns[0];
  let maxDrawdown = 0;

  for (const ret of returns) {
    if (ret > peak) peak = ret;
    const drawdown = (peak - ret) / peak;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  }

  return maxDrawdown;
}

export function calculateCorrelationMetrics(inputs: CorrelationInputs): CorrelationOutputs {
  const { asset1Returns, asset2Returns, confidenceLevel, calculationMethod } = inputs;

  let correlationCoefficient: number;
  switch (calculationMethod) {
    case 'spearman':
      correlationCoefficient = calculateSpearmanCorrelation(asset1Returns, asset2Returns);
      break;
    case 'kendall':
      correlationCoefficient = calculateKendallTau(asset1Returns, asset2Returns);
      break;
    default:
      correlationCoefficient = calculatePearsonCorrelation(asset1Returns, asset2Returns);
  }

  const covariance = calculateCovariance(asset1Returns, asset2Returns);
  const correlationStrength = calculateCorrelationStrength(correlationCoefficient);
  const correlationDirection = calculateCorrelationDirection(correlationCoefficient);
  const sampleSize = asset1Returns.length;
  const pValue = calculatePValue(correlationCoefficient, sampleSize);
  const statisticalSignificance = pValue < (1 - confidenceLevel / 100);
  const confidenceInterval = calculateConfidenceInterval(correlationCoefficient, sampleSize, confidenceLevel);
  const degreesOfFreedom = sampleSize - 2;
  const tStatistic = correlationCoefficient * Math.sqrt(degreesOfFreedom / (1 - correlationCoefficient * correlationCoefficient));
  const betaCoefficient = calculateBetaCoefficient(asset1Returns, asset2Returns);
  const rSquared = calculateRSquared(correlationCoefficient);
  const adjustedRSquared = calculateAdjustedRSquared(rSquared, sampleSize);
  const standardError = Math.sqrt((1 - rSquared) / (sampleSize - 2));
  const fStatistic = (rSquared / (1 - rSquared)) * (sampleSize - 2);
  const regressionEquation = calculateRegressionEquation(asset1Returns, asset2Returns);

  const scatterPlotData = asset1Returns.map((x, i) => ({ x, y: asset2Returns[i] }));

  const correlationMatrix = [
    [1, correlationCoefficient],
    [correlationCoefficient, 1]
  ];

  // Asset statistics
  const asset1Stats = {
    mean: calculateMean(asset1Returns),
    variance: calculateVariance(asset1Returns),
    standardDeviation: calculateStandardDeviation(asset1Returns),
    skewness: 0, // Simplified
    kurtosis: 0, // Simplified
    sharpeRatio: calculateSharpeRatio(asset1Returns, inputs.riskFreeRate),
    sortinoRatio: 0, // Simplified
    maximumDrawdown: calculateMaximumDrawdown(asset1Returns),
    valueAtRisk: 0 // Simplified
  };

  const asset2Stats = {
    mean: calculateMean(asset2Returns),
    variance: calculateVariance(asset2Returns),
    standardDeviation: calculateStandardDeviation(asset2Returns),
    skewness: 0, // Simplified
    kurtosis: 0, // Simplified
    sharpeRatio: calculateSharpeRatio(asset2Returns, inputs.riskFreeRate),
    sortinoRatio: 0, // Simplified
    maximumDrawdown: calculateMaximumDrawdown(asset2Returns),
    valueAtRisk: 0 // Simplified
  };

  // Portfolio optimization (simplified Markowitz)
  const weights = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const efficientFrontier = weights.map(w => {
    const portfolioReturn = w * asset1Stats.mean + (1 - w) * asset2Stats.mean;
    const portfolioRisk = Math.sqrt(
      w * w * asset1Stats.variance +
      (1 - w) * (1 - w) * asset2Stats.variance +
      2 * w * (1 - w) * covariance
    );
    return { return: portfolioReturn, risk: portfolioRisk, weights: { asset1: w, asset2: 1 - w } };
  });

  const minimumVariancePortfolio = efficientFrontier.reduce((min, curr) =>
    curr.risk < min.risk ? curr : min
  );

  const maximumSharpePortfolio = efficientFrontier.reduce((max, curr) =>
    curr.return / curr.risk > max.return / max.risk ? curr : max
  );

  const portfolioStats = {
    portfolioReturn: 0.5 * asset1Stats.mean + 0.5 * asset2Stats.mean,
    portfolioRisk: Math.sqrt(
      0.25 * asset1Stats.variance + 0.25 * asset2Stats.variance + 0.5 * covariance
    ),
    portfolioSharpeRatio: 0, // Would need calculation
    optimalWeights: { asset1: 0.5, asset2: 0.5 },
    efficientFrontier,
    minimumVariancePortfolio,
    maximumSharpePortfolio
  };

  return {
    correlationCoefficient,
    covariance,
    correlationStrength,
    correlationDirection,
    statisticalSignificance,
    pValue,
    confidenceInterval,
    sampleSize,
    degreesOfFreedom,
    tStatistic,
    betaCoefficient,
    rSquared,
    adjustedRSquared,
    standardError,
    fStatistic,
    regressionEquation,
    scatterPlotData,
    correlationMatrix,
    asset1Stats,
    asset2Stats,
    portfolioStats,
    riskMetrics: {
      systematicRisk: betaCoefficient * asset1Stats.standardDeviation,
      unsystematicRisk: asset2Stats.standardDeviation * Math.sqrt(1 - correlationCoefficient * correlationCoefficient),
      totalRisk: Math.sqrt(asset1Stats.variance + asset2Stats.variance + 2 * covariance),
      diversificationBenefit: asset1Stats.standardDeviation + asset2Stats.standardDeviation - portfolioStats.portfolioRisk,
      correlationVolatility: 0,
      tailDependence: 0,
      extremeCorrelation: 0
    },
    rollingCorrelations: [],
    correlationStability: {
      averageCorrelation: correlationCoefficient,
      correlationVolatility: 0,
      stabilityScore: 0,
      regimeChanges: 0
    },
    copulaAnalysis: {
      copulaType: 'Gaussian',
      dependenceParameter: correlationCoefficient,
      tailDependenceLower: 0,
      tailDependenceUpper: 0,
      kendallTau: calculateKendallTau(asset1Returns, asset2Returns),
      spearmanRho: calculateSpearmanCorrelation(asset1Returns, asset2Returns)
    },
    grangerCausality: {
      asset1CausesAsset2: false,
      asset2CausesAsset1: false,
      fStatisticAsset1ToAsset2: 0,
      fStatisticAsset2ToAsset1: 0,
      pValueAsset1ToAsset2: 1,
      pValueAsset2ToAsset1: 1
    },
    cointegrationTest: {
      isCointegrated: false,
      testStatistic: 0,
      criticalValue: 0,
      pValue: 1,
      hedgeRatio: 0
    },
    leadLagAnalysis: {
      asset1LeadsAsset2: 0,
      asset2LeadsAsset1: 0,
      optimalLag: 0,
      crossCorrelationPeak: correlationCoefficient
    },
    networkAnalysis: {
      centrality: 0,
      clusteringCoefficient: 0,
      degree: 0,
      betweenness: 0
    },
    marketRegimeAnalysis: {
      currentRegime: 'Normal',
      regimeProbability: 1,
      regimeTransitionMatrix: [[1]],
      regimeCorrelations: { Normal: correlationCoefficient }
    },
    stressTesting: {
      crisisCorrelation: correlationCoefficient * 1.2,
      recoveryCorrelation: correlationCoefficient * 0.8,
      volatilityRegimeCorrelation: correlationCoefficient * 1.1,
      correlationBreakdown: correlationCoefficient * 0.9
    },
    benchmarkComparison: {
      benchmarkCorrelation: inputs.benchmarkReturns ? calculatePearsonCorrelation(asset1Returns, inputs.benchmarkReturns) : 0,
      alphaVsBenchmark: 0,
      betaVsBenchmark: 0,
      trackingError: 0,
      informationRatio: 0
    },
    riskAdjustedPerformance: {
      correlationAdjustedSharpe: 0,
      riskParityWeight: 0.5,
      minimumCorrelationPortfolio: minimumVariancePortfolio
    }
  };
}