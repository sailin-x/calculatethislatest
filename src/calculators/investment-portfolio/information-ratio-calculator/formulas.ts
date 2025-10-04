```typescript
import { InformationRatioCalculatorInputs, InformationRatioCalculatorMetrics, InformationRatioCalculatorAnalysis } from './types';

export function calculateResult(inputs: InformationRatioCalculatorInputs): number {
  const { portfolioReturn, benchmarkReturn, trackingError } = inputs;
  // Information Ratio (IR) = (Portfolio Return - Benchmark Return) / Tracking Error
  // Returns Infinity or -Infinity if trackingError is 0, which is mathematically appropriate
  // (indicating undefined or extreme performance in the absence of active risk)
  return (portfolioReturn - benchmarkReturn) / trackingError;
}

export function generateAnalysis(inputs: InformationRatioCalculatorInputs, metrics: InformationRatioCalculatorMetrics): InformationRatioCalculatorAnalysis {
  const { result: ir } = metrics;
  const { trackingError } = inputs;

  // Determine risk level based on tracking error (active risk)
  // Assuming returns and tracking error are in decimal form (e.g., 0.05 for 5%)
  // Thresholds: <5% Low, 5-10% Medium, >10% High
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (trackingError < 0.05) {
    riskLevel = 'Low';
  } else if (trackingError > 0.10) {
    riskLevel = 'High';
  }

  // Generate recommendation based on IR value
  // IR > 1: Excellent; >0.5: Good; >0: Marginal outperformance; <=0: Underperformance
  // Handles Infinity as "excellent" implicitly via >1 check
  let recommendation: string;
  if (ir > 1 || !isFinite(ir) && (inputs.portfolioReturn > inputs.benchmarkReturn)) {
    recommendation = 'The portfolio demonstrates exceptional active management skill, generating significant excess returns with controlled tracking error. Consider maintaining or scaling this strategy.';
  } else if (ir > 0.5) {
    recommendation = 'The portfolio shows strong performance relative to the benchmark, with good risk-adjusted active returns. This indicates competent management.';
  } else if (ir > 0) {
    recommendation = 'The portfolio modestly outperforms the benchmark, but the information ratio suggests room for enhancing active returns or reducing tracking error.';
  } else {
    recommendation = 'The portfolio underperforms the benchmark on a risk-adjusted basis. Review the investment strategy and consider adjustments to improve excess returns.';
  }

  return { recommendation, riskLevel };
}
```