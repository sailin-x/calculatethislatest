export interface CorrelationInputs {
  asset1Returns: number[];
  asset2Returns: number[];
  asset1Name: string;
  asset2Name: string;
  confidenceLevel: number;
  timePeriod: string;
  calculationMethod: 'pearson' | 'spearman' | 'kendall';
  riskFreeRate: number;
  benchmarkReturns?: number[];
  benchmarkName?: string;
}

export interface CorrelationOutputs {
  correlationCoefficient: number;
  covariance: number;
  correlationStrength: 'Very Strong' | 'Strong' | 'Moderate' | 'Weak' | 'Very Weak' | 'None';
  correlationDirection: 'Positive' | 'Negative' | 'None';
  statisticalSignificance: boolean;
  pValue: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  sampleSize: number;
  degreesOfFreedom: number;
  tStatistic: number;
  betaCoefficient: number;
  rSquared: number;
  adjustedRSquared: number;
  standardError: number;
  fStatistic: number;
  regressionEquation: {
    intercept: number;
    slope: number;
    equation: string;
  };
  scatterPlotData: Array<{ x: number; y: number }>;
  correlationMatrix: number[][];
  asset1Stats: {
    mean: number;
    variance: number;
    standardDeviation: number;
    skewness: number;
    kurtosis: number;
    sharpeRatio: number;
    sortinoRatio: number;
    maximumDrawdown: number;
    valueAtRisk: number;
  };
  asset2Stats: {
    mean: number;
    variance: number;
    standardDeviation: number;
    skewness: number;
    kurtosis: number;
    sharpeRatio: number;
    sortinoRatio: number;
    maximumDrawdown: number;
    valueAtRisk: number;
  };
  portfolioStats: {
    portfolioReturn: number;
    portfolioRisk: number;
    portfolioSharpeRatio: number;
    optimalWeights: {
      asset1: number;
      asset2: number;
    };
    efficientFrontier: Array<{ return: number; risk: number; weights: { asset1: number; asset2: number } }>;
    minimumVariancePortfolio: {
      return: number;
      risk: number;
      weights: { asset1: number; asset2: number };
    };
    maximumSharpePortfolio: {
      return: number;
      risk: number;
      weights: { asset1: number; asset2: number };
    };
  };
  riskMetrics: {
    systematicRisk: number;
    unsystematicRisk: number;
    totalRisk: number;
    diversificationBenefit: number;
    correlationVolatility: number;
    tailDependence: number;
    extremeCorrelation: number;
  };
  rollingCorrelations: Array<{ period: number; correlation: number; date: string }>;
  correlationStability: {
    averageCorrelation: number;
    correlationVolatility: number;
    stabilityScore: number;
    regimeChanges: number;
  };
  copulaAnalysis: {
    copulaType: string;
    dependenceParameter: number;
    tailDependenceLower: number;
    tailDependenceUpper: number;
    kendallTau: number;
    spearmanRho: number;
  };
  grangerCausality: {
    asset1CausesAsset2: boolean;
    asset2CausesAsset1: boolean;
    fStatisticAsset1ToAsset2: number;
    fStatisticAsset2ToAsset1: number;
    pValueAsset1ToAsset2: number;
    pValueAsset2ToAsset1: number;
  };
  cointegrationTest: {
    isCointegrated: boolean;
    testStatistic: number;
    criticalValue: number;
    pValue: number;
    hedgeRatio: number;
  };
  leadLagAnalysis: {
    asset1LeadsAsset2: number;
    asset2LeadsAsset1: number;
    optimalLag: number;
    crossCorrelationPeak: number;
  };
  networkAnalysis: {
    centrality: number;
    clusteringCoefficient: number;
    degree: number;
    betweenness: number;
  };
  marketRegimeAnalysis: {
    currentRegime: string;
    regimeProbability: number;
    regimeTransitionMatrix: number[][];
    regimeCorrelations: { [regime: string]: number };
  };
  stressTesting: {
    crisisCorrelation: number;
    recoveryCorrelation: number;
    volatilityRegimeCorrelation: number;
    correlationBreakdown: number;
  };
  benchmarkComparison: {
    benchmarkCorrelation: number;
    alphaVsBenchmark: number;
    betaVsBenchmark: number;
    trackingError: number;
    informationRatio: number;
  };
  riskAdjustedPerformance: {
    correlationAdjustedSharpe: number;
    riskParityWeight: number;
    minimumCorrelationPortfolio: {
      return: number;
      risk: number;
      weights: { asset1: number; asset2: number };
    };
  };
}