export interface StatisticsCalculatorInputs {
  dataSet: number[];
  calculationType: 'descriptive' | 'inferential' | 'regression' | 'correlation' | 'distribution';
  confidenceLevel: number;
  sampleSize: number;
  populationSize: number;
  significanceLevel: number;
  testType: 'one_sample_t' | 'two_sample_t' | 'paired_t' | 'one_way_anova' | 'chi_square' | 'z_test';
}

export interface StatisticsCalculatorMetrics {
  mean: number;
  median: number;
  mode: number[];
  standardDeviation: number;
  variance: number;
  range: number;
  quartiles: [number, number, number];
  skewness: number;
  kurtosis: number;
  confidenceInterval: [number, number];
  pValue: number;
  testStatistic: number;
  degreesOfFreedom: number;
}

export interface StatisticsCalculatorAnalysis {
  dataDistribution: string;
  statisticalSignificance: string;
  effectSize: number;
  powerAnalysis: string;
  recommendations: string[];
}

export interface StatisticsCalculatorOutputs {
  mean: number;
  standardDeviation: number;
  confidenceInterval: [number, number];
  analysis: StatisticsCalculatorAnalysis;
}
