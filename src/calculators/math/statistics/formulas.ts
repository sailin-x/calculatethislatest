import { Formula, CalculationResult } from '../../../types/calculator';

export interface StatisticsInputs {
  dataset: number[];
  confidenceLevel: number; // 90, 95, 99
  populationStandardDeviation?: number;
  sampleSize?: number;
  hypothesizedMean?: number;
  significanceLevel: number; // 0.01, 0.05, 0.10
}

export class StatisticsFormulas {
  /**
   * Calculate mean (average)
   */
  static calculateMean(data: number[]): number {
    return data.reduce((sum, value) => sum + value, 0) / data.length;
  }

  /**
   * Calculate median
   */
  static calculateMedian(data: number[]): number {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];
  }

  /**
   * Calculate mode
   */
  static calculateMode(data: number[]): number[] {
    const frequency: { [key: number]: number } = {};
    data.forEach(value => frequency[value] = (frequency[value] || 0) + 1);
    
    const maxFreq = Math.max(...Object.values(frequency));
    return Object.keys(frequency)
      .filter(key => frequency[Number(key)] === maxFreq)
      .map(Number);
  }

  /**
   * Calculate sample standard deviation
   */
  static calculateSampleStandardDeviation(data: number[]): number {
    const mean = this.calculateMean(data);
    const squaredDiffs = data.map(value => Math.pow(value - mean, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / (data.length - 1);
    return Math.sqrt(variance);
  }

  /**
   * Calculate population standard deviation
   */
  static calculatePopulationStandardDeviation(data: number[]): number {
    const mean = this.calculateMean(data);
    const squaredDiffs = data.map(value => Math.pow(value - mean, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / data.length;
    return Math.sqrt(variance);
  }

  /**
   * Calculate confidence interval
   */
  static calculateConfidenceInterval(
    mean: number,
    standardError: number,
    confidenceLevel: number,
    sampleSize: number
  ): { lowerBound: number; upperBound: number; marginOfError: number } {
    const alpha = (100 - confidenceLevel) / 100;
    const tValue = this.getTValue(alpha / 2, sampleSize - 1);
    const marginOfError = tValue * standardError;
    
    return {
      lowerBound: mean - marginOfError,
      upperBound: mean + marginOfError,
      marginOfError
    };
  }

  /**
   * Get t-value for confidence intervals (approximation)
   */
  static getTValue(alpha: number, degreesOfFreedom: number): number {
    // Simplified t-table lookup for common values
    const tTable: { [key: string]: { [key: number]: number } } = {
      '0.005': { 1: 63.657, 2: 9.925, 5: 4.032, 10: 3.169, 20: 2.845, 30: 2.750, 60: 2.660, 120: 2.617, Infinity: 2.576 },
      '0.025': { 1: 12.706, 2: 4.303, 5: 2.571, 10: 2.228, 20: 2.086, 30: 2.042, 60: 2.000, 120: 1.980, Infinity: 1.960 },
      '0.05': { 1: 6.314, 2: 2.920, 5: 2.015, 10: 1.812, 20: 1.725, 30: 1.697, 60: 1.671, 120: 1.658, Infinity: 1.645 }
    };
    
    const alphaKey = alpha.toFixed(3);
    const table = tTable[alphaKey];
    if (!table) return 1.96; // Default to 95% CI
    
    // Find closest degrees of freedom
    const dfs = Object.keys(table).map(Number).sort((a, b) => a - b);
    let closestDf = dfs.find(df => df >= degreesOfFreedom) || Infinity;
    
    return table[closestDf] || 1.96;
  }

  /**
   * Perform one-sample t-test
   */
  static oneSampleTTest(
    sampleMean: number,
    hypothesizedMean: number,
    sampleStd: number,
    sampleSize: number
  ): { tStatistic: number; pValue: number; degreesOfFreedom: number } {
    const standardError = sampleStd / Math.sqrt(sampleSize);
    const tStatistic = (sampleMean - hypothesizedMean) / standardError;
    const degreesOfFreedom = sampleSize - 1;
    
    // Approximate p-value calculation
    const pValue = this.approximatePValue(Math.abs(tStatistic), degreesOfFreedom);
    
    return { tStatistic, pValue, degreesOfFreedom };
  }

  /**
   * Approximate p-value calculation
   */
  static approximatePValue(tStat: number, df: number): number {
    // Simplified p-value approximation
    if (tStat > 3.5) return 0.001;
    if (tStat > 2.8) return 0.01;
    if (tStat > 2.0) return 0.05;
    if (tStat > 1.7) return 0.10;
    return 0.20;
  }

  /**
   * Calculate correlation coefficient
   */
  static calculateCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length) throw new Error('Arrays must have same length');
    
    const n = x.length;
    const meanX = this.calculateMean(x);
    const meanY = this.calculateMean(y);
    
    const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
    const denomX = Math.sqrt(x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0));
    const denomY = Math.sqrt(y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0));
    
    return numerator / (denomX * denomY);
  }

  /**
   * Calculate linear regression
   */
  static calculateLinearRegression(x: number[], y: number[]): {
    slope: number;
    intercept: number;
    rSquared: number;
    equation: string;
  } {
    if (x.length !== y.length) throw new Error('Arrays must have same length');
    
    const n = x.length;
    const meanX = this.calculateMean(x);
    const meanY = this.calculateMean(y);
    
    const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
    const denominator = x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0);
    
    const slope = numerator / denominator;
    const intercept = meanY - slope * meanX;
    
    const correlation = this.calculateCorrelation(x, y);
    const rSquared = Math.pow(correlation, 2);
    
    const equation = `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`;
    
    return { slope, intercept, rSquared, equation };
  }
}

export const statisticsCalculatorFormula: Formula = {
  id: 'statistics-calculator',
  name: 'Advanced Statistics Calculator',
  description: 'Comprehensive statistical analysis including descriptive statistics, hypothesis testing, and regression analysis',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const statsInputs = inputs as StatisticsInputs;
    
    try {
      const data = statsInputs.dataset;
      if (!data || data.length === 0) {
        throw new Error('Dataset is required');
      }
      
      // Descriptive statistics
      const mean = StatisticsFormulas.calculateMean(data);
      const median = StatisticsFormulas.calculateMedian(data);
      const mode = StatisticsFormulas.calculateMode(data);
      const sampleStd = StatisticsFormulas.calculateSampleStandardDeviation(data);
      const populationStd = StatisticsFormulas.calculatePopulationStandardDeviation(data);
      
      // Range and quartiles
      const sortedData = [...data].sort((a, b) => a - b);
      const range = sortedData[sortedData.length - 1] - sortedData[0];
      const q1 = StatisticsFormulas.calculateMedian(sortedData.slice(0, Math.floor(sortedData.length / 2)));
      const q3 = StatisticsFormulas.calculateMedian(sortedData.slice(Math.ceil(sortedData.length / 2)));
      const iqr = q3 - q1;
      
      // Confidence interval
      const standardError = sampleStd / Math.sqrt(data.length);
      const confidenceInterval = StatisticsFormulas.calculateConfidenceInterval(
        mean,
        standardError,
        statsInputs.confidenceLevel || 95,
        data.length
      );
      
      // Hypothesis test (if hypothesized mean provided)
      let tTest = null;
      if (statsInputs.hypothesizedMean !== undefined) {
        tTest = StatisticsFormulas.oneSampleTTest(
          mean,
          statsInputs.hypothesizedMean,
          sampleStd,
          data.length
        );
      }
      
      return {
        outputs: {
          // Descriptive statistics
          mean: Math.round(mean * 10000) / 10000,
          median: Math.round(median * 10000) / 10000,
          mode: mode.length === 1 ? mode[0] : mode,
          sampleStandardDeviation: Math.round(sampleStd * 10000) / 10000,
          populationStandardDeviation: Math.round(populationStd * 10000) / 10000,
          variance: Math.round(Math.pow(sampleStd, 2) * 10000) / 10000,
          
          // Spread measures
          range: Math.round(range * 10000) / 10000,
          q1: Math.round(q1 * 10000) / 10000,
          q3: Math.round(q3 * 10000) / 10000,
          interquartileRange: Math.round(iqr * 10000) / 10000,
          
          // Sample statistics
          sampleSize: data.length,
          minimum: sortedData[0],
          maximum: sortedData[sortedData.length - 1],
          
          // Confidence interval
          confidenceLevel: statsInputs.confidenceLevel || 95,
          marginOfError: Math.round(confidenceInterval.marginOfError * 10000) / 10000,
          lowerBound: Math.round(confidenceInterval.lowerBound * 10000) / 10000,
          upperBound: Math.round(confidenceInterval.upperBound * 10000) / 10000,
          
          // Hypothesis test results
          tStatistic: tTest ? Math.round(tTest.tStatistic * 10000) / 10000 : null,
          pValue: tTest ? tTest.pValue : null,
          degreesOfFreedom: tTest ? tTest.degreesOfFreedom : null,
          
          // Additional metrics
          standardError: Math.round(standardError * 10000) / 10000,
          coefficientOfVariation: Math.round((sampleStd / mean) * 100 * 100) / 100
        },
        explanation: `Statistical analysis of ${data.length} data points. Mean: ${mean.toFixed(4)}, Median: ${median.toFixed(4)}, Standard Deviation: ${sampleStd.toFixed(4)}. ${statsInputs.confidenceLevel || 95}% confidence interval: [${confidenceInterval.lowerBound.toFixed(4)}, ${confidenceInterval.upperBound.toFixed(4)}].${tTest ? ` T-test result: t = ${tTest.tStatistic.toFixed(4)}, p ≈ ${tTest.pValue.toFixed(3)}.` : ''}`,
        intermediateSteps: {
          'Sample Size': `n = ${data.length}`,
          'Mean Calculation': `Σx / n = ${data.reduce((a, b) => a + b, 0).toFixed(2)} / ${data.length} = ${mean.toFixed(4)}`,
          'Standard Deviation': `√(Σ(x - μ)² / (n-1)) = ${sampleStd.toFixed(4)}`,
          'Standard Error': `σ / √n = ${sampleStd.toFixed(4)} / √${data.length} = ${standardError.toFixed(4)}`,
          'Confidence Interval': `${mean.toFixed(4)} ± ${confidenceInterval.marginOfError.toFixed(4)}`,
          'T-Statistic': tTest ? `(x̄ - μ₀) / SE = (${mean.toFixed(4)} - ${statsInputs.hypothesizedMean}) / ${standardError.toFixed(4)} = ${tTest.tStatistic.toFixed(4)}` : 'Not calculated'
        }
      };
    } catch (error) {
      throw new Error(`Statistics calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};