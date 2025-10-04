```typescript
import { 
  ReturnOnEquityCalculatorInputs, 
  ReturnOnEquityCalculatorMetrics, 
  ReturnOnEquityCalculatorAnalysis 
} from './types';

/**
 * Helper function to calculate Return on Equity (ROE) as a decimal ratio.
 * ROE = Net Income / Average Shareholders' Equity
 * This uses average equity if beginning and ending equity are provided; otherwise, uses provided equity.
 * In investment portfolio analysis, ROE measures how effectively equity generates profits.
 */
function calculateROE(
  netIncome: number, 
  shareholdersEquity?: number, 
  beginningEquity?: number, 
  endingEquity?: number
): number {
  let averageEquity: number;
  
  if (beginningEquity !== undefined && endingEquity !== undefined) {
    // Use average equity for more accurate period-based ROE in portfolio performance tracking
    averageEquity = (beginningEquity + endingEquity) / 2;
  } else if (shareholdersEquity !== undefined) {
    averageEquity = shareholdersEquity;
  } else {
    throw new Error('Shareholders\' equity must be provided (either directly or as beginning/ending values)');
  }
  
  if (averageEquity === 0) {
    return 0; // Avoid division by zero; ROE undefined but set to 0 for safety in portfolio metrics
  }
  
  return netIncome / averageEquity;
}

/**
 * Domain-specific helper to assess ROE benchmark against industry standards for portfolio recommendation.
 * In investment portfolios, ROE > 15% indicates strong equity efficiency (e.g., for growth stocks);
 * 10-15% is moderate (value stocks); <10% signals potential underperformance or high leverage risk.
 */
function assessROEBenchmark(roe: number): { benchmarkCategory: 'Strong' | 'Moderate' | 'Weak'; threshold: number } {
  if (roe >= 0.15) {
    return { benchmarkCategory: 'Strong', threshold: 0.15 };
  } else if (roe >= 0.10) {
    return { benchmarkCategory: 'Moderate', threshold: 0.10 };
  } else {
    return { benchmarkCategory: 'Weak', threshold: 0.10 };
  }
}

export function calculateResult(inputs: ReturnOnEquityCalculatorInputs): number {
  // Core ROE calculation using investment-portfolio standard formula
  // Handles both simple equity and average equity for period-based portfolio analysis
  const roe = calculateROE(
    inputs.netIncome,
    inputs.shareholdersEquity,
    inputs.beginningEquity,
    inputs.endingEquity
  );
  
  return roe;
}

export function generateAnalysis(
  inputs: ReturnOnEquityCalculatorInputs, 
  metrics: ReturnOnEquityCalculatorMetrics
): ReturnOnEquityCalculatorAnalysis {
  const roe = metrics.result; // ROE as decimal (e.g., 0.15 for 15%)
  
  // Investment-portfolio specific risk assessment:
  // High ROE suggests efficient capital use, lowering portfolio risk from poor profitability
  // Low ROE increases risk of equity erosion in diversified portfolios
  // Benchmarks based on standard finance thresholds (e.g., DuPont analysis context)
  const benchmark = assessROEBenchmark(roe);
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  
  if (roe >= 0.15) {
    riskLevel = 'Low'; // Strong ROE implies lower risk of underperformance in equity-heavy portfolios
  } else if (roe < 0.05) {
    riskLevel = 'High'; // Weak ROE signals potential distress, increasing portfolio volatility risk
  }
  
  // Generate recommendation based on ROE and portfolio implications
  let recommendation: string;
  if (benchmark.benchmarkCategory === 'Strong') {
    recommendation = `The ROE of ${ (roe * 100).toFixed(2) }% exceeds the 15% benchmark, indicating excellent equity utilization. Consider increasing allocation to this asset in your portfolio for enhanced returns.`;
  } else if (benchmark.benchmarkCategory === 'Moderate') {
    recommendation = `The ROE of ${ (roe * 100).toFixed(2) }% meets moderate benchmarks (10-15%). Monitor for improvement; suitable for balanced portfolio diversification.`;
  } else {
    recommendation = `The ROE of ${ (roe * 100).toFixed(2) }% falls below the 10% threshold, suggesting inefficient equity use. Evaluate divestment or restructuring to mitigate portfolio drag.`;
  }

  return { 
    recommendation, 
    riskLevel 
  };
}
```