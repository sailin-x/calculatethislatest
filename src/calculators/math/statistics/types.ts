export interface StatisticsInputs {
  data: number[];
  weights?: number[];
  confidenceLevel: number;
  populationSize?: number;
  sampleSize?: number;
  hypothesisTest?: {
    nullValue: number;
    alternative: 'two-tailed' | 'left-tailed' | 'right-tailed';
    significanceLevel: number;
  };
  regression?: {
    xValues: number[];
    yValues: number[];
  };
}

export interface StatisticsMetrics {
  mean: number;
  median: number;
  mode: number[];
  variance: number;
  standardDeviation: number;
  standardError: number;
  skewness: number;
  kurtosis: number;
  range: number;
  interquartileRange: number;
  coefficientOfVariation: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  hypothesisTest?: {
    testStatistic: number;
    pValue: number;
    criticalValue: number;
    decision: 'reject' | 'fail_to_reject';
  };
  regression?: {
    slope: number;
    intercept: number;
    rSquared: number;
    correlationCoefficient: number;
  };
}

export interface StatisticsAnalysis {
  isNormal: boolean;
  distribution: 'normal' | 'skewed' | 'uniform' | 'unknown';
  outliers: number[];
  recommendation: string;
  keyInsights: string[];
  limitations: string[];
  dataQuality: {
    completeness: number;
    consistency: number;
    accuracy: number;
  };
  statisticalTests: {
    normalityTest: string;
    homogeneityTest: string;
    independenceTest: string;
  };
}

export interface StatisticsOutputs extends StatisticsMetrics {
  analysis: StatisticsAnalysis;
}
