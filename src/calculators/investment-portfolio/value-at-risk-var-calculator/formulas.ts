```typescript
import { ValueAtRiskCalculatorInputs, ValueAtRiskCalculatorMetrics, ValueAtRiskCalculatorAnalysis } from './types';

// Domain-specific helper function for standard normal inverse CDF (quantile function)
// High-accuracy approximation based on standard numerical recipes for production use
function standardNormalInverse(p: number): number {
  if (p <= 0 || p >= 1) {
    throw new Error('Probability p must be between 0 and 1');
  }

  const a = [
    -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
    1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00
  ];
  const b = [
    -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
    6.680131188771972e+01, -1.328068155288572e+01
  ];
  const c = [
    -7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
    -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00
  ];
  const d = [
    7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00,
    3.754408661907416e+00
  ];

  const q = p - 0.5;
  if (Math.abs(q) < 0.42) {
    const r = 0.180625 - q * q;
    let num = a[0];
    for (let i = 1; i < 6; i++) {
      num = num * r + a[i];
    }
    let den = b[0];
    for (let i = 1; i < 5; i++) {
      den = den * r + b[i];
    }
    return q * num / den;
  } else {
    const r = q < 0 ? p : 1 - p;
    const logR = Math.log(-Math.log(r));
    let num = c[0];
    for (let i = 1; i < 6; i++) {
      num = num * logR + c[i];
    }
    let den = d[0];
    for (let i = 1; i < 4; i++) {
      den = den * logR + d[i];
    }
    return (q < 0 ? -1 : 1) * num / den;
  }
}

// Helper function to compute VaR using the variance-covariance (parametric) method
// Assumes annual mean return and volatility; time horizon in trading days (e.g., 252 per year)
// Formula: VaR = -[μ_t + z_α * σ_t] * PortfolioValue, where μ_t = μ * (t/252), σ_t = σ * sqrt(t/252)
function computeVaR(
  portfolioValue: number,
  annualMeanReturn: number,
  annualVolatility: number,
  confidenceLevel: number,
  timeHorizonDays: number
): number {
  if (portfolioValue <= 0 || annualVolatility < 0 || confidenceLevel <= 0 || confidenceLevel >= 1 || timeHorizonDays <= 0) {
    throw new Error('Invalid inputs for VaR calculation');
  }

  const alpha = 1 - confidenceLevel;
  const zAlpha = standardNormalInverse(alpha); // Negative for alpha < 0.5

  const tradingDaysPerYear = 252;
  const muT = annualMeanReturn * (timeHorizonDays / tradingDaysPerYear);
  const sigmaT = annualVolatility * Math.sqrt(timeHorizonDays / tradingDaysPerYear);

  const returnQuantile = muT + zAlpha * sigmaT;
  const varAmount = -returnQuantile * portfolioValue;

  return Math.max(0, varAmount); // Ensure non-negative VaR
}

export function calculateResult(inputs: ValueAtRiskCalculatorInputs): number {
  // Extract inputs (assuming type defines: portfolioValue, annualMeanReturn, annualVolatility, confidenceLevel, timeHorizonDays)
  const { portfolioValue, annualMeanReturn, annualVolatility, confidenceLevel, timeHorizonDays } = inputs;
  
  // Use parametric VaR calculation for investment portfolio risk assessment
  return computeVaR(portfolioValue, annualMeanReturn, annualVolatility, confidenceLevel, timeHorizonDays);
}

export function generateAnalysis(
  inputs: ValueAtRiskCalculatorInputs,
  metrics: ValueAtRiskCalculatorMetrics
): ValueAtRiskCalculatorAnalysis {
  const result = metrics.result;
  const { portfolioValue, timeHorizonDays } = inputs;
  
  // Compute VaR as percentage of portfolio for risk classification
  // Thresholds are indicative for portfolio management: low (<2% for typical horizons), medium (2-5%), high (>5%)
  // Adjusted loosely for horizon (shorter horizons have lower absolute %)
  const varPercentage = (result / portfolioValue) * 100;
  const horizonAdjustment = Math.sqrt(timeHorizonDays / 252); // Scale for annual equivalence
  const adjustedVarPct = varPercentage * horizonAdjustment;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (adjustedVarPct < 2) {
    riskLevel = 'Low';
  } else if (adjustedVarPct < 5) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  let recommendation: string;
  switch (riskLevel) {
    case 'Low':
      recommendation = 'The portfolio exhibits low risk at the specified confidence level. Maintain current allocation, but monitor market conditions.';
      break;
    case 'Medium':
      recommendation = 'Moderate risk detected. Consider reviewing asset correlations and potentially adding diversification to mitigate potential losses.';
      break;
    case 'High':
      recommendation = 'High VaR indicates significant potential loss. Recommend immediate hedging strategies, such as options or reducing exposure to volatile assets.';
      break;
    default:
      recommendation = 'Assess portfolio risk and adjust as needed.';
  }

  return { recommendation, riskLevel };
}
```